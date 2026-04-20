import { patientsRecents } from '../data/mockData'

function PatientList() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Patients récents</span>
        <span style={{ fontSize: 11, color: 'var(--teal)', cursor: 'pointer' }}>Voir tous →</span>
      </div>
      {patientsRecents.map((p, i) => (
        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderBottom: i < patientsRecents.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: p.avatarBg, color: p.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, flexShrink: 0 }}>
            {p.initiales}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{p.nom}</div>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{p.dernierActe}</div>
          </div>
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 6, fontWeight: 500, background: p.statutBg, color: p.statutColor }}>
            {p.statut}
          </span>
        </div>
      ))}
      <div style={{ height: 8 }} />
    </div>
  )
}

export default PatientList
