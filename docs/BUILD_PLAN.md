# OneSearch — Comprehensive End-to-End Build Plan

> A detailed, phase-by-phase engineering execution blueprint for building OneSearch with Next.js 14 (App Router), Supabase (Auth & Postgres), Tailwind CSS, and Paystack.

---

## Executive Blueprint Overview

This document provides the definitive implementation plan for constructing OneSearch. It details the exact architecture, folder hierarchy, database schema, component specifications, security policies, state transitions, and step-by-step development phases required to bring the platform from documentation to a production deployment on Vercel.

Every phase is architected around the core product principles:
1. **Zero Unnecessary Dependencies:** No bulky state management libraries, no heavy CMS overhead, no unnecessary external UI frameworks.
2. **Radial UX Flow:** Landing page → Free Public Exploration → Gated Pro Detail → Seamless Modal Auth → Instant Paystack ₦2,000 Unlock → Immediate in-place content reveal.
3. **No Dashboard Rule:** The user is never diverted to an empty `/dashboard`. Authentication and payment state seamlessly update the active reading view in real time.

---

## Table of Contents

1. [Architectural Overview & System Topology](#1-architectural-overview--system-topology)
2. [Project Directory & File Structure](#2-project-directory--file-structure)
3. [Database Schema & Supabase Setup (Postgres + RLS)](#3-database-schema--supabase-setup-postgres--rls)
4. [Phase 0: Environment & Project Scaffolding](#4-phase-0-environment--project-scaffolding)
5. [Phase 1: Design System & Shared UI Primitives](#5-phase-1-design-system--shared-ui-primitives)
6. [Phase 2: Global Navigation & Footer Architecture](#6-phase-2-global-navigation--footer-architecture)
7. [Phase 3: Landing Page Implementation (Hero + 3 Sections)](#7-phase-3-landing-page-implementation-hero--3-sections)
8. [Phase 4: Public Exploration Page & Sector Catalog](#8-phase-4-public-exploration-page--sector-catalog)
9. [Phase 5: Sector Dossier Detail Page & Pro Gate Visuals](#9-phase-5-sector-dossier-detail-page--pro-gate-visuals)
10. [Phase 6: Supabase Modal-Only Authentication](#10-phase-6-supabase-modal-only-authentication)
11. [Phase 7: Paystack ₦2,000 Payment Integration & Webhook Handling](#11-phase-7-paystack-2000-payment-integration--webhook-handling)
12. [Phase 8: Content Ingestion, Seeding & Research Linking](#12-phase-8-content-ingestion-seeding--research-linking)
13. [Phase 9: SEO, OpenGraph & Metadata Optimization](#13-phase-9-seo-opengraph--metadata-optimization)
14. [Phase 10: Rigorous QA, Security Audits & Edge Case Testing](#14-phase-10-rigorous-qa-security-audits--edge-case-testing)
15. [Phase 11: Production Vercel Deployment & Continuous Monitoring](#15-phase-11-production-vercel-deployment--continuous-monitoring)

---

## 1. Architectural Overview & System Topology

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CLIENT BROWSER (User)                             │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ HTTP / Server Component Requests
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          VERCEL EDGE RUNTIME                                │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                     Next.js 14 App Router                             │  │
│  │  • Server Components (Static Sector Pages, Metadata, ISR)             │  │
│  │  • Client Components (Search Filter, Auth Modal, Paystack Inline)     │  │
│  │  • API Route Handlers (/api/paystack/webhook, /api/auth/callback)     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└───────────────────────┬──────────────────────────────┬──────────────────────┘
                        │                              │
         Server-Side DB │ Client Auth / Queries        │ Webhook Notification
                        ▼                              ▼
┌────────────────────────────────────────┐   ┌────────────────────────────────┐
│           SUPABASE POSTGRES            │   │            PAYSTACK            │
│  • Auth Service (JWT / Sessions)       │   │  • Payment Initialization      │
│  • Profiles Table (is_pro status)      │   │  • Inline Checkout Popup       │
│  • Sectors & Research Tables           │   │  • Webhook Dispatcher (HMAC)   │
│  • Row Level Security (RLS) Policies   │   │  • Settlement to Founder Bank  │
└────────────────────────────────────────┘   └────────────────────────────────┘
```

---

## 2. Project Directory & File Structure

```
onesearch/
├── docs/                                # Complete Architecture & Research Dossiers
│   ├── adr/                             # Architectural Decision Records
│   ├── ARCHITECTURE.md
│   ├── AUTH_GUIDE.md
│   ├── BUILD_PLAN.md
│   ├── CONTENT_GUIDE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DESIGN_SYSTEM.md
│   ├── EDGE_CASES.md
│   ├── MONETIZATION.md
│   ├── PRODUCT_VISION.md
│   ├── README.md
│   ├── RESEARCH_PAPERS.md
│   ├── SECTOR_RESEARCH.md
│   └── TECH_STACK.md
├── src/
│   ├── app/
│   │   ├── (marketing)/
│   │   │   ├── page.tsx                 # Landing Page (Hero + 3 Sections + Footer)
│   │   │   └── layout.tsx               # Marketing Layout with Header/Footer
│   │   ├── explore/
│   │   │   ├── page.tsx                 # Public Exploration Page (All Sectors)
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx             # Sector Detail Page (Public + Pro Gate)
│   │   │   │   └── loading.tsx          # Fast Skeleton Loader
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── paystack/
│   │   │   │   ├── initialize/route.ts  # Paystack Transaction Init Endpoint
│   │   │   │   ├── verify/route.ts      # Client Payment Verification
│   │   │   │   └── webhook/route.ts     # Paystack Secure Webhook Handler
│   │   │   └── auth/
│   │   │       └── callback/route.ts    # Supabase Auth Session Exchange
│   │   ├── globals.css                  # Tailwind Base Directives & Color Tokens
│   │   ├── layout.tsx                   # Root HTML & Providers Wrapper
│   │   └── not-found.tsx                # Custom Clean 404 Page
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthModal.tsx            # Clean Centered Sign In / Sign Up Modal
│   │   │   └── AuthProvider.tsx         # Supabase Client Session Context
│   │   ├── explore/
│   │   │   ├── SectorCard.tsx           # Sector Grid Item Component
│   │   │   ├── SectorFilter.tsx         # Category & Status Filter Tabs
│   │   │   ├── SectorSearch.tsx         # Fast Client-Side Search Input
│   │   │   └── ProGateOverlay.tsx       # Blurred Gate Overlay with ₦2,000 CTA
│   │   ├── landing/
│   │   │   ├── HeroSection.tsx          # Tagline, Subtext, Explore & Sign In CTA
│   │   │   ├── ProblemSection.tsx       # Section 1: The Startup Graveyard
│   │   │   ├── ProcessSection.tsx       # Section 2: How It Works in 3 Steps
│   │   │   └── ResearchSection.tsx      # Section 3: 100+ Studies & Founder Notes
│   │   ├── layout/
│   │   │   ├── Navbar.tsx               # Minimal Header (Logo + Explore + Sign In)
│   │   │   └── Footer.tsx               # Substack Link, Attribution & Copyright
│   │   └── ui/
│   │       ├── Badge.tsx                # Status Badges (Green, Red, Yellow, Purple)
│   │       ├── Button.tsx               # High-contrast action buttons
│   │       └── Modal.tsx                # Generic accessible modal shell
│   ├── lib/
│   │   ├── paystack.ts                  # Server-side Paystack API Client & HMAC
│   │   ├── supabase/
│   │   │   ├── client.ts                # Browser Supabase Client (@supabase/ssr)
│   │   │   ├── server.ts                # Server Component Supabase Client
│   │   │   └── middleware.ts            # Session Refresh Middleware
│   │   └── utils.ts                     # Currency Formatter, Slugifiers, Helpers
│   ├── data/
│   │   ├── sectors.ts                   # Static Sector Seed Dataset (18 Sectors)
│   │   └── researchPapers.ts            # Curated Metadata for 100+ Papers
│   └── types/
│       ├── database.ts                  # Supabase Generated Database Types
│       ├── paystack.ts                  # Paystack Request & Webhook Event Types
│       └── sector.ts                    # Sector Model, Status & Risk Enums
├── public/
│   ├── og-image.png                     # Social Sharing OpenGraph Card
│   └── favicon.ico
├── middleware.ts                        # Root Next.js Session Refresh Middleware
├── tailwind.config.ts                   # Custom Color Palette & Typography Tokens
├── tsconfig.json
└── package.json
```

---

## 3. Database Schema & Supabase Setup (Postgres + RLS)

### SQL Schema Definition:
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. User Profiles Table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    full_name TEXT,
    is_pro BOOLEAN DEFAULT FALSE NOT NULL,
    pro_unlocked_at TIMESTAMPTZ,
    paystack_customer_code TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own non-sensitive profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 2. Sectors Catalog Table
CREATE TABLE public.sectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('succeeding', 'struggling', 'failed', 'emerging')),
    risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    opportunity_score NUMERIC(3,1) NOT NULL,
    summary TEXT NOT NULL,
    public_insight TEXT NOT NULL,
    market_size_est TEXT NOT NULL,
    is_published BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;

-- Everyone can read published sectors (Unauthenticated & Authenticated)
CREATE POLICY "Public read access for published sectors"
    ON public.sectors FOR SELECT
    USING (is_published = TRUE);

-- 3. Sector Pro Analysis Table (Contains Sensitive Deep Research)
CREATE TABLE public.sector_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sector_id UUID UNIQUE NOT NULL REFERENCES public.sectors(id) ON DELETE CASCADE,
    full_analysis_markdown TEXT NOT NULL,
    failure_case_studies JSONB NOT NULL DEFAULT '[]'::jsonb,
    winning_playbooks JSONB NOT NULL DEFAULT '[]'::jsonb,
    unit_economics_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    regulatory_landmines JSONB NOT NULL DEFAULT '[]'::jsonb,
    market_gaps JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.sector_analyses ENABLE ROW LEVEL SECURITY;

-- Pro Users can read full analyses; Non-pro users get zero rows
CREATE POLICY "Pro users read access for sector analysis"
    ON public.sector_analyses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_pro = TRUE
        )
    );

-- 4. Payments Log Table
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    paystack_reference TEXT UNIQUE NOT NULL,
    paystack_id BIGINT,
    amount_kobo BIGINT NOT NULL, -- 200,000 kobo = ₦2,000
    currency TEXT DEFAULT 'NGN' NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed', 'abandoned')),
    channel TEXT,
    customer_email TEXT NOT NULL,
    raw_payload JSONB,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own payments"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id);

-- 5. Automatic Profile Trigger on Auth Sign-Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, is_pro)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        FALSE
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

---

## 4. Phase 0: Environment & Project Scaffolding

### Objective
Initialize the repository with strict TypeScript, Next.js 14 App Router, Tailwind CSS, Supabase SSR helpers, and Paystack integration libraries.

### Execution Steps
1. **Initialize Project:**
   ```bash
   npx create-next-app@latest onesearch --typescript --tailwind --eslint --app --src-dir --use-npm
   ```
2. **Install Core Dependencies:**
   ```bash
   npm install @supabase/ssr @supabase/supabase-js lucide-react clsx tailwind-merge
   npm install -D @types/node @types/react @types/react-dom
   ```
3. **Configure Tailwind Custom Palette in `tailwind.config.ts`:**
   ```typescript
   import type { Config } from 'tailwindcss'

   const config: Config = {
     content: [
       './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
       './src/components/**/*.{js,ts,jsx,tsx,mdx}',
       './src/app/**/*.{js,ts,jsx,tsx,mdx}',
     ],
     theme: {
       extend: {
         colors: {
           brand: {
             bg: '#FFFFFF',
             text: '#0A0A0A',
             muted: '#525252',
             border: '#E5E7EB',
             green: '#16A34A',
             red: '#DC2626',
             yellow: '#CA8A04',
             purple: '#7C3AED',
           }
         },
         fontFamily: {
           sans: ['var(--font-inter)', 'sans-serif'],
           editorial: ['var(--font-merriweather)', 'serif'],
         }
       },
     },
     plugins: [],
   }
   export default config;
   ```
4. **Environment Variables Configuration (`.env.local`):**
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Paystack
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_public_key
   PAYSTACK_SECRET_KEY=sk_live_your_secret_key

   # App Settings
   NEXT_PUBLIC_APP_URL=https://onesearch.ng
   NEXT_PUBLIC_FOUNDER_SUBSTACK_URL=https://founder.substack.com
   ```

---

## 5. Phase 1: Design System & Shared UI Primitives

### Objective
Build reusable, accessible, high-contrast UI components that enforce the editorial aesthetic.

### Component Specifications:
1. **`Badge.tsx`:** Renders status and risk pills with precise semantic colors.
   - `succeeding`: Green text (`#16A34A`), green border (`#BBF7D0`), light green background (`#F0FDF4`).
   - `struggling`: Yellow text (`#CA8A04`), yellow border (`#FEF08A`), light yellow background (`#FEFCE8`).
   - `failed`: Red text (`#DC2626`), red border (`#FECACA`), light red background (`#FEF2F2`).
   - `emerging` / `pro`: Purple text (`#7C3AED`), purple border (`#DDD6FE`), light purple background (`#FAF5FF`).
2. **`Button.tsx`:** Minimal, sharp border radius (`rounded-md`), high contrast:
   - Primary: Near-black background (`bg-[#0A0A0A]`), white text (`text-white`), hover dark grey (`hover:bg-neutral-800`).
   - Secondary: White background, 1px border (`border-neutral-300`), black text.
   - Pro Action: Deep purple (`bg-[#7C3AED]`), white text, hover purple (`hover:bg-[#6D28D9]`).
3. **`Modal.tsx`:** Accessible dialog overlay using native dialog or React Portal with keyboard trapping (ESC to close) and focus preservation.

---

## 6. Phase 2: Global Navigation & Footer Architecture

### Specifications:
- **`Navbar.tsx`:**
  - Sticky top header, pure white background (`bg-white/95 backdrop-blur-sm`), 1px bottom border (`border-b border-neutral-200`).
  - Left: **OneSearch** brand mark with small editorial subtitle *"African Market Intelligence"*.
  - Right:
    - Button 1: **"Explore"** (links to `/explore`).
    - Button 2: **"Sign In"** (triggers auth modal). If logged in, displays user email or **"Sign Out"** link.
- **`Footer.tsx`:**
  - Clean 3-column layout:
    - Col 1: Platform mission and founder research attribution statement.
    - Col 2: Direct link to the founder's Substack publication: *"Read the research methodology & weekly teardowns on Substack ↗"*.
    - Col 3: Copyright, academic references link, and system status indicator.

---

## 7. Phase 3: Landing Page Implementation (Hero + 3 Sections)

### Specifications for `src/app/(marketing)/page.tsx`:
1. **Hero Section:**
   - Bold display typography: *"Clarity Before Capital."*
   - Subhead: *"Stop guessing which sector to enter in Nigeria. Comprehensive empirical intelligence on what is succeeding, what failed, why companies collapsed, and where the real market gaps exist."*
   - Dual Call to Action:
     - Primary: **"Explore Sectors for Free"** (`/explore`)
     - Secondary: **"Sign In"** (Opens Auth Modal)
   - Visual Trust Bar: *"Curated across 18 sectors • Grounded in 100+ academic studies & field autopsies • Zero AI hallucinations."*
2. **Section 1: The Reality (The Startup Graveyard):**
   - 3 clean editorial cards breaking down why 80% of African ventures die:
     1. *The Purchasing Power Mirage* (TAM calculation errors).
     2. *The Currency & Infrastructure Mismatch* (USD cloud bills vs NGN sales).
     3. *The Recurring Debit Breakdown* (Why subscription models churn at 40%+).
3. **Section 2: How OneSearch Works:**
   - Step 1: *Explore the Field* — Browse 18 sector dossiers, risk levels, and viability ratings for free.
   - Step 2: *Study Past Fatalities* — Examine forensic autopsies of failed startups (Farmcrowdy, 54gene, Jumia Food).
   - Step 3: *Execute on Proven Gaps* — Unlock comprehensive unit economics and market gaps for a one-time ₦2,000 fee.
4. **Section 3: The Research & Substack Methodology:**
   - Detailed spotlight on the founder's field research methodology.
   - Highlights of interviews with surviving operators, market women, dispatch riders, and commercial bankers.
   - Direct button: *"Read the Founder's Research Notes on Substack ↗"*.

---

## 8. Phase 4: Public Exploration Page & Sector Catalog

### Specifications for `src/app/explore/page.tsx`:
1. **Zero Authentication Check:** The entire page is rendered via Next.js Server Components without requiring user login.
2. **Interactive Search & Filter Bar (`SectorFilter.tsx` & `SectorSearch.tsx`):**
   - Instant client-side text search (filtering by sector name, category, or keyword).
   - Filter pills: `All`, `Succeeding` (Green), `Struggling` (Yellow), `Failed` (Red), `Emerging` (Purple).
3. **Sector Cards Grid (`SectorCard.tsx`):**
   - Rendered in a responsive 3-column grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
   - Card Contents:
     - Category label (e.g. `FINTECH & PAYMENTS`)
     - Status Badge (`SUCCEEDING` in green)
     - Sector Title (e.g. *B2B SME Software & Invoicing*)
     - Metric Row: Risk Level (`Low-Medium`) • Opportunity Score (`9.3 / 10`)
     - One-Liner Summary
     - Public Insight preview
     - Clean button: **"View Sector Dossier →"**

---

## 9. Phase 5: Sector Dossier Detail Page & Pro Gate Visuals

### Specifications for `src/app/explore/[slug]/page.tsx`:
1. **Public Top Section:**
   - Full sector header, category, status pill, risk gauge, and opportunity rating.
   - Macro market sizing statistics and recent regulatory context.
   - High-level list of active key players.
2. **The Pro Gated Boundary (`ProGateOverlay.tsx`):**
   - Check user status server-side using Supabase server client:
     ```typescript
     const supabase = createServerComponentClient();
     const { data: { user } } = await supabase.auth.getUser();
     const isPro = user ? await checkUserProStatus(user.id) : false;
     ```
   - **If `isPro === false`:**
     - Render the first paragraph of the deep dive, then apply CSS mask/blur:
       ```css
       filter: blur(8px);
       user-select: none;
       pointer-events: none;
       ```
     - Overlay the elegant **Pro Gate Card**:
       - Title: *"Unlock Complete Strategic Dossier & Unit Economics"*
       - Points Included: *Failure Case Studies (Farmcrowdy, Thrive Agric), Exact Gross Margin Calculations, Regulatory Landmines, Unexploited Market Gaps*.
       - Price Tag: **₦2,000 (One-Time Payment • Lifetime Access)**
       - Action Button: **"Unlock All Sectors with Paystack"**
   - **If `isPro === true`:**
     - Render the full markdown content seamlessly without blur or overlay.

---

## 10. Phase 6: Supabase Modal-Only Authentication

### Specifications for `src/components/auth/AuthModal.tsx`:
1. **Trigger Points:**
   - Clicking "Sign In" from the top navigation bar.
   - Clicking "Unlock All Sectors with Paystack" on a pro-gated page (if unauthenticated).
2. **Modal Architecture:**
   - Floating centered dialog with backdrop blur (`backdrop-blur-md bg-black/40`).
   - Clean tabs: **"Sign In"** and **"Create Account"**.
   - Input Fields: `Email` and `Password` (optional `Full Name` on sign up).
3. **Execution Logic:**
   - Utilizes `@supabase/ssr` browser client.
   - On successful sign in/up:
     - Update global `AuthProvider` state.
     - Automatically close the modal.
     - **Do NOT redirect to `/dashboard` or refresh the entire browser.**
     - Re-evaluate current page permissions in-place. If the user was attempting to unlock pro, immediately trigger the Paystack inline popup.

---

## 11. Phase 7: Paystack ₦2,000 Payment Integration & Webhook Handling

### Payment Flow Diagram:
```
[User Clicks "Unlock for ₦2,000"]
         │
         ▼
[Check Auth State]
 ├── Unauthenticated ──> Open AuthModal (Sign In / Sign Up)
 └── Authenticated   ──> Trigger Paystack Inline Popup
                             │
                             ▼
                    [User Enters Card / Bank Transfer]
                             │
                             ▼
                    [Paystack Processes ₦2,000]
                     ├── Failed    ──> Show inline error message
                     └── Succeeded ──>
                                  │
      ┌───────────────────────────┴───────────────────────────┐
      │ Client Callback                                       │ Webhook Notification
      ▼                                                       ▼
[Call /api/paystack/verify]                       [/api/paystack/webhook]
[Update Client State in-place]                    [Verify HMAC SHA512 Signature]
[Instant Content Reveal!]                         [UPDATE profiles SET is_pro = TRUE]
                                                  [INSERT INTO payments record]
```

### Specifications for `src/app/api/paystack/webhook/route.ts`:
1. Receive raw POST request buffer.
2. Extract `x-paystack-signature` header.
3. Compute HMAC SHA512 using `process.env.PAYSTACK_SECRET_KEY`.
4. If signature does not match, return `401 Unauthorized`.
5. Parse event payload:
   - If `event === 'charge.success'`:
     - Extract `customer.email`, `reference`, `amount` (verify `amount === 200000`).
     - Query `profiles` table by email.
     - Execute transaction:
       ```sql
       UPDATE public.profiles 
       SET is_pro = TRUE, pro_unlocked_at = NOW() 
       WHERE email = $1;

       INSERT INTO public.payments (user_id, paystack_reference, amount_kobo, status, customer_email, paid_at)
       VALUES ($user_id, $reference, 200000, 'success', $email, NOW());
       ```
6. Return `200 OK` within 2 seconds to prevent Paystack retries.

---

## 12. Phase 8: Content Ingestion, Seeding & Research Linking

### Specifications:
1. Populate `sectors` and `sector_analyses` tables with the complete research dossiers for all 18 primary sectors (documented in `docs/SECTOR_RESEARCH.md`).
2. Integrate citations linking directly to the 105 academic and institutional studies (cataloged in `docs/RESEARCH_PAPERS.md`).
3. Embed outbound links to the founder's Substack publication in every sector's failure autopsy section.

---

## 13. Phase 9: SEO, OpenGraph & Metadata Optimization

### Specifications:
1. Dynamic OpenGraph generation for every sector using Next.js `generateMetadata`:
   ```typescript
   export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
     const sector = await getSectorBySlug(params.slug);
     return {
       title: `${sector.name} Market Analysis & Failure Autopsy | OneSearch`,
       description: sector.summary,
       openGraph: {
         title: `${sector.name} — African Market Intelligence`,
         description: `Why startups succeed or fail in ${sector.name} in Nigeria. Risk rating: ${sector.risk_level}.`,
         images: ['/og-image.png'],
       },
     };
   }
   ```
2. Semantic HTML markup with JSON-LD structured data (`Article` and `Dataset` schemas) to maximize organic search rankings for keywords like *"Why did Farmcrowdy fail"*, *"Nigerian fintech market size"*, and *"Food delivery unit economics Lagos"*.

---

## 14. Phase 10: Rigorous QA, Security Audits & Edge Case Testing

### Test Suite Matrix:
| Test Domain | Target Scenario | Expected Behavior |
|---|---|---|
| **Auth** | Unauthenticated user clicks "Sign In" | Modal opens smoothly; page does not reload |
| **Auth** | User signs in on `/explore/fintech` | Modal closes; user remains on `/explore/fintech` with session active |
| **Payment** | User pays ₦2,000 via Paystack Test Card | Modal closes, page content unblurs in-place without manual refresh |
| **Payment** | Webhook arrives before client callback finishes | Idempotency key prevents duplicate unlock; status is verified |
| **Payment** | Malicious user attempts fake webhook payload | Invalid HMAC signature returns HTTP 401; DB unaffected |
| **Access** | Free user queries `sector_analyses` via Supabase client | Postgres RLS returns 0 rows; protected analysis remains secure |
| **Network** | Slow 3G network simulation (Lagos test profile) | Skeleton loaders display instantly; bundle size under 120KB |

---

## 15. Phase 11: Production Vercel Deployment & Continuous Monitoring

### Deployment Steps:
1. Connect GitHub repository to Vercel.
2. Configure production environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - `PAYSTACK_SECRET_KEY`
   - `NEXT_PUBLIC_APP_URL`
3. Configure custom domain (`onesearch.ng` or similar) with automated SSL.
4. Set up Paystack Live Webhook URL pointing to `https://onesearch.ng/api/paystack/webhook`.
5. Execute end-to-end live payment test with a real ₦2,000 debit card transaction to verify automated account upgrade.

---

*This concludes the complete technical and operational build plan for OneSearch. Ready for staged implementation upon user sign-off.*
