# OneSearch Design System

> **Version:** 1.0.0
> **Last Updated:** October 2026
> **Maintainer:** OneSearch Design Team
> **Platform:** Nigerian/African Market Intelligence Platform

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography System](#3-typography-system)
4. [Spacing System](#4-spacing-system)
5. [Component Specifications](#5-component-specifications)
   - 5.1 [Navigation Bar](#51-navigation-bar)
   - 5.2 [Hero Section](#52-hero-section)
   - 5.3 [Sector Cards](#53-sector-cards)
   - 5.4 [Status Badges](#54-status-badges)
   - 5.5 [Pro Gate Overlay](#55-pro-gate-overlay)
   - 5.6 [Auth Modal](#56-auth-modal)
   - 5.7 [Filter / Category Tabs](#57-filter--category-tabs)
   - 5.8 [Landing Page Sections](#58-landing-page-sections)
   - 5.9 [Footer](#59-footer)
6. [Iconography](#6-iconography)
7. [Motion & Animation Guidelines](#7-motion--animation-guidelines)
8. [Responsive Design](#8-responsive-design)
9. [Dark Mode Consideration](#9-dark-mode-consideration)
10. [Accessibility](#10-accessibility)
11. [Pro Content Visual Treatment](#11-pro-content-visual-treatment)
12. [Logo & Brand Guidelines](#12-logo--brand-guidelines)

---

## 1. Design Philosophy

### 1.1 Core Principles

OneSearch is built on the belief that **African market intelligence should be as clean, rigorous, and authoritative as the best academic research — but approachable and immediately actionable.** Every design decision flows from this mandate.

The platform's visual language draws from three primary inspirations:

- **Editorial journalism** (The Economist, Rest of World) — structured, typography-led, data-respecting
- **Academic research publishing** — careful use of white space, structured hierarchy, citation culture
- **Modern SaaS dashboards** — intuitive interaction patterns, progressive disclosure of complexity

The result is a UI that feels simultaneously **trustworthy and modern**: not a flashy startup, not a boring spreadsheet — a serious tool for serious entrepreneurs.

### 1.2 Design Values

#### Clarity Over Cleverness
Every element earns its place. We do not decorate; we communicate. If a visual element does not help the user understand market data faster, it does not belong on the screen.

#### Data Dignity
African market data has historically been dismissed or buried. Our design choices — the editorial weight, the structured card system, the clear citation culture — all signal: *this information matters and was rigorously gathered.*

#### Progressive Disclosure
Not every user needs all information immediately. Free users see enough to understand the value; Pro users unlock depth. The visual system must make this transition feel natural, not punitive.

#### Warmth Through Restraint
The color accents (red, green, yellow, purple) are used sparingly against a near-white canvas. This restraint makes the colors feel purposeful and meaningful rather than decorative — each color carries a specific semantic signal.

#### Speed of Comprehension
A user scanning the explore page should be able to understand the health of an entire sector (name, status, key insight) within 2–3 seconds per card. Design must optimize for rapid comprehension before depth exploration.

### 1.3 What We Avoid

- **Gradients** on text or primary backgrounds (except extremely subtle background washes)
- **Heavy drop shadows** — use 1px borders or very light shadows only
- **Decorative illustrations** — the data itself is the visual
- **Emoji in UI components** (acceptable in user-generated content only)
- **Centered body copy blocks** longer than two lines
- **Auto-playing video or audio**
- **Cluttered navigation** with more than 4 top-level items

---

## 2. Color System

### 2.1 Color Philosophy

The OneSearch palette is deliberately minimal. White dominates. Near-black text provides maximum readability. The four accent colors — red, green, yellow, purple — are a semantic system, not a decorative one. Every time a user sees purple, they know it means Pro. Every time they see green on a sector card, they know that sector is performing well. Color consistency builds trust.

### 2.2 Primary Colors

```css
/* === PRIMARY PALETTE === */

--color-background:       #FFFFFF;   /* Page background, card backgrounds */
--color-surface:          #FAFAFA;   /* Slightly off-white for subtle section contrast */
--color-surface-raised:   #F5F5F5;   /* Raised elements, hover states on neutrals */

--color-text-primary:     #0A0A0A;   /* Headlines, primary body copy */
--color-text-secondary:   #404040;   /* Supporting copy, metadata */
--color-text-muted:       #737373;   /* Timestamps, labels, placeholders */
--color-text-disabled:    #A3A3A3;   /* Disabled states */
--color-text-inverse:     #FFFFFF;   /* Text on dark or colored backgrounds */
```

### 2.3 Accent Colors — Semantic Signals

```css
/* === RED — Danger, Failed Sectors, Critical Alerts, Primary CTAs === */
--color-red-50:           #FEF2F2;
--color-red-100:          #FEE2E2;
--color-red-200:          #FECACA;
--color-red-500:          #EF4444;
--color-red-600:          #DC2626;   /* Primary red — CTAs, failed status */
--color-red-700:          #B91C1C;
--color-red-900:          #7F1D1D;

/* Tailwind: bg-red-600, text-red-600, border-red-200, bg-red-50 */

/* === GREEN — Succeeding Sectors, Positive Signals, Success States === */
--color-green-50:         #F0FDF4;
--color-green-100:        #DCFCE7;
--color-green-200:        #BBF7D0;
--color-green-500:        #22C55E;
--color-green-600:        #16A34A;   /* Primary green — succeeding status */
--color-green-700:        #15803D;
--color-green-900:        #14532D;

/* Tailwind: bg-green-600, text-green-600, border-green-200, bg-green-50 */

/* === YELLOW — Caution, Medium Risk, Opportunity Signal, Struggling === */
--color-yellow-50:        #FEFCE8;
--color-yellow-100:       #FEF9C3;
--color-yellow-200:       #FEF08A;
--color-yellow-500:       #EAB308;
--color-yellow-600:       #CA8A04;   /* Primary yellow — struggling/caution */
--color-yellow-700:       #A16207;
--color-yellow-900:       #713F12;

/* Tailwind: bg-yellow-600, text-yellow-600, border-yellow-200, bg-yellow-50 */

/* === PURPLE — Pro/Premium Content, Special Tags, Upgrade Prompts === */
--color-purple-50:        #FAF5FF;
--color-purple-100:       #F3E8FF;
--color-purple-200:       #E9D5FF;
--color-purple-500:       #A855F7;
--color-purple-600:       #9333EA;
--color-purple-700:       #7C3AED;   /* Primary purple — Pro tier */
--color-purple-900:       #4C1D95;

/* Tailwind: bg-purple-700, text-purple-700, border-purple-200, bg-purple-50 */
```

### 2.4 Neutral Grays

```css
/* === NEUTRAL GRAYS — borders, dividers, subtle backgrounds === */
--color-gray-50:          #FAFAFA;
--color-gray-100:         #F5F5F5;
--color-gray-200:         #E5E5E5;   /* Default border color */
--color-gray-300:         #D4D4D4;   /* Dividers, subtle separators */
--color-gray-400:         #A3A3A3;
--color-gray-500:         #737373;
--color-gray-600:         #525252;
--color-gray-700:         #404040;
--color-gray-800:         #262626;
--color-gray-900:         #171717;
--color-gray-950:         #0A0A0A;   /* Near-black primary text */
```

### 2.5 Semantic Color Usage Map

| Context | Color Token | Tailwind Class |
|---|---|---|
| Page background | `--color-background` | `bg-white` |
| Section background (alt) | `--color-surface` | `bg-gray-50` |
| Primary text | `--color-text-primary` | `text-gray-950` |
| Secondary text | `--color-text-secondary` | `text-gray-700` |
| Muted/meta text | `--color-text-muted` | `text-gray-500` |
| Default border | `--color-gray-200` | `border-gray-200` |
| Sector: Succeeding | `--color-green-600` | `text-green-600` / `bg-green-50` |
| Sector: Struggling | `--color-yellow-600` | `text-yellow-600` / `bg-yellow-50` |
| Sector: Failed | `--color-red-600` | `text-red-600` / `bg-red-50` |
| Pro badge / gate | `--color-purple-700` | `text-purple-700` / `bg-purple-50` |
| Primary CTA | `--color-red-600` | `bg-red-600 text-white` |
| Primary CTA hover | `--color-red-700` | `hover:bg-red-700` |
| Link color | `--color-gray-950` | `text-gray-950 underline` |
| Focused input border | `--color-gray-950` | `focus:border-gray-950` |
| Error state | `--color-red-600` | `text-red-600 border-red-300` |
| Success state | `--color-green-600` | `text-green-600 border-green-300` |

### 2.6 Color Contrast Compliance

All text/background combinations must meet WCAG 2.1 AA (4.5:1 minimum for body text, 3:1 for large text).

| Combination | Ratio | Pass |
|---|---|---|
| `#0A0A0A` on `#FFFFFF` | 19.5:1 | ✅ AAA |
| `#DC2626` on `#FFFFFF` | 4.6:1 | ✅ AA |
| `#16A34A` on `#FFFFFF` | 4.5:1 | ✅ AA |
| `#CA8A04` on `#FFFFFF` | 3.1:1 | ⚠️ AA Large only |
| `#7C3AED` on `#FFFFFF` | 5.9:1 | ✅ AA |
| `#FFFFFF` on `#DC2626` | 4.6:1 | ✅ AA |
| `#FFFFFF` on `#7C3AED` | 5.9:1 | ✅ AA |
| `#CA8A04` on `#FEF9C3` | 2.4:1 | ❌ — avoid body text |

> **Note on Yellow:** Yellow on white fails at small sizes. Always pair yellow text with a yellow-50 background, or use yellow only for badges (large, bold text) and decorative borders — never for small body copy on white.

---

## 3. Typography System

### 3.1 Font Stack

OneSearch uses a dual-font strategy: a geometric sans-serif for body/UI and an optional serif for large editorial headings.

```css
/* Primary: Inter — clean, legible, designed for screens */
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Editorial: Playfair Display — serif gravitas for hero headlines only */
--font-serif: 'Playfair Display', 'Georgia', 'Times New Roman', serif;

/* Monospace: JetBrains Mono — for data, codes, small tags */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>
```

**Next.js (preferred approach):**
```tsx
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['700', '800'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
});
```

### 3.2 Type Scale

Base unit: `16px` (1rem). Scale follows a modular ratio of approximately 1.25.

```css
/* === TYPE SCALE === */
--text-xs:   0.75rem;    /* 12px — labels, timestamps, micro-copy */
--text-sm:   0.875rem;   /* 14px — supporting body, captions */
--text-base: 1rem;       /* 16px — primary body copy */
--text-lg:   1.125rem;   /* 18px — lead paragraphs, emphasized body */
--text-xl:   1.25rem;    /* 20px — card titles, section intros */
--text-2xl:  1.5rem;     /* 24px — sub-headings (H3) */
--text-3xl:  1.875rem;   /* 30px — section headings (H2) */
--text-4xl:  2.25rem;    /* 36px — page titles (H1) */
--text-5xl:  3rem;       /* 48px — hero display copy */
--text-6xl:  3.75rem;    /* 60px — hero super-display (desktop only) */
```

### 3.3 Font Weights

```css
--font-normal:   400;   /* Body copy, descriptions */
--font-medium:   500;   /* Labels, navigation, button text */
--font-semibold: 600;   /* Card titles, emphasized text */
--font-bold:     700;   /* Headings, strong emphasis */
--font-extrabold: 800;  /* Hero headlines (Playfair only) */
```

### 3.4 Line Heights

```css
--leading-none:    1;      /* Display text, very large headings */
--leading-tight:   1.25;   /* Headings (H1, H2) */
--leading-snug:    1.375;  /* Card titles, sub-headings */
--leading-normal:  1.5;    /* Standard body copy */
--leading-relaxed: 1.625;  /* Long-form content, analysis paragraphs */
--leading-loose:   2;      /* Pull quotes, highlighted text */
```

### 3.5 Letter Spacing

```css
--tracking-tighter: -0.05em;   /* Large serif display headings */
--tracking-tight:   -0.025em;  /* H1, H2 sans-serif headings */
--tracking-normal:  0em;       /* Body copy */
--tracking-wide:    0.025em;   /* Small UI labels, nav items */
--tracking-wider:   0.05em;    /* Uppercase badges, category labels */
--tracking-widest:  0.1em;     /* All-caps small decorative labels */
```

### 3.6 Heading Hierarchy

```css
/* H1 — Page title, hero headline */
h1 {
  font-family: var(--font-serif);   /* Playfair Display */
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-text-primary);
}

/* H2 — Section headings */
h2 {
  font-family: var(--font-sans);    /* Inter */
  font-size: clamp(1.5rem, 3vw, 1.875rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* H3 — Card titles, subsection headings */
h3 {
  font-family: var(--font-sans);
  font-size: 1.25rem;               /* 20px */
  font-weight: 600;
  line-height: 1.375;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}

/* H4 — Sub-card headings, sidebar titles */
h4 {
  font-family: var(--font-sans);
  font-size: 1rem;                  /* 16px */
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  color: var(--color-text-primary);
}

/* Category label (small caps treatment) */
.label-category {
  font-family: var(--font-sans);
  font-size: 0.75rem;               /* 12px */
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
```

### 3.7 Tailwind Typography Configuration

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'var(--font-serif)', 'Georgia', 'serif'],
        mono:  ['JetBrains Mono', 'var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1rem' }],
        'sm':   ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem',     { lineHeight: '1.5rem' }],
        'lg':   ['1.125rem', { lineHeight: '1.75rem' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75rem' }],
        '2xl':  ['1.5rem',   { lineHeight: '2rem' }],
        '3xl':  ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl':  ['2.25rem',  { lineHeight: '2.5rem' }],
        '5xl':  ['3rem',     { lineHeight: '1.15' }],
        '6xl':  ['3.75rem',  { lineHeight: '1.1' }],
      },
    },
  },
};
```

---

## 4. Spacing System

### 4.1 Base Unit

All spacing in OneSearch is based on a **4px base unit**. This ensures consistent rhythm throughout the layout.

```css
/* === SPACING SCALE (4px base) === */
--space-0:   0px;
--space-px:  1px;
--space-0.5: 2px;
--space-1:   4px;    /* Base unit */
--space-1.5: 6px;
--space-2:   8px;
--space-2.5: 10px;
--space-3:   12px;
--space-3.5: 14px;
--space-4:   16px;
--space-5:   20px;
--space-6:   24px;
--space-7:   28px;
--space-8:   32px;
--space-9:   36px;
--space-10:  40px;
--space-12:  48px;
--space-14:  56px;
--space-16:  64px;
--space-20:  80px;
--space-24:  96px;
--space-32:  128px;
--space-40:  160px;
--space-48:  192px;
--space-64:  256px;
```

### 4.2 Spacing Application Guide

| Use Case | Value | Tailwind |
|---|---|---|
| Inside a badge | 2px 8px | `py-0.5 px-2` |
| Icon-to-text gap | 6px–8px | `gap-1.5` or `gap-2` |
| Card internal padding | 20px–24px | `p-5` or `p-6` |
| Card-to-card gap | 16px–24px | `gap-4` or `gap-6` |
| Section vertical padding | 64px–96px | `py-16` or `py-24` |
| Nav height | 64px | `h-16` |
| Page max-width | 1200px | `max-w-[1200px]` |
| Page horizontal padding | 24px (mobile) / 48px (desktop) | `px-6 md:px-12` |
| Card grid max columns | 3 | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |

### 4.3 Border Radius

```css
--radius-none: 0;
--radius-sm:   2px;    /* Very subtle rounding */
--radius-md:   6px;    /* Buttons, inputs, badges */
--radius-lg:   10px;   /* Cards */
--radius-xl:   16px;   /* Modals, large containers */
--radius-2xl:  24px;   /* Feature panels */
--radius-full: 9999px; /* Pills, avatar circles */
```

```
/* Usage examples */
badge:    rounded-md   (6px)
button:   rounded-md   (6px)
input:    rounded-md   (6px)
card:     rounded-lg   (10px) or rounded-xl (12px)
modal:    rounded-xl   (16px)
avatar:   rounded-full
```

---

## 5. Component Specifications

### 5.1 Navigation Bar

The navigation bar is the brand anchor point. It must be clean, confident, and out of the way.

**Structure:**
```
[Logo / Wordmark]  ————————————————————  [Sign In]  [Explore →]
```

**Specs:**
- Height: `64px` (`h-16`)
- Background: `bg-white`
- Bottom border: `border-b border-gray-200`
- Sticky on scroll: `sticky top-0 z-50`
- Backdrop blur on scroll: `backdrop-blur-sm bg-white/95`
- Padding: `px-6 md:px-12`
- Max-width wrapper: `max-w-[1200px] mx-auto`

**Logo:**
- Left-aligned
- Wordmark: `text-xl font-bold tracking-tight text-gray-950`
- Future logo: SVG, max height `32px`

**Navigation Items (right side):**
- "Sign In" — ghost button: `text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors`
- "Explore" — primary button with subtle red accent

```tsx
// Tailwind class composition

// Nav wrapper
<nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
  <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-12">

    {/* Logo */}
    <a href="/" className="text-xl font-bold tracking-tight text-gray-950">
      OneSearch
    </a>

    {/* Nav Actions */}
    <div className="flex items-center gap-3">
      <button className="text-sm font-medium text-gray-600 hover:text-gray-950 transition-colors duration-150">
        Sign In
      </button>
      <button className="inline-flex items-center gap-1.5 rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition-colors duration-150">
        Explore
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>

  </div>
</nav>
```

**Scroll behavior:**
- At `scrollY === 0`: no shadow, border is the separator
- At `scrollY > 10`: add `shadow-sm` for subtle depth signal

---

### 5.2 Hero Section

The hero is the most editorial section of the site. It must immediately communicate what OneSearch is and why it matters.

**Layout:** Full-width, centered, constrained content column (max `720px`)

**Structure:**
```
[Category Label — e.g., "MARKET INTELLIGENCE · NIGERIA"]
[H1 — Large serif headline]
[Sub-headline — Inter, text-lg, text-gray-600]
[CTA Row — Primary button + secondary ghost link]
[Proof line — "X sectors analyzed. Updated monthly."]
```

**Specs:**
- Section padding: `pt-20 pb-24 md:pt-28 md:pb-32`
- Background: `bg-white`
- Content: `text-center`
- Max content width: `max-w-[720px] mx-auto`

```tsx
<section className="px-6 pt-20 pb-24 md:pt-28 md:pb-32">
  <div className="mx-auto max-w-[720px] text-center">

    {/* Eyebrow label */}
    <p className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-400">
      Market Intelligence · Nigeria & Africa
    </p>

    {/* H1 — Editorial serif */}
    <h1 className="mb-6 font-serif text-5xl font-extrabold leading-[1.1] tracking-tight text-gray-950 md:text-6xl">
      Know which African sectors are winning — before you enter.
    </h1>

    {/* Sub-headline */}
    <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
      Sector-by-sector intelligence on Nigerian and African markets. Understand
      what's succeeding, what's struggling, and what the data says about your
      opportunity.
    </p>

    {/* CTA Row */}
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button className="inline-flex items-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition-colors duration-150">
        Explore Sectors
        <ArrowRight className="h-4 w-4" />
      </button>
      <button className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-6 py-3 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150">
        See how it works
      </button>
    </div>

    {/* Proof line */}
    <p className="mt-8 text-xs text-gray-400">
      18 sectors analyzed · Research updated quarterly
    </p>

  </div>
</section>
```

**Hero do's and don'ts:**
- ✅ One very clear H1 (10 words or fewer)
- ✅ No more than 2 CTAs
- ✅ Serif font for H1 only; Inter for everything else
- ❌ No background images or full-bleed photography
- ❌ No animated text (typing effects, etc.)
- ❌ No more than 3 lines of sub-headline copy

---

### 5.3 Sector Cards

The sector card is the primary UI element. Every design decision in the card must serve rapid comprehension.

**Card anatomy (from top to bottom):**

```
┌─────────────────────────────────────────┐
│ [Category Label]          [Status Badge] │
│                                         │
│ [Sector Name — H3]                      │
│                                         │
│ [One-liner summary — 1 line]            │
│                                         │
│ ─────────────────────────────────────── │
│ [Opportunity ●●●●○]   [Risk: Medium]    │
│                                         │
│ [Key Insight — 2 lines max]             │
│                                         │
│ [→ View Full Analysis]   [PRO badge]    │
└─────────────────────────────────────────┘
```

**Card Specs:**
- Background: `bg-white`
- Border: `border border-gray-200`
- Border radius: `rounded-xl` (12px)
- Padding: `p-6`
- Shadow: `shadow-sm` (default) → `shadow-md` (hover)
- Transition: `transition-all duration-200`

**Card States:**

```tsx
// Default card
<article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md">

  {/* Card top row */}
  <div className="mb-3 flex items-start justify-between">
    <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
      {sector.category}   {/* e.g., "Fintech" */}
    </span>
    <StatusBadge status={sector.status} />
  </div>

  {/* Sector name */}
  <h3 className="mb-1 text-xl font-semibold leading-snug text-gray-950">
    {sector.name}
  </h3>

  {/* One-liner */}
  <p className="mb-4 text-sm text-gray-500 line-clamp-1">
    {sector.oneliner}
  </p>

  <hr className="mb-4 border-gray-100" />

  {/* Metrics row */}
  <div className="mb-4 flex items-center gap-4">
    <OpportunityScore score={sector.opportunityScore} />
    <RiskLevel level={sector.riskLevel} />
  </div>

  {/* Key insight */}
  <p className="mb-5 text-sm leading-relaxed text-gray-700 line-clamp-2">
    {sector.keyInsight}
  </p>

  {/* Card footer */}
  <div className="flex items-center justify-between">
    <button className="inline-flex items-center gap-1 text-sm font-medium text-gray-950 hover:text-red-600 transition-colors duration-150">
      View Analysis <ArrowRight className="h-3.5 w-3.5" />
    </button>
    {sector.isPro && (
      <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700">
        <Lock className="h-3 w-3" /> PRO
      </span>
    )}
  </div>

</article>
```

**Opportunity Score Display:**
```tsx
// Dots system: filled dots up to score/2, out of 5
<div className="flex items-center gap-1.5">
  <span className="text-xs text-gray-400">Opportunity</span>
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <span
        key={i}
        className={`h-2 w-2 rounded-full ${
          i <= Math.round(score / 2)
            ? 'bg-gray-950'
            : 'bg-gray-200'
        }`}
      />
    ))}
  </div>
  <span className="font-mono text-xs text-gray-500">{score}/10</span>
</div>
```

**Risk Level Display:**
```tsx
const riskColors = {
  'Low':       'text-green-600 bg-green-50',
  'Medium':    'text-yellow-600 bg-yellow-50',
  'High':      'text-red-600 bg-red-50',
  'Very High': 'text-red-700 bg-red-100',
};

<span className={`rounded-md px-2 py-0.5 text-xs font-medium ${riskColors[risk]}`}>
  {risk} Risk
</span>
```

**Card hover interaction:**
- Border: `border-gray-200` → `border-gray-300`
- Shadow: `shadow-sm` → `shadow-md`
- The "View Analysis" link color shifts to `text-red-600`
- No transform/translate effects — we keep it grounded

---

### 5.4 Status Badges

Status badges are the primary at-a-glance signal. They must be instantly readable and color-consistent.

**Three statuses:**

```tsx
const statusConfig = {
  'Succeeding': {
    label: 'Succeeding',
    icon: TrendingUp,
    classes: 'bg-green-50 text-green-700 border border-green-200',
  },
  'Struggling': {
    label: 'Struggling',
    icon: TrendingDown,
    classes: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  },
  'Failed': {
    label: 'Failed',
    icon: XCircle,
    classes: 'bg-red-50 text-red-700 border border-red-200',
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${config.classes}`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
};
```

**Badge anatomy:**
- Height: `~22px`
- Padding: `px-2 py-0.5`
- Font: `text-xs font-semibold`
- Border radius: `rounded-md`
- Always includes a small icon (Lucide, `h-3 w-3`)
- Border: `1px solid` matching color family
- Background: `*-50` (very light tint)
- Text: `*-700` (dark enough for contrast on the light tint)

**Standalone large badge (on sector detail page):**
```tsx
<span className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${config.classes}`}>
  <Icon className="h-4 w-4" />
  {config.label}
</span>
```

---

### 5.5 Pro Gate Overlay

The Pro Gate is shown over locked content sections within a sector card or detail page. It should feel like a natural extension of the design, not an aggressive popup.

**Approach:** The locked content is blurred behind a frosted-glass overlay tinted with the purple brand color. A clean upgrade prompt sits in the center.

```tsx
const ProGateOverlay = ({ onUpgrade }) => (
  <div className="relative overflow-hidden rounded-lg">

    {/* Blurred content (render actual content, then blur it) */}
    <div className="blur-sm select-none pointer-events-none">
      <ProContentPreview />  {/* Render actual text, it'll be blurred */}
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-purple-50/80 backdrop-blur-[2px] p-6 text-center">

      {/* Pro icon */}
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
        <Lock className="h-5 w-5 text-purple-700" />
      </div>

      {/* Heading */}
      <h4 className="mb-1.5 text-base font-semibold text-gray-950">
        Pro Content
      </h4>

      {/* Description */}
      <p className="mb-4 max-w-[260px] text-sm text-gray-600">
        Full analysis, failure case studies, entry strategy, and market gaps —
        available with a Pro subscription.
      </p>

      {/* Upgrade CTA */}
      <button
        onClick={onUpgrade}
        className="inline-flex items-center gap-2 rounded-md bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-800 transition-colors duration-150"
      >
        <Sparkles className="h-4 w-4" />
        Upgrade to Pro
      </button>

      {/* Secondary — sign in prompt */}
      <p className="mt-3 text-xs text-gray-400">
        Already subscribed?{' '}
        <button className="underline hover:text-gray-700">Sign in</button>
      </p>

    </div>
  </div>
);
```

**Pro Gate Design Rules:**
- The blur on underlying content must be sufficient to obscure text (`blur-sm`)
- The overlay background: `bg-purple-50/80` — purple-tinted but not opaque
- Never show the overlay on public preview content
- The gate should appear in-line within the card flow, not as a modal

---

### 5.6 Auth Modal

Clean, centered, minimal. The modal asks for one thing at a time (email first, then password or magic link).

**Specs:**
- Backdrop: `bg-black/50` full screen, blur optional
- Card: `bg-white rounded-xl shadow-xl max-w-[420px] w-full mx-auto p-8`
- Centered vertically and horizontally: `fixed inset-0 flex items-center justify-center z-50 px-4`

```tsx
const AuthModal = ({ onClose }) => (
  <>
    {/* Backdrop */}
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal Card */}
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-[420px] rounded-xl bg-white p-8 shadow-xl">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Heading */}
        <h2 className="mb-1 text-2xl font-bold text-gray-950">
          Sign in to OneSearch
        </h2>
        <p className="mb-6 text-sm text-gray-500">
          Access your sector intelligence dashboard.
        </p>

        {/* Email input */}
        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-950 placeholder:text-gray-400 focus:border-gray-950 focus:outline-none focus:ring-0 transition-colors duration-150"
          />
        </div>

        {/* Password input */}
        <div className="mb-5">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm text-gray-950 placeholder:text-gray-400 focus:border-gray-950 focus:outline-none focus:ring-0 transition-colors duration-150"
          />
        </div>

        {/* Primary CTA */}
        <button className="w-full rounded-md bg-gray-950 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition-colors duration-150">
          Sign In
        </button>

        {/* Divider */}
        <div className="my-4 flex items-center gap-3">
          <hr className="flex-1 border-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <hr className="flex-1 border-gray-200" />
        </div>

        {/* Magic link option */}
        <button className="w-full rounded-md border border-gray-200 py-2.5 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150">
          Send magic link
        </button>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-400">
          Don't have an account?{' '}
          <button className="font-medium text-gray-700 underline">
            Create one free
          </button>
        </p>

      </div>
    </div>
  </>
);
```

---

### 5.7 Filter / Category Tabs

Used on the Explore page to filter sectors by category or status.

**Two filter types:**

**A. Category tabs (horizontal scrollable row):**
```tsx
const categories = ['All', 'Fintech', 'Agritech', 'Edtech', 'Healthtech', 'Logistics', 'E-commerce', ...];

<div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
  {categories.map(cat => (
    <button
      key={cat}
      className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-150 ${
        activeCategory === cat
          ? 'border-gray-950 bg-gray-950 text-white'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:text-gray-950'
      }`}
    >
      {cat}
    </button>
  ))}
</div>
```

**B. Status filter (chip group — multi-selectable):**
```tsx
const statuses = [
  { key: 'Succeeding', classes: 'border-green-200 bg-green-50 text-green-700' },
  { key: 'Struggling', classes: 'border-yellow-200 bg-yellow-50 text-yellow-700' },
  { key: 'Failed',     classes: 'border-red-200 bg-red-50 text-red-700' },
];

<div className="flex gap-2 flex-wrap">
  {statuses.map(s => (
    <button
      key={s.key}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition-all duration-150 ${
        activeStatuses.includes(s.key)
          ? s.classes
          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
      }`}
    >
      {s.key}
    </button>
  ))}
</div>
```

**Filter bar layout (full Explore page):**
```
[🔍 Search input] ————————————— [Sort: Opportunity ▾]
[All] [Fintech] [Agritech] [Edtech] [Healthtech] ...
[● Succeeding] [● Struggling] [● Failed]
```

---

### 5.8 Landing Page Sections

The landing page has three content sections below the Hero:

**Section 1: "How It Works" (3-step explainer)**

```
[Step 01 · EXPLORE]    [Step 02 · ANALYZE]    [Step 03 · DECIDE]
[Icon]                 [Icon]                  [Icon]
[Title]                [Title]                 [Title]
[2-line description]   [2-line description]    [2-line description]
```

- Background: `bg-gray-50` (subtle contrast from white hero)
- Layout: `grid grid-cols-1 md:grid-cols-3 gap-8`
- Step number: `font-mono text-xs tracking-widest text-gray-300 mb-3` — e.g., `01`
- Icon container: `h-10 w-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-4`
- Title: `text-base font-semibold text-gray-950 mb-2`
- Body: `text-sm text-gray-500 leading-relaxed`

**Section 2: "Sample Sector Preview" (teaser card)**

Shows 2–3 real sector cards in a grid at reduced opacity or with a soft fade at the bottom, encouraging sign-up. The blur/fade signals more content behind.

- Background: `bg-white`
- Section heading: centered H2
- Cards: `opacity-100` for first card, `opacity-75` for second, `opacity-50` for third
- Below cards: a gradient fade `bg-gradient-to-t from-white via-white/60 to-transparent` overlaid on the bottom half of the grid
- CTA below: "Explore all 18 sectors" button

**Section 3: "Why OneSearch" (trust signals)**

Two-column layout on desktop, single on mobile.

Left: Short editorial paragraph about research philosophy
Right: 4–5 bullet points with Lucide icons:
- ✅ `CheckCircle` — "18 sectors analyzed"
- ✅ `CheckCircle` — "Primary & secondary research"
- ✅ `CheckCircle` — "Updated quarterly"
- ✅ `CheckCircle` — "Written by Nigerian founders, for founders"

- Background: `bg-gray-950` (dark section for contrast and gravitas)
- Text on dark: `text-white` / `text-gray-400`
- Bullet icon: `text-green-400`

---

### 5.9 Footer

Minimal. The footer communicates legitimacy without clutter.

**Layout:**
```
OneSearch                    [Explore] [Sign In] [Pro]
A product of [founder name]
© 2026 OneSearch             [Twitter/X] [Substack]
```

**Specs:**
- Background: `bg-white border-t border-gray-200`
- Padding: `py-12 px-6 md:px-12`
- Max-width: `max-w-[1200px] mx-auto`
- Layout: `flex flex-col md:flex-row justify-between gap-8`
- Logo/name: `text-base font-bold text-gray-950`
- Attribution: `text-sm text-gray-500`
- Copyright: `text-xs text-gray-400`
- Nav links: `text-sm text-gray-500 hover:text-gray-950`
- Social icons: `h-5 w-5 text-gray-400 hover:text-gray-700`

```tsx
<footer className="border-t border-gray-200 bg-white">
  <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-12">

    {/* Brand */}
    <div>
      <p className="text-base font-bold text-gray-950">OneSearch</p>
      <p className="mt-1 text-sm text-gray-500">African market intelligence for founders.</p>
      <p className="mt-4 text-xs text-gray-400">© 2026 OneSearch. All rights reserved.</p>
    </div>

    {/* Nav links */}
    <nav className="flex flex-col gap-2">
      <a href="/explore" className="text-sm text-gray-500 hover:text-gray-950 transition-colors">Explore Sectors</a>
      <a href="/pro"     className="text-sm text-gray-500 hover:text-gray-950 transition-colors">Pro Access</a>
      <a href="/about"   className="text-sm text-gray-500 hover:text-gray-950 transition-colors">About</a>
    </nav>

    {/* Social */}
    <div className="flex items-center gap-4">
      <a href="#" aria-label="Twitter/X" className="text-gray-400 hover:text-gray-700 transition-colors">
        <Twitter className="h-5 w-5" />
      </a>
      <a href="#" aria-label="Substack" className="text-gray-400 hover:text-gray-700 transition-colors">
        <ExternalLink className="h-5 w-5" />
      </a>
    </div>

  </div>
</footer>
```

---

## 6. Iconography

OneSearch uses **Lucide React** exclusively. Lucide's consistent 2px stroke weight and geometric clarity match the editorial design language.

**Installation:**
```bash
npm install lucide-react
```

**Usage:**
```tsx
import { TrendingUp, Lock, ArrowRight, CheckCircle } from 'lucide-react';

// Standard size in UI: h-4 w-4 (16px)
// Small / badge context: h-3 w-3 (12px)
// Medium / section: h-5 w-5 (20px)
// Large / feature: h-6 w-6 (24px)
```

**Icon Map by Use Case:**

| Use Case | Icon | Import |
|---|---|---|
| Succeeding sector | TrendingUp | `TrendingUp` |
| Struggling sector | TrendingDown or Minus | `TrendingDown` |
| Failed sector | XCircle | `XCircle` |
| Pro / locked | Lock | `Lock` |
| Pro upgrade | Sparkles | `Sparkles` |
| Navigate / CTA | ArrowRight | `ArrowRight` |
| External link | ExternalLink | `ExternalLink` |
| Search | Search | `Search` |
| Filter | SlidersHorizontal | `SlidersHorizontal` |
| Category label | Tag | `Tag` |
| Risk indicator | AlertTriangle | `AlertTriangle` |
| Opportunity | Target | `Target` |
| Market size | BarChart2 | `BarChart2` |
| Timeline | Clock | `Clock` |
| Check / success | CheckCircle | `CheckCircle` |
| Close modal | X | `X` |
| User / account | User | `User` |
| Social — Twitter | Twitter | `Twitter` |
| Social — External | ExternalLink | `ExternalLink` |
| Entry strategy | Compass | `Compass` |
| Market gap | Lightbulb | `Lightbulb` |
| Citation / source | BookOpen | `BookOpen` |

**Rules:**
- Never mix icon libraries
- Always use `aria-hidden="true"` on decorative icons
- Always provide `aria-label` on icon-only buttons
- Maintain consistent size within a component context

---

## 7. Motion & Animation Guidelines

### 7.1 Philosophy

Animation in OneSearch is **purposeful and restrained**. Motion should help — clarifying state changes, guiding attention — never perform. Every animation should have a clear answer to: *what does this help the user understand?*

### 7.2 Duration Scale

```css
--duration-fast:   100ms;   /* Micro-interactions (hover color changes) */
--duration-normal: 150ms;   /* Button states, border changes */
--duration-medium: 200ms;   /* Card hover, dropdown open */
--duration-slow:   300ms;   /* Modal enter/exit, page transitions */
--duration-slower: 500ms;   /* Content fade-in on load */
```

### 7.3 Easing Functions

```css
--ease-default:    cubic-bezier(0.16, 1, 0.3, 1);    /* Snappy, natural */
--ease-in:         cubic-bezier(0.4, 0, 1, 1);        /* Exiting elements */
--ease-out:        cubic-bezier(0, 0, 0.2, 1);        /* Entering elements */
--ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);      /* Shared transitions */
```

### 7.4 Animation Catalog

**Button hover:**
```css
transition: colors 150ms ease;
/* Background and text color change — no movement */
```

**Card hover:**
```css
transition: border-color 200ms ease, box-shadow 200ms ease;
/* Border darkens slightly, shadow lifts — no translate */
```

**Modal enter:**
```tsx
// Tailwind + Headless UI / Framer Motion
initial:  { opacity: 0, scale: 0.97, y: 8 }
animate:  { opacity: 1, scale: 1, y: 0 }
exit:     { opacity: 0, scale: 0.97, y: 8 }
transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
```

**Backdrop enter:**
```tsx
initial:  { opacity: 0 }
animate:  { opacity: 1 }
exit:     { opacity: 0 }
transition: { duration: 0.15 }
```

**Sector cards stagger load (Explore page):**
```tsx
// Cards animate in staggered from opacity 0, y: 16
// Stagger delay: 50ms per card
// Max stagger: first 6 cards only (after that, instant)
const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};
```

**Pro Gate overlay blur:**
```css
/* Backdrop blur transition on gate reveal */
transition: backdrop-filter 200ms ease;
```

### 7.5 What We Never Animate

- ❌ Text content / typewriter effects
- ❌ Continuous looping animations (except a subtle loading spinner)
- ❌ Parallax scrolling effects
- ❌ Hover effects that translate cards up/down
- ❌ Bounce or elastic easing on data components

### 7.6 Reduced Motion

Always respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Responsive Design

### 8.1 Breakpoint System

OneSearch uses Tailwind's default breakpoints with one addition:

```js
// tailwind.config.js
screens: {
  'sm':  '640px',   // Small tablets, large phones (landscape)
  'md':  '768px',   // Tablets
  'lg':  '1024px',  // Desktop
  'xl':  '1280px',  // Large desktop
  '2xl': '1536px',  // Very large displays
}
```

### 8.2 Layout at Each Breakpoint

| Viewport | Nav | Card Grid | Hero Text |
|---|---|---|---|
| Mobile (`< 640px`) | Hamburger or stacked buttons | 1 column | `text-4xl` |
| Small (`640–767px`) | Full nav, compact buttons | 1–2 columns | `text-4xl` |
| Tablet (`768–1023px`) | Full nav | 2 columns | `text-5xl` |
| Desktop (`1024px+`) | Full nav | 3 columns | `text-5xl md:text-6xl` |
| Large (`1280px+`) | Full nav, extra whitespace | 3 columns | Same as desktop |

### 8.3 Mobile-First Approach

All components are designed mobile-first. Desktop styles layer on top:

```tsx
// Card grid — mobile first
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
```

### 8.4 Touch Targets

All interactive elements on mobile must have a minimum touch target of **44×44px**:
- Buttons: min `h-11` (44px)
- Links in nav: padding ensures 44px target
- Filter tabs: min `h-9` with proper padding on mobile

### 8.5 Horizontal Scrolling

Category filter tabs use horizontal scroll on mobile:
```tsx
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
```
The negative margin + padding trick ensures the scroll bleeds to the screen edge.

---

## 9. Dark Mode Consideration

### 9.1 Current Decision: Light Only

OneSearch v1.0 is **light mode only**. This is an intentional, considered decision — not an oversight.

**Reasons:**

1. **Editorial trust**: Academic publications, financial reports, and serious research tools are predominantly light. Our target audience (Nigerian entrepreneurs, investors) associates light-mode, high-contrast documents with authority.

2. **Color semantics**: The red/green/yellow status system is carefully calibrated for white backgrounds. Recalibrating all six accent colors + their `*-50` backgrounds for dark mode more than doubles color system complexity.

3. **Development velocity**: Building a complete, polished dark mode doubles the QA surface area. OneSearch v1 must be excellent in one mode rather than mediocre in two.

4. **Data readability**: Black text on white is still the highest-contrast, most-tested reading environment for dense analytical content.

### 9.2 Future Dark Mode Path

When dark mode is added (v2+), the approach will be:
- CSS custom properties for every semantic color token (already structured this way)
- A `data-theme="dark"` attribute approach, not `prefers-color-scheme` media query (giving users explicit control)
- Dark background: `#0C0C0C` (not pure black)
- Card surfaces: `#161616`
- New accent variants for all four semantic colors

---

## 10. Accessibility

### 10.1 Standards Target

OneSearch targets **WCAG 2.1 Level AA** compliance across all public-facing pages.

### 10.2 Color & Contrast

- All body text: minimum 4.5:1 contrast ratio (see Color System §2.6)
- All large text (18pt+ or 14pt+ bold): minimum 3:1
- UI components and focus indicators: minimum 3:1
- Yellow on white (`#CA8A04` / `#FFFFFF`): used only at badge size (large, bold) — never for body text

### 10.3 Keyboard Navigation

```tsx
// All interactive elements must be keyboard accessible
// Tab order must be logical (top-left to bottom-right)
// Focus ring: always visible, high contrast

// Global focus style (add to global CSS)
:focus-visible {
  outline: 2px solid #0A0A0A;
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 10.4 Screen Readers

```tsx
// Status badges must communicate status to screen readers
<span className="..." aria-label={`Sector status: ${status}`}>
  <Icon aria-hidden="true" />
  {status}
</span>

// Pro gate: screen readers must know content exists but is locked
<div aria-label="Pro content — subscription required to view">
  ...
</div>

// Cards: use article elements with descriptive aria-labels
<article aria-label={`${sector.name} sector analysis`}>
```

### 10.5 Modal Accessibility

```tsx
// Auth modal and any modal must:
// 1. Trap focus within modal when open
// 2. Return focus to trigger element when closed
// 3. Close on Escape key
// 4. Have role="dialog" and aria-modal="true"

<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Sign in to OneSearch</h2>
  ...
</div>
```

### 10.6 Form Labels

Every input must have an associated `<label>` — never placeholder-only labeling:
```tsx
// ✅ Correct
<label htmlFor="email">Email address</label>
<input id="email" type="email" placeholder="you@company.com" />

// ❌ Wrong — placeholder is not a label
<input type="email" placeholder="Email address" />
```

### 10.7 Alt Text

- Informational images: descriptive alt text
- Decorative images: `alt=""`
- Icons: `aria-hidden="true"` when decorative; `aria-label` when functional

---

## 11. Pro Content Visual Treatment

### 11.1 The Pro Tier Visual Language

Pro content uses **purple** as its exclusive accent color. Purple never appears in the free tier UI. When a user sees purple, they know immediately: *this is premium.*

**Purple usage in Pro contexts:**
- Pro badge on cards: `bg-purple-50 text-purple-700 border border-purple-200`
- Pro gate overlay: `bg-purple-50/80` tint
- Pro gate CTA button: `bg-purple-700 hover:bg-purple-800 text-white`
- Pro gate lock icon: `text-purple-600`
- Pro content section headings (on detail page): `text-purple-700` label above section

### 11.2 Pro Section Header

When Pro content is visible (user is subscribed and signed in):
```tsx
<div className="mb-4 flex items-center gap-2">
  <span className="inline-flex items-center gap-1.5 rounded-md bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
    <Sparkles className="h-3 w-3" />
    PRO ANALYSIS
  </span>
  <hr className="flex-1 border-purple-100" />
</div>
```

### 11.3 Pro Card Visual Differentiation

Cards with Pro content have a subtle purple left border accent:
```tsx
<article className="relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
  {/* Purple left accent bar */}
  <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-purple-200" />
  ...
</article>
```

### 11.4 Upgrade Prompt Placement

Upgrade prompts appear:
1. Within each locked card section (inline Pro Gate)
2. In the Nav bar after scroll: a subtle `"Go Pro"` text link in purple
3. After sign-in for free users: a single banner at the top of the Explore page

The banner:
```tsx
<div className="mb-6 flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-5 py-3">
  <div className="flex items-center gap-3">
    <Sparkles className="h-4 w-4 text-purple-600" />
    <p className="text-sm text-purple-900">
      Unlock full analysis for all 18 sectors with Pro access.
    </p>
  </div>
  <button className="whitespace-nowrap rounded-md bg-purple-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-purple-800 transition-colors">
    Upgrade →
  </button>
</div>
```

---

## 12. Logo & Brand Guidelines

### 12.1 Wordmark (Current)

Until a logo mark is designed, the OneSearch brand is expressed through its **wordmark**:

```
OneSearch
```

- Font: Inter 700 (Bold)
- Color: `#0A0A0A` on light backgrounds
- Color: `#FFFFFF` on dark backgrounds
- Never use the wordmark in a color other than near-black or white
- Letter spacing: `tracking-tight` (`-0.025em`)
- Do not add a tagline to the wordmark itself

### 12.2 Logo Space

When the logo is placed alongside other elements, maintain a clear space of at least `1×` the cap-height of the wordmark on all sides.

### 12.3 Brand Voice in Visual Language

The OneSearch brand communicates through typography choices as much as any logo:
- **Playfair Display** = intellectual authority, African editorial tradition
- **Inter** = modern, democratic access, clarity
- **White space** = confidence — we don't fill silence with noise
- **Restrained color** = signal over sensation

### 12.4 Future Logo Direction

When a logo mark is developed, requirements:
- Works at `16px × 16px` (favicon)
- Works at `32px × 32px` (nav bar)
- Works at `120px × 120px` (OG image)
- SVG format, single-color variant available
- Should evoke: map, lens, grid, or African geometric motif
- Must work in single color (black or white) — not dependent on multiple colors for legibility

### 12.5 OG Image Template

For social sharing / link preview:
- Size: `1200px × 630px`
- Background: `#0A0A0A`
- Wordmark: white, centered
- Tagline: gray-400, below wordmark
- Optional: subtle sector card grid pattern at low opacity in background
- Consistent across all pages (no per-page OG image variation in v1)

---

*This design system is a living document. When in doubt, ask: does this design decision serve the entrepreneur trying to understand an African market? If yes, include it. If no, remove it.*

*OneSearch Design System v1.0.0 — Built for clarity, built for Africa.*
