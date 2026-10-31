# ADR 0005: Public Unrestricted Sector Exploration Without Upfront Authentication

- **Status:** Accepted
- **Deciders:** Founding Product & Growth Team
- **Date:** 2025-10-29
- **Technical Context:** Next.js Server Components, Client Routing, Conversion Funnels

---

## 1. Context and Problem Statement

A common design pattern in proprietary intelligence and market research portals (e.g. Gartner, Statista, PitchBook) is to force users to create a free account or submit a business email before granting access to even the basic sector directory or top-level summaries.

When applied to early-stage African tech founders and independent builders, upfront authentication walls create severe friction:
1. **Immediate Bounce Rate:** Over 55% of casual visitors immediately bounce when confronted with a mandatory sign-up form before seeing any proof of platform value.
2. **Burner Email Accounts:** Users frequently submit fake or disposable email addresses (`test@mailinator.com`) simply to bypass the wall, degrading user database quality.
3. **SEO De-Indexing Risk:** Content hidden behind mandatory login walls cannot be crawled or indexed by Google search bots, destroying organic search engine acquisition.

---

## 2. Decision

We have decided that **the exploration portal (`/explore`) will be 100% public, open, and accessible to anyone on Earth without creating an account or logging in**:

1. **Unrestricted Directory Access:** Any visitor can browse all 18 sectors, use real-time search, apply category and status filter pills, and review every sector's summary, status badge, risk gauge, and public insight.
2. **Unrestricted Sector Overview Access:** Visitors can click into any sector dossier (`/explore/[slug]`) and read the complete public overview section without being prompted to sign in.
3. **Selective Gating on Pro Analysis Only:** Authentication is triggered **only** when the user actively attempts to unlock the Pro in-depth analysis (failure autopsies, unit economics models, and market gap blueprints).

---

## 3. Decision Drivers

- **Immediate Value Demonstration:** We establish credibility and trust immediately upon landing.
- **Organic SEO Supremacy:** Next.js Server Components serve rich semantic HTML for all 18 sector overviews, allowing Google to index keywords like *"Nigerian fintech market size"*, *"Edtech failure rates Lagos"*, and *"Cold storage agritech Nigeria"*.
- **Higher Intent Pro Conversion:** By the time a user encounters the ₦2,000 Pro Gate, they have already experienced the quality of our research and are genuinely motivated to unlock the full strategic dossier.

---

## 4. Consequences and Technical Trade-offs

### Positive Consequences:
- **Zero Friction Entry:** 100% of landing page visitors can click "Explore" and start learning in 1 second.
- **Maximum Social Shareability:** Links to `/explore` or specific sectors shared in WhatsApp groups or Twitter render rich OpenGraph previews and can be read immediately by recipients.
- **Clean Lead Quality:** Users who actually create accounts are high-intent builders ready to transact.

### Negative Consequences / Mitigations:
- **Free Users Can Scrape Public Summaries:**
  - *Acceptable Trade-off:* The public summaries are high-level overviews meant to educate the public. The proprietary tactical intelligence (unit economics, autopsies, market gaps) remains securely gated behind Paystack and Supabase RLS.

---

## 5. Implementation References

- `src/app/explore/page.tsx` — Public exploration page.
- `src/app/explore/[slug]/page.tsx` — Sector detail page with public preview and gated pro section.
- `docs/PRODUCT_VISION.md` — The exploration-first product philosophy.
