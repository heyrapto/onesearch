'use client'

import React from 'react'
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Compass,
  DollarSign,
  Clock,
  KeyRound,
  UserCheck,
  UserX,
} from 'lucide-react'
import type { ShouldIBuild } from '@/types/sector'

interface ShouldIBuildSectionProps {
  data: ShouldIBuild
  sectorName: string
}

export function ShouldIBuildSection({ data, sectorName }: ShouldIBuildSectionProps) {
  const verdictConfig = {
    BUILD: {
      badge: 'Green Light to Build',
      badgeClass: 'bg-[#EAF7EA] text-[#196928] border-[#D4EBD1]',
      icon: CheckCircle2,
      dot: 'bg-[#196928]',
    },
    PROCEED_WITH_CAUTION: {
      badge: 'Proceed With Caution',
      badgeClass: 'bg-[#FEF6E8] text-[#A0600D] border-[#FADFB0]',
      icon: AlertTriangle,
      dot: 'bg-[#A0600D]',
    },
    DO_NOT_BUILD: {
      badge: 'Extreme Caution / High Casualty Rate',
      badgeClass: 'bg-[#FDF0EF] text-[#B42318] border-[#F8C8C4]',
      icon: XCircle,
      dot: 'bg-[#B42318]',
    },
    NICHE_ONLY: {
      badge: 'Viable for High-Ticket Niches Only',
      badgeClass: 'bg-[#EEF4FD] text-[#1B5694] border-[#D5E3F8]',
      icon: Compass,
      dot: 'bg-[#1B5694]',
    },
  }

  const cfg = verdictConfig[data.verdict] || verdictConfig.PROCEED_WITH_CAUTION
  const VerdictIcon = cfg.icon

  return (
    <section className="bg-white rounded-3xl border border-black/[0.08] p-6 sm:p-8 shadow-sm space-y-6">
      {/* Memo Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#196928]">
              Founder Decision Memo
            </span>
            <span className="w-1 h-1 rounded-full bg-[#88928C]" />
            <span className="text-[10px] font-medium text-[#88928C]">Venture Viability Analysis</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111816] tracking-tight">
            Should you build in {sectorName}?
          </h2>
        </div>

        <div className="self-start sm:self-auto">
          <span
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${cfg.badgeClass} shadow-xs`}
          >
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <VerdictIcon size={13} />
            <span>{cfg.badge}</span>
          </span>
        </div>
      </div>

      {/* Honest Verdict Memo Box */}
      <div className="p-5 bg-[#F8F8F5] border border-black/[0.05] rounded-2xl">
        <p className="text-xs sm:text-sm font-medium text-[#111816] leading-relaxed">
          {data.verdictSummary}
        </p>
      </div>

      {/* Grid: Who Wins vs Who Fails */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ideal Founder Profile */}
        <div className="p-5 bg-[#FAFCFA] border border-[#DCEFE0] rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-[#196928] font-bold text-xs uppercase tracking-wider">
            <UserCheck size={16} />
            <span>Ideal Operator Profile (Who Wins Here)</span>
          </div>
          <p className="text-xs text-[#323D38] leading-relaxed font-normal">
            {data.whoShouldBuild}
          </p>
        </div>

        {/* Who Should Avoid */}
        <div className="p-5 bg-[#FCF8F8] border border-[#F7DFDE] rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-[#B42318] font-bold text-xs uppercase tracking-wider">
            <UserX size={16} />
            <span>Who Should Avoid (Capital Drain Mode)</span>
          </div>
          <p className="text-xs text-[#323D38] leading-relaxed font-normal">
            {data.whoShouldAvoid}
          </p>
        </div>
      </div>

      {/* Micro-benchmarks strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {/* MVP Capital */}
        <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
          <div className="flex items-center gap-1.5 text-[11px] text-[#88928C] font-semibold uppercase tracking-wider mb-1">
            <DollarSign size={13} className="text-[#196928]" />
            <span>Capital to Launch MVP</span>
          </div>
          <p className="text-sm font-extrabold text-[#111816]">{data.capitalToStart}</p>
        </div>

        {/* Time to 1st ₦1M */}
        <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
          <div className="flex items-center gap-1.5 text-[11px] text-[#88928C] font-semibold uppercase tracking-wider mb-1">
            <Clock size={13} className="text-[#196928]" />
            <span>Time to 1st ₦1M Revenue</span>
          </div>
          <p className="text-sm font-extrabold text-[#111816]">{data.timeToFirstMillion}</p>
        </div>

        {/* Unfair Advantage */}
        <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
          <div className="flex items-center gap-1.5 text-[11px] text-[#88928C] font-semibold uppercase tracking-wider mb-1">
            <KeyRound size={13} className="text-[#196928]" />
            <span>Crucial Unfair Advantage</span>
          </div>
          <p className="text-xs font-bold text-[#111816] leading-snug">
            {data.unfairAdvantageNeeded}
          </p>
        </div>
      </div>
    </section>
  )
}
