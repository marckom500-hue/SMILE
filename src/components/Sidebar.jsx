import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// --- Icônes SVG inline (légères, pas besoin de librairie) ---
const icons = {
  dashboard: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  patients: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  ),
  prescription: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd" />
    </svg>
  ),
  billing: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
    </svg>
  ),
  stock: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
      <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
    </svg>
  ),
}

// --- Données de navigation ---
const navGroups = [
  {
    title: 'Principal',
    items: [
      { label: 'Tableau de bord', to: '/',               icon: 'dashboard' },
      { label: 'Rendez-vous',     to: '/rendez-vous',    icon: 'calendar',  badge: '8' },
      { label: 'Patients',        to: '/patients',       icon: 'patients' },
    ],
  },
  {
    title: 'Clinique',
    items: [
      { label: 'Ordonnances',    to: '/ordonnances', icon: 'prescription' },
      { label: 'Facturation',    to: '/facturation', icon: 'billing',  badge: '3', badgeColor: '#f59e0b' },
      { label: 'Stock & Matériel', to: '/stock',     icon: 'stock' },
      { label: 'Rapports',       to: '/rapports',    icon: 'reports' },
    ],
  },
]

// --- Styles ---
const s = {
  sidebar: {
    width: 220,
    background: 'var(--bg-primary)',
    borderRight: '0.5px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    minHeight: '100vh',
  },
  logo: {
    padding: '20px 18px 16px',
    borderBottom: '0.5px solid var(--border)',
  },
  logoIcon: {
    width: 32, height: 32,
    background: 'var(--teal)',
    borderRadius: 8,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  nav: { flex: 1, padding: '12px 10px' },
  groupTitle: {
    fontSize: 10, fontWeight: 500, letterSpacing: '0.08em',
    color: 'var(--text-tertiary)', padding: '10px 8px 4px',
    textTransform: 'uppercase',
  },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 9,
    padding: '8px 10px', borderRadius: 7,
    fontSize: 13, cursor: 'pointer', marginBottom: 1,
    textDecoration: 'none',
    color:      active ? 'var(--teal-dark)'  : 'var(--text-secondary)',
    background: active ? 'var(--teal-light)' : 'transparent',
    fontWeight: active ? 500 : 400,
    transition: 'all 0.15s',
  }),
  badge: (color = 'var(--teal)') => ({
    marginLeft: 'auto', fontSize: 10,
    background: color, color: 'white',
    padding: '1px 6px', borderRadius: 10, fontWeight: 500,
  }),
  footer: {
    padding: 14,
    borderTop: '0.5px solid var(--border)',
  },
  userCard: { display: 'flex', alignItems: 'center', gap: 9 },
  avatar: {
    width: 32, height: 32, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 12, fontWeight: 600, color: 'white', flexShrink: 0,
  },
}

function Sidebar() {
  const location = useLocation()
  const { logout, user } = useAuth()

  return (
    <aside style={s.sidebar}>
      {/* Logo */}
      <div style={s.logo}>
        <div style={s.logoIcon}>
         <img src="/SMILE.jpg" alt="Logo" style={{ width: 20, height: 20 }} />
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)' }}>
          Cabinet Dentaire SMILE
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
          Dr. Boutchouang & Associés
        </div>
      </div>

      {/* Navigation */}
      <nav style={s.nav}>
        {navGroups.map((group, gi) => (
          <div key={gi} style={{ marginTop: gi > 0 ? 8 : 0 }}>
            <div style={s.groupTitle}>{group.title}</div>
            {group.items.map((item) => {
              const active = location.pathname === item.to
              return (
                <NavLink key={item.to} to={item.to} style={s.navItem(active)}>
                  <span style={{ opacity: active ? 1 : 0.7, display: 'flex' }}>
                    {icons[item.icon]}
                  </span>
                  {item.label}
                  {item.badge && (
                    <span style={s.badge(item.badgeColor)}>{item.badge}</span>
                  )}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer utilisateur */}
      <div style={s.footer}>
        <div style={s.userCard}>
          <div style={s.avatar}>DB</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Dr. Boutchouang</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email || 'Chirurgien-dentiste'}</div>
          </div>
        </div>
        <button
          onClick={logout}
          style={{
            marginTop: 10, width: '100%', padding: '7px', borderRadius: 7,
            border: '0.5px solid var(--border)', background: 'transparent',
            color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#fce7f3'; e.currentTarget.style.color = '#9d174d'; e.currentTarget.style.borderColor = '#fbcfe8' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
