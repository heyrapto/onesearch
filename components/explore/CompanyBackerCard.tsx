'use client'

import React, { useState } from 'react'
import { ExternalLink } from 'lucide-react'
import type { CompanyBacker } from '@/types/sector'

interface CompanyBackerCardProps {
  company: CompanyBacker
}

export function CompanyBackerCard({ company }: CompanyBackerCardProps) {
  const [imageError, setImageError] = useState(false)
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${company.domain}&sz=128`

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-start gap-3.5 p-4 bg-white border border-black/[0.07] rounded-2xl hover:border-black/[0.2] hover:shadow-md transition-all duration-200 block"
    >
      {/* Squircle logo container */}
      <div className="w-11 h-11 rounded-2xl bg-[#F8F8F5] border border-black/[0.06] flex items-center justify-center shrink-0 overflow-hidden group-hover:scale-105 transition-transform shadow-xs">
        {!imageError ? (
          <img
            src={faviconUrl}
            alt={`${company.name} logo`}
            className="w-6 h-6 object-contain"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-[#0F2D17] text-[#7AE368] flex items-center justify-center font-bold text-sm">
            {company.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1.5">
          <h4 className="font-bold text-sm text-[#111816] group-hover:text-[#0F2D17] truncate flex items-center gap-1.5 transition-colors">
            <span>{company.name}</span>
            {company.status === 'acquired' && (
              <span className="text-[10px] font-bold px-2 py-0.2 bg-[#EEF4FD] text-[#1B5694] border border-[#D5E3F8] rounded-full">
                Acquired
              </span>
            )}
          </h4>
          <span className="text-[#88928C] group-hover:text-[#0F2D17] shrink-0 text-xs transition-colors">
            ↗
          </span>
        </div>

        <p className="text-[11px] text-[#88928C] font-mono truncate mt-0.5">{company.domain}</p>

        {company.description && (
          <p className="text-xs text-[#57605B] mt-1.5 line-clamp-2 leading-relaxed">
            {company.description}
          </p>
        )}
      </div>
    </a>
  )
}
