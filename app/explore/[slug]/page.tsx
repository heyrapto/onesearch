import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getSectorBySlug, sectors } from '@/data/sectors'
import { getProAnalysis } from '@/data/pro-analyses'
import { ProGate } from '@/components/explore/ProGate'
import { ShouldIBuildSection } from '@/components/explore/ShouldIBuildSection'
import { CompanyBackerCard } from '@/components/explore/CompanyBackerCard'
import { SectorMomentumChart } from '@/components/explore/SectorMomentumChart'
import { VerifiedBadge } from '@/components/ui/VerifiedBadge'
import { MetricInfoPopover } from '@/components/ui/MetricInfoPopover'
import { SectorIcon } from '@/components/ui/SectorIcon'
import {
  TrendingUp,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowLeft,
  Users,
  BarChart3,
  Shield,
  Building,
  ExternalLink,
  ChevronRight,
  Layers,
} from 'lucide-react'

export const instant = false

export async function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sector = getSectorBySlug(slug)
  if (!sector) return {}
  return {
    title: `${sector.name} in Nigeria — OneSearch Market Intelligence`,
    description: sector.publicInsight,
  }
}

const STATUS_CONFIG = {
  succeeding: {
    label: 'Succeeding',
    dot: 'bg-[#196928]',
    style: 'bg-[#EAF7EA] text-[#196928] border-[#D4EBD1]',
    bar: 'bg-[#7AE368]',
  },
  emerging: {
    label: 'Emerging',
    dot: 'bg-[#1B5694]',
    style: 'bg-[#EEF4FD] text-[#1B5694] border-[#D5E3F8]',
    bar: 'bg-[#1B5694]',
  },
  struggling: {
    label: 'Struggling',
    dot: 'bg-[#A0600D]',
    style: 'bg-[#FEF6E8] text-[#A0600D] border-[#FADFB0]',
    bar: 'bg-[#A0600D]',
  },
  failed: {
    label: 'Failed',
    dot: 'bg-[#B42318]',
    style: 'bg-[#FDF0EF] text-[#B42318] border-[#F8C8C4]',
    bar: 'bg-[#B42318]',
  },
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sector = getSectorBySlug(slug)
  if (!sector) notFound()

  const proAnalysis = getProAnalysis(sector.slug)
  const cfg = STATUS_CONFIG[sector.status] ?? STATUS_CONFIG.struggling

  // Related sectors (same category, exclude current)
  const related = sectors
    .filter((s) => s.category === sector.category && s.slug !== sector.slug)
    .slice(0, 3)

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs text-[#88928C]">
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 font-bold text-[#111816] hover:text-[#0F2D17] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Sector Index</span>
          </Link>

          <div className="flex items-center gap-1.5">
            <span>Category:</span>
            <span className="font-bold text-[#111816]">{sector.category}</span>
          </div>
        </div>

        {/* ─── HERO IDENTITY ISLAND (RevIndex inspired header) ─── */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.06] p-6 sm:p-9 shadow-[0_2px_20px_rgba(0,0,0,0.02)] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Big Squircle Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#0F2D17] text-[#7AE368] flex items-center justify-center shrink-0 shadow-sm">
              <SectorIcon slug={sector.slug} size={32} className="text-[#7AE368]" />
            </div>

            <div className="flex-1 min-w-0 space-y-2.5">
              {/* Pills row */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 border rounded-full text-xs font-bold ${cfg.style}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span>{cfg.label}</span>
                </span>

                <VerifiedBadge
                  citation={sector.citations?.marketSize}
                  claimName="Sector Intelligence"
                  size="md"
                />

                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F8F8F5] text-[#57605B] border border-black/[0.06]">
                  {sector.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-black text-[#111816] tracking-tight">
                {sector.name} in Nigeria
              </h1>

              {/* Summary */}
              <p className="text-xs sm:text-base text-[#57605B] leading-relaxed pt-1">
                {sector.summary}
              </p>
            </div>
          </div>
        </div>

        {/* ─── METRICS STRIP (RevIndex inspired: 1 dark hero card + 3 white cards) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Hero Forest Green Card for Opportunity Score */}
          <div className="p-6 bg-[#0F2D17] text-white rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-white/70 mb-2">
                <span>Opportunity Score</span>
                <MetricInfoPopover
                  title="Opportunity Score (1 to 10)"
                  description="A forward-looking composite rating evaluating addressable market demand, customer willingness-to-pay, and white space headroom in Nigeria over the next 3–5 years."
                  details={[
                    { label: '9–10 (Highest)', text: 'Massive structural tailwinds, high unmet demand, verified monetization.' },
                    { label: '7–8 (Solid)', text: 'Strong commercial traction with room for specialized vertical operators.' },
                    { label: '5–6 (Selective)', text: 'Crowded mass market; viable primarily for high-ticket B2B niches.' },
                    { label: '1–4 (Hazardous)', text: 'Severe capital destruction, negative unit economics, or statutory blockage.' },
                  ]}
                />
              </div>
              <div className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-[#7AE368]">
                {sector.opportunityScore}<span className="text-xl text-white/50">/10</span>
              </div>
            </div>

            {/* Lime Progress Gauge */}
            <div className="relative z-10 pt-4">
              <div className="flex gap-1">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i < sector.opportunityScore ? 'bg-[#7AE368]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-white/60 font-mono mt-1.5 block">
                {sector.opportunityScore >= 8
                  ? 'High Expansion Potential'
                  : sector.opportunityScore >= 6
                  ? 'Selective Vertical Opportunity'
                  : 'Challenging Mass Market'}
              </span>
            </div>
          </div>

          {/* Card 2: Market TAM */}
          <div className="p-6 bg-white border border-black/[0.07] rounded-3xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#88928C] mb-2">
                <span>Audited Market Size</span>
                <MetricInfoPopover
                  title="Market Sizing (TAM / TPV)"
                  description="The Total Addressable Market (TAM) or annual transaction volume (TPV/GMV) generated across Nigeria and Sub-Saharan Africa."
                  details={[
                    { label: 'Statutory Verification', text: 'Derived from CBN, NBS, NIBSS, and verified institutional market audits.' },
                  ]}
                />
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111816] tracking-tight">
                {sector.marketSizeEst}
              </div>
            </div>

            <div className="pt-3">
              <VerifiedBadge
                citation={sector.citations?.marketSize}
                claimName="Market Size Sizing"
                size="sm"
              />
            </div>
          </div>

          {/* Card 3: Macro Risk Level */}
          <div className="p-6 bg-white border border-black/[0.07] rounded-3xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#88928C] mb-2">
                <span>Macro Risk Level</span>
                <MetricInfoPopover
                  title="Macro Risk Assessment"
                  description="The probability of venture failure driven by Nigerian-specific macro hazards: currency devaluation, diesel inflation, policy bans, or credit defaults."
                />
              </div>
              <div className="text-xl sm:text-2xl font-black capitalize text-[#111816] tracking-tight">
                {sector.riskLevel.replace('-', ' ')}
              </div>
            </div>

            <div className="pt-3">
              <span className="text-xs text-[#57605B]">
                {sector.riskLevel === 'low'
                  ? 'Sticky local currency cash flows'
                  : sector.riskLevel === 'medium'
                  ? 'Regulated demand; clear compliance'
                  : sector.riskLevel === 'high'
                  ? 'Exposed to consumer purchasing power'
                  : 'Severe historical venture failure rate'}
              </span>
            </div>
          </div>

          {/* Card 4: Operating Giants Count */}
          <div className="p-6 bg-white border border-black/[0.07] rounded-3xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#88928C] mb-2">
                <span>Active Operators</span>
                <MetricInfoPopover
                  title="Active Operating Enterprises"
                  description="The verified enterprises currently operating on the ground in Nigeria, proving commercial demand and market motion."
                />
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono text-[#111816] tracking-tight">
                {sector.companies.length} Giants
              </div>
            </div>

            <div className="pt-3">
              <a
                href="#operating-giants"
                className="text-xs font-bold text-[#0F2D17] hover:underline inline-flex items-center gap-1"
              >
                <span>Inspect companies</span>
                <ChevronRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ─── SECTOR EXPANSION & TRAJECTORY (RevIndex inspired chart & transparency) ─── */}
        <SectorMomentumChart
          sectorName={sector.name}
          tamString={sector.marketSizeEst}
          score={sector.opportunityScore}
          category={sector.category}
        />

        {/* ─── FOUNDER DECISION MEMO ("Should I Build") ─── */}
        <ShouldIBuildSection data={sector.shouldIBuild} sectorName={sector.name} />

        {/* ─── OPERATING GIANTS (RevIndex style company squircles with live portals) ─── */}
        <div id="operating-giants" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111816] flex items-center gap-2">
                <Building size={20} className="text-[#0F2D17]" />
                <span>Active Operating Companies in This Space</span>
              </h2>
              <p className="text-xs text-[#57605B] mt-0.5">
                Real companies proving the market motion. Click any company card to visit their live platform.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-white border border-black/[0.08] text-[#111816] rounded-full shadow-xs">
              {sector.companies.length} Companies
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {sector.companies.map((company) => (
              <CompanyBackerCard key={company.name} company={company} />
            ))}
          </div>
        </div>

        {/* ─── STRATEGIC REALITIES & MARKET GAPS (Editorial Island) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Strategic Realities */}
          <div className="p-6 sm:p-7 bg-white border border-black/[0.07] rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
              <h3 className="font-extrabold text-sm sm:text-base text-[#111816] flex items-center gap-2">
                <TrendingUp size={16} className="text-[#196928]" />
                <span>{sector.whySucceeding ? 'Growth Tailwinds & Drivers' : 'Structural Bottlenecks'}</span>
              </h3>
              <VerifiedBadge
                citation={sector.citations?.keyTrend}
                claimName="Traction Evidence"
                size="sm"
              />
            </div>
            <p className="text-xs sm:text-sm text-[#323D38] leading-relaxed">
              {sector.whySucceeding ?? sector.whyFailing}
            </p>
          </div>

          {/* Right: Unexploited Market Gaps */}
          <div className="p-6 sm:p-7 bg-white border border-black/[0.07] rounded-3xl shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
              <h3 className="font-extrabold text-sm sm:text-base text-[#111816] flex items-center gap-2">
                <Sparkles size={16} className="text-[#0F2D17]" />
                <span>Unexploited Market White Spaces</span>
              </h3>
            </div>
            <ul className="space-y-2.5">
              {sector.marketGaps.map((g, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-[#323D38]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#196928] shrink-0 mt-1.5" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Regulatory Environment Card */}
        <div className="p-6 sm:p-7 bg-[#FEF6E8]/70 border border-[#FADFB0] rounded-3xl space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#FADFB0]">
            <h3 className="font-extrabold text-sm sm:text-base text-[#A0600D] flex items-center gap-2">
              <Shield size={16} className="text-[#A0600D]" />
              <span>Statutory Regulatory Environment</span>
            </h3>
            <VerifiedBadge
              citation={sector.citations?.regulatory}
              claimName="Statutory Regulations"
              size="sm"
            />
          </div>
          <p className="text-xs sm:text-sm text-[#323D38] leading-relaxed font-normal">
            {sector.regulatoryNotes}
          </p>
        </div>

        {/* ─── PRO DOSSIER VAULT (Institutional Access) ─── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-black text-[#111816] tracking-tight">
              In-Depth Pro Dossier
            </h2>
            <span className="px-3 py-0.5 bg-[#0F2D17] text-[#7AE368] text-[10px] font-bold rounded-full">
              PRO VAULT
            </span>
          </div>

          <ProGate sectorName={sector.name} proAnalysis={proAnalysis} />
        </div>

        {/* ─── RELATED SECTORS ─── */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-black/[0.06] space-y-4">
            <h3 className="text-xs font-bold text-[#88928C] uppercase tracking-wider">
              Related Sectors in {sector.category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/explore/${r.slug}`}
                  className="p-5 bg-white border border-black/[0.07] rounded-3xl hover:border-black/[0.18] hover:shadow-md transition-all group block"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#F8F8F5] border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[#0F2D17] group-hover:text-white transition-colors">
                      <SectorIcon slug={r.slug} size={15} className="text-[#323D38] group-hover:text-white" />
                    </div>
                    <span className="font-bold text-xs sm:text-sm text-[#111816] group-hover:text-[#0F2D17] transition-colors truncate">
                      {r.name}
                    </span>
                  </div>
                  <p className="text-xs text-[#57605B] line-clamp-2 leading-relaxed">
                    {r.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
