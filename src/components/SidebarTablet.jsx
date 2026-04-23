// components/SidebarTablet.jsx — Sidebar réduite pour tablettes (icônes seulement)
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/',            icon: 'dashboard',    title: 'Dashboard' },
  { to: '/rendez-vous', icon: 'calendar',     title: 'Rendez-vous', badge: '8' },
  { to: '/patients',    icon: 'patients',     title: 'Patients' },
  { to: '/facturation', icon: 'billing',      title: 'Facturation', badge: '3' },
  { to: '/stock',       icon: 'stock',        title: 'Stock' },
  { to: '/rapports',    icon: 'reports',      title: 'Rapports' },
]

const icons = {
  dashboard: <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>,
  calendar:  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  patients:  <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>,
  billing:   <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z" clipRule="evenodd"/></svg>,
  stock:     <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" clipRule="evenodd"/></svg>,
  reports:   <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
}

function SidebarTablet() {
  const location = useLocation()
  const { logout } = useAuth()

  return (
    <aside style={{
      width: 64, background: 'var(--bg-primary)',
      borderRight: '0.5px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', padding: '16px 0',
      flexShrink: 0, minHeight: '100vh',
    }}>
      {/* Logo icône */}
      <div style={{ width: 36, height: 36, background: 'var(--teal)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
       <img src="/SMILE.jpg" alt="Logo" style={{ width: 20, height: 20 }} />
      </div>

      {/* Nav icônes avec tooltip */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, width: '100%', padding: '0 8px' }}>
        {navItems.map(item => {
          const active = location.pathname === item.to
          return (
            <NavLink key={item.to} to={item.to} title={item.title}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 48, height: 44, borderRadius: 10, margin: '0 auto',
                color:      active ? 'var(--teal-dark)' : 'var(--text-secondary)',
                background: active ? 'var(--teal-light)' : 'transparent',
                transition: 'all 0.15s', textDecoration: 'none',
              }}
            >
              {icons[item.icon]}
              {item.badge && (
                <span style={{ position: 'absolute', top: 6, right: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--teal)', color: 'white', fontSize: 8, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.badge}
                </span>
              )}
            </NavLink>
          )
        })}
      </nav>

      {/* Avatar + déconnexion */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: '0.5px solid var(--border)', width: '100%' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--teal), var(--teal-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>
          DB
        </div>
        <button onClick={logout} title="Déconnexion"
          style={{ width: 36, height: 36, borderRadius: 8, border: '0.5px solid var(--border)', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </aside>
  )
}

export default SidebarTablet
