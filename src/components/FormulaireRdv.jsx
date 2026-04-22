// src/components/FormulaireRdv.jsx
import { useState, useEffect } from 'react'
import Modal from './Modal'
import FormField, { inputStyle } from './FormField'
import { supabase } from '../lib/supabase'

const typesActes = [
  'Consultation', 'Détartrage', 'Extraction', 'Carie',
  'Pose couronne', 'Prothèse', 'Radiographie', 'Urgence douleur', 'Autre',
]

const vide = {
  patient_id: '', date: '', heure: '', type_acte: '', duree_min: 30, statut: 'attente', notes: '',
}

function FormulaireRdv({ rdv = null, onSave, onClose }) {
  const [form, setForm]         = useState(rdv ? {
    patient_id: rdv.patient_id || '',
    date:       rdv.date       || '',
    heure:      rdv.heure      || '',
    type_acte:  rdv.type_acte  || '',
    duree_min:  rdv.duree_min  || 30,
    statut:     rdv.statut     || 'attente',
    notes:      rdv.notes      || '',
  } : vide)
  const [patients, setPatients] = useState([])
  const [loading, setLoading]   = useState(false)
  const [erreur, setErreur]     = useState(null)

  // Charger la liste des patients pour le select
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
    const { error } = await onSave(form)
    if (error) { setErreur(error.message); setLoading(false) }
    else onClose()
  }

  return (
    <Modal titre={rdv ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'} onClose={onClose}>
      <form onSubmit={handleSubmit}>

        {/* Patient */}
        <FormField label="Patient" required>
          <select required style={inputStyle} value={form.patient_id} onChange={set('patient_id')} onFocus={focus} onBlur={blur}>
            <option value="">— Sélectionner un patient —</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.prenom} {p.nom}</option>
            ))}
          </select>
        </FormField>

        {/* Date + Heure */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Date" required>
            <input type="date" required style={inputStyle} value={form.date} onChange={set('date')} onFocus={focus} onBlur={blur} />
          </FormField>
          <FormField label="Heure" required>
            <input type="time" required style={inputStyle} value={form.heure} onChange={set('heure')} onFocus={focus} onBlur={blur} />
          </FormField>
        </div>

        {/* Type d'acte */}
        <FormField label="Type d'acte" required>
          <select required style={inputStyle} value={form.type_acte} onChange={set('type_acte')} onFocus={focus} onBlur={blur}>
            <option value="">— Sélectionner un acte —</option>
            {typesActes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </FormField>

        {/* Durée + Statut */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Durée (minutes)">
            <select style={inputStyle} value={form.duree_min} onChange={set('duree_min')} onFocus={focus} onBlur={blur}>
              {[15, 30, 45, 60, 90, 120].map(d => <option key={d} value={d}>{d} min</option>)}
            </select>
          </FormField>
          <FormField label="Statut">
            <select style={inputStyle} value={form.statut} onChange={set('statut')} onFocus={focus} onBlur={blur}>
              <option value="attente">En attente</option>
              <option value="confirme">Confirmé</option>
              <option value="urgent">Urgent</option>
              <option value="annule">Annulé</option>
            </select>
          </FormField>
        </div>

        {/* Notes */}
        <FormField label="Notes">
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
            value={form.notes} onChange={set('notes')}
            onFocus={focus} onBlur={blur}
            placeholder="Observations, allergies, instructions…"
          />
        </FormField>

        {/* Erreur */}
        {erreur && (
          <div style={{ background: '#fce7f3', color: '#9d174d', fontSize: 12, padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>
            ⚠️ {erreur}
          </div>
        )}

        {/* Boutons */}
        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            Annuler
          </button>
          <button type="submit" disabled={loading} style={{ flex: 2, padding: '10px', borderRadius: 8, border: 'none', background: loading ? 'var(--teal-mid)' : 'var(--teal)', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}>
            {loading ? 'Enregistrement…' : (rdv ? 'Modifier' : 'Ajouter le rendez-vous')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FormulaireRdv
