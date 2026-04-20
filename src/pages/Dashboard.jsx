// pages/Dashboard.jsx
import Topbar           from '../components/Topbar'
import KPICard          from '../components/KPICard'
import AppointmentList  from '../components/AppointmentList'
import PatientList      from '../components/PatientList'
import DonutChart       from '../components/DonutChart'
import Notifications    from '../components/Notifications'
import RevenueChart     from '../components/RevenueChart'
import StockList        from '../components/StockList'
import { kpis }         from '../data/mockData'

function Dashboard() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Topbar title="Tableau de bord" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>

        {/* Ligne 1 — KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 16 }}>
          {kpis.map((kpi) => (
            <KPICard key={kpi.id} {...kpi} />
          ))}
        </div>

        {/* Ligne 2 — RDV (2fr) + colonne droite (1fr) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 16 }}>
          <AppointmentList />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <DonutChart />
            <Notifications />
          </div>
        </div>

        {/* Ligne 3 — Patients (1fr) + Revenus (1fr) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <PatientList />
          <RevenueChart />
        </div>

        {/* Ligne 4 — Stock pleine largeur */}
        <StockList />

      </div>
    </div>
  )
}

export default Dashboard
