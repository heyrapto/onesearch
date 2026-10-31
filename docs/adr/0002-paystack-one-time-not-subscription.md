# ADR 0002: One-Time Paystack ₦2,000 Micro-Unlock Over Recurring Subscriptions

- **Status:** Accepted
- **Deciders:** Founding Engineering & Commercial Team
- **Date:** 2025-10-29
- **Technical Context:** Paystack Inline JS, Supabase Webhooks, Nigerian Banking Rails

---

## 1. Context and Problem Statement

When monetizing digital content and market research platforms, founders typically default to the standard Western SaaS recurring subscription paradigm: charging $10–$25/month or ₦5,000–₦15,000/month recurring card debits.

However, deploying recurring debit subscriptions in the Nigerian and broader West African market encounters severe structural failure modes:
1. **The Involuntary Debit Failure Wall:** Over 40% of automated recurring card debit attempts in Nigeria fail. Commercial banks (GTBank, Zenith, Access, First Bank) frequently decline automated recurring token charges unless the cardholder completes real-time two-factor SMS OTP authentication.
2. **Subscription Panic & Consumer Paranoia:** Nigerian digital consumers exhibit deep skepticism toward recurring billing authorizations. High bank maintenance fees, stamp duties, and fear of unauthorized account drains cause users to actively reject platforms that demand ongoing recurring billing permissions.
3. **Card Balance Volatility:** The majority of Nigerian consumers do not leave large buffers in their debit-card-linked accounts due to fear of POS cloning fraud. When a monthly subscription attempts to renew, the card has insufficient funds, causing instant cancellation.
4. **Foreign Currency Exclusions:** Due to persistent foreign exchange shortages, the Central Bank of Nigeria historically restricted or banned international card transactions in USD, making dollar-denominated platforms (Stripe, Lemon Squeezy, Paddle) unusable for over 90% of domestic Nigerian debit cards.

---

## 2. Decision

We have decided to reject recurring subscription models and instead implement a **One-Time Sachet Micro-Unlock of ₦2,000 (roughly $1.30 USD) via Paystack for Lifetime Pro Access**:

1. **One-Time Charge:** The user pays exactly ₦2,000 once. Their card is never tokenized for future automated debits.
2. **Lifetime Pro Access:** Once unlocked, the user retains permanent access to all present and future sector dossiers and forensic failure autopsies.
3. **Sovereign Payment Infrastructure:** We integrate directly with Paystack, allowing customers to pay via:
   - Domestic Nigerian Debit Cards (Mastercard, Visa, Verve).
   - Dynamic Bank Transfer (instant virtual account transfer from Opay, Kuda, GTBank).
   - USSD banking codes (*737#, *894#).
4. **Serverless Webhook Reconciliation:** Transaction verification executes asynchronously via HMAC SHA512 signed webhooks.

---

## 3. Decision Drivers

- **Zero Involuntary Churn:** Eliminates 100% of failed subscription renewals and expired card tokenization headaches.
- **Maximized Top-of-Funnel Conversion:** ₦2,000 is an accessible impulse purchase (the cost of a lunch meal), removing price resistance for students, engineers, and early-stage founders.
- **Universal Domestic Acceptance:** 100% of Nigerian commercial bank cards and virtual banking accounts can process Naira transactions on Paystack with zero FX conversion barriers.
- **High Cash Flow Predictability:** Revenue is collected upfront in full, delivering positive cash flow without ongoing payment chasing.

---

## 4. Considered Alternatives

### Alternative A: ₦5,000/Month Recurring Subscription via Paystack Subscriptions API
- **Why Rejected:** 
  - Would experience 40%+ monthly renewal decline rates.
  - Requires building complex failed-payment retry engines, dunning emails, and subscription management portals.
  - Nigerian consumers would cancel within 5 minutes of sign-up to prevent month-2 debits.

### Alternative B: Stripe Billing Denominated in USD ($5.00/month)
- **Why Rejected:** 
  - Excludes the vast majority of local Nigerian founders whose Naira debit cards cannot transact in USD.
  - Stripe does not support direct Nigerian bank transfers or local USSD rails.
  - Unfavorable exchange rate spreads alienate domestic builders.

---

## 5. Consequences and Technical Trade-offs

### Positive Consequences:
- **Zero Customer Support Churn:** Users never email asking for subscription cancellations or chargebacks.
- **High Goodwill & Organic Virality:** Lifetime access fosters intense community loyalty; users eagerly share OneSearch with friends.
- **Simplified Database Schema:** `profiles.is_pro` is a simple boolean flag rather than a complex `subscription_period_end` timestamp with grace periods.
- **Near-Zero Operating Overhead:** Webhook handler runs serverless on Vercel and executes in under 200ms.

### Negative Consequences / Mitigations:
- **Lower Theoretical Long-Term LTV per User:** A user pays once rather than paying 12 times a year.
  - *Mitigation:* In Nigeria, real-world subscription retention rarely exceeds 2.1 months. Collecting ₦2,000 guaranteed upfront yields higher realized net cash flow than theoretical recurring revenue that never converts.
  - *Future Upsells:* Advanced institutional datasets, B2B cohort licenses, and custom advisory services provide high-ticket expansion revenue.

---

## 6. Implementation References

- `src/lib/paystack.ts` — Paystack Inline SDK loader and transaction parameters.
- `src/app/api/paystack/webhook/route.ts` — Cryptographic HMAC SHA512 webhook handler.
- `docs/MONETIZATION.md` — Complete financial model and payment psychology analysis.
