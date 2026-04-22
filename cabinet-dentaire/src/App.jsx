import { Routes, Route } from 'react-router-dom'
import Layout      from './components/Layout'
import Dashboard   from './pages/Dashboard'
import RendezVous  from './pages/RendezVous'
import Patients    from './pages/Patients'
import Facturation from './pages/Facturation'
import Stock       from './pages/Stock'
import Rapports    from './pages/Rapports'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index              element={<Dashboard />} />
        <Route path="rendez-vous" element={<RendezVous />} />
        <Route path="patients"    element={<Patients />} />
        <Route path="facturation" element={<Facturation />} />
        <Route path="stock"       element={<Stock />} />
        <Route path="rapports"    element={<Rapports />} />
      </Route>
    </Routes>
  )
}

export default App
