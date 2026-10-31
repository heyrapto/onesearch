# OneSearch — System Architecture

> **Version:** 1.0.0  
> **Last Updated:** 2026-10-29  
> **Status:** Active  
> **Platform:** Nigerian / African Market Intelligence

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [High-Level Architecture Diagram](#2-high-level-architecture-diagram)
3. [Next.js 14 App Router Page Structure](#3-nextjs-14-app-router-page-structure)
4. [Supabase Schema Design](#4-supabase-schema-design)
5. [Row Level Security (RLS) Policies](#5-row-level-security-rls-policies)
6. [Authentication Flow](#6-authentication-flow)
7. [Payment Flow](#7-payment-flow)
8. [Content Architecture](#8-content-architecture)
9. [Static vs Dynamic Content Strategy](#9-static-vs-dynamic-content-strategy)
10. [Data Fetching Patterns](#10-data-fetching-patterns)
11. [Caching Strategy](#11-caching-strategy)
12. [The Pro Gate Implementation](#12-the-pro-gate-implementation)
13. [File & Folder Structure](#13-file--folder-structure)
14. [Environment Variables & Secrets Management](#14-environment-variables--secrets-management)
15. [API Routes Reference](#15-api-routes-reference)
16. [Error Handling Strategy](#16-error-handling-strategy)
17. [Security Considerations](#17-security-considerations)

---

## 1. System Overview

OneSearch is a **Next.js 14 App Router** application that aggregates African and Nigerian market intelligence data into a structured, searchable, and monetizable knowledge base. It targets entrepreneurs, investors, and market researchers who need reliable sector-level intelligence across the Nigerian economy.

### Core Design Principles

- **Simplicity First** — Two primary user-facing routes (`/` and `/explore`) keep cognitive load low.
- **Content-First Monetization** — The free tier shows enough to demonstrate value; the pro gate converts naturally.
- **Server-Rendered by Default** — Next.js server components handle all heavy data fetching to protect API keys, reduce client bundle size, and improve initial load performance.
- **Auth Without Disruption** — Supabase Auth triggers via modal overlay; users never leave the page they were browsing.
- **Nigerian-Optimised** — Paystack handles Naira payments natively; Supabase's regional infrastructure minimises database round-trip latency.

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  CLIENT BROWSER                                 │
│                                                                                 │
│   ┌──────────────┐     ┌──────────────────────┐     ┌────────────────────────┐ │
│   │  Landing (/) │     │  /explore            │     │  /explore/[sector]     │ │
│   │  Hero + CTA  │     │  Sector grid (SSG)   │     │  Detail + Pro Gate     │ │
│   │  Static SSG  │     │  Public content      │     │  ISR + server comp.    │ │
│   └──────┬───────┘     └──────────┬───────────┘     └───────────┬────────────┘ │
│          │                        │                              │              │
│          │  React Server Components (RSC)                        │              │
│          │  + Selective Client Islands                           │              │
└──────────┼────────────────────────┼──────────────────────────────┼─────────────┘
           │                        │                              │
           ▼                        ▼                              ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE NETWORK / CDN                               │
│                                                                                  │
│   ┌──────────────────────┐          ┌──────────────────────────────────────────┐ │
│   │   Static Assets      │          │    Next.js Runtime (Node.js)             │ │
│   │   (images, fonts,    │          │                                          │ │
│   │    JS chunks, CSS)   │          │   App Router — React Server Components   │ │
│   └──────────────────────┘          │   Suspense Boundaries                    │ │
│                                     │   Server Actions                         │ │
│                                     └──────────────────┬───────────────────────┘ │
│                                                         │                        │
│   ┌──────────────────────────────────────────────────── │ ─────────────────────┐ │
│   │                API ROUTES (Route Handlers)           │                      │ │
│   │                                                      │                      │ │
│   │   POST /api/paystack/webhook  ─────────────────────► │                      │ │
│   │   GET  /api/auth/callback     ─────────────────────► │                      │ │
│   │   GET  /api/health            ─────────────────────► │                      │ │
│   └──────────────────────────────────────────────────────┼──────────────────────┘ │
└─────────────────────────────────────────────────────────┼──────────────────────────┘
                                                          │
                    ┌─────────────────┬───────────────────┴─────────┐
                    │                 │                              │
                    ▼                 ▼                              ▼
        ┌────────────────┐  ┌─────────────────────┐    ┌────────────────────────┐
        │   SUPABASE     │  │      PAYSTACK        │    │    EXTERNAL SOURCES    │
        │                │  │                      │    │                        │
        │  PostgreSQL DB │  │  Inline JS (client)  │    │  NBS Data API          │
        │  Auth (JWT)    │  │  Webhooks (server)   │    │  CBN Reports           │
        │  Storage       │  │  Customer API        │    │  SEC Filings           │
        │  RLS Policies  │  │  ₦ Payment Rails     │    │  Manual Research       │
        └────────────────┘  └─────────────────────┘    └────────────────────────┘
```

---

## 3. Next.js 14 App Router Page Structure

### 3.1 Route Map

```
app/
├── (marketing)/                         ← Route group — shared marketing layout
│   ├── layout.tsx                       ← Marketing layout (nav + footer)
│   └── page.tsx                         ← Route: /  (Landing page)
│
├── explore/
│   ├── layout.tsx                       ← Explore layout (search bar + category filter)
│   ├── page.tsx                         ← Route: /explore  (sector grid)
│   └── [sector]/
│       ├── page.tsx                     ← Route: /explore/[sector] (sector detail)
│       └── loading.tsx                  ← Suspense fallback (skeleton)
│
├── api/
│   ├── paystack/
│   │   └── webhook/
│   │       └── route.ts                 ← POST /api/paystack/webhook
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts                 ← GET /api/auth/callback (OAuth PKCE)
│   └── health/
│       └── route.ts                     ← GET /api/health (uptime check)
│
├── layout.tsx                           ← Root layout (providers, fonts, theme)
├── error.tsx                            ← Global error boundary
├── not-found.tsx                        ← 404 page
└── globals.css                          ← Global styles + Tailwind base
```

### 3.2 Landing Page — `/`

**Route:** `app/(marketing)/page.tsx`  
**Rendering:** Static Site Generation (SSG) — fully pre-rendered at build time.

**Sections:**

| Order | Component | Description |
|-------|-----------|-------------|
| 1 | `<Hero />` | Headline, sub-headline, CTA button linking to `/explore` |
| 2 | `<HowItWorks />` | 3-step explainer (search → read → decide) |
| 3 | `<FeaturedSectors />` | 3–6 hand-picked sectors with teaser data (fetched at build) |
| 4 | `<ProPitch />` | What pro unlocks: full analysis, key players, failure reasons |
| 5 | `<Footer />` | Links, social, legal |

**Data needs:** A single Supabase query for 6 featured sectors fetched at build time via `generateStaticParams` equivalent. No runtime data fetching needed for the landing page.

**Client islands:**
- `<AuthModal />` — triggers on "Get Pro" CTA click (pure client, lazy-loaded)
- Theme toggle (if dark mode support implemented)

---

### 3.3 Explore Page — `/explore`

**Route:** `app/explore/page.tsx`  
**Rendering:** Incremental Static Regeneration (ISR) — revalidated every 3600 seconds (1 hour).

**Purpose:** Shows all sectors in a filterable grid. All sectors are visible to public users (free). The pro gate applies only at the sector **detail** level.

**Functionality:**
- Category filter tabs (Agriculture, Tech, Manufacturing, Services, etc.)
- Status badges (Succeeding 🟢 / Struggling 🟡 / Failed 🔴)
- Risk level indicators
- Opportunity score progress bar
- Search bar (client-side filter over pre-loaded sector list)
- Each card links to `/explore/[sector]`

**Data flow:**
```
Server Component (page.tsx)
  └─ await supabase.from('sectors').select('id, name, slug, category, status, risk_level, opportunity_score')
       └─ Pass array to <SectorGrid sectors={sectors} />  [Server Component]
            └─ <SectorCard />  [Server Component — static card markup]
            └─ <CategoryFilter />  [Client Component — useState for active filter]
            └─ <SearchBar />  [Client Component — useSearchParams]
```

---

### 3.4 Sector Detail Page — `/explore/[sector]`

**Route:** `app/explore/[sector]/page.tsx`  
**Rendering:** ISR with `revalidate = 86400` (24 hours). Static paths generated for all known slugs.

**Purpose:** Deep dive into a single sector. Public content always visible; pro content gated behind auth + payment.

**Page anatomy:**

```
┌──────────────────────────────────────────────────────────────────┐
│  SECTOR HEADER                                                   │
│  Name • Category • Status badge • Risk • Opportunity score       │
├──────────────────────────────────────────────────────────────────┤
│  FREE CONTENT (always visible)                                   │
│  • Summary paragraph (300 words max)                             │
│  • High-level market size estimate                               │
│  • 2–3 publicly known data points                                │
├──────────────────────────────────────────────────────────────────┤
│  PRO GATE BOUNDARY ────────────────────────────── (blurred)      │
│  🔒 Unlock Full Intelligence — ₦2,000 one-time                   │
│                                                                  │
│  [BLURRED PREVIEW — not rendered in DOM for non-pro users]       │
│  • Full Analysis (2,000+ words)                                  │
│  • Key Players & Market Share                                    │
│  • Failure Reasons (historical cases)                            │
│  • Market Gaps & Opportunities                                   │
│  • Data Sources & Methodology                                    │
├──────────────────────────────────────────────────────────────────┤
│  RELATED SECTORS                                                 │
└──────────────────────────────────────────────────────────────────┘
```

**Security note:** Pro content is **never sent to the client** for non-pro users. The server component checks `is_pro` on the user session before including `sector_analysis` data in the render tree. The blur overlay is purely cosmetic for the teaser effect on partially-revealed public content, not a security control.

**`generateStaticParams` implementation:**
```typescript
// app/explore/[sector]/page.tsx
export async function generateStaticParams() {
  const supabase = createServerClient()
  const { data: sectors } = await supabase
    .from('sectors')
    .select('slug')
  return sectors?.map(s => ({ sector: s.slug })) ?? []
}
```

---

### 3.5 API Routes

#### `POST /api/paystack/webhook`
Receives Paystack webhook events. Validates HMAC-SHA512 signature before processing.

**Events handled:**
- `charge.success` → marks user as pro, creates payment record
- `subscription.create` (future) → handles subscription upgrades

**Flow:**
```
Paystack Server
  └─ POST /api/paystack/webhook
       └─ Verify x-paystack-signature header (HMAC-SHA512)
       └─ Parse event body
       └─ if event === 'charge.success':
            └─ Extract customer email from event.data.customer
            └─ supabase.from('profiles').update({ is_pro: true }).eq('email', email)
            └─ supabase.from('payments').insert({ ... })
       └─ Return 200 OK (always, to prevent Paystack retries on non-critical errors)
```

#### `GET /api/auth/callback`
Handles Supabase PKCE OAuth callback (Google, GitHub, etc. if enabled). Exchanges the `code` param for a session and redirects back to the originating page.

```typescript
// app/api/auth/callback/route.ts
export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/'
  if (code) {
    const supabase = createRouteHandlerClient({ cookies })
    await supabase.auth.exchangeCodeForSession(code)
  }
  return NextResponse.redirect(new URL(next, request.url))
}
```

---

## 4. Supabase Schema Design

### 4.1 Entity-Relationship Overview

```
profiles ──────────────────────── payments
   │ (1:N via user_id)               │
   │                                 │
   └──── (auth.users — Supabase)     │
                                     │
sectors ───────────── sector_analysis
   │ (1:1 via sector_id)             │
   │                                 │
   └──────── research_sources ───────┘
             (N:M via sector_id)
```

---

### 4.2 `profiles` Table

Extends Supabase's built-in `auth.users` with application-specific metadata.

```sql
CREATE TABLE public.profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email                 TEXT NOT NULL,
  is_pro                BOOLEAN NOT NULL DEFAULT FALSE,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  paystack_customer_code TEXT,                        -- e.g. CUS_xxxxxxxxxxxx
  full_name             TEXT,
  avatar_url            TEXT
);

-- Auto-populate on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

**Columns:**

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Foreign key to `auth.users.id` (Supabase managed) |
| `email` | TEXT | Denormalised email for fast webhook lookups |
| `is_pro` | BOOLEAN | Set to `true` on successful Paystack payment |
| `created_at` | TIMESTAMPTZ | Profile creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last modification (auto-managed by trigger) |
| `paystack_customer_code` | TEXT | Paystack's CUS_ identifier for future subscription management |
| `full_name` | TEXT | Optional display name |
| `avatar_url` | TEXT | Optional avatar from OAuth provider |

---

### 4.3 `sectors` Table

Core taxonomy of Nigerian/African market sectors.

```sql
CREATE TYPE sector_status AS ENUM ('succeeding', 'struggling', 'failed');
CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'very_high');

CREATE TABLE public.sectors (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name              TEXT NOT NULL,
  slug              TEXT NOT NULL UNIQUE,              -- URL-safe identifier e.g. "fintech-payments"
  category          TEXT NOT NULL,                     -- "Technology", "Agriculture", "Manufacturing"
  status            sector_status NOT NULL,
  summary           TEXT NOT NULL,                     -- Free-tier summary (300 words max)
  risk_level        risk_level NOT NULL DEFAULT 'medium',
  opportunity_score SMALLINT NOT NULL                  -- 0–100 composite score
                    CHECK (opportunity_score >= 0 AND opportunity_score <= 100),
  market_size_ngn   BIGINT,                            -- Estimated market size in Naira
  is_featured       BOOLEAN NOT NULL DEFAULT FALSE,    -- Appears on landing page
  is_published      BOOLEAN NOT NULL DEFAULT TRUE,     -- Drafts hidden from public
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sectors_slug       ON public.sectors(slug);
CREATE INDEX idx_sectors_category   ON public.sectors(category);
CREATE INDEX idx_sectors_status     ON public.sectors(status);
CREATE INDEX idx_sectors_featured   ON public.sectors(is_featured) WHERE is_featured = TRUE;
CREATE INDEX idx_sectors_published  ON public.sectors(is_published) WHERE is_published = TRUE;

CREATE TRIGGER sectors_updated_at
  BEFORE UPDATE ON public.sectors
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

**Sector Status Semantics:**

| Status | Meaning |
|--------|---------|
| `succeeding` | Sector shows strong growth signals, good margins, clear demand |
| `struggling` | Market exists but faces headwinds (regulation, infrastructure, capital) |
| `failed` | Historical case study — why entrants failed, lessons learned |

---

### 4.4 `sector_analysis` Table

Pro-gated deep analysis content. One row per sector.

```sql
CREATE TABLE public.sector_analysis (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sector_id         UUID NOT NULL UNIQUE REFERENCES public.sectors(id) ON DELETE CASCADE,
  full_analysis     TEXT NOT NULL,            -- 2,000+ word markdown analysis
  key_players       JSONB NOT NULL DEFAULT '[]',
  -- Schema for key_players: [{ name, description, market_share_pct, founded_year, hq_city }]
  failure_reasons   JSONB NOT NULL DEFAULT '[]',
  -- Schema for failure_reasons: [{ reason, case_study, year, source }]
  market_gaps       JSONB NOT NULL DEFAULT '[]',
  -- Schema for market_gaps: [{ gap, estimated_opportunity_ngn, difficulty, notes }]
  data_sources      JSONB NOT NULL DEFAULT '[]',
  -- Schema for data_sources: [{ name, url, accessed_at, credibility_score }]
  last_reviewed_at  TIMESTAMPTZ,              -- When analyst last updated this
  reviewer_notes    TEXT,                     -- Internal notes, not exposed to users
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sector_analysis_sector_id ON public.sector_analysis(sector_id);

CREATE TRIGGER sector_analysis_updated_at
  BEFORE UPDATE ON public.sector_analysis
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

**JSONB field schemas (TypeScript equivalents):**

```typescript
// key_players
interface KeyPlayer {
  name: string
  description: string
  market_share_pct?: number    // 0–100
  founded_year?: number
  hq_city?: string
  website?: string
}

// failure_reasons
interface FailureReason {
  reason: string
  case_study?: string          // Name of failed company/venture
  year?: number
  source?: string
}

// market_gaps
interface MarketGap {
  gap: string
  estimated_opportunity_ngn?: number
  difficulty: 'low' | 'medium' | 'high'
  notes?: string
}

// data_sources
interface DataSource {
  name: string
  url?: string
  accessed_at?: string         // ISO date
  credibility_score?: number   // 1–5
}
```

---

### 4.5 `payments` Table

Audit log of all payment attempts and their outcomes.

```sql
CREATE TYPE payment_status AS ENUM ('pending', 'success', 'failed', 'refunded');

CREATE TABLE public.payments (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID NOT NULL REFERENCES public.profiles(id) ON DELETE SET NULL,
  paystack_reference    TEXT NOT NULL UNIQUE,           -- Paystack reference string
  paystack_transaction_id BIGINT,                       -- Paystack numeric transaction ID
  amount_kobo           INTEGER NOT NULL,               -- Amount in kobo (₦2,000 = 200000)
  currency              TEXT NOT NULL DEFAULT 'NGN',
  status                payment_status NOT NULL DEFAULT 'pending',
  webhook_event         JSONB,                          -- Full webhook payload (audit)
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_user_id    ON public.payments(user_id);
CREATE INDEX idx_payments_reference  ON public.payments(paystack_reference);
CREATE INDEX idx_payments_status     ON public.payments(status);

CREATE TRIGGER payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
```

---

### 4.6 `research_sources` Table

Central registry of data sources cited across sector analyses.

```sql
CREATE TABLE public.research_sources (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  organisation    TEXT,                   -- e.g. "National Bureau of Statistics"
  url             TEXT,
  source_type     TEXT,                   -- "government", "ngo", "academic", "media"
  country         TEXT NOT NULL DEFAULT 'NG',
  last_updated    DATE,                   -- When source last published relevant data
  credibility     SMALLINT NOT NULL DEFAULT 3 CHECK (credibility BETWEEN 1 AND 5),
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Junction table: which sources back which sector analyses
CREATE TABLE public.sector_source_links (
  sector_id   UUID NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
  source_id   UUID NOT NULL REFERENCES public.research_sources(id) ON DELETE CASCADE,
  PRIMARY KEY (sector_id, source_id)
);
```

---

## 5. Row Level Security (RLS) Policies

RLS ensures data access is enforced at the database layer, preventing any application-level bypass.

### 5.1 Enable RLS on All Tables

```sql
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_analysis   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_sources  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_source_links ENABLE ROW LEVEL SECURITY;
```

### 5.2 `profiles` RLS

```sql
-- Users can only read/update their own profile
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Only the webhook service role can set is_pro = true
-- (No direct INSERT/UPDATE from client-side app code)
CREATE POLICY "profiles_service_role_all"
  ON public.profiles FOR ALL
  USING (auth.role() = 'service_role');
```

### 5.3 `sectors` RLS

```sql
-- All published sectors are publicly readable (including anon users)
CREATE POLICY "sectors_public_read"
  ON public.sectors FOR SELECT
  USING (is_published = TRUE);

-- Only service role (admin scripts) can write
CREATE POLICY "sectors_service_role_write"
  ON public.sectors FOR ALL
  USING (auth.role() = 'service_role');
```

### 5.4 `sector_analysis` RLS

```sql
-- Only authenticated pro users can read sector analysis
CREATE POLICY "sector_analysis_pro_read"
  ON public.sector_analysis FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid()
      AND is_pro = TRUE
    )
  );

-- Service role bypass for admin writes
CREATE POLICY "sector_analysis_service_role_write"
  ON public.sector_analysis FOR ALL
  USING (auth.role() = 'service_role');
```

### 5.5 `payments` RLS

```sql
-- Users can view their own payment history
CREATE POLICY "payments_select_own"
  ON public.payments FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update payments (via webhook handler)
CREATE POLICY "payments_service_role_write"
  ON public.payments FOR ALL
  USING (auth.role() = 'service_role');
```

### 5.6 `research_sources` & Junction Table RLS

```sql
-- Public read for transparency
CREATE POLICY "research_sources_public_read"
  ON public.research_sources FOR SELECT
  USING (TRUE);

CREATE POLICY "sector_source_links_public_read"
  ON public.sector_source_links FOR SELECT
  USING (TRUE);

-- Service role writes only
CREATE POLICY "research_sources_service_role_write"
  ON public.research_sources FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "sector_source_links_service_role_write"
  ON public.sector_source_links FOR ALL
  USING (auth.role() = 'service_role');
```

---

## 6. Authentication Flow

OneSearch uses Supabase Auth with a **modal-based UI** — users sign in without navigating away from their current page.

### 6.1 Auth Methods Supported

| Method | Implementation | Notes |
|--------|---------------|-------|
| Email + Password | Supabase built-in | Default method |
| Magic Link (Email OTP) | Supabase built-in | Recommended for lower friction |
| Google OAuth | Supabase OAuth provider | Optional, configurable |

### 6.2 Auth State Flow

```
User clicks "Sign In" or "Get Pro"
         │
         ▼
<AuthModal /> mounts (client component, lazy loaded)
  - Renders Supabase Auth UI or custom form
  - Uses @supabase/auth-helpers-nextjs for session management
         │
         ▼
User submits credentials
         │
    ┌────┴────────────────────────────────┐
    │ Email/Password                      │ Magic Link / OAuth
    ▼                                     ▼
supabase.auth.signInWithPassword()    supabase.auth.signInWithOtp()
         │                            or signInWithOAuth()
         │                                     │
         │                            User clicks link/redirects back
         │                            GET /api/auth/callback
         │                                     │
         └──────────────────┬──────────────────┘
                            ▼
              Supabase sets HttpOnly session cookie
              (managed by @supabase/ssr middleware)
                            │
                            ▼
              AuthModal closes (onAuthStateChange fires)
              Page re-renders with authenticated state
              ← User stays on current page ✓
                            │
                            ▼
              If triggered by "Get Pro" CTA:
                → Paystack modal opens automatically
```

### 6.3 Session Management (Middleware)

```typescript
// middleware.ts  (root of Next.js project)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  // Refresh session if expired — keeps cookie fresh without client round-trip
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/paystack).*)',
  ],
}
```

### 6.4 Auth Context (Client Side)

```typescript
// context/auth-context.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/types'

interface AuthContextValue {
  user: User | null
  profile: Profile | null
  isLoading: boolean
  isPro: boolean
  openAuthModal: (intent?: 'signin' | 'signup') => void
  openPaymentModal: () => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modalState, setModalState] = useState<'closed' | 'auth' | 'payment'>('closed')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
          setProfile(data)
        } else {
          setProfile(null)
        }
        setIsLoading(false)
      }
    )
    return () => subscription.unsubscribe()
  }, [])

  const isPro = profile?.is_pro ?? false

  return (
    <AuthContext.Provider value={{
      user, profile, isLoading, isPro,
      openAuthModal: (intent) => setModalState('auth'),
      openPaymentModal: () => setModalState('payment'),
      signOut: () => supabase.auth.signOut(),
    }}>
      {children}
      {modalState === 'auth' && <AuthModal onClose={() => setModalState('closed')} />}
      {modalState === 'payment' && <PaymentModal onClose={() => setModalState('closed')} />}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
```

---

## 7. Payment Flow

OneSearch charges a **one-time ₦2,000 fee** for lifetime pro access, processed via Paystack Inline JS.

### 7.1 Payment Sequence Diagram

```
User (Browser)              Next.js Server          Paystack          Supabase
     │                           │                     │                  │
     │  Clicks "Unlock Pro"      │                     │                  │
     │──────────────────────────►│                     │                  │
     │                           │                     │                  │
     │  Already authenticated?   │                     │                  │
     │  Yes → Open Paystack      │                     │                  │
     │  No  → Open Auth Modal    │                     │                  │
     │        first              │                     │                  │
     │                           │                     │                  │
     │  PaystackPop.newTransaction({                   │                  │
     │    key: PUBLIC_KEY,        │                     │                  │
     │    email: user.email,      │                     │                  │
     │    amount: 200000,  ← kobo │                     │                  │
     │    currency: 'NGN',        │                     │                  │
     │    ref: generateRef(),     │                     │                  │
     │    metadata: { user_id }   │                     │                  │
     │  })                        │                     │                  │
     │─────────────────────────────────────────────────►│                  │
     │                           │                     │                  │
     │  Paystack Payment Modal   │                     │                  │
     │  (Paystack-hosted iframe)  │                     │                  │
     │◄─────────────────────────────────────────────────│                  │
     │                           │                     │                  │
     │  User completes payment   │                     │                  │
     │  (card / bank transfer /  │                     │                  │
     │   USSD / QR)              │                     │                  │
     │─────────────────────────────────────────────────►│                  │
     │                           │                     │                  │
     │  onSuccess callback fires │                     │                  │
     │  (reference returned)     │                     │                  │
     │◄─────────────────────────────────────────────────│                  │
     │                           │                     │                  │
     │  Client shows "Processing"│                     │                  │
     │  spinner — waits for      │                     │                  │
     │  profile refresh          │                     │                  │
     │                           │                     │                  │
     │                           │  POST /webhook      │                  │
     │                           │◄────────────────────│                  │
     │                           │                     │                  │
     │                           │  Verify HMAC sig    │                  │
     │                           │  Parse charge.success                  │
     │                           │──────────────────────────────────────►│
     │                           │  UPDATE profiles SET is_pro=true       │
     │                           │  INSERT payments (...)                 │
     │                           │◄──────────────────────────────────────│
     │                           │                     │                  │
     │                           │  Return 200         │                  │
     │                           │────────────────────►│                  │
     │                           │                     │                  │
     │  Profile refresh poll     │                     │                  │
     │  (or realtime sub)        │                     │                  │
     │  is_pro === true          │                     │                  │
     │  → Pro content unlocked   │                     │                  │
     │  → Spinner dismissed      │                     │                  │
```

### 7.2 Client-Side Payment Handler

```typescript
// hooks/use-paystack.ts
'use client'
import { useCallback } from 'react'
import { useAuth } from '@/context/auth-context'

export function usePaystack() {
  const { user, profile } = useAuth()

  const initializePayment = useCallback(() => {
    if (!user || !profile) return

    const PaystackPop = (window as any).PaystackPop
    if (!PaystackPop) {
      console.error('Paystack SDK not loaded')
      return
    }

    const reference = `onesearch_${Date.now()}_${Math.random().toString(36).slice(2)}`

    const handler = PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email: user.email!,
      amount: 200000,          // ₦2,000 in kobo
      currency: 'NGN',
      ref: reference,
      metadata: {
        user_id: user.id,
        custom_fields: [
          { display_name: 'Product', value: 'OneSearch Pro', variable_name: 'product' }
        ]
      },
      onClose: () => {
        console.log('Payment modal closed by user')
      },
      callback: (response: { reference: string }) => {
        // Payment captured by Paystack — webhook will handle DB update
        // Poll for profile update or use Supabase Realtime
        console.log('Payment successful, reference:', response.reference)
      }
    })

    handler.openIframe()
  }, [user, profile])

  return { initializePayment }
}
```

### 7.3 Webhook Handler

```typescript
// app/api/paystack/webhook/route.ts
import { createClient } from '@supabase/supabase-js'
import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Use service role client — bypasses RLS for webhook writes
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('x-paystack-signature')

  // 1. Verify webhook authenticity
  const hash = createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest('hex')

  if (hash !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }

  const event = JSON.parse(body)

  // 2. Handle charge.success
  if (event.event === 'charge.success') {
    const { customer, reference, id: transaction_id, amount } = event.data

    // Find user by email
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', customer.email)
      .single()

    if (profile) {
      // 3. Mark as pro + store Paystack customer code
      await supabase
        .from('profiles')
        .update({
          is_pro: true,
          paystack_customer_code: customer.customer_code
        })
        .eq('id', profile.id)

      // 4. Record the payment for auditing
      await supabase
        .from('payments')
        .upsert({
          user_id: profile.id,
          paystack_reference: reference,
          paystack_transaction_id: transaction_id,
          amount_kobo: amount,
          currency: 'NGN',
          status: 'success',
          webhook_event: event
        }, { onConflict: 'paystack_reference' })
    }
  }

  // Always return 200 to acknowledge receipt to Paystack
  return NextResponse.json({ received: true }, { status: 200 })
}
```

---

## 8. Content Architecture

### 8.1 How Sector Data is Stored

All market intelligence content lives in Supabase PostgreSQL. Content is authored via a simple admin script (or future admin UI) using the service role client. The `sectors` table stores public-tier data; `sector_analysis` stores the pro-gated deep analysis.

### 8.2 Content Tiers

| Tier | Table | Columns | RLS | Who Sees |
|------|-------|---------|-----|----------|
| Public | `sectors` | `summary`, `status`, `risk_level`, `opportunity_score` | Public read | Everyone |
| Pro | `sector_analysis` | `full_analysis`, `key_players`, `failure_reasons`, `market_gaps` | Auth + is_pro | Pro users only |

### 8.3 Content Loading Pattern (Sector Detail Page)

```typescript
// app/explore/[sector]/page.tsx
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export default async function SectorDetailPage({
  params,
}: {
  params: { sector: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  )

  // Fetch public sector data (accessible to all)
  const { data: sector } = await supabase
    .from('sectors')
    .select('*')
    .eq('slug', params.sector)
    .eq('is_published', true)
    .single()

  if (!sector) notFound()

  // Check current user's pro status
  const { data: { user } } = await supabase.auth.getUser()
  let analysis = null

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', user.id)
      .single()

    if (profile?.is_pro) {
      // RLS will enforce this — only pro users' queries return rows
      const { data } = await supabase
        .from('sector_analysis')
        .select('*')
        .eq('sector_id', sector.id)
        .single()
      analysis = data
    }
  }

  return (
    <div>
      <SectorHeader sector={sector} />
      <PublicSummary sector={sector} />
      {analysis ? (
        <ProAnalysis analysis={analysis} />
      ) : (
        <ProGate sectorName={sector.name} />
      )}
    </div>
  )
}
```

---

## 9. Static vs Dynamic Content Strategy

| Route | Strategy | Revalidation | Rationale |
|-------|----------|-------------|-----------|
| `/` | SSG | Never (until redeploy) | Purely static marketing content |
| `/explore` | ISR | 3600s (1 hour) | Sector list changes infrequently |
| `/explore/[sector]` — public half | ISR | 86400s (24 hours) | Sector summaries are stable |
| `/explore/[sector]` — pro content | Server render | Per-request | User session determines content |
| `/api/paystack/webhook` | Dynamic | N/A (event-driven) | Must process every request |
| `/api/auth/callback` | Dynamic | N/A | Auth state |

### Hybrid Rendering Pattern

The sector detail page uses a hybrid approach: the outer shell (header, public summary) benefits from ISR caching, while the pro content block is a **Suspense boundary** wrapping a dynamic server component that checks session state per-request.

```typescript
// Hybrid: cached public content + dynamic pro check
export default async function SectorDetailPage({ params }) {
  return (
    <>
      {/* Cached — part of ISR shell */}
      <Suspense fallback={<SectorHeaderSkeleton />}>
        <SectorPublicContent slug={params.sector} />
      </Suspense>

      {/* Dynamic per-request — checks auth session */}
      <Suspense fallback={<ProGateSkeleton />}>
        <ProContentOrGate slug={params.sector} />
      </Suspense>
    </>
  )
}
```

---

## 10. Data Fetching Patterns

### 10.1 Server Components (Default)

Used for all data that can be fetched server-side without user interaction:

```typescript
// Server component — no 'use client' directive
async function SectorGrid() {
  const supabase = createServerComponentClient({ cookies })
  const { data: sectors } = await supabase
    .from('sectors')
    .select('id, name, slug, category, status, risk_level, opportunity_score')
    .eq('is_published', true)
    .order('opportunity_score', { ascending: false })
  return <ul>{sectors?.map(s => <SectorCard key={s.id} sector={s} />)}</ul>
}
```

### 10.2 Client Components (Islands)

Used only for interactive UI that requires browser APIs or event handling:

```typescript
'use client'
// CategoryFilter, SearchBar, AuthModal, PaymentModal
// These are "islands" of interactivity in a server-rendered page
```

### 10.3 Suspense Boundaries

Every async server component that makes a network request is wrapped in `<Suspense>` to prevent cascading loading states:

```typescript
<Suspense fallback={<SectorGridSkeleton count={12} />}>
  <SectorGrid />
</Suspense>
```

---

## 11. Caching Strategy

### 11.1 Next.js Data Cache

```typescript
// Force cache for stable reference data
const sectors = await fetch('/api/internal/sectors', {
  next: { revalidate: 3600 }  // ISR — revalidate hourly
})

// No cache for user-specific data
const profile = await fetch('/api/internal/profile', {
  cache: 'no-store'
})
```

### 11.2 Supabase Query Caching

Supabase queries made inside Next.js server components automatically participate in the Next.js Data Cache when wrapped properly. For Supabase, we use the `next` option:

```typescript
// This is conceptual — @supabase/ssr doesn't expose next options natively,
// so we use fetch() wrapper or unstable_cache for Supabase queries
import { unstable_cache } from 'next/cache'

const getCachedSectors = unstable_cache(
  async () => {
    const supabase = createServerClient(...)
    const { data } = await supabase.from('sectors').select('*').eq('is_published', true)
    return data
  },
  ['all-sectors'],
  { revalidate: 3600, tags: ['sectors'] }
)
```

### 11.3 On-Demand Revalidation

When new sector content is added via admin scripts, we call `revalidateTag('sectors')` to purge the cache:

```typescript
// scripts/add-sector.ts
import { revalidateTag } from 'next/cache'
// ... after inserting sector to Supabase
await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?tag=sectors&secret=${REVALIDATION_SECRET}`)
```

---

## 12. The Pro Gate Implementation

### 12.1 Components

```typescript
// components/pro-gate.tsx
'use client'
import { useAuth } from '@/context/auth-context'

interface ProGateProps {
  sectorName: string
  children?: React.ReactNode
}

export function ProGate({ sectorName, children }: ProGateProps) {
  const { user, isPro, openAuthModal, openPaymentModal } = useAuth()

  return (
    <div className="relative mt-8">
      {/* Blurred teaser — first 200px of content */}
      <div className="pointer-events-none select-none blur-sm opacity-50 max-h-48 overflow-hidden">
        <ProContentTeaserSkeleton />
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center
                      bg-gradient-to-b from-transparent via-white/80 to-white">
        <div className="text-center max-w-sm">
          <LockIcon className="mx-auto mb-4 h-10 w-10 text-amber-500" />
          <h3 className="text-xl font-semibold mb-2">
            Full Intelligence on {sectorName}
          </h3>
          <p className="text-gray-600 mb-6 text-sm">
            Get the complete analysis: key players, failure case studies,
            market gaps, and sourced data — one-time access for ₦2,000.
          </p>

          {!user ? (
            <button
              onClick={() => openAuthModal('signup')}
              className="btn-primary"
            >
              Sign Up to Unlock — ₦2,000
            </button>
          ) : !isPro ? (
            <button
              onClick={openPaymentModal}
              className="btn-primary"
            >
              Unlock Pro Access — ₦2,000
            </button>
          ) : null}

          <p className="text-xs text-gray-400 mt-3">
            One-time payment. All sectors. Lifetime access.
          </p>
        </div>
      </div>
    </div>
  )
}
```

### 12.2 Server-Side Gate (Security Layer)

The component above is purely cosmetic. The actual security gate lives in the server component:

```typescript
// app/explore/[sector]/page.tsx — server-side enforcement
// Pro content is only fetched and rendered if user.is_pro === true
// Non-pro users receive a page with NO pro content in the HTML response
// The ProGate component renders in place of the content — not over it
```

---

## 13. File & Folder Structure

```
onesearch/
├── app/
│   ├── (marketing)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── explore/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── [sector]/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   ├── api/
│   │   ├── auth/callback/route.ts
│   │   ├── paystack/webhook/route.ts
│   │   ├── revalidate/route.ts
│   │   └── health/route.ts
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                          ← Primitive components (Button, Badge, Card)
│   │   ├── button.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   └── skeleton.tsx
│   ├── auth/
│   │   ├── auth-modal.tsx           ← Client component
│   │   └── auth-form.tsx
│   ├── payment/
│   │   └── payment-modal.tsx        ← Client component
│   ├── sectors/
│   │   ├── sector-card.tsx
│   │   ├── sector-grid.tsx
│   │   ├── sector-header.tsx
│   │   ├── pro-gate.tsx
│   │   └── category-filter.tsx      ← Client component
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   └── landing/
│       ├── hero.tsx
│       ├── how-it-works.tsx
│       ├── featured-sectors.tsx
│       └── pro-pitch.tsx
│
├── context/
│   └── auth-context.tsx             ← Client context + AuthProvider
│
├── hooks/
│   ├── use-auth.ts                  ← Re-export from context
│   ├── use-paystack.ts
│   └── use-profile.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                ← Browser client
│   │   ├── server.ts                ← Server component client
│   │   └── middleware.ts            ← Middleware client
│   ├── paystack.ts                  ← Paystack utility functions
│   ├── utils.ts                     ← General utilities (cn, formatters)
│   └── constants.ts                 ← App-wide constants
│
├── types/
│   ├── database.types.ts            ← Auto-generated from Supabase CLI
│   ├── index.ts                     ← Re-exports + derived types
│   └── paystack.ts                  ← Paystack event types
│
├── docs/
│   ├── ARCHITECTURE.md              ← This file
│   └── TECH_STACK.md
│
├── scripts/
│   ├── seed-sectors.ts              ← Seed initial sector data
│   └── generate-types.sh            ← Run supabase gen types
│
├── public/
│   ├── og-image.png                 ← OpenGraph image
│   └── favicon.ico
│
├── middleware.ts                    ← Session refresh middleware
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .env.local
```

---

## 14. Environment Variables & Secrets Management

### 14.1 `.env.local` (Development)

```bash
# ── Supabase ────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...             # Safe to expose (client-side)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...                 # NEVER expose to client

# ── Paystack ────────────────────────────────────────────────
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...          # Safe to expose (client-side)
PAYSTACK_SECRET_KEY=sk_test_...                      # NEVER expose to client
PAYSTACK_WEBHOOK_SECRET=...                          # Used for HMAC verification

# ── App ─────────────────────────────────────────────────────
NEXT_PUBLIC_APP_URL=http://localhost:3000
REVALIDATION_SECRET=...                              # Random 32-char string

# ── Optional ────────────────────────────────────────────────
NEXT_PUBLIC_POSTHOG_KEY=...                          # Analytics (optional)
```

### 14.2 Vercel Environment Variables

In Vercel dashboard, set all variables above with appropriate **Environment** scope:

| Variable | Development | Preview | Production |
|----------|-------------|---------|------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✓ | ✓ | ✓ |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✓ | ✓ | ✓ |
| `SUPABASE_SERVICE_ROLE_KEY` | ✓ | ✓ (test project) | ✓ |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | ✓ (test key) | ✓ (test key) | ✓ (live key) |
| `PAYSTACK_SECRET_KEY` | ✓ (test) | ✓ (test) | ✓ (live) |
| `NEXT_PUBLIC_APP_URL` | `localhost:3000` | preview URL | production URL |

### 14.3 Security Rules

1. **Never commit** `.env.local` to git — it is in `.gitignore` by default.
2. Variables prefixed `NEXT_PUBLIC_` are **embedded in the JS bundle** — treat as fully public.
3. `SUPABASE_SERVICE_ROLE_KEY` bypasses all RLS — only used in server-side webhook handlers and admin scripts.
4. `PAYSTACK_SECRET_KEY` is only used server-side (webhook verification and future server-side charge initiation).
5. Rotate keys immediately if any are accidentally exposed.

---

## 15. API Routes Reference

| Method | Path | Auth Required | Description |
|--------|------|--------------|-------------|
| `GET` | `/api/health` | No | Returns `{ status: 'ok', timestamp }` |
| `GET` | `/api/auth/callback` | No | Supabase PKCE OAuth exchange |
| `POST` | `/api/paystack/webhook` | Paystack HMAC | Handles payment events |
| `GET` | `/api/revalidate` | Secret token | On-demand ISR revalidation |

---

## 16. Error Handling Strategy

### 16.1 Client-Side Errors

- Auth errors display inline in `<AuthModal />` using `react-hook-form` field errors.
- Payment errors show a toast notification with retry option.
- Network errors caught by React Error Boundaries at page level.

### 16.2 Server-Side Errors

- `notFound()` called for unknown sector slugs → renders `not-found.tsx`.
- Supabase query failures logged to Vercel logs; user sees graceful error state.
- Webhook handler always returns `200` to Paystack to prevent duplicate retries; errors are logged internally.

---

## 17. Security Considerations

| Concern | Mitigation |
|---------|-----------|
| Pro content leakage | Server components never include `sector_analysis` data unless `is_pro = true` |
| Webhook spoofing | HMAC-SHA512 signature verification on every webhook request |
| Injection attacks | Supabase client uses parameterised queries — no raw SQL from user input |
| Session hijacking | HttpOnly cookies managed by `@supabase/ssr` middleware |
| CSRF | Supabase Auth PKCE flow includes state param; webhook uses HMAC |
| RLS bypass | `SUPABASE_SERVICE_ROLE_KEY` only used in server-side code, never in browser |
| Replay attacks | `paystack_reference` has `UNIQUE` constraint — duplicate webhooks are idempotent |
| Environment exposure | All secrets are server-only env vars; `NEXT_PUBLIC_` vars are intentionally public |

---

*End of ARCHITECTURE.md — OneSearch v1.0.0*
