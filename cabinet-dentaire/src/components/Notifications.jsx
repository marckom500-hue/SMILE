import { alertes } from '../data/mockData'

function Notifications() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Alertes</span>
        <span style={{ fontSize: 11, color: 'var(--teal)', cursor: 'pointer' }}>Tout voir</span>
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        {alertes.map((a, i) => (
          <div key={a.id} style={{ display: 'flex', gap: 10, padding: '8px 0', borderBottom: i < alertes.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: a.iconeBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
              {a.icone}
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{a.texte}</div>
              <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>{a.temps}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notifications
