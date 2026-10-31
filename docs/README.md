# OneSearch — African Market Intelligence Platform

> _Clarity before capital. Know your market before you enter it._

---

## Table of Contents

1. [What is OneSearch?](#what-is-onesearch)
2. [The Problem We're Solving](#the-problem-were-solving)
3. [The Solution](#the-solution)
4. [Key Features](#key-features)
5. [Who Is This For?](#who-is-this-for)
6. [Tech Stack](#tech-stack)
7. [Page Structure & User Flow](#page-structure--user-flow)
8. [Project Structure](#project-structure)
9. [Getting Started (Quick Start)](#getting-started-quick-start)
10. [Environment Variables](#environment-variables)
11. [Running the App](#running-the-app)
12. [Sector Cards — What They Contain](#sector-cards--what-they-contain)
13. [Pro Features & the ₦2,000 Gate](#pro-features--the-2000-gate)
14. [Authentication (Supabase)](#authentication-supabase)
15. [Payments (Paystack)](#payments-paystack)
16. [Content & Research Methodology](#content--research-methodology)
17. [Business Model](#business-model)
18. [Styling & Design System](#styling--design-system)
19. [Contributing](#contributing)
20. [Deployment](#deployment)
21. [FAQ for Developers](#faq-for-developers)
22. [Roadmap](#roadmap)
23. [License](#links--references)
24. [Links & References](#links--references)

---

## What is OneSearch?

**OneSearch** is a market intelligence platform purpose-built for the African — and specifically Nigerian — startup ecosystem. It is a curated, research-driven resource that helps entrepreneurs, builders, students, and investors understand which sectors of the economy are thriving, which have struggled, why businesses in those sectors succeed or fail, what the risk factors look like, and where genuine market opportunities still exist.

Think of it as a **sector research compass** for anyone who is trying to decide where to place their bet in the Nigerian or broader African economy.

The platform was born out of a simple observation: most Nigerian entrepreneurs make sector entry decisions based on anecdote, hype, or proximity — "my friend is doing fintech and making money, so I'll do fintech too." Very few have access to structured, honest, grounded intelligence about sector dynamics. OneSearch exists to close that gap.

OneSearch is not an AI product. It is not powered by language models making up plausible-sounding market insights. Every piece of information on the platform is **human-researched**, sourced from publicly available data, founder interviews, news archives, market reports, and the personal investigative work of the platform's creator. The research methodology is documented in full on the founder's Substack.

The product is intentionally simple:

- A **landing page** that explains the value proposition clearly
- An **exploration page** where users can browse all available sectors for free
- A **pro content layer** behind a one-time ₦2,000 Paystack payment that unlocks in-depth analysis for each sector
- A **Supabase authentication modal** that appears only when a user wants to save progress or access pro content — no forced sign-up walls on exploration

---

## The Problem We're Solving

### Information Asymmetry in Nigerian Entrepreneurship

Nigeria has one of the youngest, most energetic entrepreneurial populations in the world. Lagos alone routinely produces tech startups, fashion brands, food businesses, logistics companies, health ventures, and everything in between at a pace that rivals many developed-world cities. And yet, the failure rate for Nigerian startups is staggering.

Most post-mortems of failed Nigerian startups reveal a common thread: **founders entered markets they didn't understand well enough.** Not because they were incompetent, but because the information they needed simply wasn't accessible in a structured, honest, actionable form.

Here is what the research landscape looks like for a typical Nigerian founder trying to decide which sector to enter:

- **Academic reports** — Usually outdated, jargon-heavy, inaccessible, and behind institutional paywalls
- **VC investment reports** — Biased toward where capital is flowing, which may not reflect where actual founder opportunity exists
- **News articles** — Episodic, hype-driven, rarely gives a longitudinal view of sector health
- **Twitter/X threads** — Often anecdotal, unverifiable, and easily influenced by who has the loudest voice
- **Friends and mentors** — Valuable but limited by personal experience and sample size
- **Global market research firms** — Prohibitively expensive (often priced in USD for reports that may not even cover Nigeria meaningfully)

None of these sources give a founder what they actually need: **a grounded, honest, sector-by-sector breakdown of what has worked, what has failed, why, and what opportunities remain.**

OneSearch is built to fill exactly that gap.

### The Stakes

When a founder in Nigeria makes a bad sector entry decision, the consequences are personal and severe:
- They may spend 1–3 years building in the wrong direction
- They may exhaust personal savings and family capital
- They may hire a small team that loses their livelihoods when the startup folds
- They may become disillusioned with entrepreneurship entirely

This is not a trivial problem. Every bad sector entry decision is a ripple that affects families, communities, and the broader economy. Better information, delivered accessibly, is one of the highest-leverage interventions in this ecosystem.

---

## The Solution

OneSearch aggregates, synthesizes, and presents sector intelligence in a format that is:

1. **Honest** — It does not shy away from documenting failures and risk factors
2. **Structured** — Every sector is covered using a consistent analytical framework
3. **Accessible** — The basic exploration layer is completely free, no login required
4. **Actionable** — Content is designed to help founders make decisions, not just understand the landscape
5. **Affordable** — Pro deep-dives are priced at ₦2,000 — deliberately low to ensure accessibility
6. **Human-researched** — No AI hallucinations, no synthetic data, no made-up statistics

The platform covers major Nigerian/African economic sectors including (but not limited to):
- Fintech & Financial Services
- Agritech & Food Systems
- Edtech & Skills Training
- Health & Medtech
- Logistics & Supply Chain
- Retail & E-commerce
- Energy & Cleantech
- Media, Entertainment & Creator Economy
- Real Estate & Proptech
- B2B SaaS & Enterprise Software
- Transportation & Mobility
- Fashion & Lifestyle

Each sector is analyzed across multiple dimensions: history, current state, major players, failure patterns, success factors, regulatory environment, capital availability, and open opportunities.

---

## Key Features

### 1. Sector Exploration (Free)
The exploration page is open to all visitors. No account required. Users can:
- Browse all available sectors
- See high-level sector summaries
- View sector "health scores" or status indicators (thriving, challenged, emerging, saturated)
- See basic risk flags and opportunity signals
- Filter or sort sectors by category, opportunity level, or risk profile

### 2. Sector Cards
Each sector is represented by a card that displays:
- Sector name and category
- A brief summary (2–3 sentences)
- Status badge (e.g., "Actively Growing", "High Risk", "Emerging Opportunity")
- Key risk factors (top 3, visible for free)
- Key opportunities (top 3, visible for free)
- A "Go Deeper" CTA that triggers the pro content gate

### 3. Pro In-Depth Analysis (₦2,000 Gate)
After payment via Paystack, users unlock:
- Full sector deep-dive (2,000–5,000 words per sector)
- Historical timeline of the sector in Nigeria
- Analysis of why past startups in the sector succeeded or failed
- Regulatory landscape and compliance considerations
- Capital and funding environment breakdown
- Specific market gaps with supporting evidence
- Founder recommendations and entry strategy suggestions
- Links to further reading (reports, news archives, founder interviews)

### 4. Authentication (Non-Intrusive)
- Login/signup via a Supabase modal — no redirect to a separate page
- Auth is only surfaced when a user wants to access pro content or save their progress
- The exploration experience is fully anonymous
- Magic link + email/password options

### 5. Paystack Payment Integration
- One-time payment of ₦2,000 for lifetime pro access
- Paystack inline checkout (no redirect away from the platform)
- Payment status stored in Supabase user profile
- Payment verification handled server-side via Paystack webhook

### 6. Research Attribution
- Every sector page credits the research sources
- A link to the founder's Substack where methodology is documented
- No false authority — if data is uncertain, it is marked as such

---

## Who Is This For?

- **First-time founders** in Nigeria trying to decide which sector to enter
- **Serial entrepreneurs** doing quick sector diligence before a new venture
- **Diaspora investors** who want to understand the Nigerian market before deploying capital
- **Student entrepreneurs** in Nigerian universities building their first ventures
- **Accelerator programs and incubators** that need a shared resource for cohort education
- **Policy researchers and journalists** who want a structured view of sector health

---

## Tech Stack

| Layer | Technology | Version/Notes |
|-------|-----------|--------------|
| Framework | Next.js | 14, App Router |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS | v3 |
| UI Components | shadcn/ui | Radix UI primitives |
| Authentication | Supabase Auth | Email/password + magic link |
| Database | Supabase (PostgreSQL) | For user profiles and payment records |
| Payments | Paystack | Inline checkout, webhook verification |
| Content Storage | Supabase or MDX files | Sector content in structured format |
| Icons | Lucide React | |
| Fonts | Google Fonts (Geist or Inter) | |
| Deployment | Vercel | |
| Analytics | None (by design, v1) | |

### Why Next.js 14 App Router?

The App Router gives us server-side rendering for sector pages (important for SEO and initial load speed), React Server Components for efficient data fetching, and the route group pattern to easily separate the landing page layout from the exploration page layout.

### Why Supabase?

Supabase gives us a managed PostgreSQL database, built-in authentication (including magic links and OAuth), and a JavaScript SDK that works well in a Next.js environment. It removes the need for a custom backend for auth and user data, letting us focus on the product.

### Why Paystack?

Paystack is the most reliable and developer-friendly payment gateway in Nigeria. It supports Naira payments natively, has excellent documentation, an active Nigerian developer community, and an inline checkout that keeps users on our platform during the payment flow. Paystack's webhook system makes server-side payment verification straightforward.

### Why Tailwind CSS?

Speed of development, consistency, and the ability to build a clean, professional design without writing a lot of custom CSS. Combined with shadcn/ui, we get accessible, well-tested UI components out of the box.

---

## Page Structure & User Flow

```
Landing Page (/)
├── Hero Section
│   ├── Headline + Subheadline
│   ├── CTA: "Explore Sectors →"
│   └── (optional) Brief value proposition bullets
│
├── Section 1: The Problem
│   └── Why Nigerian founders need better market intelligence
│
├── Section 2: What You Get
│   └── Overview of exploration + pro features
│
├── Section 3: About the Research
│   └── Who does the research, how, and where it's documented (Substack link)
│
└── Footer
    ├── Links (Explore, Substack, Contact)
    └── Copyright

Exploration Page (/explore)
├── Sector Filter Bar
├── Sector Cards Grid
│   ├── [Free] High-level card view
│   └── [Pro] "Go Deeper" → triggers modal
│
├── Auth Modal (Supabase)
│   ├── Sign up / Sign in
│   └── After auth → Paystack checkout
│
└── Payment Flow (Paystack Inline)
    ├── ₦2,000 one-time charge
    ├── Webhook → Supabase update (user.is_pro = true)
    └── Page refreshes to show pro content
```

### User Journey Scenarios

**Scenario A — Anonymous Explorer:**
1. Visits landing page → clicks "Explore Sectors"
2. Browses exploration page freely
3. Reads sector summaries, sees risk flags and opportunities
4. Leaves without creating an account
5. _Value delivered: basic awareness of sector landscape_

**Scenario B — Committed Founder:**
1. Visits landing page → clicks "Explore Sectors"
2. Browses, finds a sector they're interested in
3. Clicks "Go Deeper" on a sector card
4. Auth modal appears → signs up with email
5. Paystack inline checkout → pays ₦2,000
6. Pro content unlocked across all sectors
7. Reads full deep-dive analyses
8. _Value delivered: full research access, informed sector decision_

**Scenario C — Returning Pro User:**
1. Visits site → navigates directly to /explore
2. Supabase session detected → already logged in and pro
3. All sector deep-dives immediately accessible
4. _Value delivered: seamless return access_

---

## Project Structure

```
onesearch/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (fonts, metadata, Supabase provider)
│   ├── page.tsx                  # Landing page
│   ├── explore/
│   │   ├── layout.tsx            # Explore page layout
│   │   └── page.tsx              # Explore page (sector cards grid)
│   ├── api/
│   │   ├── paystack/
│   │   │   ├── initialize/
│   │   │   │   └── route.ts      # POST: init Paystack transaction
│   │   │   └── webhook/
│   │   │       └── route.ts      # POST: Paystack webhook handler
│   │   └── auth/
│   │       └── callback/
│   │           └── route.ts      # Supabase auth callback
│   └── globals.css               # Global styles + Tailwind directives
│
├── components/
│   ├── ui/                       # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── card.tsx
│   ├── landing/
│   │   ├── Hero.tsx              # Landing page hero section
│   │   ├── ProblemSection.tsx    # The problem section
│   │   ├── FeaturesSection.tsx   # What you get section
│   │   ├── ResearchSection.tsx   # About the research section
│   │   └── Footer.tsx            # Site footer
│   ├── explore/
│   │   ├── SectorCard.tsx        # Individual sector card
│   │   ├── SectorGrid.tsx        # Grid of sector cards
│   │   ├── SectorFilters.tsx     # Filter/sort controls
│   │   └── ProContentOverlay.tsx # Overlay on locked content
│   ├── auth/
│   │   ├── AuthModal.tsx         # Supabase auth modal (dialog)
│   │   ├── LoginForm.tsx         # Email/password login form
│   │   └── SignUpForm.tsx        # Sign up form
│   └── payment/
│       └── PaystackCheckout.tsx  # Paystack inline checkout trigger
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser Supabase client
│   │   ├── server.ts             # Server Supabase client (cookies)
│   │   └── middleware.ts         # Auth middleware helper
│   ├── paystack/
│   │   ├── initialize.ts         # Transaction initialization logic
│   │   └── verify.ts             # Payment verification logic
│   └── utils.ts                  # General utility functions
│
├── data/
│   ├── sectors/                  # Sector content files
│   │   ├── fintech.ts            # Fintech sector data
│   │   ├── agritech.ts           # Agritech sector data
│   │   ├── edtech.ts             # Edtech sector data
│   │   ├── healthtech.ts         # Healthtech sector data
│   │   ├── logistics.ts          # Logistics sector data
│   │   └── index.ts              # Exports all sectors
│   └── types.ts                  # TypeScript types for sector data
│
├── hooks/
│   ├── useAuth.ts                # Auth state hook
│   ├── useProAccess.ts           # Pro access check hook
│   └── usePaystack.ts            # Paystack checkout hook
│
├── middleware.ts                 # Next.js middleware (auth session refresh)
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
├── .env.local                    # Environment variables (not committed)
├── .env.example                  # Environment variables template
├── docs/
│   ├── README.md                 # This file
│   └── PRODUCT_VISION.md         # Product vision document
└── package.json
```

---

## Getting Started (Quick Start)

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm
- A Supabase account (free tier is sufficient)
- A Paystack account (test mode for development)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/[your-username]/onesearch.git
cd onesearch
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In your Supabase project, go to **SQL Editor** and run the following to set up the required tables:

```sql
-- Users table extension (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  is_pro BOOLEAN DEFAULT FALSE,
  pro_unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Payments log table
CREATE TABLE public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  paystack_reference TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL, -- in kobo
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON public.payments
  FOR SELECT
  USING (auth.uid() = user_id);
```

3. Copy your Supabase **Project URL** and **Anon Key** from **Settings → API**
4. Copy your **Service Role Key** (keep this secret — only used server-side)

### 4. Set Up Paystack

1. Go to [paystack.com](https://paystack.com) and create an account
2. Go to **Settings → API Keys & Webhooks**
3. Copy your **Test Public Key** and **Test Secret Key**
4. Set up a webhook URL: `https://your-domain.com/api/paystack/webhook`
   - For local development, use [ngrok](https://ngrok.com) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps)

### 5. Configure Environment Variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local` (see [Environment Variables](#environment-variables) section below).

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Environment Variables

Create a `.env.local` file in the root of the project with the following variables:

```env
# ─── Supabase ────────────────────────────────────────────────────────────────
# Your Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Your Supabase anon/public key (safe to expose in the browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Your Supabase service role key (NEVER expose this in the browser)
# Only used in server-side API routes for privileged operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# ─── Paystack ────────────────────────────────────────────────────────────────
# Paystack public key (safe to use in browser for inline checkout)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key

# Paystack secret key (NEVER expose in the browser — server-side only)
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key

# ─── Application ─────────────────────────────────────────────────────────────
# Base URL of the app (used for redirects after auth, webhook URL construction)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Pro access price in kobo (200000 kobo = ₦2,000)
NEXT_PUBLIC_PRO_PRICE_KOBO=200000
```

### Variable Reference

| Variable | Required | Public? | Purpose |
|----------|----------|---------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Yes | Supabase project endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Yes | Supabase public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | **No** | Server-side privileged Supabase operations |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Yes | Yes | Paystack inline checkout initialization |
| `PAYSTACK_SECRET_KEY` | Yes | **No** | Paystack server-side verification |
| `NEXT_PUBLIC_APP_URL` | Yes | Yes | Base URL for redirects |
| `NEXT_PUBLIC_PRO_PRICE_KOBO` | Yes | Yes | Price in kobo shown to user |

> **Security Note:** Variables prefixed with `NEXT_PUBLIC_` are embedded in the client-side JavaScript bundle and visible to anyone who inspects the source. Never put secret keys in `NEXT_PUBLIC_` variables. The Paystack secret key and Supabase service role key must remain server-only.

---

## Running the App

### Development

```bash
npm run dev        # Start development server on http://localhost:3000
```

### Build

```bash
npm run build      # Build for production
npm run start      # Start production server
```

### Type Checking

```bash
npm run type-check   # Run TypeScript compiler check
```

### Linting

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
```

---

## Sector Cards — What They Contain

Each sector in the system is defined as a TypeScript object following the `Sector` type defined in `data/types.ts`. Here is the structure:

```typescript
// data/types.ts

export type SectorStatus =
  | 'thriving'
  | 'growing'
  | 'emerging'
  | 'challenged'
  | 'saturated'
  | 'declining';

export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high';

export interface SectorSummary {
  id: string;
  name: string;
  category: string;
  slug: string;
  status: SectorStatus;
  riskLevel: RiskLevel;
  tagline: string;        // One-line descriptor
  summary: string;        // 2-3 sentence free overview
  topRisks: string[];     // Top 3 risk factors (visible free)
  topOpportunities: string[];  // Top 3 opportunities (visible free)
  coverImageUrl?: string;
}

export interface SectorDeepDive extends SectorSummary {
  // All content below is pro-gated
  history: string;             // Sector history in Nigeria
  currentState: string;        // Where the sector is right now
  majorPlayers: Player[];      // Key companies/players
  failurePatterns: string[];   // Why businesses fail here
  successFactors: string[];    // What makes businesses succeed here
  regulatoryLandscape: string; // Regulatory environment
  capitalEnvironment: string;  // Funding and capital context
  marketGaps: MarketGap[];     // Specific identified gaps
  founderRecommendations: string; // Actionable advice for founders
  furtherReading: Resource[];  // Links to reports, articles
  lastUpdated: string;         // ISO date string
  researchNotes: string;       // Methodology notes for this sector
}

export interface Player {
  name: string;
  description: string;
  url?: string;
}

export interface MarketGap {
  title: string;
  description: string;
  evidence: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'report' | 'article' | 'interview' | 'data';
}
```

---

## Pro Features & the ₦2,000 Gate

### How the Gate Works

1. A user browsing the explore page sees sector cards with free-tier content visible
2. When they click "Go Deeper" on any sector card, the system checks:
   - Is the user logged in? (Supabase session)
   - If not → show auth modal
   - If yes → check `profiles.is_pro` in Supabase
   - If `is_pro = false` → show Paystack checkout
   - If `is_pro = true` → unlock full content immediately
3. After successful Paystack payment:
   - Paystack fires a webhook to `/api/paystack/webhook`
   - The webhook handler verifies the payment server-side
   - Updates `profiles.is_pro = true` and `profiles.pro_unlocked_at` in Supabase
   - The client detects the updated session state and refreshes the content

### The Payment API Routes

**`/api/paystack/initialize` (POST)**

Called client-side to get a Paystack authorization URL or access code for inline checkout. Accepts `{ email, amount }` and returns a Paystack initialization response.

**`/api/paystack/webhook` (POST)**

Receives `charge.success` events from Paystack. Verifies the event signature using the Paystack secret key, confirms payment amount matches the pro price, then updates the user's profile in Supabase via the service role key.

### Why One-Time Access (Not Subscription)?

The ₦2,000 is a one-time, lifetime access fee. This decision was made deliberately:
- Subscriptions add friction (churn, billing failures, users forgetting to cancel)
- The research content is meant to be a reference resource, not a daily-use product
- The low one-time price lowers the decision barrier significantly
- Lifetime access means every paying user is a satisfied, permanent user — no renewal anxiety

---

## Authentication (Supabase)

### Auth Flow

OneSearch uses Supabase Auth with email/password and magic link options. The auth flow is designed to be as non-intrusive as possible:

1. Auth is never required to browse the exploration page
2. The auth modal (a shadcn/ui `Dialog` component) appears only when a user attempts to access pro content
3. After successful authentication, the Paystack checkout is triggered automatically if the user is not yet pro
4. The Supabase session is managed via the `@supabase/ssr` package, which handles cookie-based session persistence across server and client components

### Middleware

The Next.js middleware at `middleware.ts` refreshes the Supabase auth session on each request, ensuring that server components always have access to a fresh session. The middleware only runs on routes that need it (not on static assets).

```typescript
// middleware.ts (simplified)
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Refresh session if expired
  // Pass updated cookies to response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

---

## Payments (Paystack)

### Initialization Flow

```typescript
// lib/paystack/initialize.ts
export async function initializePaystackTransaction({
  email,
  amount,
  userId,
}: {
  email: string;
  amount: number; // in kobo
  userId: string;
}) {
  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      amount,
      metadata: { userId },
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/explore?payment=success`,
    }),
  });

  return response.json();
}
```

### Webhook Verification

Always verify Paystack webhooks using the `x-paystack-signature` header:

```typescript
// api/paystack/webhook/route.ts (simplified)
import crypto from 'crypto';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('x-paystack-signature');

  const expectedSignature = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return new Response('Unauthorized', { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === 'charge.success') {
    const { metadata, amount } = event.data;
    const expectedAmount = parseInt(process.env.NEXT_PUBLIC_PRO_PRICE_KOBO!);

    if (amount >= expectedAmount && metadata?.userId) {
      // Update user profile to pro
      await supabaseAdmin
        .from('profiles')
        .update({ is_pro: true, pro_unlocked_at: new Date().toISOString() })
        .eq('id', metadata.userId);
    }
  }

  return new Response('OK', { status: 200 });
}
```

---

## Content & Research Methodology

### Who Does the Research?

All sector research on OneSearch is conducted by the platform's founder. This is not crowd-sourced content, AI-generated analysis, or aggregated without editorial judgment. The founder:

1. Reads publicly available market reports (e.g., Africa: The Big Deal, Briter Bridges, Disrupt Africa reports)
2. Cross-references news archives from TechCabal, Techpoint Africa, Nairametrics, BusinessDay, and similar Nigerian/African tech and business publications
3. Analyzes patterns from founder interviews, podcast episodes, and conference talks
4. Conducts personal research conversations with operators in each sector
5. Synthesizes findings using a consistent analytical framework

### The Research Framework

Every sector is analyzed against the same set of questions:

1. What is the history of this sector in Nigeria? When did it start being "a thing"?
2. What is the current state — who are the major players, what is the market size, what is the growth trajectory?
3. Why have businesses in this sector failed? What are the recurring patterns?
4. Why have some businesses succeeded? What did they do differently?
5. What does the regulatory environment look like, and how does it affect entry?
6. What kind of capital is available — is venture funding accessible, are there grants, is it bootstrappable?
7. Where are the real gaps — what is the market not being served well, and why?
8. What should a founder actually do if they want to enter this sector?

### The Substack Connection

The founder documents their research process, sector analyses in long-form, and thinking behind editorial decisions on their Substack. This creates a publicly verifiable paper trail for the research. Users who want to understand *how* a particular sector analysis was arrived at can trace the reasoning back to the Substack posts.

This is intentional. It makes the research credible, falsifiable, and improvable by community feedback.

### Keeping Content Current

Market dynamics change. A sector that was "challenged" in 2023 may be "growing" in 2025. Each sector page displays a `lastUpdated` timestamp, and the research is reviewed at regular intervals. When significant changes occur in a sector, the content is updated and the Substack publishes a note explaining what changed and why.

---

## Business Model

OneSearch runs on a simple, founder-friendly business model:

| Tier | Price | Access |
|------|-------|--------|
| Free | ₦0 | Full exploration page — all sector summaries, top risks, top opportunities |
| Pro | ₦2,000 (one-time, lifetime) | All free features + full sector deep-dives for every sector |

### Why This Model Works

**For users:** The free tier delivers genuine value. A founder can walk away having made better-informed sector decisions without spending a single naira. The pro tier is for founders who have found a sector of interest and want to go all the way in their research.

**For the platform:** ₦2,000 × N users = sustainable enough to fund the research time at current scale, with clear room to grow as the user base scales. The one-time model means no subscription management overhead.

**For trust:** Not paywalling everything builds trust. A platform that gives you good free content and charges modestly for deeper access is more trustworthy than one that shows you nothing until you pay.

---

## Styling & Design System

OneSearch uses Tailwind CSS for all styling, with a design philosophy centered on:

- **Clarity over decoration** — clean typography, generous whitespace, minimal visual noise
- **Accessibility** — color contrast meets WCAG AA standards, all interactive elements are keyboard accessible
- **Mobile-first** — fully responsive from 320px up
- **Brand palette** — Deep green/forest tones to evoke the African landscape, with warm accent colors; exact palette defined in `tailwind.config.ts`

### Color Tokens (approximate)

```typescript
// tailwind.config.ts (colors section)
colors: {
  brand: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  // Neutral scale, error states, etc. via shadcn defaults
}
```

---

## Contributing

OneSearch welcomes contributions in the following areas:

### What We Accept

- **Bug fixes** — If something is broken, a PR with a fix is welcome
- **UI improvements** — Visual improvements that maintain the design philosophy
- **Accessibility fixes** — Any improvement that makes the platform more accessible
- **Performance improvements** — Optimizations that don't change the user experience
- **Developer experience** — Better types, documentation, tooling

### What We Don't Accept (for v1)

- **Content PRs** — Sector research is handled exclusively by the founder. We do not accept PRs that modify sector content. If you have a correction or addition, open an issue with your evidence and it will be reviewed.
- **Feature additions** — v1 is intentionally simple. New features are evaluated against the product vision before being considered.
- **Dependency additions** — Every new dependency must be justified.

### Contribution Process

1. Fork the repository
2. Create a branch: `git checkout -b fix/describe-your-fix`
3. Make your changes
4. Run type-check and lint: `npm run type-check && npm run lint`
5. Commit with a clear message
6. Open a PR against the `main` branch with a clear description

### Code Style

- TypeScript strict mode — no `any` without justification
- Prefer functional components and hooks
- Co-locate component-specific utilities with the component
- Use descriptive variable names — readability over brevity
- Comment complex logic, not obvious code

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your repository to GitHub
2. Import the repository on [vercel.com](https://vercel.com)
3. Add all environment variables from your `.env.local` to the Vercel project settings
4. Deploy

Vercel automatically handles:
- Building the Next.js app
- Serving static assets via CDN
- Running serverless functions for API routes
- Automatic preview deployments on pull requests

### Post-Deployment Checklist

- [ ] Verify Supabase auth redirect URLs include your production domain
- [ ] Update Paystack webhook URL to production domain
- [ ] Switch Paystack keys from test to live when ready to accept real payments
- [ ] Verify `NEXT_PUBLIC_APP_URL` is set to production URL
- [ ] Test the full payment flow end-to-end on production

---

## FAQ for Developers

**Q: Why is sector content stored as TypeScript files rather than in a CMS or database?**

A: For v1, TypeScript content files give us type safety, version control for content (every content change is a git commit), and zero infrastructure cost for content storage. As the platform grows and content becomes more dynamic, migrating to a database or CMS is straightforward.

**Q: Why no AI/LLM features?**

A: By design. The value proposition of OneSearch is that it is human-researched and honest. Introducing AI-generated content would undermine the trust the platform is built on. If someone reads a market analysis here, they should be able to trace every claim back to a real source.

**Q: How is the Paystack webhook tested locally?**

A: Use ngrok or Cloudflare Tunnel to expose your local dev server to the internet, then point the Paystack webhook URL to your tunnel URL. Paystack's test mode will fire webhook events to any publicly accessible URL.

**Q: Why not use Stripe instead of Paystack?**

A: Paystack is better suited for Nigerian users. It supports local bank transfers, USSD payments, and mobile money — payment methods that a significant portion of Nigerian users actually use. Stripe's Nigeria support is limited.

**Q: Can the pro price be changed without redeployment?**

A: The price is stored in an environment variable (`NEXT_PUBLIC_PRO_PRICE_KOBO`), so changing it requires a redeployment. For more dynamic pricing in the future, the price could be stored in Supabase and fetched at runtime.

---

## Roadmap

The roadmap below reflects planned future development, not a commitment to specific timelines.

### v1 (Current) — Core Platform
- [x] Landing page
- [x] Exploration page with sector cards
- [x] Free-tier sector content
- [x] Supabase authentication (email/magic link)
- [x] Paystack payment integration
- [x] Pro-tier sector deep-dives

### v1.1 — Content Expansion
- [ ] Additional sectors (target: 20+ sectors covered)
- [ ] "Recently Updated" indicator on sector cards
- [ ] Sector comparison view (side-by-side two sectors)

### v1.2 — User Experience
- [ ] Email notifications when a sector you viewed gets updated
- [ ] Bookmarking sectors (Supabase)
- [ ] Search across sector content

### v2 — Platform Expansion (Future Thinking)
- [ ] Expand to other African markets (Kenya, Ghana, South Africa)
- [ ] Founder Q&A or community notes layer
- [ ] API access tier for researchers and institutions
- [ ] Sector newsletters (curated updates)

---

## License

MIT License — see `LICENSE` file for details.

---

## Links & References

- **The Platform:** [onesearch.africa](https://onesearch.africa) _(working title)_
- **Founder's Substack:** _(link to be added — this is where research methodology and sector analyses are published in long form)_
- **Supabase Docs:** [supabase.com/docs](https://supabase.com/docs)
- **Paystack API Docs:** [paystack.com/docs/api](https://paystack.com/docs/api)
- **Next.js App Router Docs:** [nextjs.org/docs/app](https://nextjs.org/docs/app)
- **Tailwind CSS Docs:** [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Africa: The Big Deal:** [africathebigdeal.com](https://africathebigdeal.com) _(startup funding data referenced in research)_
- **TechCabal:** [techcabal.com](https://techcabal.com) _(primary news source for Nigerian tech sector)_
- **Techpoint Africa:** [techpoint.africa](https://techpoint.africa) _(research reference)_

---

_OneSearch is a product of deliberate simplicity. It exists because someone decided that Nigerian founders deserve better information, and that the best way to provide it was to do the research themselves and build a clean, honest place to share it. If you're building on top of it or contributing to it, keep that spirit in mind._

---

_Last updated: 2026. Maintained by the OneSearch team._
