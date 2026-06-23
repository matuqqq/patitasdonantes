import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Droplets, Lock } from 'lucide-react'
import { useAuth } from '../../context/AppContext'

export default function AdminLogin() {
  const { login, adminUser } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  if (adminUser) return <Navigate to="/admin/veterinarias" replace />

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email, password)) {
      navigate('/admin/veterinarias')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="bg-rose-600 text-white rounded-lg p-2">
              <Droplets size={20} />
            </div>
            <span className="font-bold text-slate-800 text-xl">
              Patitas<span className="text-rose-600">Donantes</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm">Panel de administración</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mx-auto mb-2">
            <Lock size={20} className="text-slate-500" />
          </div>
          <h1 className="text-center font-bold text-slate-800 text-lg">Iniciar sesión</h1>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg px-3 py-2">
              Credenciales incorrectas. Intentá de nuevo.
            </div>
          )}

          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="admin@patitasdonantes.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(false) }}
              required
            />
          </div>
          <div>
            <label className="label">Contraseña</label>
            <input
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false) }}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            Ingresar al panel
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            Demo: admin@patitasdonantes.com / admin123
          </p>
        </form>
      </div>
    </div>
  )
}
