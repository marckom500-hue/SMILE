import { stock } from '../data/mockData'

function StockList() {
  return (
    <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 0', marginBottom: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Stock consommables</span>
        <span style={{ fontSize: 11, color: 'var(--teal)', cursor: 'pointer' }}>Commander →</span>
      </div>
      <div style={{ padding: '0 16px 16px' }}>
        {stock.map((item, i) => {
          const pct = Math.round((item.qte / item.max) * 100)
          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < stock.length - 1 ? '0.5px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 12, color: 'var(--text-primary)', flex: 1 }}>{item.nom}</span>
              <div style={{ width: 80, height: 5, background: 'var(--bg-secondary)', borderRadius: 3 }}>
                <div style={{ width: `${pct}%`, height: '100%', background: item.couleur, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 500, minWidth: 32, textAlign: 'right', color: item.couleur }}>
                {item.qte}{item.alerte ? ' ⚠' : ''}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default StockList
