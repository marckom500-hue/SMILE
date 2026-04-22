import Topbar from "../components/Topbar";
import KPICard from "../components/KPICard";
import AppointmentList from "../components/AppointmentList";
import PatientList from "../components/PatientList";
import DonutChart from "../components/DonutChart";
import Notifications from "../components/Notifications";
import RevenueChart from "../components/RevenueChart";
import StockList from "../components/StockList";
import { mockKPIs, mockAppointments, mockPatients, mockStock, mockNotifications } from "../data/mockData";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <Topbar />

      {/* KPI Cards — 1 col mobile, 2 tablette, 4 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => (
          <KPICard key={kpi.id} {...kpi} />
        ))}
      </div>

      {/* Rangée principale — 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* RDV du jour — prend 2/3 sur desktop */}
        <div className="lg:col-span-2">
          <AppointmentList appointments={mockAppointments} />
        </div>
        {/* Notifications — 1/3 */}
        <div>
          <Notifications notifications={mockNotifications} />
        </div>
      </div>

      {/* Rangée secondaire — 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <RevenueChart />
        <DonutChart />
      </div>

      {/* Rangée basse — 1 col mobile, 2 cols desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <PatientList patients={mockPatients} />
        <StockList stocks={mockStock} />
      </div>
    </div>
  );
}
