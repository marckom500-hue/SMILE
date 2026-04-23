// pages/Stock.jsx — CRUD complet
import { useState } from 'react'
import Topbar from '../components/Topbar'
import FormulaireStock from '../components/FormulaireStock'
import ConfirmDialog from '../components/ConfirmDialog'
import { useStock } from '../hooks/useStock'

function Stock() {
  const { stock, loading, erreur, ajouterArticle, modifierArticle, supprimerArticle } = useStock()
  const [modal, setModal]           = useState(null)
  const [aSupprimer, setASupprimer] = useState(null)

  const critique  = stock.filter(s => s.quantite <= s.seuil_alerte).length
  const aCommander = stock.filter(s => (s.quantite / s.maximum) < 0.3).length

  async function sauvegarder(form) {
    if (modal === 'ajouter') return ajouterArticle(form)
    return modifierArticle(modal.id, form)
  }

  async function confirmerSuppression() {
    await supprimerArticle(aSupprimer.id)
    setASupprimer(null)
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Stock & Matériel" />
      <div className="content-padding main-content" style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Articles en stock',  value: stock.length, color: '#0d9488' },
            { label: 'Stock critique',     value: critique,     color: '#f43f5e' },
            { label: 'À commander',        value: aCommander,   color: '#f59e0b' },
          ].map(k => (
            <div key={k.label} style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, padding: '14px 16px', borderTop: `3px solid ${k.color}` }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontSize: 28, fontWeight: 500, color: 'var(--text-primary)' }}>{k.value}</div>
            </div>
          ))}
        </div>

        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Chargement…</div>}
        {erreur  && <div style={{ padding: 16, color: '#f43f5e', fontSize: 13, background: '#fce7f3', borderRadius: 10 }}>⚠️ {erreur}</div>}

        {!loading && !erreur && (
          <div className="table-scroll" style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '14px 16px', borderBottom: '0.5px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>Inventaire complet</span>
              <button onClick={() => setModal('ajouter')} style={{ fontSize: 12, padding: '7px 14px', borderRadius: 7, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                + Ajouter article
              </button>
            </div>

            {/* En-tête */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 140px', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
              {['Produit', 'Quantité', 'Maximum', 'Niveau', 'Statut', 'Actions'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {stock.map((item, i) => {
              const pct     = Math.round((item.quantite / item.maximum) * 100)
              const alerte  = item.quantite <= item.seuil_alerte
              const statut  = alerte
                ? { label: 'Critique', bg: '#fce7f3', color: '#9d174d' }
                : pct < 40
                  ? { label: 'Faible',   bg: '#fef3c7', color: '#92400e' }
                  : { label: 'Normal',   bg: '#ccfbf1', color: '#0f766e' }
              return (
                <div key={item.id}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr 140px', padding: '12px 16px', borderBottom: i < stock.length - 1 ? '0.5px solid var(--border)' : 'none', alignItems: 'center', transition: 'background 0.1s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{item.nom}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: item.couleur }}>{item.quantite}{alerte ? ' ⚠️' : ''}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{item.maximum}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ flex: 1, height: 6, background: 'var(--bg-secondary)', borderRadius: 3 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: item.couleur, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', minWidth: 28 }}>{pct}%</span>
                  </div>
                  <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 8, fontWeight: 500, background: statut.bg, color: statut.color }}>{statut.label}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setModal(item)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--border)', background: 'var(--bg-primary)', color: 'var(--teal)', cursor: 'pointer', fontSize: 11, fontWeight: 500 }}
                    >✏️ Modifier</button>
                    <button onClick={() => setASupprimer(item)}
                      style={{ padding: '5px 10px', borderRadius: 6, border: '0.5px solid #fce7f3', background: '#fce7f3', color: '#9d174d', cursor: 'pointer', fontSize: 11 }}
                    >🗑️</button>
                  </div>
                </div>
              )
            })}

            {stock.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                Aucun article. Cliquez sur « Ajouter article » pour commencer.
              </div>
            )}
          </div>
        )}
      </div>

      {modal && <FormulaireStock article={modal === 'ajouter' ? null : modal} onSave={sauvegarder} onClose={() => setModal(null)} />}
      {aSupprimer && <ConfirmDialog message={`Supprimer « ${aSupprimer.nom} » du stock ? Cette action est irréversible.`} onConfirm={confirmerSuppression} onCancel={() => setASupprimer(null)} />}
    </div>
  )
}

export default Stock
