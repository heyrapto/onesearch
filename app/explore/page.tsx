'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Search,
  X,
  TrendingUp,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Check,
  ChevronDown,
  Layers,
  Shield,
  BarChart3,
} from 'lucide-react'
import { sectors } from '@/data/sectors'
import { cn } from '@/lib/utils'
import { SectorIcon } from '@/components/ui/SectorIcon'
import type { SectorStatus } from '@/types/sector'

const STATUS_FILTERS: { value: SectorStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'succeeding', label: 'Succeeding' },
  { value: 'emerging', label: 'Emerging' },
  { value: 'struggling', label: 'Struggling' },
  { value: 'failed', label: 'Failed' },
]

const CATEGORIES = [
  'All Categories',
  'Financial Services',
  'Software & SaaS',
  'Commerce & Retail',
  'Healthcare',
  'Agriculture & Food',
  'Energy & Utilities',
  'Infrastructure & Mobility',
  'Education & Talent',
]

const SORT_OPTIONS = [
  { value: 'opportunity-desc', label: 'Highest Opportunity' },
  { value: 'opportunity-asc', label: 'Lowest Opportunity' },
  { value: 'name-asc', label: 'Name (A to Z)' },
]

const PAGE_SIZE = 15

export default function ExplorePage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<SectorStatus | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [sortBy, setSortBy] = useState('opportunity-desc')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = useMemo(() => {
    let result = sectors.filter((s) => {
      const matchesStatus = statusFilter === 'all' || s.status === statusFilter
      const matchesCategory =
        categoryFilter === 'All Categories' || s.category === categoryFilter
      const matchesSearch =
        !search ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase()) ||
        s.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
        s.summary.toLowerCase().includes(search.toLowerCase())
      return matchesStatus && matchesCategory && matchesSearch
    })

    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'opportunity-desc') return b.opportunityScore - a.opportunityScore
      if (sortBy === 'opportunity-asc') return a.opportunityScore - b.opportunityScore
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name)
      return 0
    })

    return result
  }, [search, statusFilter, categoryFilter, sortBy])

  // Reset to page 1 on filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [search, statusFilter, categoryFilter, sortBy])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginatedSectors = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const startItem = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const endItem = Math.min(currentPage * PAGE_SIZE, filtered.length)

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Page Top Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#196928]" />
            Audited Directory · {sectors.length} Nigerian Sectors
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111816] tracking-tight leading-tight">
            The Nigerian Sector Index
          </h1>
          <p className="mt-2 text-xs sm:text-base text-[#57605B] leading-relaxed">
            Verified market intelligence across Nigeria’s commercial landscape. Inspect unit economics, failure post-mortems, and active operating companies.
          </p>
        </div>

        {/* ─── GRAND ISLAND SHEET (RevIndex style elevated white surface) ─── */}
        <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-black/[0.06] p-5 sm:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.02)] space-y-6">
          {/* Controls Bar: Search, Category, Status, Sort, View Toggle */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#88928C]"
                />
                <input
                  type="text"
                  placeholder="Search 52 sectors, keywords, tags (e.g. POS, Solar, SaaS)…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-[#F8F8F5] border border-black/[0.08] rounded-full text-xs sm:text-sm text-[#111816] placeholder:text-[#88928C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2D17] transition shadow-xs"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#88928C] hover:text-[#111816]"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Status Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {STATUS_FILTERS.map((f) => {
                  const isActive = statusFilter === f.value
                  return (
                    <button
                      key={f.value}
                      onClick={() => setStatusFilter(f.value)}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-bold transition-all',
                        isActive
                          ? 'bg-[#0F2D17] text-white shadow-xs'
                          : 'bg-[#F8F8F5] text-[#57605B] hover:text-[#111816] hover:bg-[#EAEAE5] border border-black/[0.05]'
                      )}
                    >
                      {f.label}
                    </button>
                  )
                })}
              </div>

              {/* View Toggle & Sort */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                {/* Sort Dropdown (RevIndex inspired floating card) */}
                <div className="relative" ref={sortRef}>
                  <button
                    onClick={() => setSortDropdownOpen((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#F8F8F5] hover:bg-[#EAEAE5] border border-black/[0.06] rounded-full text-xs font-bold text-[#323D38] transition"
                  >
                    <span>{SORT_OPTIONS.find((s) => s.value === sortBy)?.label}</span>
                    <ChevronDown size={13} className="text-[#88928C]" />
                  </button>

                  {sortDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-black/[0.08] shadow-xl p-1.5 z-30">
                      {SORT_OPTIONS.map((opt) => {
                        const isSelected = sortBy === opt.value
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortBy(opt.value)
                              setSortDropdownOpen(false)
                            }}
                            className={cn(
                              'w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-colors text-left',
                              isSelected
                                ? 'bg-[#EAF7EA] text-[#196928]'
                                : 'text-[#323D38] hover:bg-[#F8F8F5]'
                            )}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check size={14} className="text-[#196928]" />}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* View Switcher: Table vs Cards */}
                <div className="p-1 bg-[#F8F8F5] border border-black/[0.06] rounded-full flex gap-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      viewMode === 'table' ? 'bg-white text-[#111816] shadow-xs' : 'text-[#88928C]'
                    )}
                    aria-label="Table view"
                  >
                    <List size={14} />
                  </button>
                  <button
                    onClick={() => setViewMode('cards')}
                    className={cn(
                      'p-1.5 rounded-full transition-colors',
                      viewMode === 'cards' ? 'bg-white text-[#111816] shadow-xs' : 'text-[#88928C]'
                    )}
                    aria-label="Cards view"
                  >
                    <LayoutGrid size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Category horizontal pills */}
            <div className="pt-2 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[11px] font-bold text-[#88928C] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
                <Filter size={11} /> Filter:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-semibold shrink-0 transition-all',
                    categoryFilter === cat
                      ? 'bg-[#111816] text-white shadow-xs'
                      : 'bg-[#F8F8F5] text-[#57605B] hover:text-[#111816] hover:bg-[#EAEAE5]'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs text-[#88928C] pt-2 border-t border-black/[0.05]">
            <p>
              Showing <strong className="text-[#111816] font-mono">{startItem}–{endItem}</strong> of{' '}
              <strong className="text-[#111816] font-mono">{filtered.length}</strong> sectors
            </p>
            {(search || statusFilter !== 'all' || categoryFilter !== 'All Categories') && (
              <button
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setCategoryFilter('All Categories')
                }}
                className="text-xs text-[#196928] font-bold hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Content: Empty State vs Table vs Cards */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F8F5] flex items-center justify-center mx-auto text-[#88928C]">
                <Search size={20} />
              </div>
              <h3 className="text-base font-bold text-[#111816]">No matching sectors</h3>
              <p className="text-xs text-[#57605B] max-w-sm mx-auto">
                No sector found matching &ldquo;{search}&rdquo;. Try another keyword or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearch('')
                  setStatusFilter('all')
                  setCategoryFilter('All Categories')
                }}
                className="px-4 py-2 bg-[#0F2D17] text-white text-xs font-bold rounded-full"
              >
                Reset all filters
              </button>
            </div>
          ) : viewMode === 'table' ? (
            /* ─── LEADERBOARD TABLE VIEW (RevIndex inspired) ─── */
            <div className="divide-y divide-black/[0.05]">
              {paginatedSectors.map((sector, idx) => {
                const rank = (currentPage - 1) * PAGE_SIZE + idx + 1
                return (
                  <Link
                    key={sector.id}
                    href={`/explore/${sector.slug}`}
                    className="group py-4 sm:py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8F8F5]/80 -mx-3 px-3 rounded-2xl transition-colors"
                  >
                    {/* Left Info: Rank, Icon, Name, Category, Summary */}
                    <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                      <span className="text-xs font-mono font-bold text-[#88928C] w-6 pt-1 sm:pt-0 shrink-0">
                        {rank}
                      </span>

                      <div className="w-11 h-11 rounded-2xl bg-[#F8F8F5] border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[#0F2D17] group-hover:text-white transition-all shadow-xs">
                        <SectorIcon
                          slug={sector.slug}
                          size={20}
                          className="text-[#323D38] group-hover:text-white transition-colors"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-bold text-sm sm:text-base text-[#111816] group-hover:text-[#0F2D17] truncate transition-colors">
                            {sector.name}
                          </h2>
                          <StatusPill status={sector.status} />
                          <span className="text-[10px] text-[#88928C] font-medium hidden md:inline">
                            · {sector.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#57605B] line-clamp-1 mt-0.5 max-w-xl">
                          {sector.publicInsight}
                        </p>
                      </div>
                    </div>

                    {/* Right Metrics: Market TAM, Opp Score, Risk */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 pl-9 sm:pl-0">
                      <div className="text-left sm:text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#88928C]">
                          Audited TAM
                        </div>
                        <div className="text-xs sm:text-sm font-extrabold text-[#111816] font-mono">
                          {sector.marketSizeEst.split(' ')[0]} {sector.marketSizeEst.split(' ')[1] || ''}
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#88928C]">
                          Opp Score
                        </div>
                        <div className="text-xs sm:text-sm font-black text-[#196928] font-mono">
                          {sector.opportunityScore}/10
                        </div>
                      </div>

                      <div className="hidden lg:block text-right w-24">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#88928C]">
                          Risk Level
                        </div>
                        <div className="text-xs font-semibold capitalize text-[#57605B]">
                          {sector.riskLevel.replace('-', ' ')}
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-[#F8F8F5] group-hover:bg-[#0F2D17] group-hover:text-white flex items-center justify-center text-[#88928C] transition-all">
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            /* ─── DOSSIER CARD GRID VIEW ─── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {paginatedSectors.map((sector) => (
                <Link
                  key={sector.id}
                  href={`/explore/${sector.slug}`}
                  className="group bg-[#F8F8F5]/60 hover:bg-white border border-black/[0.06] hover:border-black/[0.18] rounded-3xl p-5 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Icon, Name, Category, Status */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center shrink-0 group-hover:bg-[#0F2D17] group-hover:text-white transition-colors shadow-xs">
                          <SectorIcon
                            slug={sector.slug}
                            size={18}
                            className="text-[#323D38] group-hover:text-white transition-colors"
                          />
                        </div>
                        <div>
                          <h2 className="font-bold text-sm text-[#111816] group-hover:text-[#0F2D17] transition-colors leading-snug">
                            {sector.name}
                          </h2>
                          <p className="text-[11px] text-[#88928C]">{sector.category}</p>
                        </div>
                      </div>
                      <StatusPill status={sector.status} />
                    </div>

                    <p className="text-xs text-[#57605B] leading-relaxed line-clamp-3 mb-4">
                      {sector.publicInsight}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between pt-3 border-t border-black/[0.05] text-xs">
                      <div>
                        <span className="text-[10px] text-[#88928C] uppercase font-bold block">
                          Opp Score
                        </span>
                        <span className="font-extrabold text-[#196928] font-mono">
                          {sector.opportunityScore}/10
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-[#88928C] uppercase font-bold block">
                          Audited TAM
                        </span>
                        <span className="font-bold text-[#111816] font-mono">
                          {sector.marketSizeEst.split(' ')[0]}
                        </span>
                      </div>

                      <span className="w-7 h-7 rounded-full bg-white group-hover:bg-[#0F2D17] group-hover:text-white flex items-center justify-center text-[#88928C] transition-colors">
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ─── PAGINATION CONTROLS ─── */}
          {totalPages > 1 && (
            <div className="pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#88928C]">
                Page <strong className="text-[#111816] font-mono">{currentPage}</strong> of{' '}
                <strong className="text-[#111816] font-mono">{totalPages}</strong>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.max(1, p - 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F8F8F5] hover:bg-[#EAEAE5] border border-black/[0.06] rounded-full text-xs font-bold text-[#323D38] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={13} />
                  <span>Prev</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => {
                          setCurrentPage(pageNum)
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                        className={cn(
                          'w-7 h-7 rounded-full text-xs font-bold transition',
                          currentPage === pageNum
                            ? 'bg-[#0F2D17] text-white shadow-xs'
                            : 'bg-[#F8F8F5] text-[#57605B] hover:bg-[#EAEAE5]'
                        )}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F8F8F5] hover:bg-[#EAEAE5] border border-black/[0.06] rounded-full text-xs font-bold text-[#323D38] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <span>Next</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
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
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${cfg.class}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span>{cfg.label}</span>
    </span>
  )
}
