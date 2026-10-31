'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Search,
  BarChart3,
  Skull,
  FileSearch,
  Compass,
  ArrowUpRight,
  Layers,
  ChevronRight,
} from 'lucide-react'
import { AuthModal } from '@/components/auth/AuthModal'
import { SectorIcon } from '@/components/ui/SectorIcon'
import { sectors } from '@/data/sectors'

const statusCounts = {
  succeeding: sectors.filter((s) => s.status === 'succeeding').length,
  emerging: sectors.filter((s) => s.status === 'emerging').length,
  struggling: sectors.filter((s) => s.status === 'struggling').length,
  failed: sectors.filter((s) => s.status === 'failed').length,
}

// 6 diverse, high-impact featured sectors across categories
const FEATURED_SLUGS = [
  'fintech',
  'energy-solar',
  'b2b-saas-sme-software',
  'food-delivery-quick-commerce',
  'b2b-pharma-distribution',
  'agritech',
]
const FEATURED_SECTORS = FEATURED_SLUGS.map(
  (slug) => sectors.find((s) => s.slug === slug) || sectors[0]
)

const PILLARS = [
  {
    icon: BarChart3,
    title: '52 Sectors Audited',
    desc: 'Fintech, B2B SaaS, Clean Energy, HealthTech, Agritech, Quick Commerce, and beyond — every active market sector in Nigeria.',
  },
  {
    icon: Skull,
    title: 'Failure Autopsies',
    desc: 'Why 54gene wound down. Why Jumia Food exited. Why Farmcrowdy collapsed. Why Patricia froze funds. The post-mortems VCs won’t share.',
  },
  {
    icon: FileSearch,
    title: '100+ Research Papers Cited',
    desc: 'Every thesis is backed by data from the Central Bank of Nigeria (CBN), EFInA, NBS, NAICOM, and verified on-the-ground operators.',
  },
  {
    icon: Compass,
    title: 'Market Gap Maps',
    desc: 'Not high-level fluff — the exact unexploited white spaces and addressable TAM where high-margin businesses can be built.',
  },
]

const PRO_FEATURES = [
  'Full failure case studies with verified post-mortem root causes',
  'Realistic unit economics benchmarks (CAC, LTV, gross margins, burn rate)',
  'Statutory traps & regulatory licensing landmines (CBN, SEC, NAICOM, NAFDAC)',
  'Field-tested winning execution playbooks from proven local operators',
  'Deep unexploited market white spaces with estimated addressable size',
  'Instant lifetime access across all current and future sectors',
]

export default function HomePage() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="pt-12 sm:pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Editorial Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#196928] animate-pulse" />
              THE NIGERIAN SECTOR INTELLIGENCE INDEX
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-[#111816] leading-[1.08] tracking-tight">
              The database of{' '}
              <span className="text-[#0F2D17] underline decoration-[#7AE368] decoration-4 underline-offset-6">
                verified market intelligence
              </span>{' '}
              for Nigerian founders.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg text-[#57605B] leading-relaxed max-w-2xl mx-auto">
              Exhaustive, data-grounded intelligence covering {sectors.length} Nigerian and African
              sectors. What’s succeeding, what collapsed, why companies died, and where unexploited white spaces remain.
            </p>

            {/* RevIndex-inspired Pill CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#7AE368] text-[#0E3512] font-bold rounded-full hover:bg-[#6FD25D] transition-all text-xs sm:text-sm shadow-sm active:scale-[0.98]"
              >
                <span>Explore the index</span>
                <span className="text-sm">↓</span>
              </Link>
              <button
                onClick={() => setAuthOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-black/[0.09] text-[#111816] font-bold rounded-full hover:bg-[#F3F3EF] transition-all text-xs sm:text-sm shadow-xs"
              >
                <span>Unlock Pro Access</span>
                <ArrowUpRight size={14} className="text-[#88928C]" />
              </button>
            </div>

            <p className="mt-4 text-xs text-[#88928C]">
              100% Free Public Exploration · One-time ₦2,000 for Full Pro Dossiers
            </p>
          </div>

          {/* ─── FEATURED SPOTLIGHT BANNER (Inspired by RevIndex's signature green card) ─── */}
          <div className="mt-12 sm:mt-16">
            <div className="relative overflow-hidden bg-[#0F2D17] text-white rounded-[2rem] p-6 sm:p-9 shadow-lg">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#7AE368]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start sm:items-center gap-4">
                  {/* Lime squircle icon */}
                  <div className="w-13 h-13 rounded-2xl bg-[#7AE368] text-[#0E3512] flex items-center justify-center shrink-0 shadow-md">
                    <Sparkles size={24} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#7AE368] mb-1">
                      <span>Featured Sector Dossier</span>
                      <span className="w-1 h-1 rounded-full bg-[#7AE368]" />
                      <span className="text-white/70">Fintech & Payment Rails</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                      Beyond POS Terminals: The Next Wave of Nigerian Margin Software
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 mt-1.5 max-w-2xl leading-relaxed">
                      How B2B vertical software and embedded treasury management are maintaining 45%+ gross margins while consumer wallets face currency devaluation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-start lg:self-auto">
                  <Link
                    href="/explore/fintech"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#7AE368] text-[#0E3512] text-xs sm:text-sm font-bold rounded-full hover:bg-[#6FD25D] transition-all shadow-sm active:scale-[0.98]"
                  >
                    <span>Read Fintech Dossier</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Status / stats row at bottom of banner */}
              <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
                <div className="flex items-center gap-6">
                  <span>Audited TAM: <strong className="text-white font-mono">$10.4B</strong></span>
                  <span>Macro Risk: <strong className="text-[#7AE368]">Low to Moderate</strong></span>
                  <span>Active Operators: <strong className="text-white font-mono">14 Enterprises</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#7AE368]" />
                  <span className="text-white/80">CBN & NIBSS Statutory Citations Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── GRAND ISLAND: "EXPLORE THE INDEX" (RevIndex-inspired Elevated Sheet) ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[2.5rem] border border-black/[0.06] p-6 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
          {/* Header row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-black/[0.06] gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#196928] mb-1">
                <Layers size={13} />
                <span>Sector Leaderboard Preview</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111816] tracking-tight">
                Explore the Index
              </h2>
              <p className="text-xs sm:text-sm text-[#57605B] mt-1">
                Ranked market sectors across Nigeria. Filter by growth momentum, opportunity score, and risk.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/explore"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0F2D17] bg-[#EAF7EA] hover:bg-[#DDF2DC] border border-[#D4EBD1] rounded-full transition-colors"
              >
                <span>View Full 52 Sectors</span>
                <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Table Leaderboard Preview */}
          <div className="divide-y divide-black/[0.05]">
            {FEATURED_SECTORS.map((sector, idx) => (
              <Link
                key={sector.id}
                href={`/explore/${sector.slug}`}
                className="group py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F5]/70 -mx-3 px-3 rounded-2xl transition-colors"
              >
                {/* Left: Rank, Icon, Name, Category */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="text-xs font-mono font-bold text-[#88928C] w-5 text-center shrink-0">
                    {idx + 1}
                  </span>

                  <div className="w-11 h-11 rounded-2xl bg-[#F8F8F5] border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[#0F2D17] group-hover:text-white transition-all shadow-xs">
                    <SectorIcon
                      slug={sector.slug}
                      size={20}
                      className="text-[#323D38] group-hover:text-white transition-colors"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm sm:text-base text-[#111816] group-hover:text-[#0F2D17] truncate transition-colors">
                        {sector.name}
                      </h3>
                      <StatusPill status={sector.status} />
                    </div>
                    <p className="text-xs text-[#57605B] line-clamp-1 mt-0.5 max-w-xl">
                      {sector.publicInsight}
                    </p>
                  </div>
                </div>

                {/* Right: Metrics & Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pl-8 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#88928C]">
                      Market TAM
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#111816] font-mono">
                      {sector.marketSizeEst.split(' ')[0]} {sector.marketSizeEst.split(' ')[1] || ''}
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#88928C]">
                      Opp Score
                    </div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#196928] font-mono">
                      {sector.opportunityScore}/10
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-[#F8F8F5] group-hover:bg-[#0F2D17] group-hover:text-white flex items-center justify-center text-[#88928C] transition-all">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-6 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#57605B]">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#196928]" />
                {statusCounts.succeeding} Succeeding
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1B5694]" />
                {statusCounts.emerging} Emerging
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#A0600D]" />
                {statusCounts.struggling} Struggling
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#B42318]" />
                {statusCounts.failed} Failed
              </span>
            </div>

            <Link
              href="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F2D17] hover:bg-[#153E20] text-white text-xs font-bold rounded-full transition shadow-sm"
            >
              <span>Explore Entire 52 Sector Directory</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── SECTION: RIGOR & METHODOLOGY (Inspired by Image 1's "Behind the business") ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
            Institutional Rigor
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111816] tracking-tight">
            The research VCs do before wiring funds.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#57605B] leading-relaxed">
            Most online summaries are superficial PR. OneSearch dives deep into real failure modes, regulatory compliance barriers, true unit margins, and verified field lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PILLARS.map((p) => {
            const IconComp = p.icon
            return (
              <div
                key={p.title}
                className="p-6 bg-white border border-black/[0.07] rounded-3xl hover:border-black/[0.18] hover:shadow-md transition-all space-y-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EAF7EA] text-[#196928] flex items-center justify-center">
                  <IconComp size={20} />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-[#111816]">{p.title}</h3>
                <p className="text-xs text-[#57605B] leading-relaxed">{p.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ─── SECTION: BEHIND THE RESEARCH (RevIndex Image 1 inspired) ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-[2.5rem] border border-black/[0.06] p-7 sm:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#196928] mb-1">
              Behind the Research
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111816] tracking-tight">
              A little about OneSearch
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-[#57605B] leading-relaxed max-w-3xl">
            <p>
              OneSearch is the Sector Intelligence Index for African Founders, Builders, and Investors. We map what’s actually happening across Nigeria’s commercial engine — beyond the pitch decks and hype cycles.
            </p>
            <p>
              Every dossier is cross-referenced with public statutory data from the Central Bank of Nigeria (CBN), National Bureau of Statistics (NBS), EFInA financial inclusion audits, and verified on-the-ground operating benchmarks from local founders.
            </p>
            <p className="text-[#88928C] text-xs">
              A dedicated team of macroeconomic researchers and tech operators based in Lagos, Nigeria.
            </p>
          </div>

          <div className="pt-4 border-t border-black/[0.05]">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#88928C] mb-3">
              Research curation
            </p>

            <div className="inline-flex items-center gap-3.5 p-3.5 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl hover:border-black/[0.18] transition-all">
              {/* Squircle Avatar */}
              <div className="w-12 h-12 rounded-2xl bg-[#0F2D17] text-[#7AE368] flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AA
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-[#111816]">Abdulazeez Adekunle</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-[#EAF7EA] text-[#196928] rounded-full border border-[#D4EBD1]">
                    Lead Analyst
                  </span>
                </div>
                <a
                  href="https://substack.com/@abdulazeezadekunle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#57605B] hover:text-[#0F2D17] font-medium inline-flex items-center gap-1 mt-0.5 transition-colors"
                >
                  <span>@abdulazeezadekunle</span>
                  <span className="text-xs">↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION: PRICING / MONETIZATION ────────────────────────── */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
            Transparent Pricing
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111816] tracking-tight">
            One-time ₦2,000 unlock. Lifetime access.
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#57605B] leading-relaxed">
            No recurring subscription traps. Free gives you complete public sector overviews. Pro unlocks the proprietary autopsies, unit economics, and operator playbooks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
          {/* Free Tier */}
          <div className="p-8 bg-white border border-black/[0.08] rounded-[2rem] flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.05] mb-6">
                <div>
                  <h3 className="font-extrabold text-lg text-[#111816]">Public Explorer</h3>
                  <p className="text-xs text-[#88928C] mt-0.5">Open to all founders & researchers</p>
                </div>
                <div className="text-3xl font-black text-[#111816]">₦0</div>
              </div>

              <ul className="space-y-3">
                {[
                  `Full directory of all ${sectors.length} Nigerian sectors`,
                  'Macro status categorization (Succeeding, Emerging, Struggling, Failed)',
                  'Market sizing estimates and key active operating players',
                  'Public market gaps & sector overview summaries',
                  'Regulatory landscape statutory highlights',
                  'No login or authentication required to browse',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-[#323D38]">
                    <CheckCircle2 size={15} className="text-[#196928] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/explore"
              className="mt-8 block w-full text-center py-3.5 bg-[#F8F8F5] hover:bg-[#EAEAE5] border border-black/[0.08] text-[#111816] rounded-full text-xs sm:text-sm font-bold transition shadow-xs"
            >
              Start Exploring Free →
            </Link>
          </div>

          {/* Pro Tier (High-Contrast Forest Green) */}
          <div className="p-8 bg-[#0F2D17] text-white border border-black/[0.08] rounded-[2rem] flex flex-col justify-between shadow-xl relative overflow-hidden">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7AE368]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#7AE368] text-[#0E3512] text-[10px] font-bold rounded-full mb-1">
                    ✦ RECOMMENDED FOR BUILDERS
                  </div>
                  <h3 className="font-extrabold text-lg text-white">Founder Pro</h3>
                  <p className="text-xs text-white/60 mt-0.5">One-time payment · Lifetime access</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">₦2,000</div>
                  <p className="text-[10px] text-[#7AE368] font-mono">one-time only</p>
                </div>
              </div>

              <ul className="space-y-3">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-white/85">
                    <CheckCircle2 size={15} className="text-[#7AE368] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 relative z-10">
              <button
                onClick={() => setAuthOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#7AE368] hover:bg-[#6FD25D] text-[#0E3512] rounded-full text-xs sm:text-sm font-bold transition shadow-md active:scale-[0.98]"
              >
                <Sparkles size={16} />
                <span>Unlock Pro for ₦2,000</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-white/60 mt-2.5">
                <ShieldCheck size={13} className="text-[#7AE368]" />
                <span>Secured by Paystack · Instant activation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  )
}

function StatusPill({ status }: { status: string }) {
  const map = {
    succeeding: {
      label: 'Succeeding',
      class: 'bg-[#EAF7EA] text-[#196928] border-[#D4EBD1]',
      dot: 'bg-[#196928]',
    },
    emerging: {
      label: 'Emerging',
      class: 'bg-[#EEF4FD] text-[#1B5694] border-[#D5E3F8]',
      dot: 'bg-[#1B5694]',
    },
    struggling: {
      label: 'Struggling',
      class: 'bg-[#FEF6E8] text-[#A0600D] border-[#FADFB0]',
      dot: 'bg-[#A0600D]',
    },
    failed: {
      label: 'Failed',
      class: 'bg-[#FDF0EF] text-[#B42318] border-[#F8C8C4]',
      dot: 'bg-[#B42318]',
    },
  } as const

  const cfg = map[status as keyof typeof map] ?? map.struggling

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${cfg.class}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span>{cfg.label}</span>
    </span>
  )
}
