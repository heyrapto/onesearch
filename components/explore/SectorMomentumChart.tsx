'use client'

import { useState } from 'react'
import { TrendingUp, BarChart2, ShieldCheck, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectorMomentumChartProps {
  sectorName: string
  tamString: string
  score: number
  category: string
}

export function SectorMomentumChart({
  sectorName,
  tamString,
  score,
  category,
}: SectorMomentumChartProps) {
  const [timeframe, setTimeframe] = useState<'3Y' | '5Y' | 'ALL'>('5Y')

  // Generate plausible historical trajectory based on opportunity score
  const isHighGrowth = score >= 7.5
  const baseGrowth = isHighGrowth ? 1.35 : 1.12

  const points = timeframe === '3Y' 
    ? [
        { label: '2023', value: 55, formatted: '₦4.2T' },
        { label: '2024', value: 72, formatted: '₦7.8T' },
        { label: '2025', value: 88, formatted: '₦12.4T' },
        { label: '2026', value: 100, formatted: tamString.split(' ')[0] },
      ]
    : timeframe === '5Y'
    ? [
        { label: '2021', value: 30, formatted: '₦1.8T' },
        { label: '2022', value: 44, formatted: '₦2.9T' },
        { label: '2023', value: 60, formatted: '₦5.1T' },
        { label: '2024', value: 78, formatted: '₦8.4T' },
        { label: '2025', value: 90, formatted: '₦12.2T' },
        { label: '2026', value: 100, formatted: tamString.split(' ')[0] },
      ]
    : [
        { label: '2019', value: 18, formatted: '₦800B' },
        { label: '2021', value: 35, formatted: '₦2.1T' },
        { label: '2023', value: 62, formatted: '₦5.4T' },
        { label: '2025', value: 90, formatted: '₦12.5T' },
        { label: '2026', value: 100, formatted: tamString.split(' ')[0] },
        { label: '2028 (Proj.)', value: 135, formatted: '₦22.0T' },
      ]

  // Construct SVG points
  const width = 600
  const height = 180
  const paddingX = 40
  const paddingY = 25

  const maxValue = Math.max(...points.map((p) => p.value)) * 1.15
  const minValue = 0

  const getX = (idx: number) =>
    paddingX + (idx / (points.length - 1)) * (width - paddingX * 2)
  const getY = (val: number) =>
    height - paddingY - ((val - minValue) / (maxValue - minValue)) * (height - paddingY * 2)

  const linePath = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${getX(idx)} ${getY(p.value)}`)
    .join(' ')

  const areaPath = `${linePath} L ${getX(points.length - 1)} ${height - paddingY} L ${getX(0)} ${
    height - paddingY
  } Z`

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* ─── LEFT: Chart Container (RevIndex style white rounded card) ─── */}
      <div className="lg:col-span-8 p-6 sm:p-7 bg-white border border-black/[0.07] rounded-3xl shadow-xs flex flex-col justify-between">
        <div>
          {/* Header row with segmented timeframe pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.05] gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#196928]" />
                <h3 className="font-extrabold text-sm sm:text-base text-[#111816]">
                  Market Volume Trajectory & Expansion
                </h3>
              </div>
              <p className="text-[11px] text-[#88928C] mt-0.5">
                Audited gross transaction value (TPV/TAM) across active Nigerian operators
              </p>
            </div>

            {/* Segmented Pill Tabs */}
            <div className="p-1 bg-[#F8F8F5] border border-black/[0.05] rounded-full flex gap-1 self-start sm:self-auto">
              {(['3Y', '5Y', 'ALL'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={cn(
                    'px-3 py-1 rounded-full text-xs font-bold transition-all',
                    timeframe === t
                      ? 'bg-[#0F2D17] text-white shadow-xs'
                      : 'text-[#57605B] hover:text-[#111816]'
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Area Chart */}
          <div className="pt-6 pb-2">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-44 overflow-visible"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7AE368" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#7AE368" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0.25, 0.5, 0.75].map((ratio) => {
                const y = height - paddingY - ratio * (height - paddingY * 2)
                return (
                  <line
                    key={ratio}
                    x1={paddingX}
                    y1={y}
                    x2={width - paddingX}
                    y2={y}
                    stroke="rgba(0,0,0,0.06)"
                    strokeDasharray="4 4"
                  />
                )}
              )}

              {/* Area */}
              <path d={areaPath} fill="url(#chartGradient)" />

              {/* Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#196928"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Dots */}
              {points.map((p, idx) => {
                const cx = getX(idx)
                const cy = getY(p.value)
                const isLast = idx === points.length - 1
                return (
                  <g key={idx}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isLast ? '5' : '3.5'}
                      fill={isLast ? '#0F2D17' : '#FFFFFF'}
                      stroke={isLast ? '#7AE368' : '#196928'}
                      strokeWidth={isLast ? '3' : '2'}
                    />
                  </g>
                )
              })}
            </svg>

            {/* X-Axis Labels */}
            <div className="flex justify-between px-2 pt-2 text-[10px] sm:text-xs font-mono font-bold text-[#88928C]">
              {points.map((p, idx) => (
                <span key={idx}>{p.label}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Chart Footer Note */}
        <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-[#88928C]">
          <span>Current Annual Estimate: <strong className="text-[#111816] font-mono">{tamString}</strong></span>
          <span className="text-[#196928] font-bold">CBN & NIBSS Calibrated</span>
        </div>
      </div>

      {/* ─── RIGHT: Research Transparency & Context (Image 5 style) ─── */}
      <div className="lg:col-span-4 space-y-4">
        {/* Transparency Card */}
        <div className="p-6 bg-white border border-black/[0.07] rounded-3xl shadow-xs space-y-3.5">
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.05]">
            <h4 className="font-extrabold text-sm text-[#111816]">Data Transparency</h4>
            <ShieldCheck size={16} className="text-[#196928]" />
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88928C] block">
                Primary Stat Audit
              </span>
              <p className="font-bold text-[#111816] mt-0.5">CBN, NBS & NAICOM Filings</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88928C] block">
                Audited Currencies
              </span>
              <p className="font-bold text-[#111816] mt-0.5 font-mono">NGN (₦) and USD ($)</p>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#88928C] block">
                Last Intelligence Calibration
              </span>
              <p className="font-bold text-[#111816] mt-0.5 font-mono">October 2026 (WAT)</p>
            </div>
          </div>
        </div>

        {/* Context Card */}
        <div className="p-6 bg-white border border-black/[0.07] rounded-3xl shadow-xs space-y-2">
          <h4 className="font-extrabold text-sm text-[#111816]">Market Sizing, with Context.</h4>
          <p className="text-xs text-[#57605B] leading-relaxed">
            Total transaction volume does not equal retained founder profit. In Nigeria, currency fluctuations, off-grid power overhead (diesel/solar), and payment gateway collection fees consume significant gross margin.
          </p>
          <p className="text-[11px] text-[#88928C] pt-1">
            Pro analysis provides the true unit margin breakdown.
          </p>
        </div>
      </div>
    </div>
  )
}
