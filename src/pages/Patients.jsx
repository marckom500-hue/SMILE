// pages/Patients.jsx — CRUD complet
import { useState } from 'react'
import Topbar from '../components/Topbar'
import FormulairePatient from '../components/FormulairePatient'
import ConfirmDialog from '../components/ConfirmDialog'
import { usePatients } from '../hooks/usePatients'

const palette = [
  { bg: '#ccfbf1', color: '#0f766e' },
  { bg: '#dbeafe', color: '#1d4ed8' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#ede9fe', color: '#6d28d9' },
]

function initiales(nom, prenom) {
  return `${(prenom?.[0] || '').toUpperCase()}${(nom?.[0] || '').toUpperCase()}`
}

function age(dateNaissance) {
  if (!dateNaissance) return '—'
  return Math.floor((Date.now() - new Date(dateNaissance)) / (1000 * 60 * 60 * 24 * 365.25)) + ' ans'
}

function Patients() {
  const { patients, loading, erreur, ajouterPatient, modifierPatient, supprimerPatient } = usePatients()
  const [recherche, setRecherche]   = useState('')
  const [modal, setModal]           = useState(null)
  const [aSupprimer, setASupprimer] = useState(null)

  const filtres = patients.filter(p =>
    `${p.prenom} ${p.nom}`.toLowerCase().includes(recherche.toLowerCase())
  )

  async function sauvegarder(form) {
    if (modal === 'ajouter') return ajouterPatient(form)
    return modifierPatient(modal.id, form)
  }

  async function confirmerSuppression() {
    await supprimerPatient(aSupprimer.id)
    setASupprimer(null)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Patients" />
      <div className="content-padding main-content" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="14" height="14" viewBox="0 0 20 20" fill="var(--text-primary)">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" placeholder="Rechercher un patient…"
              value={recherche} onChange={e => setRecherche(e.target.value)}
              style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9, borderRadius: 8, border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', fontSize: 13, color: 'var(--text-primary)', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{filtres.length} patient{filtres.length > 1 ? 's' : ''}</span>
          <button onClick={() => setModal('ajouter')} style={{ padding: '9px 16px', borderRadius: 8, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
            + Nouveau patient
          </button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Chargement…</div>}
        {erreur  && <div style={{ padding: 16, color: '#f43f5e', fontSize: 13, background: '#fce7f3', borderRadius: 10 }}>⚠️ {erreur}</div>}

        {!loading && !erreur && (
          <div className="table-scroll" style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1.5fr 1.5fr 1.5fr 140px', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
              {['Patient', 'Âge', 'Téléphone', 'Email', 'Adresse', 'Actions'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {filtres.map((p, i) => {
              const pal = palette[i % palette.length]
              return (
                <div key={p.id}
                  style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr 1.5fr 1.5fr 1.5fr 140px', padding: '12px 16px', borderBottom: i < filtres.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: pal.bg, color: pal.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                      {initiales(p.nom, p.prenom)}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{p.prenom} {p.nom}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{age(p.date_naissance)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.telephone || '—'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.email || '—'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.adresse || '—'}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal(p)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--teal)', cursor: 'pointer', fontSize: 11, fontWeight: 500 }}
                    >✏️ Modifier</button>
                    <button onClick={() => setASupprimer(p)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid #fce7f3', background: '#fce7f3', color: '#9d174d', cursor: 'pointer', fontSize: 11 }}
                    >🗑️</button>
                  </div>
                </div>
              )
            })}

            {filtres.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                {recherche ? `Aucun résultat pour « ${recherche} »` : 'Aucun patient. Cliquez sur « Nouveau patient » pour commencer.'}
              </div>
            )}
          </div>
        )}
      </div>

      {modal && <FormulairePatient patient={modal === 'ajouter' ? null : modal} onSave={sauvegarder} onClose={() => setModal(null)} />}
      {aSupprimer && <ConfirmDialog message={`Supprimer ${aSupprimer.prenom} ${aSupprimer.nom} ? Cette action est irréversible.`} onConfirm={confirmerSuppression} onCancel={() => setASupprimer(null)} />}
    </div>
  )
}

export default Patients
