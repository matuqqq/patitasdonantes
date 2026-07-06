import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider, useAuth } from './context/AppContext'
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
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './pages/admin/AdminLayout'
import AdminVeterinarias from './pages/admin/AdminVeterinarias'
import AdminDonantes from './pages/admin/AdminDonantes'
import AdminSolicitudes from './pages/admin/AdminSolicitudes'

function RequireAdmin({ children }) {
  const { adminUser } = useAuth()
  return adminUser ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  return (
    <AppProvider>
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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Navigate to="/admin/donantes" replace />} />
            <Route path="donantes" element={<AdminDonantes />} />
            <Route path="solicitudes" element={<AdminSolicitudes />} />
            <Route path="veterinarias" element={<AdminVeterinarias />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}
