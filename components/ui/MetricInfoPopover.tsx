'use client'

import { useState, useRef, useEffect } from 'react'
import { Info, HelpCircle } from 'lucide-react'

interface MetricInfoPopoverProps {
  title: string
  description: string
  details?: { label: string; text: string }[]
  className?: string
}

export function MetricInfoPopover({
  title,
  description,
  details,
  className = '',
}: MetricInfoPopoverProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

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
        className="p-1 rounded-full text-[#88928C] hover:text-[#111816] hover:bg-black/[0.04] transition-colors focus:outline-none"
        aria-label={`Learn more about ${title}`}
      >
        <HelpCircle size={13} className="shrink-0" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          onClick={(e) => e.stopPropagation()}
          className="absolute z-50 left-0 bottom-full mb-2 w-72 sm:w-80 bg-white border border-black/[0.08] rounded-2xl shadow-xl p-4 text-left transition-all animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-black/[0.05]">
            <div className="w-5 h-5 rounded-full bg-[#0F2D17] text-[#7AE368] flex items-center justify-center shrink-0">
              <Info size={11} />
            </div>
            <h4 className="text-xs font-bold text-[#111816] leading-tight">{title}</h4>
          </div>

          {/* Description */}
          <p className="text-xs text-[#57605B] leading-relaxed mb-3">{description}</p>

          {/* Breakdown bullets */}
          {details && details.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-black/[0.05]">
              {details.map((item, idx) => (
                <div key={idx} className="text-[11px] leading-snug">
                  <span className="font-bold text-[#111816]">{item.label}: </span>
                  <span className="text-[#57605B]">{item.text}</span>
                </div>
              ))}
            </div>
          )}

          <div className="absolute left-4 top-full w-2.5 h-2.5 bg-white border-b border-r border-black/[0.08] rotate-45 -translate-y-1.5 pointer-events-none" />
        </div>
      )}
    </div>
  )
}
