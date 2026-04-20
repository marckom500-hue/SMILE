// components/Topbar.jsx

const s = {
  topbar: {
    background: 'var(--bg-primary)',
    borderBottom: '0.5px solid var(--border)',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 600,
    color: 'var(--text-primary)',
    flex: 1,
  },
  date: {
    fontSize: 12,
    color: 'var(--text-secondary)',
  },
  btn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 7,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    border: '0.5px solid var(--border-md)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    transition: 'all 0.15s',
  },
  btnPrimary: {
    background: 'var(--teal)',
    color: 'white',
    border: '0.5px solid var(--teal)',
  },
}

// Formate la date en français
function getDateFr() {
  return new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function Topbar({ title = 'Tableau de bord' }) {
  return (
    <div style={s.topbar}>
      <div style={s.title}>{title}</div>
      <span style={s.date}>{getDateFr()}</span>

      <button
        style={s.btn}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-primary)'}
      >
        <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
        </svg>
        Nouveau RDV
      </button>

      <button
        style={{ ...s.btn, ...s.btnPrimary }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--teal-dark)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--teal)'}
      >
        <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        Nouveau patient
      </button>
    </div>
  )
}

export default Topbar
