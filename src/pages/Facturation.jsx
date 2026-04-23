// pages/Facturation.jsx — CRUD complet
import { useState } from 'react'
import Topbar from '../components/Topbar'
import FormulaireFacture from '../components/FormulaireFacture'
import ConfirmDialog from '../components/ConfirmDialog'
import { useFactures } from '../hooks/useFactures'

const statutStyle = {
  'Payé':       { background: '#ccfbf1', color: '#0f766e' },
  'En attente': { background: '#fef3c7', color: '#92400e' },
  'Annulé':     { background: '#f1f5f9', color: '#64748b' },
}

function formatFcfa(n) {
  return (n || 0).toLocaleString('fr-FR') + ' FCFA'
}

function nomPatient(f) {
  if (f.patients) return `${f.patients.prenom} ${f.patients.nom}`
  return '—'
}

function initiales(f) {
  if (!f.patients) return '??'
  return `${(f.patients.prenom?.[0] || '').toUpperCase()}${(f.patients.nom?.[0] || '').toUpperCase()}`
}

const palette = [
  { bg: '#ccfbf1', color: '#0f766e' },
  { bg: '#dbeafe', color: '#1d4ed8' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#ede9fe', color: '#6d28d9' },
]

function Facturation() {
  const { factures, loading, erreur, ajouterFacture, modifierFacture, supprimerFacture, totalPaye, totalAttente, nbImpayees } = useFactures()
  const [modal, setModal]           = useState(null)
  const [aSupprimer, setASupprimer] = useState(null)
  const [filtreStatut, setFiltreStatut] = useState('tous')

  const liste = factures.filter(f => filtreStatut === 'tous' || f.statut === filtreStatut)

  async function sauvegarder(form) {
    if (modal === 'ajouter') return ajouterFacture(form)
    return modifierFacture(modal.id, form)
  }

  async function confirmerSuppression() {
    await supprimerFacture(aSupprimer.id)
    setASupprimer(null)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Facturation" />
      <div className="content-padding main-content" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total encaissé',    value: formatFcfa(totalPaye),    color: '#0d9488' },
            { label: 'En attente',        value: formatFcfa(totalAttente), color: '#f59e0b' },
            { label: 'Factures impayées', value: `${nbImpayees} facture${nbImpayees > 1 ? 's' : ''}`, color: '#f43f5e' },
          ].map(k => (
            <div key={k.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${k.color}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)' }}>{k.value}</div>
            </div>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Chargement…</div>}
        {erreur  && <div style={{ padding: 16, color: '#f43f5e', fontSize: 13, background: '#fce7f3', borderRadius: 10 }}>⚠️ {erreur}</div>}

        {!loading && !erreur && (
          <div className="table-scroll" style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>

            {/* Barre outils */}
            <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              {['tous', 'Payé', 'En attente', 'Annulé'].map(s => (
                <button key={s} onClick={() => setFiltreStatut(s)}
                  style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '0.5px solid', transition: 'all 0.15s',
                    borderColor: filtreStatut === s ? 'var(--teal)' : 'var(--border)',
                    background:  filtreStatut === s ? 'var(--teal)' : 'var(--bg-primary)',
                    color:       filtreStatut === s ? 'white'       : 'var(--text-secondary)',
                  }}
                >{s === 'tous' ? 'Toutes' : s}</button>
              ))}
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-tertiary)' }}>{liste.length} facture{liste.length > 1 ? 's' : ''}</span>
              <button onClick={() => setModal('ajouter')} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 7, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                + Nouvelle facture
              </button>
            </div>

            {/* En-tête tableau */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr 1fr 140px', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
              {['Patient', 'Acte', 'Date', 'Montant', 'Statut', 'Actions'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {liste.map((f, i) => {
              const pal = palette[i % palette.length]
              return (
                <div key={f.id}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 1.5fr 1.5fr 1fr 140px', padding: '12px 16px', borderBottom: i < liste.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: pal.bg, color: pal.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, flexShrink: 0 }}>
                      {initiales(f)}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{nomPatient(f)}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.acte}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{f.date ? new Date(f.date).toLocaleDateString('fr-FR') : '—'}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{formatFcfa(f.montant)}</div>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, fontWeight: 500, display: 'inline-block', ...statutStyle[f.statut] }}>{f.statut}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal(f)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--teal)', cursor: 'pointer', fontSize: 11, fontWeight: 500 }}
                    >✏️ Modifier</button>
                    <button onClick={() => setASupprimer(f)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid #fce7f3', background: '#fce7f3', color: '#9d174d', cursor: 'pointer', fontSize: 11 }}
                    >🗑️</button>
                  </div>
                </div>
              )
            })}

            {liste.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                Aucune facture. Cliquez sur « Nouvelle facture » pour commencer.
              </div>
            )}
          </div>
        )}
      </div>

      {modal && <FormulaireFacture facture={modal === 'ajouter' ? null : modal} onSave={sauvegarder} onClose={() => setModal(null)} />}
      {aSupprimer && <ConfirmDialog message={`Supprimer la facture de ${nomPatient(aSupprimer)} (${formatFcfa(aSupprimer.montant)}) ? Cette action est irréversible.`} onConfirm={confirmerSuppression} onCancel={() => setASupprimer(null)} />}
    </div>
  )
}

export default Facturation
