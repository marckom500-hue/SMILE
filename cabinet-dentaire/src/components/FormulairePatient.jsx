// src/components/FormulairePatient.jsx
import { useState } from 'react'
import Modal from './Modal'
import FormField, { inputStyle } from './FormField'

const vide = { nom: '', prenom: '', telephone: '', email: '', date_naissance: '', adresse: '' }

function FormulairePatient({ patient = null, onSave, onClose }) {
  const [form, setForm]     = useState(patient ? {
    nom: patient.nom || '',
    prenom: patient.prenom || '',
    telephone: patient.telephone || '',
    email: patient.email || '',
    date_naissance: patient.date_naissance || '',
    adresse: patient.adresse || '',
  } : vide)
  const [loading, setLoading] = useState(false)
  const [erreur, setErreur]   = useState(null)

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
    <Modal titre={patient ? 'Modifier le patient' : 'Nouveau patient'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        {/* Ligne nom / prénom */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Nom" required>
            <input required style={inputStyle} value={form.nom} onChange={set('nom')} onFocus={focus} onBlur={blur} placeholder="Nkana" />
          </FormField>
          <FormField label="Prénom" required>
            <input required style={inputStyle} value={form.prenom} onChange={set('prenom')} onFocus={focus} onBlur={blur} placeholder="Marie" />
          </FormField>
        </div>

        {/* Téléphone */}
        <FormField label="Téléphone">
          <input style={inputStyle} value={form.telephone} onChange={set('telephone')} onFocus={focus} onBlur={blur} placeholder="+237 6 91 23 45 67" />
        </FormField>

        {/* Email */}
        <FormField label="Email">
          <input type="email" style={inputStyle} value={form.email} onChange={set('email')} onFocus={focus} onBlur={blur} placeholder="marie@email.com" />
        </FormField>

        {/* Date de naissance */}
        <FormField label="Date de naissance">
          <input type="date" style={inputStyle} value={form.date_naissance} onChange={set('date_naissance')} onFocus={focus} onBlur={blur} />
        </FormField>

        {/* Adresse */}
        <FormField label="Adresse">
          <input style={inputStyle} value={form.adresse} onChange={set('adresse')} onFocus={focus} onBlur={blur} placeholder="Quartier Bastos, Yaoundé" />
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
            {loading ? 'Enregistrement…' : (patient ? 'Modifier' : 'Ajouter le patient')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FormulairePatient
