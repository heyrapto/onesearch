// Types for OneSearch sector data

export type SectorStatus = 'succeeding' | 'struggling' | 'failed' | 'emerging'
export type RiskLevel = 'low' | 'medium' | 'high' | 'very-high'
export type BuildVerdict = 'BUILD' | 'PROCEED_WITH_CAUTION' | 'DO_NOT_BUILD' | 'NICHE_ONLY'

export interface CompanyBacker {
  name: string
  domain: string
  url: string
  logoUrl?: string
  description?: string
  status?: 'active' | 'acquired' | 'pivoted' | 'closed'
}

export interface ResearchCitation {
  source: string
  title: string
  year: string
  url: string
  dataPoint: string
}

export interface ShouldIBuild {
  verdict: BuildVerdict
  verdictSummary: string
  whoShouldBuild: string
  whoShouldAvoid: string
  capitalToStart: string
  timeToFirstMillion: string
  unfairAdvantageNeeded: string
}

export interface Sector {
  id: string
  slug: string
  name: string
  emoji: string
  iconName?: string
  category: string
  status: SectorStatus
  riskLevel: RiskLevel
  opportunityScore: number // 1–10
  marketSizeEst: string
  summary: string
  publicInsight: string
  keyPlayers: string[]
  companies: CompanyBacker[]
  citations?: {
    marketSize?: ResearchCitation
    keyTrend?: ResearchCitation
    regulatory?: ResearchCitation
  }
  shouldIBuild: ShouldIBuild
  whySucceeding?: string
  whyFailing?: string
  marketGaps: string[]
  regulatoryNotes: string
  tags: string[]
}

export interface ProAnalysis {
  sectorId: string
  fullAnalysis: string
  failureCaseStudies: CaseStudy[]
  winningPlaybooks: Playbook[]
  unitEconomics: UnitEconomics
  regulatoryLandmines: string[]
  marketGapsDetailed: MarketGap[]
}

export interface CaseStudy {
  company: string
  founded: string
  died?: string
  raised: string
  causeOfDeath: string
  lessons: string[]
}

export interface Playbook {
  title: string
  steps: string[]
  successExample: string
}

export interface UnitEconomics {
  avgCAC: string
  avgLTV: string
  paybackPeriod: string
  grossMarginRange: string
  burnRate: string
  notes: string
}

export interface MarketGap {
  gap: string
  size: string
  difficulty: 'easy' | 'medium' | 'hard'
  why: string
}
