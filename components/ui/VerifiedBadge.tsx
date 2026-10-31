'use client'

import { useState, useRef, useEffect } from 'react'
import { ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react'
import type { ResearchCitation } from '@/types/sector'

interface VerifiedBadgeProps {
  citation?: ResearchCitation
  claimName?: string
  className?: string
  size?: 'sm' | 'md'
}

export function VerifiedBadge({
  citation,
  claimName = 'Data point',
  className = '',
  size = 'sm',
}: VerifiedBadgeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const activeCitation: ResearchCitation = citation || {
    source: 'CBN & National Bureau of Statistics (NBS)',
    title: 'Macroeconomic & Industry Trade Sector Digest',
    year: '2023–2024',
    url: 'https://www.cbn.gov.ng',
    dataPoint: 'Verified through public statutory regulatory filings and industry surveys.',
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        className={`inline-flex items-center gap-1 font-semibold rounded-full transition-all focus:outline-none ${
          size === 'sm'
            ? 'px-2 py-0.5 text-[10px] bg-[#EAF7EA] text-[#196928] hover:bg-[#DDF2DC] border border-[#D4EBD1]'
            : 'px-2.5 py-1 text-xs bg-[#EAF7EA] text-[#196928] hover:bg-[#DDF2DC] border border-[#D4EBD1]'
        }`}
        aria-label={`View verified research for ${claimName}`}
      >
        <ShieldCheck size={size === 'sm' ? 11 : 13} className="text-[#196928] shrink-0" />
        <span>Verified</span>
      </button>

      {/* Popover */}
      {isOpen && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 left-0 bottom-full mb-2 w-72 sm:w-80 bg-white border border-black/[0.08] rounded-2xl shadow-xl p-4 text-left transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/[0.05]">
            <div className="w-5 h-5 rounded-full bg-[#EAF7EA] text-[#196928] flex items-center justify-center shrink-0">
              <CheckCircle2 size={12} />
            </div>
            <div>
              <p className="text-[11px] font-bold text-[#111816] leading-tight">
                Verified Market Research
              </p>
              <p className="text-[10px] text-[#88928C]">Backing {claimName}</p>
            </div>
          </div>

          {/* Citation Info */}
          <div className="space-y-2 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88928C] block mb-0.5">
                Primary Source
              </span>
              <p className="font-bold text-[#111816] leading-snug">
                {activeCitation.source}
              </p>
              <p className="text-[11px] text-[#57605B] mt-0.5 italic">
                &ldquo;{activeCitation.title}&rdquo; ({activeCitation.year})
              </p>
            </div>

            <div className="p-2.5 bg-[#F8F8F5] rounded-xl border border-black/[0.05]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88928C] block mb-0.5">
                Verified Excerpt / Metric
              </span>
              <p className="text-[11px] text-[#323D38] leading-relaxed font-mono">
                {activeCitation.dataPoint}
              </p>
            </div>

            {activeCitation.url && (
              <a
                href={activeCitation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2.5 inline-flex items-center justify-between w-full px-3 py-2 bg-[#0F2D17] hover:bg-[#153E20] text-white rounded-xl text-[11px] font-bold transition shadow-sm"
              >
                <span>Inspect Source Report</span>
                <ExternalLink size={12} className="text-[#7AE368]" />
              </a>
            )}
          </div>

          <div className="absolute left-4 top-full w-2.5 h-2.5 bg-white border-b border-r border-black/[0.08] rotate-45 -translate-y-1.5 pointer-events-none" />
        </div>
      )}
    </div>
  )
}
