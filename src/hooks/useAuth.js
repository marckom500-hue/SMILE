// src/hooks/useAuth.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [session, setSession] = useState(undefined) // undefined = chargement en cours

  useEffect(() => {
    // Récupère la session active au démarrage
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    // Écoute les changements (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  async function logout() {
    await supabase.auth.signOut()
  }

  return {
    session,
    user: session?.user ?? null,
    loading: session === undefined,
    logout,
  }
}
