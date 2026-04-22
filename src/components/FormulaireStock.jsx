// src/components/FormulaireStock.jsx
import { useState } from 'react'
import Modal from './Modal'
import FormField, { inputStyle } from './FormField'

const couleurs = [
  { label: 'Teal',   value: '#0d9488' },
  { label: 'Bleu',   value: '#3b82f6' },
  { label: 'Amber',  value: '#f59e0b' },
  { label: 'Rouge',  value: '#f43f5e' },
  { label: 'Violet', value: '#8b5cf6' },
]

const vide = { nom: '', quantite: 0, maximum: 100, couleur: '#0d9488', seuil_alerte: 5 }

function FormulaireStock({ article = null, onSave, onClose }) {
  const [form, setForm]     = useState(article ? {
    nom:          article.nom          || '',
    quantite:     article.quantite     ?? 0,
    maximum:      article.maximum      ?? 100,
    couleur:      article.couleur      || '#0d9488',
    seuil_alerte: article.seuil_alerte ?? 5,
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
    const payload = { ...form, quantite: Number(form.quantite), maximum: Number(form.maximum), seuil_alerte: Number(form.seuil_alerte) }
    const { error } = await onSave(payload)
    if (error) { setErreur(error.message); setLoading(false) }
    else onClose()
  }

  return (
    <Modal titre={article ? 'Modifier l\'article' : 'Nouvel article'} onClose={onClose}>
      <form onSubmit={handleSubmit}>

        <FormField label="Nom du produit" required>
          <input required style={inputStyle} value={form.nom} onChange={set('nom')} onFocus={focus} onBlur={blur} placeholder="Gants latex (boîtes)" />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Quantité actuelle" required>
            <input required type="number" min="0" style={inputStyle} value={form.quantite} onChange={set('quantite')} onFocus={focus} onBlur={blur} />
          </FormField>
          <FormField label="Maximum (stock plein)" required>
            <input required type="number" min="1" style={inputStyle} value={form.maximum} onChange={set('maximum')} onFocus={focus} onBlur={blur} />
          </FormField>
        </div>

        <FormField label="Seuil d'alerte critique">
          <input type="number" min="0" style={inputStyle} value={form.seuil_alerte} onChange={set('seuil_alerte')} onFocus={focus} onBlur={blur} />
        </FormField>

        <FormField label="Couleur de la barre">
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            {couleurs.map(c => (
              <button type="button" key={c.value} onClick={() => setForm(f => ({ ...f, couleur: c.value }))}
                style={{ width: 28, height: 28, borderRadius: '50%', background: c.value, border: form.couleur === c.value ? '3px solid var(--text-primary)' : '3px solid transparent', cursor: 'pointer', transition: 'border 0.15s' }}
                title={c.label}
              />
            ))}
          </div>
        </FormField>

        {erreur && <div style={{ background: '#fce7f3', color: '#9d174d', fontSize: 12, padding: '10px 12px', borderRadius: 8, marginBottom: 16 }}>⚠️ {erreur}</div>}

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: 8, border: '0.5px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>Annuler</button>
          <button type="submit" disabled={loading} style={{ flex: 2, padding: '10px', borderRadius: 8, border: 'none', background: loading ? 'var(--teal-mid)' : 'var(--teal)', color: 'white', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 13, fontWeight: 600 }}>
            {loading ? 'Enregistrement…' : (article ? 'Modifier' : 'Ajouter l\'article')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default FormulaireStock
