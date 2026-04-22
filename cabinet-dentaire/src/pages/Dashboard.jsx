// pages/Dashboard.jsx
import Topbar           from '../components/Topbar'
import KPICard          from '../components/KPICard'
import AppointmentList  from '../components/AppointmentList'
import PatientList      from '../components/PatientList'
import DonutChart       from '../components/DonutChart'
import Notifications    from '../components/Notifications'
import RevenueChart     from '../components/RevenueChart'
import StockList        from '../components/StockList'

// ✅ On importe les noms EXACTS du fichier mockData.js
import { 
  mockKPIs, 
  mockAppointments, 
  mockPatients, 
  mockStock, 
  mockNotifications
} from '../data/mockData'

function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar title="Tableau de bord" />

      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50">

        {/* Ligne 1 — KPIs (Responsive : 1 col sur mobile, 2 sur tablette, 4 sur PC) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpis.map((kpi) => (
            <KPICard key={kpi.id} {...kpi} />
          ))}
        </div>

        {/* Ligne 2 — RDV + colonne droite (S'empile sur mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <AppointmentList data={rendezVousDuJour} />
          </div>
          <div className="flex flex-col gap-6">
            <DonutChart />
            <Notifications data={alertes} />
          </div>
        </div>

        {/* Ligne 3 — Patients + Revenus */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PatientList data={patientsRecents} />
          <RevenueChart />
        </div>

        {/* Ligne 4 — Stock */}
        <StockList data={stock} />

      </div>
    </div>
  )
}

export default Dashboard