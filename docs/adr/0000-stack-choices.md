# ADR 0000: Overall Technology Stack Choices

| Field | Value |
|-------|-------|
| **Status** | Accepted |
| **Date** | 2026-10-01 |
| **Deciders** | Engineering Lead, Product Owner |
| **Ticket** | N/A — Greenfield project |

---

## Context

OneSearch is a content-driven market intelligence platform built specifically for Nigerian and broader African entrepreneurs, SME founders, and business researchers. The platform delivers human-curated sector research reports — covering industries such as agritech, fintech, logistics, FMCG, and real estate — gated behind one-time purchases.

The platform's primary audience is:
- Nigerian entrepreneurs evaluating new market opportunities
- SME founders conducting competitive landscape research
- Investors looking for sector-specific intelligence on African markets
- Consultants who need credible, up-to-date Nigerian market data

### Business Constraints

At the time of architectural decision-making, the following constraints were known and non-negotiable:

1. **Small team:** 1–2 engineers, with limited capacity for DevOps complexity or infrastructure management.
2. **Speed to market:** The MVP needs to go live within 6–8 weeks of development start.
3. **Nigerian payment processing:** The platform must accept Naira (₦) payments from Nigerian users, requiring a locally trusted and regulated payment provider.
4. **Content-first:** The platform is primarily a content delivery system, not a SaaS tool. Database write frequency is low; read frequency is high.
5. **Cost sensitivity:** Infrastructure costs must be minimal (ideally under \$50/month) at the early stage, while retaining a clear growth path.
6. **TypeScript-first:** The engineering team is most productive in TypeScript across the full stack.

### Problem Statement

We need to select a coherent technology stack that:
- Enables fast, SEO-friendly content delivery (sector pages and report summaries must be indexable by Google)
- Supports user authentication and per-user purchase tracking
- Integrates natively with Nigerian payment infrastructure
- Can be operated by a small team without a dedicated DevOps engineer
- Scales from zero to tens of thousands of users without re-architecture

---

## Decision

We will build OneSearch using:

| Layer | Technology | Version/Plan |
|-------|-----------|-------------|
| Frontend framework | **Next.js** | 14 (App Router) |
| Database & Auth | **Supabase** | Pro plan (PostgreSQL 15) |
| Payment processing | **Paystack** | Business account |
| Deployment & hosting | **Vercel** | Pro plan |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |

This combination is sometimes called the **NSPV stack** (Next.js, Supabase, Paystack, Vercel) in the Nigerian tech community, and it has emerged as a particularly effective match for content platforms targeting African markets.

---

## Rationale

### Why Next.js 14 with App Router

Next.js 14 with the App Router is selected as the frontend framework for the following reasons:

**1. Hybrid rendering for content delivery**
Next.js supports static site generation (SSG), server-side rendering (SSR), and incremental static regeneration (ISR) out of the box. For OneSearch:
- Sector landing pages and report preview pages can be statically generated at build time, providing near-instant load times.
- Purchase-gated content can be rendered server-side, ensuring content is never exposed in the HTML source for unauthenticated users.
- ISR allows published reports to be updated without a full rebuild.

**2. SEO performance**
A significant acquisition channel for OneSearch is organic search. Entrepreneurs searching for "Nigeria logistics sector report" or "Nigerian fintech market size" should find OneSearch pages. Next.js's server-rendering capabilities ensure full HTML is delivered to search engine crawlers, unlike a pure client-side SPA.

**3. App Router and React Server Components**
The App Router's React Server Components allow data fetching to happen on the server with zero client-side JavaScript for static content sections. This reduces bundle size and improves First Contentful Paint (FCP) significantly on lower-end Android devices common in Nigeria.

**4. API Routes as a lightweight backend**
Next.js App Router Route Handlers (`app/api/`) serve as the application's lightweight backend for:
- Paystack webhook processing
- Server-side payment verification
- Protected data fetching with the Supabase service role client
This eliminates the need for a separate Express/NestJS backend, reducing infrastructure surface area.

**5. TypeScript and ecosystem maturity**
The Next.js ecosystem has the largest and most mature set of TypeScript integrations, UI libraries, and third-party integrations. The engineering team's TypeScript expertise maps directly to productive development.

### Why Supabase

Supabase is selected as the database, authentication, and storage provider because it provides a complete Backend-as-a-Service (BaaS) built on top of PostgreSQL — the world's most advanced open-source relational database.

**1. PostgreSQL at the core**
PostgreSQL is a production-grade database with decades of stability. Supabase does not reinvent data storage — it wraps Postgres with a developer-friendly API layer. This means:
- Full SQL capability, including complex joins and aggregations for analytics
- JSONB columns for flexible metadata storage on purchases and reports
- Full-text search for report discovery without additional search infrastructure
- Stored procedures and triggers for automation (e.g., auto-creating profile rows on sign-up)

**2. Row Level Security (RLS)**
Supabase's RLS integration is critical for OneSearch's security model. Users must only be able to read their own purchase records. Reports must only be readable if the user has a matching purchase. RLS enforces these constraints at the database level, providing a defence-in-depth layer even if application-level checks are accidentally bypassed.

**3. Integrated authentication**
Supabase Auth provides email/password auth, magic links, OAuth providers, and JWT-based session management. This eliminates the need for a separate auth service (e.g., Auth0, Clerk) and keeps user identity data in the same database as application data, simplifying joins and queries.

**4. No-DevOps operations**
Supabase handles all of the following without any configuration from the engineering team:
- Database backups (daily on Pro plan)
- SSL/TLS for all connections
- Connection pooling via PgBouncer
- Database scaling (compute can be upgraded in the dashboard)
- Security patches

**5. Open-source and portable**
Supabase is open-source. If we ever need to migrate off Supabase, the underlying PostgreSQL database can be exported and run anywhere. There is no proprietary data format lock-in.

### Why Paystack

Paystack is selected as the payment processor for the following reasons:

**1. Native Nigerian market support**
Paystack was founded in Nigeria and built specifically for the Nigerian market. It supports:
- Nigerian Naira (NGN) natively — no currency conversion complexity
- Nigerian bank cards (Verve, Mastercard, Visa)
- USSD payments (for users without internet banking apps)
- Bank transfers (PayWithBank — essential for Nigerian users who may not have card details)

**2. Regulatory compliance**
Paystack is licensed by the Central Bank of Nigeria (CBN) and complies with Nigerian financial regulations. This is non-negotiable for a platform processing Nigerian payments.

**3. Trust among Nigerian users**
Nigerian entrepreneurs recognise and trust the Paystack checkout experience. A familiar payment interface reduces abandonment rates.

**4. Developer-friendly API**
Paystack's API is well-documented, has official Node.js SDK support, and provides:
- Webhook-based async payment confirmation
- Inline checkout popup (no redirect required — preserves user context)
- Transaction metadata for linking payments to users and reports

**5. Competitive fees**
Paystack charges 1.5% + ₦100 per transaction for local cards (capped at ₦2,000). This is competitive for the Nigerian market and affordable for report price points of ₦5,000–₦50,000.

### Why Vercel

Vercel is selected as the deployment platform because:

**1. Zero-config Next.js deployment**
Vercel is built by the same team that builds Next.js. All Next.js features — App Router, Route Handlers, ISR, edge middleware — work without any configuration.

**2. Global CDN**
Static assets, images, and cached pages are served from Vercel's global CDN edge network. Nigerian users will be served from the nearest PoP, minimising latency.

**3. Preview deployments**
Every Git pull request automatically gets a preview deployment URL. This enables stakeholders to review changes before they go to production without any CI/CD configuration.

**4. Managed infrastructure**
Vercel handles SSL, DNS configuration, server maintenance, and scaling automatically. A small team cannot afford to manage infrastructure manually.

**5. Analytics and observability built-in**
Vercel Web Analytics and Speed Insights provide real-user performance data with zero configuration. Core Web Vitals monitoring is essential for the Nigerian mobile user base.

---

## Consequences

### Positive Consequences

- **Fast time to market:** The NSPV stack is well-documented, has a large community, and the engineering team has existing familiarity. This reduces ramp-up time significantly.
- **Minimal operational burden:** No servers to manage, no databases to patch, no SSL certificates to renew. All handled by Supabase and Vercel.
- **SEO-optimised from day one:** Next.js's hybrid rendering ensures search engine indexability without additional configuration.
- **Nigerian payment UX:** Paystack's inline checkout provides a familiar, trusted experience for the target audience.
- **Cost-effective at small scale:** Supabase free tier + Vercel Hobby plan means essentially \$0/month during development and initial launch.
- **Growth path exists:** All three platforms (Supabase, Vercel, Paystack) have clear upgrade paths as traffic and revenue grow.
- **Open standards:** PostgreSQL, TypeScript, and standard HTTP webhooks mean no exotic vendor lock-in.

### Negative Consequences

- **Supabase free tier limitations:** The free tier pauses inactive projects after 1 week. Production must be on the Pro plan (\$25/month). This is an acceptable and known cost.
- **Vercel serverless function cold starts:** Infrequently-called Route Handlers (e.g., webhook endpoints) may experience cold start latency. For webhooks, this is acceptable since the response is asynchronous.
- **Paystack live account approval delay:** Paystack requires business verification before activating live payments. This can take 1–3 business days, which must be accounted for in the launch timeline.
- **Next.js App Router maturity:** As of 2024, the App Router is relatively new. Some third-party libraries do not yet support Server Components. This requires careful evaluation of dependencies.
- **Vendor dependency:** Relying on three external SaaS providers introduces operational risk if any provider experiences downtime. Mitigation: monitor all three services and maintain a rollback plan.

---

## Alternatives Considered

### Database: PlanetScale (MySQL) or Neon (Postgres)

Both are serverless relational database options. Rejected because:
- Neither provides integrated authentication out of the box
- PlanetScale has since moved away from its free tier
- Supabase provides more value (Auth + Storage + Realtime) in a single platform

### Authentication: Clerk or Auth0

Both are mature authentication-as-a-service providers. Rejected because:
- Adding a separate auth service increases architectural complexity and cost
- Supabase Auth is sufficient for OneSearch's requirements
- Keeping auth in Supabase simplifies database relationships (user ID is the same UUID across auth and application tables)

### Payment: Flutterwave or Squad

Both are valid Nigerian payment processors. Rejected because:
- Paystack has the most mature and well-documented developer API among Nigerian processors
- Paystack's inline checkout popup is widely recognised and trusted by Nigerian users
- Paystack's webhook reliability is well-documented

### Deployment: Railway, Render, or Fly.io

Valid alternatives for deploying containerised Node.js applications. Rejected because:
- None offer the same zero-config Next.js experience as Vercel
- Preview deployments on these platforms require additional CI/CD configuration
- Vercel's integration with Next.js ensures all framework features work correctly

### Frontend: Remix or SvelteKit

Both are modern full-stack frameworks with server-rendering capability. Rejected because:
- Next.js has a significantly larger ecosystem of integrations and community support
- The engineering team has existing Next.js expertise
- Supabase's official SSR helpers (`@supabase/ssr`) have first-class Next.js support

---

## Review Schedule

This ADR should be reviewed when any of the following occur:
- Monthly active users exceed 50,000
- Monthly database size exceeds 8GB
- Supabase, Vercel, or Paystack introduces breaking pricing changes
- A critical security vulnerability is discovered in a core dependency

---

*Maintained by the OneSearch engineering team.*
