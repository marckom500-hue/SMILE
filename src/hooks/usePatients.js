// src/hooks/usePatients.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function usePatients() {
  const [patients, setPatients]   = useState([])
  const [loading, setLoading]     = useState(true)
  const [erreur, setErreur]       = useState(null)

  useEffect(() => {
    charger()
  }, [])

  async function charger() {
    setLoading(true)
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) setErreur(error.message)
    else setPatients(data)
    setLoading(false)
  }

  async function ajouterPatient(patient) {
    const { data, error } = await supabase
      .from('patients')
      .insert([patient])
      .select()
    if (!error) setPatients(prev => [data[0], ...prev])
    return { data, error }
  }

  async function supprimerPatient(id) {
    const { error } = await supabase.from('patients').delete().eq('id', id)
    if (!error) setPatients(prev => prev.filter(p => p.id !== id))
    return { error }
  }

  return { patients, loading, erreur, charger, ajouterPatient, supprimerPatient }
}
