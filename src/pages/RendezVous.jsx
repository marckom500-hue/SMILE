// pages/RendezVous.jsx — CRUD complet
import { useState } from 'react'
import Topbar from '../components/Topbar'
import FormulaireRdv from '../components/FormulaireRdv'
import ConfirmDialog from '../components/ConfirmDialog'
import { useRendezVous } from '../hooks/useRendezVous'

const badgeStyles = {
  confirme: { background: '#ccfbf1', color: '#0f766e' },
  attente:  { background: '#fef3c7', color: '#92400e' },
  urgent:   { background: '#fce7f3', color: '#9d174d' },
  annule:   { background: '#f1f5f9', color: '#64748b' },
}
const badgeLabels = { confirme: 'Confirmé', attente: 'En attente', urgent: 'Urgent', annule: 'Annulé' }
const statutCouleur = { confirme: '#0d9488', attente: '#f59e0b', urgent: '#f43f5e', annule: '#94a3b8' }

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function RendezVous() {
  const today = new Date().toISOString().split('T')[0]
  const [dateFiltre, setDateFiltre] = useState(today)
  const { rendezVous, loading, erreur, ajouterRdv, modifierRdv, supprimerRdv } = useRendezVous(dateFiltre || null)
  const [modal, setModal]           = useState(null)
  const [aSupprimer, setASupprimer] = useState(null)
  const [filtreStatut, setFiltreStatut] = useState('tous')

  const listes = rendezVous.filter(r => filtreStatut === 'tous' || r.statut === filtreStatut)

  async function sauvegarder(form) {
    if (modal === 'ajouter') return ajouterRdv(form)
    return modifierRdv(modal.id, form)
  }

  async function confirmerSuppression() {
    await supprimerRdv(aSupprimer.id)
    setASupprimer(null)
  }

  function nomPatient(rdv) {
    if (rdv.patients) return `${rdv.patients.prenom} ${rdv.patients.nom}`
    return '—'
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Rendez-vous" />
      <div className="content-padding main-content" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* Barre de filtres */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Filtre par date */}
          <input type="date" value={dateFiltre} onChange={e => setDateFiltre(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '0.5px solid var(--border-md)', fontSize: 13, color: 'var(--text-primary)', background: 'var(--bg-primary)', outline: 'none', cursor: 'pointer' }}
          />
          <button onClick={() => setDateFiltre('')}
            style={{ padding: '8px 12px', borderRadius: 8, fontSize: 12, border: '0.5px solid var(--border)', background: dateFiltre ? 'var(--bg-primary)' : 'var(--teal)', color: dateFiltre ? 'var(--text-secondary)' : 'white', cursor: 'pointer' }}
          >Tous les jours</button>

          {/* Filtre par statut */}
          <div style={{ display: 'flex', gap: 6, marginLeft: 4 }}>
            {['tous','confirme','attente','urgent','annule'].map(s => (
              <button key={s} onClick={() => setFiltreStatut(s)}
                style={{ padding: '6px 12px', borderRadius: 7, fontSize: 11, fontWeight: 500, cursor: 'pointer', border: '0.5px solid', transition: 'all 0.15s',
                  borderColor: filtreStatut === s ? 'var(--teal)' : 'var(--border)',
                  background:  filtreStatut === s ? 'var(--teal)' : 'var(--bg-primary)',
                  color:       filtreStatut === s ? 'white'       : 'var(--text-secondary)',
                }}
              >{s === 'tous' ? 'Tous' : badgeLabels[s]}</button>
            ))}
          </div>

          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-tertiary)' }}>{listes.length} RDV</span>
          <button onClick={() => setModal('ajouter')}
            style={{ padding: '9px 16px', borderRadius: 8, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}
          >+ Nouveau RDV</button>
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Chargement…</div>}
        {erreur  && <div style={{ padding: 16, color: '#f43f5e', fontSize: 13, background: '#fce7f3', borderRadius: 10 }}>⚠️ {erreur}</div>}

        {!loading && !erreur && (
          <div className="table-scroll" style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            {/* En-tête tableau */}
            <div style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.5fr 1.5fr 80px 1fr 160px', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
              {['Heure', 'Patient', 'Acte', 'Date', 'Durée', 'Statut', 'Actions'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {listes.map((rdv, i) => (
              <div key={rdv.id}
                style={{ display: 'grid', gridTemplateColumns: '80px 2fr 1.5fr 1.5fr 80px 1fr 160px', padding: '12px 16px', borderBottom: i < listes.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Heure */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: statutCouleur[rdv.statut] || '#94a3b8', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {rdv.heure ? rdv.heure.slice(0, 5) : '—'}
                  </span>
                </div>

                {/* Patient */}
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{nomPatient(rdv)}</div>

                {/* Acte */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{rdv.type_acte}</div>

                {/* Date */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{formatDate(rdv.date)}</div>

                {/* Durée */}
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{rdv.duree_min} min</div>

                {/* Statut */}
                <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 8, fontWeight: 500, display: 'inline-block', ...badgeStyles[rdv.statut] }}>
                  {badgeLabels[rdv.statut] || rdv.statut}
                </span>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => setModal(rdv)}
                    style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--teal)', cursor: 'pointer', fontSize: 11, fontWeight: 500 }}
                  >✏️ Modifier</button>
                  <button onClick={() => setASupprimer(rdv)}
                    style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid #fce7f3', background: '#fce7f3', color: '#9d174d', cursor: 'pointer', fontSize: 11 }}
                  >🗑️</button>
                </div>
              </div>
            ))}

            {listes.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                Aucun rendez-vous pour ce filtre. Cliquez sur « Nouveau RDV » pour en ajouter un.
              </div>
            )}
          </div>
        )}
      </div>

      {modal && <FormulaireRdv rdv={modal === 'ajouter' ? null : modal} onSave={sauvegarder} onClose={() => setModal(null)} />}
      {aSupprimer && <ConfirmDialog message={`Supprimer le RDV de ${nomPatient(aSupprimer)} le ${formatDate(aSupprimer.date)} à ${aSupprimer.heure?.slice(0,5)} ?`} onConfirm={confirmerSuppression} onCancel={() => setASupprimer(null)} />}
    </div>
  )
}

export default RendezVous
