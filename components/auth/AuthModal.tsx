'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from './AuthProvider'
import { X, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'signin' | 'signup'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<Tab>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClient()

  // Close when signed in
  useEffect(() => {
    if (user && isOpen) onClose()
  }, [user, isOpen, onClose])

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setError(null)
      setSuccessMsg(null)
      setEmail('')
      setPassword('')
      setFullName('')
    }
  }, [isOpen])

  // Trap escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleSignIn = useCallback(async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setLoading(false)
  }, [supabase, email, password])

  const handleSignUp = useCallback(async () => {
    if (!fullName.trim()) {
      setError('Please enter your full name.')
      return
    }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError(error.message)
    } else {
      setSuccessMsg(
        'Check your email for a confirmation link. Once confirmed, sign in to access your account.'
      )
    }
    setLoading(false)
  }, [supabase, email, password, fullName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (tab === 'signin') await handleSignIn()
    else await handleSignUp()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={tab === 'signin' ? 'Sign in' : 'Create account'}
    >
      {/* Warm Backdrop */}
      <div
        className="absolute inset-0 bg-[#0F2D17]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Surface */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-[2rem] shadow-2xl border border-black/[0.08] overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 sm:p-7 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#EAF7EA] text-[#196928] border border-[#D4EBD1] mb-2">
                <ShieldCheck size={11} />
                OneSearch Account
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111816] tracking-tight">
                {tab === 'signin' ? 'Welcome back' : 'Create your account'}
              </h2>
              <p className="text-xs text-[#57605B] mt-1 leading-relaxed">
                {tab === 'signin'
                  ? 'Sign in to access your saved sectors and unlocked Pro dossiers.'
                  : 'Join 2,000+ Nigerian founders and investors using OneSearch.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3F3EF] hover:bg-[#EAEAE5] flex items-center justify-center text-[#57605B] hover:text-[#111816] transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>

          {/* Segmented Pill Tabs */}
          <div className="mt-5 p-1 bg-[#F3F3EF] rounded-full flex gap-1">
            {(['signin', 'signup'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t)
                  setError(null)
                  setSuccessMsg(null)
                }}
                className={cn(
                  'flex-1 py-2 text-xs font-bold rounded-full transition-all text-center',
                  tab === t
                    ? 'bg-white text-[#111816] shadow-sm'
                    : 'text-[#57605B] hover:text-[#111816]'
                )}
              >
                {t === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-6 sm:px-7 pb-6 space-y-3.5">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#323D38] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tayo Adeleke"
                required
                className="w-full px-4 py-3 bg-[#F8F8F5] border border-black/[0.08] rounded-xl text-xs sm:text-sm text-[#111816] placeholder:text-[#88928C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2D17] transition"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#323D38] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 bg-[#F8F8F5] border border-black/[0.08] rounded-xl text-xs sm:text-sm text-[#111816] placeholder:text-[#88928C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2D17] transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#323D38] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={tab === 'signup' ? 'Min. 8 characters' : '••••••••'}
                required
                minLength={tab === 'signup' ? 8 : undefined}
                autoComplete={tab === 'signin' ? 'current-password' : 'new-password'}
                className="w-full px-4 py-3 pr-11 bg-[#F8F8F5] border border-black/[0.08] rounded-xl text-xs sm:text-sm text-[#111816] placeholder:text-[#88928C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0F2D17] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#88928C] hover:text-[#111816]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-[#FDF0EF] border border-[#F5C2BE] rounded-xl text-xs text-[#B42318] font-medium leading-relaxed">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-[#EAF7EA] border border-[#C5ECC3] rounded-xl text-xs text-[#196928] font-medium leading-relaxed">
              {successMsg}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#0F2D17] hover:bg-[#153E20] text-white py-3.5 rounded-full text-xs sm:text-sm font-bold shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
            >
              {loading && <Loader2 size={16} className="animate-spin text-[#7AE368]" />}
              {tab === 'signin' ? 'Sign In to OneSearch' : 'Create Founder Account'}
            </button>
          </div>
        </form>

        <div className="px-6 pb-6 text-center border-t border-black/[0.05] pt-4">
          <p className="text-[11px] text-[#88928C]">
            By continuing, you agree to OneSearch&apos;s Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
