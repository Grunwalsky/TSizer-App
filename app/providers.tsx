'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { Session, User } from '@supabase/supabase-js'

type SupabaseContextType = {
  session: Session | null
  user: User | null
}

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  user: null,
})

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session || null)
      setUser(data.session?.user || null)
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
      setUser(session?.user || null)
    })

    init()

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <SupabaseContext.Provider value={{ session, user }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabaseUser() {
  return useContext(SupabaseContext)
}
