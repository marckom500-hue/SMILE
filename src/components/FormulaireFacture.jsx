// src/components/FormulaireFacture.jsx
import { useState, useEffect } from 'react'
import Modal from './Modal'
import FormField, { inputStyle } from './FormField'
import { supabase } from '../lib/supabase'

const typesActes = ['Consultation', 'Détartrage', 'Extraction', 'Carie', 'Pose couronne', 'Prothèse', 'Radiographie', 'Urgence douleur', 'Autre']
const vide = { patient_id: '', acte: '', montant: '', statut: 'En attente', date: new Date().toISOString().split('T')[0] }

function FormulaireFacture({ facture = null, onSave, onClose }) {
  const [form, setForm]         = useState(facture ? {
    patient_id: facture.patient_id || '',
    acte:       facture.acte       || '',
    montant:    facture.montant    || '',
    statut:     facture.statut     || 'En attente',
    date:       facture.date       || new Date().toISOString().split('T')[0],
  } : vide)
  const [patients, setPatients] = useState([])
  const [loading, setLoading]   = useState(false)
  const [erreur, setErreur]     = useState(null)

  useEffect(() => {
    supabase.from('patients').select('id, nom, prenom').order('nom').then(({ data }) => {
      if (data) setPatients(data)
    })
  }, [])

  const set = (champ) => (e) => setForm(f => ({ ...f, [champ]: e.target.value }))
  const focus = e => e.target.style.borderColor = 'var(--teal)'
  const blur  = e => e.target.style.borderColor = 'var(--border-md)'

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setErreur(null)
    const { error } = await onSave({ ...form, montant: Number(form.montant) })
    if (error) { setErreur(error.message); setLoading(false) }
    else onClose()
  }

  return (
    <Modal titre={facture ? 'Modifier la facture' : 'Nouvelle facture'} onClose={onClose}>
      <form onSubmit={handleSubmit}>

        <FormField label="Patient" required>
          <select required style={inputStyle} value={form.patient_id} onChange={set('patient_id')} onFocus={focus} onBlur={blur}>
            <option value="">— Sélectionner un patient —</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.prenom} {p.nom}</option>)}
          </select>
        </FormField>

        <FormField label="Acte" required>
          <select required style={inputStyle} value={form.acte} onChange={set('acte')} onFocus={focus} onBlur={blur}>
            <option value="">— Sélectionner un acte —</option>
            {typesActes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Montant (FCFA)" required>
            <input required type="number" min="0" style={inputStyle} value={form.montant} onChange={set('montant')} onFocus={focus} onBlur={blur} placeholder="25000" />
          </FormField>
          <FormField label="Date" required>
            <input required type="date" style={inputStyle} value={form.date} onChange={set('date')} onFocus={focus} onBlur={blur} />
          </FormField>
        </div>

        <FormField label="Statut">
          <select style={inputStyle} value={form.statut} onChange={set('statut')} onFocus={focus} onBlur={blur}>
            <option value="En attente">En attente</option>
            <option value="Payé">Payé</option>
            <option value="Annulé">Annulé</option>
          </select>
        </FormField>

        {erreur && <div style={{ background: '#fce7f3', color: '#9d174d', fontSize: 12, padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>⚠️ {erreur}</div>}

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Annuler</button>
          <button type="submit" disabled={loading} style={{ flex: 2, padding: '10px', borderRadius: 8, border: 'none', background: loading ? 'var(--teal-mid)' : 'var(--teal)', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}>
            {loading ? 'Enregistrement…' : (facture ? 'Modifier' : 'Créer la facture')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FormulaireFacture
