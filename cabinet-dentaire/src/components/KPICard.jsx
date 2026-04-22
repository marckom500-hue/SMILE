// components/KPICard.jsx

// Couleurs des barres du haut selon la variante
const accentColors = {
  teal:  '#0d9488',
  blue:  '#3b82f6',
  amber: '#f59e0b',
  rose:  '#f43f5e',
}

const s = {
  card: (color) => ({
    background: 'var(--bg-primary)',
    border: '0.5px solid var(--border)',
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    // Barre colorée en haut
    borderTop: `3px solid ${accentColors[color] || accentColors.teal}`,
  }),
  label: {
    fontSize: 11,
    color: 'var(--text-secondary)',
    fontWeight: 500,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  value: {
    fontSize: 26,
    fontWeight: 500,
    color: 'var(--text-primary)',
    lineHeight: 1,
    marginBottom: 6,
  },
  trend: {
    fontSize: 11,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
}

// Icône flèche montante
const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
  </svg>
)

// Icône flèche descendante
const ArrowDown = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
  </svg>
)

/**
 * KPICard — carte indicateur clé
 * Props :
 *   color      → 'teal' | 'blue' | 'amber' | 'rose'
 *   label      → texte du libellé (ex: "Patients ce mois")
 *   value      → valeur principale (ex: "148")
 *   trend      → texte de tendance (ex: "+12% vs mois dernier")
 *   trendType  → 'up' | 'down' | 'neutral'
 */
function KPICard({ color = 'teal', label, value, trend, trendType = 'neutral' }) {
  const trendColor =
    trendType === 'up'   ? '#0d9488' :
    trendType === 'down' ? '#f43f5e' :
    'var(--text-secondary)'

  return (
    <div style={s.card(color)}>
      <div style={s.label}>{label}</div>
      <div style={s.value}>{value}</div>
      <div style={{ ...s.trend, color: trendColor }}>
        {trendType === 'up'   && <ArrowUp />}
        {trendType === 'down' && <ArrowDown />}
        {trend}
      </div>
    </div>
  )
}

export default KPICard
