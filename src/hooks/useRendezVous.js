// src/hooks/useRendezVous.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useRendezVous(dateFiltre = null) {
  const [rendezVous, setRendezVous] = useState([])
  const [loading, setLoading]       = useState(true)
  const [erreur, setErreur]         = useState(null)

  useEffect(() => {
    charger()
  }, [dateFiltre])

  async function charger() {
    setLoading(true)
    let query = supabase
      .from('rendez_vous')
      .select(`*, patients(nom, prenom)`)
      .order('heure', { ascending: true })

    if (dateFiltre) query = query.eq('date', dateFiltre)

    const { data, error } = await query
    if (error) setErreur(error.message)
    else setRendezVous(data)
    setLoading(false)
  }

  async function ajouterRdv(rdv) {
    const { data, error } = await supabase
      .from('rendez_vous')
      .insert([rdv])
      .select(`*, patients(nom, prenom)`)
    if (!error) setRendezVous(prev => [...prev, data[0]])
    return { data, error }
  }

  async function modifierStatut(id, statut) {
    const { error } = await supabase
      .from('rendez_vous')
      .update({ statut })
      .eq('id', id)
    if (!error) setRendezVous(prev =>
      prev.map(r => r.id === id ? { ...r, statut } : r)
    )
    return { error }
  }

  async function supprimerRdv(id) {
    const { error } = await supabase.from('rendez_vous').delete().eq('id', id)
    if (!error) setRendezVous(prev => prev.filter(r => r.id !== id))
    return { error }
  }

  return { rendezVous, loading, erreur, charger, ajouterRdv, modifierStatut, supprimerRdv }
}
