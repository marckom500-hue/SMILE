// pages/Rapports.jsx
import Topbar from '../components/Topbar'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'
import { revenus, typesActes } from '../data/mockData'

const patientsParMois = [
  { mois: 'Oct', patients: 112 }, { mois: 'Nov', patients: 128 },
  { mois: 'Déc', patients: 98  }, { mois: 'Jan', patients: 135 },
  { mois: 'Fév', patients: 122 }, { mois: 'Mar', patients: 156 },
  { mois: 'Avr', patients: 148 },
]

function Rapports() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Rapports" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>

          {/* Revenus */}
          <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
            <div style={{ padding: '14px 16px 8px', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Revenus mensuels (FCFA × 1000)</span>
            </div>
            <div style={{ padding: '0 16px 16px', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenus} barCategoryGap="30%">
                  <XAxis dataKey="mois" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip formatter={(v) => [`${v}k FCFA`]} contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid var(--border)' }} />
                  <Bar dataKey="valeur" fill="#0d9488" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Patients */}
          <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
            <div style={{ padding: '14px 16px 8px' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Patients par mois</span>
            </div>
            <div style={{ padding: '0 16px 16px', height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientsParMois}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mois" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid var(--border)' }} />
                  <Line type="monotone" dataKey="patients" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Répartition actes */}
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 14 }}>Répartition des actes ce mois</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
            {typesActes.map(a => (
              <div key={a.label} style={{ textAlign: 'center', padding: 16, borderRadius: 10, background: 'var(--bg-secondary)' }}>
                <div style={{ fontSize: 28, fontWeight: 600, color: a.couleur, marginBottom: 4 }}>{a.pct}%</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{a.label}</div>
                <div style={{ height: 4, borderRadius: 2, background: a.couleur, marginTop: 8, opacity: 0.3 }} />
                <div style={{ height: 4, borderRadius: 2, background: a.couleur, marginTop: 2, width: `${a.pct}%` }} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Rapports
