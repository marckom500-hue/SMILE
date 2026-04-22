import { typesActes } from '../data/mockData'

function DonutChart() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 14 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Types d'actes</span>
        <span style={{ fontSize: 11, color: 'var(--teal)' }}>Ce mois</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '0 16px 16px' }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="30" fill="none" stroke="var(--bg-secondary)" strokeWidth="14" />
          {typesActes.map((a) => (
            <circle key={a.label} cx="40" cy="40" r="30" fill="none"
              stroke={a.couleur} strokeWidth="14"
              strokeDasharray={`${a.dash} 131.9`}
              strokeDashoffset={a.offset}
              transform="rotate(-90 40 40)"
            />
          ))}
          <text x="40" y="38" textAnchor="middle" style={{ fontSize: 12, fontWeight: 500, fill: 'var(--text-primary)' }}>148</text>
          <text x="40" y="50" textAnchor="middle" style={{ fontSize: 9, fill: 'var(--text-secondary)' }}>actes</text>
        </svg>
        <div style={{ flex: 1 }}>
          {typesActes.map((a) => (
            <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 11, color: 'var(--text-secondary)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.couleur, flexShrink: 0 }} />
              {a.label}
              <span style={{ marginLeft: 'auto', fontWeight: 500, color: 'var(--text-primary)', fontSize: 12 }}>{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DonutChart
