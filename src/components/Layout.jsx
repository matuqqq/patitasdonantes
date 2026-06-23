import { useState } from 'react'
import { Outlet, Link, useLocation, NavLink } from 'react-router-dom'
import { Menu, X, Heart, Droplets } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/solicitudes', label: 'Solicitudes' },
  { to: '/donantes', label: 'Donantes' },
  { to: '/veterinarias', label: 'Veterinarias' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="bg-rose-600 text-white rounded-lg p-1.5">
              <Droplets size={18} />
            </div>
            <span className="font-bold text-slate-800 text-lg">
              Patitas<span className="text-rose-600">Donantes</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/donantes/registrar" className="btn-outline text-sm">
              <Heart size={15} /> Registrar donante
            </Link>
            <Link to="/solicitudes/nueva" className="btn-primary text-sm">
              <Droplets size={15} /> Nueva solicitud
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-rose-50 text-rose-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <hr className="my-1 border-slate-200" />
            <Link
              to="/donantes/registrar"
              onClick={() => setOpen(false)}
              className="btn-outline text-sm justify-center"
            >
              <Heart size={15} /> Registrar donante
            </Link>
            <Link
              to="/solicitudes/nueva"
              onClick={() => setOpen(false)}
              className="btn-primary text-sm justify-center"
            >
              <Droplets size={15} /> Nueva solicitud
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-rose-600 text-white rounded-lg p-1">
                <Droplets size={14} />
              </div>
              <span className="font-bold text-slate-800">PatitasDonantes</span>
            </div>
            <p className="text-sm text-slate-500">
              Conectamos mascotas que necesitan sangre con donantes dispuestos.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">Navegación</h4>
            <ul className="space-y-1">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">Acciones rápidas</h4>
            <ul className="space-y-1">
              <li>
                <Link to="/donantes/registrar" className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                  Registrar mi mascota
                </Link>
              </li>
              <li>
                <Link to="/solicitudes/nueva" className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                  Crear solicitud de sangre
                </Link>
              </li>
              <li>
                <Link to="/veterinarias" className="text-sm text-slate-500 hover:text-rose-600 transition-colors">
                  Ver veterinarias adheridas
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-100 text-center py-3 text-xs text-slate-400">
          © 2026 PatitasDonantes — Prototipo demostrativo
        </div>
      </footer>
    </div>
  )
}
