# ADR 0001: Modal-Only Authentication UX Over Dedicated Auth Pages

- **Status:** Accepted
- **Deciders:** Founding Engineering & Product Team
- **Date:** 2025-10-29
- **Technical Context:** Next.js 14 (App Router), Supabase Auth, React Context

---

## 1. Context and Problem Statement

In standard SaaS and e-commerce applications, user authentication is typically structured around dedicated routes:
- `/login` (Sign In page)
- `/signup` or `/register` (Registration page)
- `/dashboard` (Post-login user portal)

When a user browsing an article decides to log in or upgrade to a paid tier, they click a button and are redirected to `/login`. Upon successful credential entry, the application redirects them to an empty `/dashboard`, completely disconnecting them from the article or sector dossier they were actively reading.

In the Nigerian and broader African context, this flow introduces catastrophic conversion friction:
1. **Network Retries on Full Navigation:** Mobile data networks in Nigeria (MTN, Airtel, Glo) often experience packet loss and latency spikes during complete page navigations. Forcing two full page redirects (`/explore/[slug]` → `/login` → `/dashboard`) increases the likelihood of a connection drop or white-screen freeze.
2. **Context Loss:** When an entrepreneur is researching a complex sector like *Agritech* or *Fintech*, their mental momentum is fragile. Redirecting them to a generic dashboard causes confusion: *"Where is the report I was just reading?"*
3. **Empty Dashboard Anti-Pattern:** OneSearch is an editorial intelligence platform, not a project management tool. A user has no tasks, no team members, and no kanban boards to manage. Forcing a dashboard creates an empty, purposeless UI space.

---

## 2. Decision

We have decided to eliminate dedicated `/login` and `/signup` routes and ban the `/dashboard` page entirely. 

Instead, OneSearch will utilize an **In-Place Modal-Only Authentication Architecture**:
1. **Universal Modal Shell (`AuthModal.tsx`):** All authentication interactions (Sign In, Create Account) occur inside a clean, high-contrast modal dialog that overlays the current screen.
2. **Context Preservation:** The background page remains visible and blurred beneath the modal backdrop. The user's exact scroll position is preserved.
3. **Silent State Hydration:** Upon successful credential submission via the Supabase client, the modal silently unmounts, the global `AuthProvider` state refreshes in-place, and the active page re-evaluates permissions without a full browser reload.
4. **Direct Action Continuation:** If the user triggered authentication by clicking "Unlock for ₦2,000" on a pro gate, the closing of the auth modal immediately triggers the Paystack inline payment popup without requiring another user click.

---

## 3. Decision Drivers

- **Zero Lost Reading Context:** Builders never lose the research dossier they are reading.
- **Conversion Optimization:** Reducing authentication from a 3-page journey to a 10-second modal popup maximizes conversion into the ₦2,000 Paystack Pro gate.
- **Mobile Friendliness:** Works seamlessly inside mobile social WebViews (Twitter, WhatsApp, LinkedIn) where full-page URL redirects frequently fail or trigger security alerts.
- **Minimal Code Surface:** Eliminates boilerplate page layouts, redirect logic, and empty dashboard components.

---

## 4. Considered Alternatives

### Alternative A: Dedicated `/login` and `/signup` Pages with `?next=` Redirect Query Params
- **Description:** Traditional web architecture where `/login?next=/explore/fintech` redirects back to the original URL upon success.
- **Why Rejected:** 
  - Causes full browser navigation cycles and asset re-parsing on slow 3G networks.
  - Leaves ugly URL parameters that break if the user navigates between tabs.
  - Browser back-button history gets polluted with authentication hops.

### Alternative B: Dedicated `/dashboard` as the Central User Hub
- **Description:** Directing all paying users to a personal dashboard displaying their active subscription status, reading history, and bookmarks.
- **Why Rejected:** 
  - Over-engineering for a platform that charges a single, one-time ₦2,000 fee.
  - Distracts from the primary value: reading sector research. The exploration page (`/explore`) already serves as the ultimate catalog and home for all intelligence.

---

## 5. Consequences and Technical Trade-offs

### Positive Consequences:
- **Instantaneous Interaction:** Auth modal opens in 0ms with zero network requests.
- **Seamless Checkout Pipeline:** Reading → Modal Auth → Paystack Popup → Content Unblurred, all on the same screen in under 30 seconds.
- **Clean Browser History:** The browser's Back and Forward buttons always navigate through real sector dossiers rather than login redirect chains.
- **Simplified Next.js Routing:** No complex protected route groups or nested dashboard layouts.

### Negative Consequences / Mitigations:
- **Direct Linking Limitation:** Users cannot be sent a direct link to a `/login` page via email.
  - *Mitigation:* If a user clicks an external link with an auth intent (e.g. `/?auth=signin`), the root layout automatically detects the query parameter and opens the `AuthModal` on mount.
- **State Synchronization Overhead:** The client must listen to Supabase `onAuthStateChange` events to re-render in-place components.
  - *Mitigation:* Encapsulated cleanly inside `AuthProvider.tsx` with zero component-level re-render thrashing.

---

## 6. Implementation References

- `src/components/auth/AuthModal.tsx` — Clean centered modal component.
- `src/components/auth/AuthProvider.tsx` — Global session state management.
- `docs/AUTH_GUIDE.md` — Complete engineering guide for modal authentication.
