'use client'

import Link from 'next/link'
import { ExternalLink, ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#F4F4F0] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Credibility */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F2D17] flex items-center justify-center shadow-sm">
                <div className="w-3 h-1 rounded-full bg-[#7AE368] transform -rotate-12 translate-y-[-1px]" />
                <div className="w-3 h-1 rounded-full bg-white transform -rotate-12 translate-y-[2px]" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-[#111816]">
                OneSearch
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1]">
                Nigeria
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#57605B] leading-relaxed max-w-sm">
              The independent sector intelligence and market index for African founders, operators, and early-stage capital allocators.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-[#57605B] pt-1">
              <ShieldCheck size={14} className="text-[#196928] shrink-0" />
              <span>Grounded in statutory filings from CBN, NBS, NIBSS, and primary field operators.</span>
            </div>
          </div>

          {/* Links Column 1: Index Directory */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#196928]">
              Intelligence Directory
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/explore"
                  className="text-[#57605B] hover:text-[#111816] transition-colors"
                >
                  Explore All 52 Sectors
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?status=succeeding"
                  className="text-[#57605B] hover:text-[#111816] transition-colors"
                >
                  Succeeding Markets
                </Link>
              </li>
              <li>
                <Link
                  href="/explore?status=emerging"
                  className="text-[#57605B] hover:text-[#111816] transition-colors"
                >
                  Emerging Frontiers
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  className="text-[#57605B] hover:text-[#111816] transition-colors"
                >
                  Founder Pro Dossier (₦2,000)
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Research & Editorial */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#196928]">
              Research & Methodology
            </p>
            <p className="text-xs text-[#57605B] leading-relaxed">
              Research curated by{' '}
              <span className="font-semibold text-[#111816]">Abdulazeez Adekunle</span>. Deep-dive
              autopsies, unit economics analysis, and macro regulatory monitoring.
            </p>
            <div className="pt-1">
              <a
                href="https://substack.com/@abdulazeezadekunle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F2D17] hover:text-[#196928] transition-colors"
              >
                <span>Read Research Substack</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-black/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#88928C]">
          <p>© 2026 OneSearch Sector Intelligence. All rights reserved.</p>
          <p>Curated from public statutory audits and field interviews. Not financial advisory.</p>
        </div>
      </div>
    </footer>
  )
}
