# OneSearch Deployment Guide

> **Platform:** Nigerian/African Market Intelligence for Entrepreneurs  
> **Stack:** Next.js 14 App Router · Supabase · Paystack · Vercel  
> **Last Updated:** 2026-10-29

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Project Setup](#supabase-project-setup)
3. [Paystack Account Setup](#paystack-account-setup)
4. [Vercel Deployment](#vercel-deployment)
5. [Environment Variables Reference](#environment-variables-reference)
6. [Production Checklist](#production-checklist)
7. [Post-Deployment Verification](#post-deployment-verification)
8. [Monitoring & Alerting](#monitoring--alerting)
9. [Common Deployment Errors & Fixes](#common-deployment-errors--fixes)
10. [Database Backup Strategy](#database-backup-strategy)
11. [Scaling Considerations](#scaling-considerations)
12. [Custom Domain Setup](#custom-domain-setup)

---

## Prerequisites

Before starting the deployment process, ensure the following tools, accounts, and versions are in place.

### Required Software

| Tool | Minimum Version | Recommended Version | Notes |
|------|----------------|--------------------|----|
| Node.js | 18.17.0 | 20.x LTS | Required by Next.js 14 |
| npm | 9.0.0 | 10.x | Comes with Node.js |
| Git | 2.30+ | Latest | For Vercel GitHub integration |

**Verify your Node.js version:**
```bash
node --version   # must be >= 18.17.0
npm --version    # must be >= 9.0.0
```

If you need to manage multiple Node.js versions, use [nvm](https://github.com/nvm-sh/nvm):
```bash
nvm install 20
nvm use 20
nvm alias default 20
```

### Required Accounts

You must create and verify accounts on the following platforms before proceeding:

1. **Vercel** — [vercel.com](https://vercel.com)
   - Sign up with GitHub (strongly recommended — enables one-click repo import)
   - Free Hobby plan works for staging; Pro plan recommended for production
   - Verify your email address before deployment

2. **Supabase** — [supabase.com](https://supabase.com)
   - Create an account (GitHub login recommended)
   - Free tier available; Pro plan needed for production (daily backups, no pausing)
   - Have a project region in mind — **choose `eu-west-1` (Ireland)** or `us-east-1` for latency closest to Nigerian users via CDN

3. **Paystack** — [paystack.com](https://paystack.com)
   - Must register as a Nigerian business entity or individual
   - Have your BVN and bank details ready for verification
   - Verification takes 1–3 business days
   - You can proceed with **test mode** immediately after sign-up

### Local Development Setup

Clone the repository and install dependencies:
```bash
git clone https://github.com/your-org/onesearch.git
cd onesearch
npm install
cp .env.example .env.local
```

---

## Supabase Project Setup

Supabase serves as the primary database (PostgreSQL), authentication provider, and real-time backend for OneSearch.

### Step 1: Create a New Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com) and log in.
2. Click **New Project**.
3. Fill in the project details:
   - **Name:** `onesearch-production` (or `onesearch-staging` for a staging environment)
   - **Database Password:** Generate a strong password — **save this securely** in your password manager. You cannot recover it later.
   - **Region:** Select the region geographically closest to your primary user base. For Nigerian users, `eu-west-1` (Ireland) typically provides the lowest latency.
   - **Pricing Plan:** Free for development; upgrade to **Pro** before going live.
4. Click **Create new project** and wait 2–3 minutes for provisioning.

> **Important:** Create separate Supabase projects for `staging` and `production`. Never share database credentials between environments.

### Step 2: Run Database Migrations

Once your project is live, navigate to the **SQL Editor** in the Supabase dashboard.

#### 2a. Core Schemas

Run the following SQL in order. Each block must succeed before running the next.

```sql
-- ============================================================
-- Migration 001: Enable UUID extension
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Migration 002: Profiles table (linked to auth.users)
-- ============================================================
CREATE TABLE public.profiles (
  id           UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT,
  business_name TEXT,
  phone        TEXT,
  industry     TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- Migration 003: Sectors table
-- ============================================================
CREATE TABLE public.sectors (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  tagline      TEXT,
  description  TEXT,
  icon_url     TEXT,
  cover_image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- Migration 004: Reports table
-- ============================================================
CREATE TABLE public.reports (
  id           UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sector_id    UUID REFERENCES public.sectors(id) ON DELETE CASCADE NOT NULL,
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  subtitle     TEXT,
  summary      TEXT,
  body         TEXT,         -- Full markdown/MDX content
  preview_body TEXT,         -- Free preview excerpt
  price_ngn    INTEGER NOT NULL DEFAULT 0,  -- price in kobo
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- Migration 005: Purchases table
-- ============================================================
CREATE TABLE public.purchases (
  id                UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  report_id         UUID REFERENCES public.reports(id) ON DELETE SET NULL,
  paystack_reference TEXT UNIQUE NOT NULL,
  paystack_status   TEXT NOT NULL DEFAULT 'pending',  -- pending | success | failed
  amount_ngn        INTEGER NOT NULL,                 -- amount in kobo
  email             TEXT NOT NULL,
  metadata          JSONB,
  created_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================
-- Migration 006: Updated_at triggers
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER sectors_updated_at
  BEFORE UPDATE ON public.sectors
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER purchases_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

#### 2b. Indexes for Performance

```sql
-- Sector lookup by slug
CREATE INDEX idx_sectors_slug ON public.sectors(slug);
CREATE INDEX idx_sectors_published ON public.sectors(is_published) WHERE is_published = TRUE;

-- Report lookup
CREATE INDEX idx_reports_sector_id ON public.reports(sector_id);
CREATE INDEX idx_reports_slug ON public.reports(slug);
CREATE INDEX idx_reports_published ON public.reports(is_published) WHERE is_published = TRUE;

-- Purchase lookups
CREATE INDEX idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX idx_purchases_report_id ON public.purchases(report_id);
CREATE INDEX idx_purchases_paystack_ref ON public.purchases(paystack_reference);
CREATE INDEX idx_purchases_status ON public.purchases(paystack_status);
```

### Step 3: Set Up Row Level Security (RLS) Policies

RLS is Supabase's mechanism for data isolation at the database level. It must be enabled on all public tables.

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- ── profiles ──────────────────────────────────────────────
-- Users can only read and update their own profile
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- ── sectors ───────────────────────────────────────────────
-- Published sectors are publicly readable; unpublished are admin-only
CREATE POLICY "sectors_select_published" ON public.sectors
  FOR SELECT USING (is_published = TRUE);

-- ── reports ───────────────────────────────────────────────
-- Everyone can see published reports (content gating happens at app layer)
CREATE POLICY "reports_select_published" ON public.reports
  FOR SELECT USING (is_published = TRUE);

-- ── purchases ─────────────────────────────────────────────
-- Users can only view their own purchases
CREATE POLICY "purchases_select_own" ON public.purchases
  FOR SELECT USING (auth.uid() = user_id);

-- Service role (used by API routes and webhooks) bypasses RLS — this is default Supabase behaviour
-- Never expose SUPABASE_SERVICE_ROLE_KEY to the client
```

> **Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses RLS entirely. It must only ever be used in server-side code (Next.js API routes, Route Handlers, Server Actions). Never expose it in client components or the `NEXT_PUBLIC_` namespace.

### Step 4: Configure Auth Settings

1. In the Supabase Dashboard, go to **Authentication → URL Configuration**.
2. Set the **Site URL** to your production domain:
   ```
   https://onesearch.ng
   ```
3. Under **Redirect URLs**, add all allowed redirect origins:
   ```
   https://onesearch.ng/**
   https://staging.onesearch.ng/**
   http://localhost:3000/**
   ```
4. Go to **Authentication → Email Templates** and customise the:
   - **Confirm Signup** email — include your brand name and logo URL
   - **Magic Link** email — shorten the call-to-action text
   - **Password Reset** email — include support contact

5. Go to **Authentication → Providers** and enable:
   - **Email** — enable "Confirm email" for production; disable for local dev to speed up testing
   - Optionally: **Google OAuth** — requires creating a Google Cloud project and OAuth credentials

6. Under **Authentication → Settings**, set:
   - **JWT Expiry:** `3600` (1 hour) — adjust based on your session strategy
   - **Enable email confirmations:** `true` for production

### Step 5: Profile Auto-Creation Trigger

When a user signs up, their `auth.users` record is created automatically. You need a database trigger to mirror this into your `public.profiles` table:

```sql
-- Function: creates a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after each new user insert in auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

Verify the trigger is working by going to **Authentication → Users**, creating a test user, then checking **Table Editor → profiles** to confirm a row was created.

### Step 6: Retrieve API Keys

In the Supabase Dashboard, go to **Project Settings → API**:

| Key | Environment Variable | Usage |
|-----|---------------------|-------|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` | Client + server |
| `anon` public key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client-side (safe to expose) |
| `service_role` secret key | `SUPABASE_SERVICE_ROLE_KEY` | Server-side only — never expose |

Copy these values into your `.env.local` file immediately.

---

## Paystack Account Setup

Paystack is Nigeria's leading payment gateway and processes all OneSearch report purchases.

### Step 1: Create a Paystack Account

1. Go to [dashboard.paystack.com](https://dashboard.paystack.com) and click **Create a free account**.
2. Fill in your business or personal details.
3. You'll receive an OTP verification to your phone number.
4. Complete your business profile:
   - **Business type:** Choose "Starter" (individual) or register a full business
   - **BVN:** Required for live mode activation
   - **Bank account:** Required to receive settlements

> Paystack activates your account for live transactions after manual review, which typically takes 1–3 business days. **You can start development immediately using test mode.**

### Step 2: Retrieve API Keys

Go to **Settings → API Keys & Webhooks** in the Paystack dashboard:

| Key | Environment Variable | Notes |
|-----|---------------------|-------|
| Test Public Key | `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Use `pk_test_...` prefix in dev |
| Test Secret Key | `PAYSTACK_SECRET_KEY` | Use `sk_test_...` prefix in dev |
| Live Public Key | `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Use `pk_live_...` prefix in prod |
| Live Secret Key | `PAYSTACK_SECRET_KEY` | Use `sk_live_...` prefix in prod |

> **Important:** Switch from test keys to live keys only when deploying to production AND after Paystack has verified your account.

### Step 3: Configure the Webhook

Paystack sends asynchronous payment confirmation events to a webhook endpoint you define. This is how OneSearch confirms payments and unlocks report access.

1. In the Paystack dashboard, go to **Settings → API Keys & Webhooks**.
2. Under **Webhook URL**, enter:
   ```
   https://onesearch.ng/api/webhooks/paystack
   ```
   For staging:
   ```
   https://staging.onesearch.ng/api/webhooks/paystack
   ```
3. Click **Update**.

> Paystack does not support multiple webhook URLs per account. Use environment-specific Paystack accounts (test vs live) for separate webhook routing.

### Step 4: Verify Webhook Signatures

Your webhook handler in `app/api/webhooks/paystack/route.ts` must verify that requests genuinely come from Paystack using HMAC-SHA512:

```typescript
import crypto from 'crypto';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET)
    .update(body)
    .digest('hex');

  if (hash !== signature) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(body);
  // Handle event.event === 'charge.success'
  // ...
}
```

### Step 5: Test Mode Walkthrough

Use these test card numbers to verify your payment flow end-to-end before going live:

| Scenario | Card Number | Expiry | CVV |
|----------|-------------|--------|-----|
| Successful payment | 4084 0840 8408 4081 | Any future date | Any |
| Declined (insufficient funds) | 4084 0840 8408 4081 | Any future date | 000 |
| Failed payment | 5531 8866 5214 2950 | Any future date | 564 |

**Test flow:**
1. Start your local dev server: `npm run dev`
2. Navigate to a report page.
3. Click **Buy Report** — this initiates a Paystack transaction.
4. Use the test card above in the Paystack popup.
5. On success, you should be redirected back and the report should unlock.
6. Check your Supabase `purchases` table — a row with `paystack_status = 'success'` should appear.
7. Check the Paystack dashboard → **Transactions** to confirm the test transaction is logged.

---

## Vercel Deployment

Vercel is the recommended deployment platform for Next.js 14 applications. It provides zero-config deployment, automatic preview builds, and global CDN.

### Step 1: Connect Your GitHub Repository

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import Git Repository** and select your GitHub account.
3. Find the `onesearch` repository and click **Import**.
4. Configure the project:
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `.` (leave as default unless monorepo)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### Step 2: Set Environment Variables

In the Vercel project settings, go to **Settings → Environment Variables** and add each variable below. Carefully select which environments each applies to (Production, Preview, Development).

See the full [Environment Variables Reference](#environment-variables-reference) section for all required variables.

**Quick entry steps:**
1. Click **Add New** for each variable.
2. Paste the key name and value.
3. Select the appropriate environments.
4. Click **Save**.

> Variables prefixed with `NEXT_PUBLIC_` are embedded into the client-side JavaScript bundle during build. Never put secrets in `NEXT_PUBLIC_` variables.

### Step 3: Trigger Your First Deployment

After saving environment variables, either:
- Push a new commit to your `main` branch, or
- Go to **Deployments** in the Vercel dashboard and click **Redeploy** on the latest deployment.

Vercel will run `npm run build`. Watch the build logs for errors. Common issues at this stage:
- Missing environment variables causing build-time `undefined` errors
- TypeScript type errors not caught locally
- Import path issues

### Step 4: Verify the Deployment

Once the build succeeds:
1. Click the deployment URL (e.g., `onesearch-abc123.vercel.app`)
2. Confirm the homepage loads
3. Test authentication (sign up, log in, log out)
4. Test a payment with a test card
5. Confirm webhook delivery in the Paystack dashboard

### Step 5: Configure Branch Deployments

Vercel automatically creates preview deployments for every pull request. Configure this behaviour in **Settings → Git**:

- **Production Branch:** `main`
- **Preview Branches:** All other branches get a unique preview URL
- Enable **GitHub PR Comments** so every PR shows a clickable preview URL

This is essential for the team to review UI changes before merging.

### Step 6: Set Up Analytics

Vercel provides built-in Web Analytics and Speed Insights with zero configuration:

1. In the Vercel dashboard, go to your project → **Analytics** tab.
2. Click **Enable Analytics** (included in Hobby and Pro plans).
3. Add the analytics component to your layout:

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

4. Install the packages if not already present:
```bash
npm install @vercel/analytics @vercel/speed-insights
```

---

## Environment Variables Reference

All environment variables must be set in both `.env.local` (local development) and in the Vercel dashboard (deployment). Never commit `.env.local` to Git — it is already in `.gitignore`.

### `NEXT_PUBLIC_SUPABASE_URL`

| Property | Value |
|----------|-------|
| **Type** | Public (safe to expose in client) |
| **Example** | `https://xyzcompany.supabase.co` |
| **Required** | Yes |
| **Environments** | All |

The URL of your Supabase project. Found in **Project Settings → API → Project URL**. This URL is used by the Supabase client to route all API requests. It is safe to expose publicly since access is controlled by RLS policies and API keys.

---

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`

| Property | Value |
|----------|-------|
| **Type** | Public (safe to expose in client) |
| **Example** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| **Required** | Yes |
| **Environments** | All |

The anonymous/public API key for your Supabase project. Found in **Project Settings → API → Project API Keys → anon public**. This key is used for all client-side Supabase operations and is scoped by RLS policies — it cannot access data the RLS rules don't permit.

---

### `SUPABASE_SERVICE_ROLE_KEY`

| Property | Value |
|----------|-------|
| **Type** | **Secret — NEVER expose to client** |
| **Example** | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| **Required** | Yes |
| **Environments** | All (server-side only) |

The service role key for your Supabase project. Found in **Project Settings → API → Project API Keys → service_role**. This key **bypasses all RLS policies** and has full read/write access to the database. It must only be used in:
- Next.js Route Handlers (`app/api/...`)
- Server Actions
- Middleware
- Vercel Edge Functions

It must **never** appear in any client component, in `NEXT_PUBLIC_` variables, or be sent to the browser.

---

### `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`

| Property | Value |
|----------|-------|
| **Type** | Public (safe to expose in client) |
| **Example** | `pk_test_xxxxxxxxxxxxxxxx` or `pk_live_xxxxxxxxxxxxxxxx` |
| **Required** | Yes |
| **Environments** | All |

The Paystack public key used to initialise the Paystack inline payment popup on the client side. Found in the Paystack dashboard under **Settings → API Keys & Webhooks**. Use `pk_test_...` in development and staging; use `pk_live_...` in production only.

---

### `PAYSTACK_SECRET_KEY`

| Property | Value |
|----------|-------|
| **Type** | **Secret — NEVER expose to client** |
| **Example** | `sk_test_xxxxxxxxxxxxxxxx` or `sk_live_xxxxxxxxxxxxxxxx` |
| **Required** | Yes |
| **Environments** | All (server-side only) |

The Paystack secret key used for server-side operations: verifying webhook signatures, initialising transactions via the Paystack API, and verifying payment status. Found in the Paystack dashboard under **Settings → API Keys & Webhooks**. Use `sk_test_...` in development and staging; use `sk_live_...` in production only.

---

### `NEXT_PUBLIC_APP_URL`

| Property | Value |
|----------|-------|
| **Type** | Public |
| **Example** | `https://onesearch.ng` |
| **Required** | Yes |
| **Environments** | All (varies by environment) |

The fully-qualified base URL of the application. Used for constructing absolute URLs in:
- Auth redirect URLs passed to Supabase
- Open Graph metadata
- Canonical link tags
- Paystack callback URLs

Set to:
- `http://localhost:3000` for local development
- `https://staging.onesearch.ng` for staging
- `https://onesearch.ng` for production

### Summary Table

| Variable | Public? | Required | Source |
|----------|---------|----------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Yes | Supabase Dashboard |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Yes | Supabase Dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | **No** | Yes | Supabase Dashboard |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes | Yes | Paystack Dashboard |
| `PAYSTACK_SECRET_KEY` | **No** | Yes | Paystack Dashboard |
| `NEXT_PUBLIC_APP_URL` | Yes | Yes | Manual (per environment) |

---

## Production Checklist

Complete every item on this checklist before announcing the platform publicly.

### Infrastructure

- [ ] Supabase project is on the **Pro plan** (prevents auto-pausing, enables daily backups)
- [ ] Supabase project region selected for optimal latency to Nigeria
- [ ] All database migrations have been run in production
- [ ] All RLS policies are enabled and tested
- [ ] Auth trigger (`on_auth_user_created`) is confirmed working
- [ ] Vercel project is on the **Pro plan** (for custom domains and higher limits)
- [ ] Vercel deployment is connected to the correct GitHub branch (`main`)

### Security

- [ ] `SUPABASE_SERVICE_ROLE_KEY` is **not** in any `NEXT_PUBLIC_` variable
- [ ] `PAYSTACK_SECRET_KEY` is **not** accessible on the client
- [ ] Webhook signature verification is implemented and tested
- [ ] All environment variables are set in Vercel dashboard (not just `.env.local`)
- [ ] `.env.local` is in `.gitignore` and has **never** been committed

### Payments

- [ ] Paystack account is fully verified for live transactions
- [ ] Live API keys (`pk_live_...` / `sk_live_...`) are set in production environment
- [ ] Webhook URL is updated to production URL in Paystack dashboard
- [ ] At least one end-to-end payment test completed with a real card (small amount)
- [ ] Paystack settlement bank account is configured correctly

### Content

- [ ] At least one sector and one report are published in the production database
- [ ] Report preview content is set (so users can see a sample before buying)
- [ ] All content has been reviewed for accuracy and typos
- [ ] Images are optimised and served via Supabase Storage or a CDN

### UX & Performance

- [ ] Auth flow tested on mobile (iOS Safari and Android Chrome)
- [ ] Payment flow tested on mobile
- [ ] Core Web Vitals are acceptable (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] 404 and error pages are styled and branded
- [ ] Favicon, Open Graph images, and Twitter cards are configured

### Monitoring

- [ ] Vercel Analytics is enabled
- [ ] Error monitoring (e.g., Sentry) is configured — see [Monitoring section](#monitoring--alerting)
- [ ] Uptime monitoring is configured (e.g., Better Uptime or UptimeRobot)

---

## Post-Deployment Verification

After each production deployment, run through this verification sequence:

### 1. Homepage Load
- Open `https://onesearch.ng` in an incognito/private browser window
- Confirm the page loads within 3 seconds
- Confirm sectors and featured reports are displayed

### 2. Authentication Flow
- Click **Sign Up** — confirm the auth modal opens
- Sign up with a new test email address
- Check that a confirmation email is received (for production with email confirm enabled)
- Confirm that a profile row was created in Supabase → `profiles` table
- Sign out, then sign back in

### 3. Report Preview & Purchase
- Navigate to a published report
- Confirm the preview content is visible to unauthenticated users
- Attempt to view full content — confirm gate/paywall appears
- Complete a purchase using a Paystack test card
- Confirm the report unlocks immediately after payment
- Check the `purchases` table in Supabase for the new row

### 4. Webhook Verification
- Go to Paystack dashboard → **Settings → API Keys & Webhooks**
- Scroll down to see webhook delivery logs
- Confirm the webhook was delivered with a 200 response for your test payment

### 5. Mobile Verification
- Open the site on a real mobile device (not just Chrome DevTools device emulation)
- Test auth modal on mobile — confirm it is usable on small screens
- Test payment on mobile — Paystack inline checkout should work on mobile browsers

---

## Monitoring & Alerting

### Vercel Built-in Monitoring

Vercel provides the following out of the box:
- **Deployment notifications** — email alerts on build failure
- **Web Analytics** — page views, visitors, referrers
- **Speed Insights** — real-user Core Web Vitals data
- **Log Drains** — ship logs to external services (Datadog, Logtail)

### Error Monitoring with Sentry

Install Sentry for Next.js to capture runtime errors in both client and server:

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

Add your Sentry DSN to environment variables:
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_ORG=your-org
SENTRY_PROJECT=onesearch
SENTRY_AUTH_TOKEN=your-auth-token
```

Configure source maps upload in `sentry.config.js` so production stack traces are readable.

### Uptime Monitoring

Use [Better Uptime](https://betteruptime.com) or [UptimeRobot](https://uptimerobot.com) to monitor:
- `https://onesearch.ng` — homepage (every 1 minute)
- `https://onesearch.ng/api/health` — create a simple health check endpoint

**Health check endpoint:**
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

Set up SMS/email alerts when response time exceeds 5 seconds or returns non-200.

### Supabase Monitoring

In the Supabase Dashboard:
- **Reports → Database Health** — check for slow queries
- **Reports → API Usage** — monitor request volumes and error rates
- **Logs → Postgres Logs** — inspect query logs for errors

Set up **Supabase Alerts** under Project Settings → Alerts:
- Database CPU > 80%
- Database disk usage > 80%
- Auth failure rate > 5%

---

## Common Deployment Errors & Fixes

### Error: `supabaseUrl is required`

**Cause:** `NEXT_PUBLIC_SUPABASE_URL` is not set in the Vercel environment.

**Fix:** Go to Vercel → Project Settings → Environment Variables. Add the variable and redeploy. Note that `NEXT_PUBLIC_` variables must be set before the build runs — they are inlined at build time, not at runtime.

---

### Error: `JWT expired` / `invalid claim: missing sub claim`

**Cause:** The user's Supabase JWT has expired and the client hasn't refreshed it.

**Fix:** Ensure you are using `createServerClient` from `@supabase/ssr` in your Route Handlers and middleware, which automatically handles token refresh. Avoid using `createClient` from `@supabase/supabase-js` directly on the server.

---

### Error: `new row violates row-level security policy`

**Cause:** An insert/update/delete is being attempted by a user who is not allowed to perform that action under the RLS policy.

**Fix:** Review the RLS policy for the relevant table. If the operation is intentional (e.g., a webhook creating a purchase record), use the Supabase `service_role` client (`createClient` with `SUPABASE_SERVICE_ROLE_KEY`) in your Route Handler, not the `anon` key.

---

### Error: Paystack webhook returns 500

**Cause:** Usually a signature verification failure or an unhandled event type.

**Fix:** 
1. Log the raw request body and signature header before any processing.
2. Ensure you are reading the **raw body** (not the parsed JSON) for HMAC verification — body parsing changes the string.
3. Add a catch-all for unknown event types that returns 200 (Paystack retries non-200 responses).

---

### Error: `Module not found: Can't resolve '...'`

**Cause:** A relative import path that works on case-insensitive macOS fails on case-sensitive Linux (Vercel's build environment).

**Fix:** Audit all import paths to match the exact casing of the file system. Use absolute imports configured in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### Error: Build times out on Vercel

**Cause:** Static site generation (SSG) of too many pages at build time, or a very large dependency tree.

**Fix:**
- Use `generateStaticParams` selectively — only pre-render the most popular pages.
- Use ISR (Incremental Static Regeneration) with `revalidate` instead of full SSG.
- Check for circular dependencies: `npx madge --circular --extensions ts,tsx src/`

---

### Error: Auth redirect loop

**Cause:** The middleware is redirecting authenticated users to login and vice versa due to a misconfigured matcher or session check.

**Fix:** Review your middleware `matcher` config. Ensure the public paths (homepage, sector pages, report preview pages) are excluded from the auth guard. Double-check that `NEXT_PUBLIC_APP_URL` is set correctly and matches the Supabase redirect URL allowlist.

---

## Database Backup Strategy

### Supabase Automatic Backups (Pro Plan)

On the Supabase Pro plan, daily backups are taken automatically and retained for **7 days**. Point-in-time recovery (PITR) is available as an add-on, allowing restoration to any second within the past 7 days.

To restore from a backup:
1. Go to Supabase Dashboard → Project Settings → Backups.
2. Select the backup point.
3. Click **Restore** — this creates a new Supabase project from the backup.
4. Update your environment variables to point to the restored project.
5. Run any migrations that were applied after the backup point.

### Manual Backup Procedure

For additional safety, take manual backups before significant operations (schema changes, data migrations):

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Dump the database schema
supabase db dump -f schema_backup_$(date +%Y%m%d).sql

# Dump data (for smaller datasets)
supabase db dump --data-only -f data_backup_$(date +%Y%m%d).sql
```

Store backup files in a secure location outside of the primary infrastructure (e.g., Google Drive, S3 bucket, or encrypted local storage).

### Migration Versioning

All schema changes must be tracked as numbered SQL migration files in `supabase/migrations/`:
```
supabase/
  migrations/
    20241001000000_initial_schema.sql
    20241015000000_add_report_tags.sql
    20241020000000_add_purchase_metadata.sql
```

Apply migrations using:
```bash
supabase db push
```

Never modify existing migration files — always create a new migration file for changes.

---

## Scaling Considerations

### Database Scaling

- **Connection Pooling:** Enable Supabase's built-in PgBouncer connection pooler for production. Set `?pgbouncer=true` in your database URL and use pool mode `transaction` for serverless environments.
- **Read Replicas:** Available on the Supabase Enterprise plan for high-read workloads. Sector and report data are read-heavy; offloading reads to a replica can significantly reduce primary database load.
- **Caching:** Use Next.js `unstable_cache` or `revalidatePath`/`revalidateTag` with ISR for frequently-read, rarely-changed content (sectors, published reports). This reduces database queries to near-zero for cached pages.

### Application Scaling

- **Vercel Edge Network:** Vercel automatically distributes your application across a global CDN. No configuration required.
- **Serverless Function Limits:** Vercel Hobby plan limits functions to 10-second execution time; Pro plan extends this to 60 seconds. Webhook handlers and payment verification should complete well within these limits.
- **Image Optimisation:** Use Next.js `<Image>` component for all images. Vercel's image optimisation CDN handles resizing and format conversion (WebP/AVIF) automatically.

### Traffic Spike Preparation

Before a marketing campaign or launch event:
1. Enable Vercel's **Skew Protection** (Pro plan) to prevent users hitting stale deployments during a rollout.
2. Pre-warm Supabase by running a few queries against the production database before the campaign starts.
3. Set Supabase compute tier to at least **Small** during expected spikes.
4. Monitor Supabase **Reports → Database** in real time during the event.

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to Vercel → Project → **Settings → Domains**.
2. Click **Add**.
3. Enter your domain: `onesearch.ng`
4. Also add the `www` variant: `www.onesearch.ng` and set it to redirect to the apex domain.

### Step 2: Configure DNS Records

Vercel will display the DNS records you need to add. Log in to your domain registrar (e.g., Namecheap, GoDaddy, or a Nigerian registrar like [Domain King](https://www.domainking.ng)):

For apex domain (`onesearch.ng`):
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600
```

For `www` subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

DNS propagation typically takes 15 minutes to 48 hours. Use [dnschecker.org](https://dnschecker.org) to monitor propagation.

### Step 3: SSL Certificate

Vercel automatically provisions and renews a free Let's Encrypt SSL certificate once DNS propagation is complete. No manual action is required.

### Step 4: Update Environment Variables

After the custom domain is live, update `NEXT_PUBLIC_APP_URL` in Vercel:
```
NEXT_PUBLIC_APP_URL=https://onesearch.ng
```

Trigger a new deployment for the change to take effect.

### Step 5: Update Supabase Redirect URLs

In the Supabase Dashboard → Authentication → URL Configuration:
- Update **Site URL** to `https://onesearch.ng`
- Add `https://onesearch.ng/**` to the **Redirect URLs** list

### Step 6: Update Paystack Webhook

In the Paystack dashboard → Settings → API Keys & Webhooks:
- Update the **Webhook URL** to `https://onesearch.ng/api/webhooks/paystack`

---

*This guide is maintained by the OneSearch engineering team. For questions or corrections, open an issue in the GitHub repository.*
