'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { AuthModal } from '@/components/auth/AuthModal'
import {
  Lock,
  Loader2,
  CheckCircle2,
  Skull,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  DollarSign,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import type { ProAnalysis } from '@/types/sector'

declare global {
  interface Window {
    PaystackPop: {
      setup: (opts: Record<string, unknown>) => { openIframe: () => void }
    }
  }
}

interface ProGateProps {
  sectorName: string
  proAnalysis: ProAnalysis
}

export function ProGate({ sectorName, proAnalysis }: ProGateProps) {
  const { user, isPro, refreshPro } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  // Dynamically load Paystack inline script
  useEffect(() => {
    if (document.getElementById('paystack-script')) return
    const script = document.createElement('script')
    script.id = 'paystack-script'
    script.src = 'https://js.paystack.co/v2/inline.js'
    script.async = true
    document.head.appendChild(script)
  }, [])

  const initiatePayment = () => {
    if (!user) {
      setAuthOpen(true)
      return
    }

    setPaying(true)

    try {
      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_sample',
        email: user.email,
        amount: 200000, // ₦2,000 in kobo
        currency: 'NGN',
        metadata: {
          custom_fields: [
            {
              display_name: 'Supabase User ID',
              variable_name: 'supabase_user_id',
              value: user.id,
            },
          ],
        },
        callback: async (response: { reference: string }) => {
          try {
            const res = await fetch('/api/paystack/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ reference: response.reference }),
            })
            if (res.ok) {
              setPaid(true)
              await refreshPro()
            }
          } catch {
            await refreshPro()
          }
          setPaying(false)
        },
        onClose: () => {
          setPaying(false)
        },
      })

      handler.openIframe()
    } catch {
      setPaying(false)
    }
  }

  // ─── UNLOCKED PRO VIEW ────────────────────────────────────────────────────────
  if (isPro || paid) {
    return (
      <div className="space-y-8 bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Pro Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#EAF7EA] border border-[#D4EBD1] rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F2D17] text-[#7AE368] flex items-center justify-center font-bold">
              ✦
            </div>
            <div>
              <p className="font-bold text-[#111816] text-sm">
                Pro Intelligence Dossier Unlocked
              </p>
              <p className="text-xs text-[#196928]">
                Full failure autopsies, operator unit economics, and execution playbooks
              </p>
            </div>
          </div>
          <span className="px-3 py-1 bg-[#0F2D17] text-[#7AE368] text-[10px] font-bold rounded-full">
            LIFETIME ACCESS ACTIVE
          </span>
        </div>

        {/* Executive Strategic Synthesis */}
        <div>
          <h3 className="text-base font-bold text-[#111816] mb-2 flex items-center gap-2">
            <Lightbulb size={16} className="text-[#196928]" />
            <span>Executive Strategic Synthesis</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#323D38] leading-relaxed bg-[#F8F8F5] p-5 rounded-2xl border border-black/[0.05]">
            {proAnalysis.fullAnalysis}
          </p>
        </div>

        {/* Failure Case Studies (Autopsies) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-[#111816] flex items-center gap-2">
              <Skull size={16} className="text-[#B42318]" />
              <span>Failure Autopsies & Post-Mortems</span>
            </h3>
            <span className="text-[11px] text-[#88928C] font-mono">
              {proAnalysis.failureCaseStudies.length} Post-Mortems
            </span>
          </div>

          <div className="space-y-4">
            {proAnalysis.failureCaseStudies.map((study, idx) => (
              <div
                key={idx}
                className="p-5 border border-[#F5C2BE] bg-[#FDF0EF]/40 rounded-2xl space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F8C8C4] pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#111816] text-sm">{study.company}</span>
                    <span className="text-xs text-[#88928C]">
                      ({study.founded} {study.died ? `– ${study.died}` : ''})
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#F8C8C4] text-[#B42318] text-xs font-bold rounded-full">
                    Raised: {study.raised}
                  </span>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-[#B42318] uppercase tracking-wider mb-1">
                    Cause of Death & Breakdown Mode:
                  </p>
                  <p className="text-xs sm:text-sm text-[#323D38] leading-relaxed">
                    {study.causeOfDeath}
                  </p>
                </div>

                {study.lessons && study.lessons.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-[#111816] uppercase tracking-wider mb-1">
                      Hard Lessons for Founders:
                    </p>
                    <ul className="space-y-1.5">
                      {study.lessons.map((lesson, lIdx) => (
                        <li
                          key={lIdx}
                          className="text-xs text-[#57605B] flex items-start gap-2"
                        >
                          <span className="text-[#B42318] font-bold">•</span>
                          <span>{lesson}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Unit Economics Breakdown */}
        <div>
          <h3 className="text-base font-bold text-[#111816] mb-3 flex items-center gap-2">
            <DollarSign size={16} className="text-[#196928]" />
            <span>Unit Economics & Financial Benchmarks</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
            <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
              <p className="text-[11px] text-[#88928C] font-semibold uppercase tracking-wider">
                Avg CAC
              </p>
              <p className="text-base font-extrabold text-[#111816] mt-1">
                {proAnalysis.unitEconomics.avgCAC}
              </p>
            </div>
            <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
              <p className="text-[11px] text-[#88928C] font-semibold uppercase tracking-wider">
                Avg LTV
              </p>
              <p className="text-base font-extrabold text-[#111816] mt-1">
                {proAnalysis.unitEconomics.avgLTV}
              </p>
            </div>
            <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
              <p className="text-[11px] text-[#88928C] font-semibold uppercase tracking-wider">
                Payback Period
              </p>
              <p className="text-base font-extrabold text-[#111816] mt-1">
                {proAnalysis.unitEconomics.paybackPeriod}
              </p>
            </div>
            <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
              <p className="text-[11px] text-[#88928C] font-semibold uppercase tracking-wider">
                Gross Margin
              </p>
              <p className="text-base font-extrabold text-[#196928] mt-1">
                {proAnalysis.unitEconomics.grossMarginRange}
              </p>
            </div>
          </div>
          <div className="p-4 bg-[#F8F8F5] border border-black/[0.06] rounded-2xl">
            <p className="text-[10px] font-bold text-[#57605B] uppercase tracking-wider mb-1">
              Field Burn Rate Realities:
            </p>
            <p className="text-xs text-[#323D38] leading-relaxed">
              {proAnalysis.unitEconomics.notes}
            </p>
          </div>
        </div>

        {/* Winning Playbooks */}
        <div>
          <h3 className="text-base font-bold text-[#111816] mb-3 flex items-center gap-2">
            <TrendingUp size={16} className="text-[#196928]" />
            <span>Proven Winning Playbooks</span>
          </h3>
          <div className="space-y-4">
            {proAnalysis.winningPlaybooks.map((playbook, idx) => (
              <div
                key={idx}
                className="p-5 border border-[#DCEFE0] bg-[#FAFCFA] rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-[#111816] text-sm">{playbook.title}</h4>
                  <span className="text-[11px] font-semibold text-[#196928] px-2.5 py-0.5 bg-[#EAF7EA] rounded-full">
                    Validated in Market
                  </span>
                </div>
                <ol className="space-y-2">
                  {playbook.steps.map((step, sIdx) => (
                    <li
                      key={sIdx}
                      className="text-xs text-[#323D38] flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#0F2D17] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="pt-2 border-t border-[#DCEFE0]">
                  <p className="text-xs text-[#196928]">
                    <span className="font-bold">Case Proof:</span> {playbook.successExample}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory Traps */}
        <div>
          <h3 className="text-base font-bold text-[#111816] mb-3 flex items-center gap-2">
            <ShieldAlert size={16} className="text-[#A0600D]" />
            <span>Statutory Regulatory Landmines</span>
          </h3>
          <div className="p-5 border border-[#FADFB0] bg-[#FEF6E8]/60 rounded-2xl space-y-2">
            {proAnalysis.regulatoryLandmines.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#A0600D]">
                <AlertTriangle size={14} className="text-[#A0600D] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Market Gaps */}
        <div>
          <h3 className="text-base font-bold text-[#111816] mb-3 flex items-center gap-2">
            <Sparkles size={16} className="text-[#196928]" />
            <span>Unexploited White Spaces & Addressable TAM</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {proAnalysis.marketGapsDetailed.map((gap, idx) => (
              <div
                key={idx}
                className="p-4 border border-black/[0.08] rounded-2xl space-y-2 bg-[#F8F8F5]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#111816] text-xs sm:text-sm">{gap.gap}</span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      gap.difficulty === 'easy'
                        ? 'bg-[#EAF7EA] text-[#196928]'
                        : gap.difficulty === 'medium'
                        ? 'bg-[#FEF6E8] text-[#A0600D]'
                        : 'bg-[#FDF0EF] text-[#B42318]'
                    }`}
                  >
                    {gap.difficulty}
                  </span>
                </div>
                <p className="text-xs text-[#196928] font-bold">
                  Estimated TAM: {gap.size}
                </p>
                <p className="text-xs text-[#57605B] leading-relaxed">{gap.why}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ─── LOCKED PRO GATE OVERLAY ──────────────────────────────────────────────────
  return (
    <>
      <div className="relative rounded-3xl overflow-hidden border border-black/[0.08] bg-[#F8F8F5] shadow-sm">
        {/* Blurred Teaser Backdrop */}
        <div className="p-8 select-none pointer-events-none filter blur-[3px] opacity-40 space-y-6">
          <div className="space-y-2">
            <div className="h-6 bg-stone-300 rounded-xl w-1/3" />
            <div className="h-4 bg-stone-200 rounded-lg w-full" />
            <div className="h-4 bg-stone-200 rounded-lg w-5/6" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-28 bg-[#FDF0EF] rounded-2xl p-4 space-y-2">
              <div className="h-4 bg-rose-200 rounded w-1/2" />
              <div className="h-3 bg-rose-100 rounded w-full" />
            </div>
            <div className="h-28 bg-[#EAF7EA] rounded-2xl p-4 space-y-2">
              <div className="h-4 bg-emerald-200 rounded w-1/2" />
              <div className="h-3 bg-emerald-100 rounded w-full" />
            </div>
          </div>

          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-300" />
                <div className="h-4 bg-stone-200 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>

        {/* High-Craft Interactive Paystack Gate Card */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F8F8F5]/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="text-center max-w-md w-full bg-white border border-black/[0.08] rounded-3xl p-6 sm:p-8 shadow-xl">
            {/* Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#0F2D17] text-[#7AE368] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock size={20} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] text-[10px] font-bold uppercase tracking-wider rounded-full mb-3">
              <Sparkles size={11} />
              Pro Intelligence Dossier
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-[#111816] mb-2 tracking-tight">
              Unlock Deep Dossier for {sectorName}
            </h3>

            <p className="text-xs text-[#57605B] mb-6 leading-relaxed">
              Instant access to verified failure autopsies, true local CAC/LTV unit economics, statutory compliance traps, and proven execution blueprints.
            </p>

            {/* Price pill */}
            <div className="flex items-baseline justify-center gap-1.5 mb-5 p-3 bg-[#F8F8F5] rounded-2xl border border-black/[0.05]">
              <span className="text-3xl font-black text-[#111816] tracking-tight">₦2,000</span>
              <span className="text-xs text-[#57605B] font-medium">one-time · lifetime access</span>
            </div>

            {/* Action Button */}
            <button
              onClick={initiatePayment}
              disabled={paying}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#0F2D17] hover:bg-[#153E20] text-white rounded-full text-xs sm:text-sm font-bold shadow-md disabled:opacity-60 transition-all active:scale-[0.98]"
            >
              {paying ? (
                <Loader2 size={16} className="animate-spin text-[#7AE368]" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-[#7AE368]" />
              )}
              {paying ? 'Connecting Paystack…' : 'Unlock Pro Access for ₦2,000'}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#88928C] mt-3">
              <ShieldCheck size={13} className="text-[#196928]" />
              <span>Secured by Paystack · All 52 Sectors Unlocked</span>
            </div>

            {!user && (
              <p className="text-xs text-[#57605B] mt-4 pt-3 border-t border-black/[0.05]">
                Already have an account?{' '}
                <button
                  onClick={() => setAuthOpen(true)}
                  className="font-bold text-[#0F2D17] underline hover:text-[#196928]"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
