import { rendezVousDuJour } from '../data/mockData'

const badgeStyles = {
  confirme: { background: '#ccfbf1', color: '#0f766e' },
  attente:  { background: '#fef3c7', color: '#92400e' },
  urgent:   { background: '#fce7f3', color: '#9d174d' },
}
const badgeLabels = { confirme: 'Confirmé', attente: 'En attente', urgent: 'Urgent' }

function AppointmentList() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Rendez-vous du jour</span>
        <span style={{ fontSize: 11, color: 'var(--teal)', cursor: 'pointer' }}>Voir agenda →</span>
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        {rendezVousDuJour.map((rdv, i) => (
          <div key={rdv.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < rendezVousDuJour.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
            <span style={{ minWidth: 52, textAlign: 'right', fontSize: 11, fontWeight: 500, color: 'var(--text-secondary)' }}>{rdv.heure}</span>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: rdv.couleur, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{rdv.patient}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{rdv.type}</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 8, fontWeight: 500, ...badgeStyles[rdv.statut] }}>
              {badgeLabels[rdv.statut]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AppointmentList
