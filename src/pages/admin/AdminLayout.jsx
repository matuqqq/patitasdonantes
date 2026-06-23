import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Droplets, Stethoscope, LogOut, ExternalLink } from 'lucide-react'
import { useAuth } from '../../context/AppContext'

export default function AdminLayout() {
  const { adminUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 rounded-lg p-1.5">
              <Droplets size={15} />
            </div>
            <div>
              <p className="font-bold text-sm leading-none">PatitasDonantes</p>
              <p className="text-slate-400 text-xs mt-0.5">Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3">
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-2 mb-2">Gestión</p>
          <Link
            to="/admin/veterinarias"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium bg-slate-800 text-white hover:bg-slate-700 transition-colors"
          >
            <Stethoscope size={16} className="text-teal-400" />
            Veterinarias
          </Link>
        </nav>

        <div className="p-3 border-t border-slate-700 space-y-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink size={14} /> Ver sitio público
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={14} /> Cerrar sesión
          </button>
          <p className="text-slate-600 text-xs px-3 pt-1 truncate">{adminUser?.email}</p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
          <h1 className="font-semibold text-slate-700 text-sm">Panel de administración</h1>
          <span className="text-xs bg-rose-100 text-rose-700 font-semibold px-2 py-0.5 rounded-full">Admin</span>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
