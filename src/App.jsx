import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Solicitudes from './pages/Solicitudes'
import SolicitudDetalle from './pages/SolicitudDetalle'
import NuevaSolicitud from './pages/NuevaSolicitud'
import Donantes from './pages/Donantes'
import DonanteDetalle from './pages/DonanteDetalle'
import RegistrarDonante from './pages/RegistrarDonante'
import Veterinarias from './pages/Veterinarias'
import VetDetalle from './pages/VetDetalle'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="solicitudes" element={<Solicitudes />} />
          <Route path="solicitudes/nueva" element={<NuevaSolicitud />} />
          <Route path="solicitudes/:id" element={<SolicitudDetalle />} />
          <Route path="donantes" element={<Donantes />} />
          <Route path="donantes/registrar" element={<RegistrarDonante />} />
          <Route path="donantes/:id" element={<DonanteDetalle />} />
          <Route path="veterinarias" element={<Veterinarias />} />
          <Route path="veterinarias/:id" element={<VetDetalle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
