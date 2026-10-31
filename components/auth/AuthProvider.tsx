'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  isPro: boolean
  isLoading: boolean
  signOut: () => Promise<void>
  refreshPro: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isPro: false,
  isLoading: true,
  signOut: async () => {},
  refreshPro: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isPro, setIsPro] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  const checkPro = useCallback(
    async (userId: string) => {
      const { data } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', userId)
        .single()
      setIsPro(data?.is_pro ?? false)
    },
    [supabase]
  )

  const refreshPro = useCallback(async () => {
    if (user) await checkPro(user.id)
  }, [user, checkPro])

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      const currentSession = data.session
      setSession(currentSession)
      setUser(currentSession?.user ?? null)
      if (currentSession?.user) {
        await checkPro(currentSession.user.id)
      }
      setIsLoading(false)
    }
    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      if (newSession?.user) {
        await checkPro(newSession.user.id)
      } else {
        setIsPro(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, checkPro])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setSession(null)
    setIsPro(false)
  }

  return (
    <AuthContext.Provider value={{ user, session, isPro, isLoading, signOut, refreshPro }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
