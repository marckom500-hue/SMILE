import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { revenus } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '6px 12px', fontSize: 12 }}>
        <div style={{ color: 'var(--text-secondary)' }}>{label}</div>
        <div style={{ color: 'var(--teal)', fontWeight: 600 }}>{payload[0].value}k FCFA</div>
      </div>
    )
  }
  return null
}

function RevenueChart() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Revenus mensuels (FCFA × 1000)</span>
        <span style={{ fontSize: 11, color: 'var(--teal)', cursor: 'pointer' }}>Exporter →</span>
      </div>
      <div style={{ padding: '0 16px 16px', height: 160 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenus} barCategoryGap="30%">
            <XAxis dataKey="mois" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-secondary)' }} />
            <Bar dataKey="valeur" radius={[4, 4, 0, 0]}>
              {revenus.map((entry, index) => (
                <Cell key={index} fill={entry.actuel ? '#0d9488' : '#e2e8f0'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RevenueChart
