// pages/RendezVous.jsx
import Topbar from '../components/Topbar'
import { rendezVousDuJour } from '../data/mockData'
import { useState } from 'react'

const jours = ['Lun 14', 'Mar 15', 'Mer 16', 'Jeu 17', 'Ven 18', 'Sam 19', 'Dim 20']

const badgeStyles = {
  confirme: { background: '#ccfbf1', color: '#0f766e' },
  attente:  { background: '#fef3c7', color: '#92400e' },
  urgent:   { background: '#fce7f3', color: '#9d174d' },
}
const badgeLabels = { confirme: 'Confirmé', attente: 'En attente', urgent: 'Urgent' }

function RendezVous() {
  const [jourActif, setJourActif] = useState(3)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Rendez-vous" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* Sélecteur de jours */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {jours.map((j, i) => (
            <button key={i} onClick={() => setJourActif(i)} style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 12, fontWeight: 500,
              cursor: 'pointer', border: '0.5px solid',
              borderColor: jourActif === i ? 'var(--teal)' : 'var(--border)',
              background:  jourActif === i ? 'var(--teal)' : 'var(--bg-primary)',
              color:       jourActif === i ? 'white' : 'var(--text-secondary)',
              transition: 'all 0.15s',
            }}>{j}</button>
          ))}
        </div>

        {/* Statistiques rapides */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Total RDV', value: '12', color: '#0d9488' },
            { label: 'Confirmés', value: '8',  color: '#3b82f6' },
            { label: 'Urgences',  value: '1',  color: '#f43f5e' },
          ].map((s) => (
            <div key={s.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${s.color}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--text-primary)' }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Liste des RDV */}
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Planning du jour</span>
            <button style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              + Nouveau RDV
            </button>
          </div>
          {rendezVousDuJour.map((rdv, i) => (
            <div key={rdv.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderBottom: i < rendezVousDuJour.length - 1 ? '0.5px solid var(--border)' : 'none', cursor: 'pointer', transition: 'background 0.1s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ minWidth: 52, fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{rdv.heure}</span>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: rdv.couleur, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{rdv.patient}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>{rdv.type}</div>
              </div>
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 8, fontWeight: 500, ...badgeStyles[rdv.statut] }}>
                {badgeLabels[rdv.statut]}
              </span>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Modifier</button>
                <button style={{ fontSize: 11, padding: '4px 10px', borderRadius: 6, border: '0.5px solid #fce7f3', background: '#fce7f3', color: '#9d174d', cursor: 'pointer' }}>Annuler</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RendezVous
