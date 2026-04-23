// components/BottomNav.jsx — Navigation bas de page pour mobile
import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  {
    to: '/', title: 'Dashboard',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>,
  },
  {
    to: '/rendez-vous', title: 'RDV',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
  },
  {
    to: '/patients', title: 'Patients',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>,
  },
  {
    to: '/facturation', title: 'Factures',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z" clipRule="evenodd"/></svg>,
  },
  {
    to: '/stock', title: 'Stock',
    icon: <svg viewBox="0 0 20 20" fill="currentColor" width="22" height="22"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" clipRule="evenodd"/></svg>,
  },
]

function BottomNav() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--bg-primary)',
      borderTop: '0.5px solid var(--border)',
      display: 'flex', alignItems: 'stretch',
      height: 62,
      paddingBottom: 'env(safe-area-inset-bottom)', // iPhone notch
    }}>
      {navItems.map(item => {
        const active = location.pathname === item.to
        return (
          <NavLink key={item.to} to={item.to}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 3,
              textDecoration: 'none',
              color: active ? 'var(--teal)' : 'var(--text-tertiary)',
              transition: 'color 0.15s',
              paddingTop: 8,
            }}
          >
            <span style={{ opacity: active ? 1 : 0.6 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{item.title}</span>
            {/* Indicateur actif */}
            {active && (
              <span style={{
                position: 'absolute', top: 0,
                width: 32, height: 2, borderRadius: 2,
                background: 'var(--teal)',
              }} />
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}

export default BottomNav
