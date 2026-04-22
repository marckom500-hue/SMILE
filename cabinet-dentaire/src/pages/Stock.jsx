// pages/Stock.jsx — connecté à Supabase
import Topbar from '../components/Topbar'
import { useStock } from '../hooks/useStock'


function Stock() {
  const { stock, loading, erreur } = useStock()
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Stock & Matériel" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* KPIs stock */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Articles en stock', value: stock.length,                           color: '#0d9488' },
            { label: 'Stock critique',    value: stock.filter(s => s.alerte).length,     color: '#f43f5e' },
            { label: 'À commander',       value: stock.filter(s => (s.qte/s.max) < 0.3).length, color: '#f59e0b' },
          ].map(k => (
            <div key={k.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${k.color}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--text-primary)' }}>{k.value}</div>
            </div>
          ))}
        </div>

        {/* Tableau stock */}
        <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Inventaire complet</span>
            <button style={{ fontSize: 12, padding: '6px 14px', borderRadius: 7, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
              + Ajouter article
            </button>
          </div>

          {/* En-tête tableau */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
            {['Produit', 'Quantité', 'Maximum', 'Niveau', 'Statut'].map(h => (
              <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
            ))}
          </div>

          {stock.map((item, i) => {
            const pct = Math.round((item.qte / item.max) * 100)
            const statut = item.alerte ? { label: 'Critique', bg: '#fce7f3', color: '#9d174d' }
              : pct < 40 ? { label: 'Faible',    bg: '#fef3c7', color: '#92400e' }
              : { label: 'Normal',    bg: '#ccfbf1', color: '#0f766e' }

            return (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr', padding: '12px 16px', borderBottom: i < stock.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{item.nom}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: item.couleur }}>{item.qte}{item.alerte ? ' ⚠' : ''}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.max}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 6, background: 'var(--bg-secondary)', borderRadius: 3 }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: item.couleur, borderRadius: 3, transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)', minWidth: 28 }}>{pct}%</span>
                </div>
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, fontWeight: 500, background: statut.bg, color: statut.color }}>{statut.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Stock
