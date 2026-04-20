// src/hooks/useFactures.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useFactures() {
  const [factures, setFactures] = useState([])
  const [loading, setLoading]   = useState(true)
  const [erreur, setErreur]     = useState(null)

  useEffect(() => { charger() }, [])

  async function charger() {
    setLoading(true)
    const { data, error } = await supabase
      .from('factures')
      .select(`*, patients(nom, prenom)`)
      .order('created_at', { ascending: false })
    if (error) setErreur(error.message)
    else setFactures(data)
    setLoading(false)
  }

  async function modifierStatut(id, statut) {
    const { error } = await supabase
      .from('factures')
      .update({ statut })
      .eq('id', id)
    if (!error) setFactures(prev =>
      prev.map(f => f.id === id ? { ...f, statut } : f)
    )
    return { error }
  }

  // Calculs utiles
  const totalPaye    = factures.filter(f => f.statut === 'Payé').reduce((s, f) => s + f.montant, 0)
  const totalAttente = factures.filter(f => f.statut === 'En attente').reduce((s, f) => s + f.montant, 0)
  const nbImpayees   = factures.filter(f => f.statut === 'En attente').length

  return { factures, loading, erreur, charger, modifierStatut, totalPaye, totalAttente, nbImpayees }
}
