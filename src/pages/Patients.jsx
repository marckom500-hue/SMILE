// pages/Patients.jsx — connecté à Supabase
import Topbar from '../components/Topbar'
import { useState } from 'react'
import { usePatients } from '../hooks/usePatients'

// Couleurs d'avatar selon l'index
const avatarPalette = [
  { bg: '#ccfbf1', color: '#0f766e' },
  { bg: '#dbeafe', color: '#1d4ed8' },
  { bg: '#fef3c7', color: '#92400e' },
  { bg: '#fce7f3', color: '#9d174d' },
  { bg: '#ede9fe', color: '#6d28d9' },
]

function getInitiales(nom, prenom) {
  return `${(prenom?.[0] || '').toUpperCase()}${(nom?.[0] || '').toUpperCase()}`
}

function getAge(dateNaissance) {
  if (!dateNaissance) return '—'
  const diff = Date.now() - new Date(dateNaissance).getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25)) + ' ans'
}

function Patients() {
  const { patients, loading, erreur } = usePatients()
  const [recherche, setRecherche]     = useState('')

  const filtres = patients.filter(p =>
    `${p.prenom} ${p.nom}`.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Patients" />
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* Barre de recherche */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 360 }}>
            <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} width="14" height="14" viewBox="0 0 20 20" fill="var(--text-primary)">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <input type="text" placeholder="Rechercher un patient..."
              value={recherche} onChange={e => setRecherche(e.target.value)}
              style={{ width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 8, paddingBottom: 8, borderRadius: 8, border: '0.5px solid var(--border-md)', background: 'var(--bg-primary)', fontSize: 13, color: 'var(--text-primary)', outline: 'none' }}
            />
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--teal)', color: 'white', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
            + Nouveau patient
          </button>
        </div>

        {/* États */}
        {loading && <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-secondary)', fontSize: 13 }}>Chargement…</div>}
        {erreur  && <div style={{ textAlign: 'center', padding: 40, color: '#f43f5e', fontSize: 13 }}>Erreur : {erreur}</div>}

        {/* Tableau */}
        {!loading && !erreur && (
          <div style={{ background: 'var(--bg-primary)', border: '0.5px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr', padding: '10px 16px', background: 'var(--bg-secondary)', borderBottom: '0.5px solid var(--border)' }}>
              {['Patient', 'Âge', 'Téléphone', 'Email'].map(h => (
                <div key={h} style={{ fontSize: 11, fontWeight: 500, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</div>
              ))}
            </div>

            {filtres.map((p, i) => {
              const palette = avatarPalette[i % avatarPalette.length]
              return (
                <div key={p.id}
                  style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr', padding: '12px 16px', borderBottom: i < filtres.length - 1 ? '0.5px solid var(--border)' : 'none', cursor: 'pointer', transition: 'background 0.1s', alignItems: 'center' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: palette.bg, color: palette.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>
                      {getInitiales(p.nom, p.prenom)}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{p.prenom} {p.nom}</div>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{getAge(p.date_naissance)}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.telephone || '—'}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{p.email || '—'}</div>
                </div>
              )
            })}

            {filtres.length === 0 && (
              <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-tertiary)', fontSize: 13 }}>
                {recherche ? `Aucun patient trouvé pour « ${recherche} »` : 'Aucun patient enregistré.'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Patients
