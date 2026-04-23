// components/Layout.jsx — Responsive
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import SidebarTablet from './SidebarTablet'
import BottomNav from './BottomNav'

function Layout() {
  const [menuOuvert, setMenuOuvert] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-tertiary)' }}>

      {/* Desktop — sidebar complète */}
      <div className="sidebar-desktop">
        <Sidebar />
      </div>

      {/* Tablette — sidebar icônes */}
      <div className="sidebar-tablet">
        <SidebarTablet />
      </div>

      {/* Contenu principal */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Outlet />
      </main>

      {/* Mobile — barre de navigation en bas */}
      <div className="bottom-nav">
        <BottomNav />
      </div>

    </div>
  )
}

export default Layout
