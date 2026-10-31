'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import { AuthModal } from '@/components/auth/AuthModal'
import { LogOut, ChevronDown, Sparkles, Compass } from 'lucide-react'

export function Navbar() {
  const { user, isPro, signOut, isLoading } = useAuth()
  const [authOpen, setAuthOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F8F5]/85 backdrop-blur-md border-b border-black/[0.06] transition-all">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            {/* Custom handcrafted logo mark */}
            <div className="w-9 h-9 rounded-xl bg-[#0F2D17] flex items-center justify-center relative overflow-hidden shadow-sm group-hover:bg-[#153E20] transition-colors">
              {/* Dual angled index layers */}
              <div className="w-4 h-1.5 rounded-full bg-[#7AE368] transform -rotate-12 translate-y-[-2px] translate-x-[-1px]" />
              <div className="w-4 h-1.5 rounded-full bg-white transform -rotate-12 translate-y-[3px] translate-x-[1px]" />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[17px] tracking-tight text-[#111816]">
                OneSearch
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1]">
                Sector Index
              </span>
            </div>
          </Link>

          {/* Navigation links & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/explore"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#323D38] hover:text-[#111816] hover:bg-black/[0.04] rounded-full transition-colors"
            >
              <Compass size={15} className="text-[#196928]" />
              <span>Explore Index</span>
            </Link>

            <a
              href="/#pricing"
              className="hidden md:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-[#57605B] hover:text-[#111816] hover:bg-black/[0.04] rounded-full transition-colors"
            >
              <span>Pro Dossiers</span>
            </a>

            {!isLoading && (
              <>
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen((v) => !v)}
                      className="flex items-center gap-2 pl-2 pr-3 py-1.5 text-xs sm:text-sm font-semibold text-[#111816] bg-white border border-black/[0.08] hover:border-black/[0.16] rounded-full shadow-sm transition-all"
                    >
                      <div className="w-6 h-6 rounded-full bg-[#0F2D17] text-[#7AE368] flex items-center justify-center text-xs font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                      <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                      {isPro && (
                        <span className="px-1.5 py-0.5 bg-[#EAF7EA] text-[#196928] text-[10px] font-bold rounded-full">
                          PRO
                        </span>
                      )}
                      <ChevronDown size={14} className="text-[#88928C]" />
                    </button>

                    {dropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen(false)}
                        />
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-black/[0.08] shadow-xl py-1.5 z-20">
                          <div className="px-4 py-2.5 border-b border-black/[0.05]">
                            <p className="text-xs text-[#88928C] truncate font-mono">{user.email}</p>
                            {isPro ? (
                              <p className="text-xs font-bold text-[#196928] mt-1 flex items-center gap-1">
                                <Sparkles size={12} /> Pro Intelligence Access
                              </p>
                            ) : (
                              <p className="text-xs text-[#57605B] mt-0.5">Public Explorer Plan</p>
                            )}
                          </div>
                          <button
                            onClick={() => {
                              setDropdownOpen(false)
                              signOut()
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#B42318] hover:bg-[#FDF0EF] transition-colors"
                          >
                            <LogOut size={13} />
                            Sign out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold bg-[#0F2D17] text-white hover:bg-[#153E20] rounded-full shadow-sm active:scale-[0.98] transition-all"
                  >
                    <span>Sign In</span>
                  </button>
                )}
              </>
            )}
          </div>
        </nav>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
