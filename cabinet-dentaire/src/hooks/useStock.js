// src/hooks/useStock.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useStock() {
  const [stock, setStock]     = useState([])
  const [loading, setLoading] = useState(true)
  const [erreur, setErreur]   = useState(null)

  useEffect(() => { charger() }, [])

  async function charger() {
    setLoading(true)
    const { data, error } = await supabase
      .from('stock')
      .select('*')
      .order('nom', { ascending: true })
    if (error) setErreur(error.message)
    else setStock(data)
    setLoading(false)
  }

  async function mettreAJourQuantite(id, quantite) {
    const { error } = await supabase
      .from('stock')
      .update({ quantite })
      .eq('id', id)
    if (!error) setStock(prev =>
      prev.map(s => s.id === id ? { ...s, quantite } : s)
    )
    return { error }
  }

  async function ajouterArticle(article) {
    const { data, error } = await supabase
      .from('stock')
      .insert([article])
      .select()
    if (!error) setStock(prev => [...prev, data[0]])
    return { data, error }
  }

  return { stock, loading, erreur, charger, mettreAJourQuantite, ajouterArticle }
}
