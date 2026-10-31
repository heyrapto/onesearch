# ADR 0003: Version-Controlled Static Content Architecture Over Headless CMS

- **Status:** Accepted
- **Deciders:** Founding Engineering & Editorial Team
- **Date:** 2025-10-29
- **Technical Context:** Next.js 14 App Router, TypeScript Data Seed Files, PostgreSQL

---

## 1. Context and Problem Statement

Content-heavy web applications typically adopt an external Headless Content Management System (such as Contentful, Sanity.io, Strapi, or Prismic) to manage articles and editorial data. 

While Headless CMS platforms provide non-technical editors with a web-based text editor, introducing an external CMS into OneSearch creates serious operational and financial liabilities:
1. **Unnecessary Operational Costs Billed in USD:** Headless CMS platforms charge $99 to $299/month in USD for multi-user tiers and high API bandwidth. In an environment with a devaluing Naira, foreign SaaS subscriptions represent a major drain on early-stage cash flow.
2. **Runtime Latency & API Point of Failure:** Every page request or build step must make external HTTP calls to third-party CMS API endpoints. If the CMS experiences latency spikes or downtime, our Next.js edge builds fail and content rendering stutters.
3. **Loss of Git Version Control & Pull Request Audits:** Editorial edits in a third-party CMS happen out-of-band without Git commit histories, branch reviews, or automated pull-request validation. For an intelligence platform where empirical accuracy and data verification are paramount, unversioned content updates introduce fact-checking risks.

---

## 2. Decision

We have decided to reject third-party Headless CMS platforms in favor of a **Git-Versioned Static Content Architecture Seeded into PostgreSQL**:

1. **Local Markdown & TypeScript Dossier Files:** The source of truth for all 18 sector research dossiers and the 100+ research papers resides directly within the Git repository (`docs/SECTOR_RESEARCH.md`, `docs/RESEARCH_PAPERS.md`, and `src/data/sectors.ts`).
2. **Automated Database Seeding:** Clean Node.js seed scripts parse the static data models and synchronize them into the Supabase PostgreSQL `sectors` and `sector_analyses` tables.
3. **Next.js Server Components & ISR:** Next.js statically renders pages at build time using Incremental Static Regeneration (ISR), serving cached HTML directly from Vercel’s global edge nodes with sub-50ms latency.
4. **Editorial Workflow via Git Pull Requests:** Any content update, new failure case study, or regulatory adjustment is proposed via a Git branch, reviewed through pull requests, and deployed automatically via Vercel CI/CD.

---

## 3. Decision Drivers

- **Zero Monthly SaaS Hosting Costs:** Eliminates hundreds of dollars in recurring CMS subscription expenses.
- **Maximum Edge Performance:** Zero external API hops during rendering; static HTML is served instantly from local edge caches.
- **Strict Audit Trails & Reviewability:** Every edit, sentence modification, and number adjustment has an immutable Git commit hash and author attribution.
- **Offline Authoring:** The founder and research team can write, edit, and review research dossiers in their local markdown editor (VS Code, Obsidian) on flights or during power outages without requiring internet access.

---

## 4. Considered Alternatives

### Alternative A: Sanity.io / Contentful Headless CMS
- **Why Rejected:** 
  - Adds a third-party API dependency that can block Vercel edge builds.
  - Adds USD subscription costs that scale with API request volume.
  - Complicates database relationships between users, payments, and gated sector analyses.

### Alternative B: WordPress with REST API / GraphQL Backend
- **Why Rejected:** 
  - Requires maintaining a separate PHP/MySQL server stack.
  - Inherently vulnerable to WordPress security exploits and plugin bloat.
  - High latency compared to modern static edge generation.

---

## 5. Consequences and Technical Trade-offs

### Positive Consequences:
- **Instantaneous Load Times:** Pages load in sub-100ms across West Africa.
- **Total Data Ownership:** The research content cannot be held hostage by a third-party SaaS provider or deleted due to an expired credit card.
- **Seamless Database Synchronization:** Content schema aligns perfectly with Supabase PostgreSQL types and Row Level Security policies.

### Negative Consequences / Mitigations:
- **Non-Technical Editors Cannot Edit via Web UI:** Making an edit requires committing markdown to a Git repository.
  - *Mitigation:* The primary researcher and founder is a technical operator comfortable with Git and markdown. For non-technical guest contributors, submissions are accepted via Google Docs or Substack and converted into markdown by the core team.

---

## 6. Implementation References

- `src/data/sectors.ts` — Canonical TypeScript sector seed data.
- `docs/SECTOR_RESEARCH.md` — Source research intelligence dossier.
- `docs/CONTENT_GUIDE.md` — Database JSON ingestion schema.
