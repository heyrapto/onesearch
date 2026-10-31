# OneSearch — Comprehensive Technical Stack Architecture & Decision Dossier

> A deeply technical, opinionated evaluation and specification of the engineering stack powering OneSearch: Next.js 14 (App Router), Supabase (Auth & Postgres), Tailwind CSS, Paystack, and Vercel.

---

## Technical Philosophy & Architecture Principles

Every technical decision in OneSearch is made under the lens of the **emerging market network and hardware constraint reality**:

1. **Low-Bandwidth Optimization:** A significant portion of Nigerian builders access the web via mobile data networks (MTN, Airtel) where connection speeds fluctuate between 3G and 4G, and data costs represent real household expenses. The application bundle must be extremely lean (sub-120KB initial JS), render server-side first, and avoid heavy client-side JavaScript execution.
2. **Deterministic Reliability:** High-profile fintech failures in Africa frequently stem from broken API webhooks and database race conditions. Our payment reconciliation and access control must be cryptographically verified, idempotent, and resilient to packet loss.
3. **Zero Maintenance Overhead:** As an editorial intelligence platform curated by the founder, the technical infrastructure must be self-healing, serverless, and require zero database migrations or container management once deployed.

---

## Table of Contents

1. [High-Level Technical Stack Matrix](#1-high-level-technical-stack-matrix)
2. [Why Next.js 14 App Router?](#2-why-nextjs-14-app-router)
3. [Why Supabase (PostgreSQL, Auth & RLS)?](#3-why-supabase-postgresql-auth--rls)
4. [Why Paystack (Payment Gateway & Webhook Infrastructure)?](#4-why-paystack-payment-gateway--webhook-infrastructure)
5. [Why Tailwind CSS (Custom Semantic Token Architecture)?](#5-why-tailwind-css-custom-semantic-token-architecture)
6. [Why Vercel for Global Edge Deployment?](#6-why-vercel-for-global-edge-deployment)
7. [TypeScript Configuration & Type Safety Conventions](#7-typescript-configuration--type-safety-conventions)
8. [Comprehensive `package.json` Dependency Inventory](#8-comprehensive-packagejson-dependency-inventory)
9. [State Management Architecture: The Lean Context Approach](#9-state-management-architecture-the-lean-context-approach)
10. [Data Fetching Patterns: Server Components vs Client Islanding](#10-data-fetching-patterns-server-components-vs-client-islanding)
11. [Supabase Client Topology (@supabase/ssr vs Browser)](#11-supabase-client-topology-supabasessr-vs-browser)
12. [Paystack Integration Pattern: Inline Popup vs Redirect](#12-paystack-integration-pattern-inline-popup-vs-redirect)
13. [Cryptographic Security: HMAC SHA512 Webhook Verification](#13-cryptographic-security-hmac-sha512-webhook-verification)
14. [Performance Budget & Mobile Optimization for Nigeria](#14-performance-budget--mobile-optimization-for-nigeria)
15. [Search Engine Optimization (SEO) & Dynamic OpenGraph Engine](#15-search-engine-optimization-seo--dynamic-opengraph-engine)
16. [Development Workflow, Linting, & CI/CD Pipelines](#16-development-workflow-linting--cicd-pipelines)

---

## 1. High-Level Technical Stack Matrix

| Layer | Technology | Version | Rationale & Architectural Purpose |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14.2.x | React Server Components, Streaming SSR, fast edge routing |
| **Language** | TypeScript | 5.4.x | Strict compile-time type safety across database & payment payloads |
| **Styling** | Tailwind CSS | 3.4.x | Zero-runtime CSS extraction, custom high-contrast color tokens |
| **Database** | Supabase (PostgreSQL) | Postgres 15+ | Enterprise relational ACID compliance, JSONB support, Row Level Security |
| **Authentication**| Supabase Auth | SSR Helpers | Secure HTTP-only cookie sessions, JWTs, passwordless & email auth |
| **Payments** | Paystack | Inline JS 2.x | Sovereign Nigerian payment rails (Naira cards, bank transfer, USSD) |
| **Hosting** | Vercel | Edge Network | Global CDN caching, automated SSL, zero-cold-start serverless functions |
| **Icons** | Lucide React | 0.370+ | Lightweight SVG tree-shaken icons with consistent stroke weights |
| **Utilities** | clsx, tailwind-merge | Latest | Conditional styling without class specificity collision |

---

## 2. Why Next.js 14 App Router?

### 1. React Server Components (RSC) for Zero-JS Content Delivery
Traditional Single Page Applications (SPAs) built with Vite or Create React App force the client's browser to download megabytes of JavaScript before rendering text. In Nigeria, where cellular connections frequently stutter, this causes a blank white screen for 5–10 seconds.
- With Next.js 14 Server Components, the entire sector research catalog and landing page are compiled to pure semantic HTML and CSS on the server.
- The client receives instantly readable text on the first TCP packet.

### 2. Built-in Incremental Static Regeneration (ISR)
Sector dossiers rarely change minute-by-minute. By using `revalidate = 3600`, Next.js statically caches sector pages at the edge. The pages serve with sub-50ms Time to First Byte (TTFB) directly from Vercel’s African and European edge nodes, while automatically re-generating in the background when content is updated.

### 3. Integrated Route Handlers
We do not need a separate Node.js Express server to handle Paystack webhooks or payment verification. Next.js App Router Route Handlers (`src/app/api/.../route.ts`) provide secure, serverless endpoints that execute in Vercel’s serverless runtime with zero server provisioning.

### 4. Native Metadata API
Next.js provides the `generateMetadata` function, enabling dynamic OpenGraph tags, JSON-LD structured data, and Twitter card generation for all 18 sectors automatically.

---

## 3. Why Supabase (PostgreSQL, Auth & RLS)?

### 1. Real Relational PostgreSQL vs Fragile NoSQL
Market intelligence data is inherently relational: a user has payments, a sector has failure analyses, and research papers link to multiple sectors. PostgreSQL provides strict referential integrity, foreign key cascading, and JSONB columns for flexible case-study schemas.

### 2. Row Level Security (RLS) as the Sovereign Security Boundary
In traditional architectures, developers must write complex middleware checks in every API route to ensure non-paying users cannot view protected data. With Supabase RLS, security rules are declared **directly inside the database engine**:
```sql
CREATE POLICY "Pro users read access for sector analysis"
    ON public.sector_analyses FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid()
            AND profiles.is_pro = TRUE
        )
    );
```
Even if a malicious user bypasses the frontend or calls the Supabase API directly using their client anon key, PostgreSQL will return **zero rows** unless their user ID has `is_pro = TRUE`. Security is mathematically guaranteed at the database kernel.

### 3. Native Auth with SSR Cookie Handling
Supabase Auth integrates cleanly with Next.js 14 via `@supabase/ssr`. Rather than storing vulnerable JWT tokens in `localStorage` (which is susceptible to Cross-Site Scripting - XSS), sessions are stored in secure, encrypted, `HttpOnly`, `SameSite=Lax` cookies that are automatically refreshed by Next.js middleware on every request.

---

## 4. Why Paystack (Payment Gateway & Webhook Infrastructure)?

### 1. Sovereign Nigerian Payment Rail Dominance
International payment processors like Stripe, Paddle, and Lemon Squeezy either do not support Nigerian merchants, reject local Naira debit cards, or force conversion into USD at exorbitant black-market spreads. Paystack is native to Nigeria:
- Supports 100% of Nigerian commercial bank debit cards (Mastercard, Visa, Verve).
- Provides direct **Bank Transfer** checkout (where customers transfer funds from their Kuda, GTBank, or Opay app to a dynamic virtual account)—the single most popular payment method in Nigeria today.
- Supports USSD payments for users without active mobile internet on their banking phone.

### 2. The Inline JS Popup Experience
Paystack’s Inline JS SDK allows the checkout modal to launch directly over the existing web page. The user never leaves OneSearch, never gets redirected across three redirect URLs, and returns to their exact reading scroll position the moment payment is confirmed.

### 3. Robust Webhook Architecture with HMAC Signatures
Paystack dispatches real-time HTTPS webhooks for every completed transaction. Every webhook is cryptographically signed using an HMAC SHA512 hash generated with the secret key, allowing our server to verify beyond any doubt that the notification came directly from Paystack’s servers and not a malicious actor.

---

## 5. Why Tailwind CSS (Custom Semantic Token Architecture)?

### 1. Zero Runtime Overhead
Tailwind analyzes CSS classes at build time and purges all unused styles, producing a production CSS bundle of less than **12KB**. Unlike styled-components or Emotion, there is zero JavaScript runtime overhead, zero style re-computation, and zero layout thrashing on low-end mobile devices.

### 2. Semantic Color Token System
We configure a custom semantic color scale in `tailwind.config.ts`:
```typescript
colors: {
  brand: {
    bg: '#FFFFFF',        // Pure white background
    text: '#0A0A0A',      // Near-black text
    muted: '#525252',     // Muted body text
    border: '#E5E7EB',    // Clean divider borders
    green: '#16A34A',     // Succeeding status
    red: '#DC2626',       // Failed status / Alerts
    yellow: '#CA8A04',    // Struggling status / Warnings
    purple: '#7C3AED',    // Pro gated content & badges
  }
}
```
This guarantees strict visual consistency across all components without hardcoding arbitrary hex codes in JSX files.

---

## 6. Why Vercel for Global Edge Deployment?

1. **Zero-Configuration Next.js Optimization:** Vercel is the creator and maintainer of Next.js. Vercel automatically configures Brotli compression, image optimization, edge routing, and serverless execution without manual Dockerfiles or Nginx configs.
2. **Global Edge Network with European PoPs:** Nigeria’s internet traffic predominantly routes through submarine fiber cables connecting to data centers in London, Frankfurt, and Lisbon. Vercel automatically deploys edge caching to nodes with minimal latency to West African transit providers.
3. **Automated Preview Environments:** Every Git pull request automatically generates a live preview URL, allowing the founder to review new research dossiers in a staging environment before pushing to production.

---

## 7. TypeScript Configuration & Type Safety Conventions

We enforce strict TypeScript configurations in `tsconfig.json` to prevent null-pointer exceptions and state inconsistencies:

```json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Core Type Definitions (`src/types/sector.ts`):
```typescript
export type SectorStatus = 'succeeding' | 'struggling' | 'failed' | 'emerging';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface SectorSummary {
  id: string;
  slug: string;
  name: string;
  category: string;
  status: SectorStatus;
  risk_level: RiskLevel;
  opportunity_score: number;
  summary: string;
  public_insight: string;
  market_size_est: string;
}

export interface SectorAnalysis extends SectorSummary {
  full_analysis_markdown: string;
  failure_case_studies: {
    company_name: string;
    years_active: string;
    capital_raised: string;
    fatal_flaw: string;
    autopsy_summary: string;
  }[];
  winning_playbooks: {
    company_name: string;
    core_moat: string;
    key_lesson: string;
  }[];
  unit_economics: Record<string, string | number>;
  regulatory_landmines: string[];
  market_gaps: string[];
}
```

---

## 8. Comprehensive `package.json` Dependency Inventory

```json
{
  "name": "onesearch",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/ssr": "^0.3.0",
    "@supabase/supabase-js": "^2.43.0",
    "clsx": "^2.1.1",
    "lucide-react": "^0.378.0",
    "next": "14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.2",
    "@types/react-dom": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "14.2.3",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.3",
    "typescript": "^5.4.5"
  }
}
```

### Dependency Rationale:
- **No Heavy Component Libraries:** Avoided Chakra UI, Material UI, or Ant Design which add 200KB+ to the bundle.
- **No Heavy Form Libraries:** For two inputs (`email` and `password`), native HTML forms and lightweight server actions eliminate the need for Formik or React Hook Form overhead.
- **Tree-Shaken Icons:** `lucide-react` is imported with specific named imports (`import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react'`), guaranteeing only the used SVGs are bundled.

---

## 9. State Management Architecture: The Lean Context Approach

We explicitly reject global state managers like Redux, MobX, or Zustand. OneSearch requires only two pieces of client-side state:
1. **User Authentication State:** (Is the user logged in? Is their profile marked as Pro?)
2. **Auth Modal Visibility:** (Is the Sign In modal currently open or closed?)

### Implementation: `AuthProvider.tsx`
```typescript
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isPro: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  refreshProStatus: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const supabase = createBrowserClient();

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('is_pro')
      .eq('id', userId)
      .single();
    setIsPro(data?.is_pro ?? false);
  };

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      }
      setIsLoading(false);
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setIsPro(false);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase]);

  const refreshProStatus = async () => {
    if (user) await fetchProfile(user.id);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsPro(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isPro,
        isLoading,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        refreshProStatus,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
```

---

## 10. Data Fetching Patterns: Server Components vs Client Islanding

OneSearch adopts the **Islands Architecture**:
- 90% of every page is a static Server Component.
- Client Components (`'use client'`) are strictly isolated to interactive leaves:
  1. `SectorFilter.tsx` (Handles category pill clicking).
  2. `SectorSearch.tsx` (Filters search input in real time).
  3. `AuthModal.tsx` (Handles form submissions).
  4. `ProGateOverlay.tsx` (Triggers Paystack inline popup).

This ensures that the JavaScript execution footprint on the user's phone is negligible.

---

## 11. Supabase Client Topology (@supabase/ssr vs Browser)

We establish three distinct Supabase client factory functions in `src/lib/supabase/`:

### 1. Browser Client (`src/lib/supabase/client.ts`)
Used exclusively inside Client Components for interactive auth and real-time profile queries:
```typescript
import { createBrowserClient as createClient } from '@supabase/ssr';

export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 2. Server Component Client (`src/lib/supabase/server.ts`)
Used inside Server Components and Route Handlers with secure cookie context:
```typescript
import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerComponentClient() {
  const cookieStore = cookies();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {}
        },
      },
    }
  );
}
```

### 3. Serverless Admin Client (Bypasses RLS)
Used **only** inside the secure Paystack webhook handler to update `profiles.is_pro` without needing user session cookies:
```typescript
import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
```

---

## 12. Paystack Integration Pattern: Inline Popup vs Redirect

We deliberately reject the standard Paystack redirect flow (which redirects the user to `checkout.paystack.com` and then redirects back to a callback URL).

### The Inline Popup Script Loader (`src/lib/paystack.ts`):
```typescript
export function loadPaystackInline(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return;
    if ((window as any).PaystackPop) {
      resolve((window as any).PaystackPop);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v2/inline.js';
    script.async = true;
    script.onload = () => resolve((window as any).PaystackPop);
    script.onerror = () => reject(new Error('Failed to load Paystack Inline SDK'));
    document.body.appendChild(script);
  });
}
```

### Initiating Payment Client-Side:
```typescript
const payWithPaystack = async (email: string, onSuccess: () => void) => {
  const PaystackPop = await loadPaystackInline();
  const paystack = new PaystackPop();
  
  paystack.newTransaction({
    key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: 200000, // ₦2,000 in kobo
    currency: 'NGN',
    metadata: {
      custom_fields: [
        { display_name: 'Platform', variable_name: 'platform', value: 'OneSearch' },
        { display_name: 'Plan', variable_name: 'plan', value: 'Pro_Lifetime' }
      ]
    },
    onSuccess: async (transaction: { reference: string }) => {
      // 1. Instant client verification call
      await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: transaction.reference }),
      });
      // 2. Trigger in-place unlock
      onSuccess();
    },
    onCancel: () => {
      console.log('Customer cancelled payment popup');
    }
  });
};
```

---

## 13. Cryptographic Security: HMAC SHA512 Webhook Verification

To prevent unauthorized tampering or spoofed payment events, our webhook endpoint computes an HMAC digest on the raw incoming request bytes using Node.js `crypto`:

```typescript
// src/app/api/paystack/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const secret = process.env.PAYSTACK_SECRET_KEY!;
    const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid HMAC signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    if (event.event === 'charge.success') {
      const { reference, customer, amount } = event.data;

      // Verify exact payment amount: 200,000 kobo = ₦2,000 NGN
      if (amount < 200000) {
        console.error('Suspicious payment amount:', amount);
        return NextResponse.json({ error: 'Underpayment' }, { status: 400 });
      }

      const supabase = createAdminClient();

      // 1. Update user profile to Pro
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          is_pro: true,
          pro_unlocked_at: new Date().toISOString(),
          paystack_customer_code: customer.customer_code,
        })
        .eq('email', customer.email);

      if (profileError) {
        console.error('Failed to update profile:', profileError);
      }

      // 2. Insert into payments log table
      await supabase.from('payments').insert({
        paystack_reference: reference,
        paystack_id: event.data.id,
        amount_kobo: amount,
        status: 'success',
        channel: event.data.channel,
        customer_email: customer.email,
        paid_at: event.data.paid_at,
        raw_payload: event.data,
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}
```

---

## 14. Performance Budget & Mobile Optimization for Nigeria

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PERFORMANCE BUDGET TARGETS                            │
├─────────────────────────────────────┬─────────────────┬─────────────────────┤
│ Metric                              │ Budget Target   │ Nigerian Impact     │
├─────────────────────────────────────┼─────────────────┼─────────────────────┤
│ First Contentful Paint (FCP)        │ < 0.9s          │ Immediate text load │
│ Time to Interactive (TTI)           │ < 1.4s          │ Instant search feel │
│ Total JavaScript Bundle (Gzipped)   │ < 120 KB        │ Saves mobile data   │
│ Cumulative Layout Shift (CLS)       │ 0.00            │ No jarring jumps    │
│ Largest Contentful Paint (LCP)      │ < 1.8s          │ High Google ranking │
└─────────────────────────────────────┴─────────────────┴─────────────────────┘
```

### Architectural Rules for Performance:
1. **Next.js System Fonts:** We use `next/font/google` with `display: 'swap'` for Inter and Merriweather. Fonts are downloaded at build time and self-hosted locally from the same origin, eliminating external requests to Google Fonts servers that slow down Nigerian DNS lookups.
2. **Zero External CSS Frameworks:** Pure Tailwind CSS with JIT compilation.
3. **Optimized SVG Icons:** Lucide icons are inlined directly into HTML rather than fetched as remote image assets.

---

## 15. Search Engine Optimization (SEO) & Dynamic OpenGraph Engine

OneSearch is designed to capture massive organic search intent across West Africa for long-tail startup queries.

### Structured Data Implementation (JSON-LD):
Every sector dossier includes an automated `Article` and `Dataset` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Agritech & Food Supply Chain Failure Analysis in Nigeria",
  "description": "Why Farmcrowdy and Thrive Agric collapsed. Root-cause analysis of biological risk, weather covariance, and cold storage deficits.",
  "author": {
    "@type": "Person",
    "name": "OneSearch Founder"
  },
  "publisher": {
    "@type": "Organization",
    "name": "OneSearch",
    "url": "https://onesearch.ng"
  }
}
```

---

## 16. Development Workflow, Linting, & CI/CD Pipelines

### 1. Local Development Setup:
```bash
git clone https://github.com/founder/onesearch.git
cd onesearch
npm install
cp .env.example .env.local
npm run dev
```

### 2. Pre-Commit Quality Checks:
Every push must pass strict linting and typechecking:
```bash
npm run typecheck && npm run lint
```

### 3. Vercel Automated Deployments:
- Pushes to `main` branch trigger automated production deployments.
- Feature branches generate ephemeral preview environments with isolated Vercel edge URLs.

---

*This concludes the complete Technical Stack Architecture Dossier for OneSearch. Ready for engineering execution.*
