import { createContext, useContext, useState } from 'react'
import {
  solicitudes as initSolicitudes,
  donantes as initDonantes,
  veterinarias as initVeterinarias,
} from '../data'

const AppContext = createContext(null)
const AuthContext = createContext(null)

const ADMIN_EMAIL = 'admin@patitasdonantes.com'
const ADMIN_PASSWORD = 'admin123'

export function AppProvider({ children }) {
  const [solicitudes, setSolicitudes] = useState(initSolicitudes)
  const [donantes, setDonantes] = useState(initDonantes)
  const [veterinarias, setVeterinarias] = useState(initVeterinarias)
  const [adminUser, setAdminUser] = useState(null)

  // Solicitudes
  const updateSolicitud = (id, changes) =>
    setSolicitudes((prev) => prev.map((s) => (s.id === id ? { ...s, ...changes } : s)))
  const deleteSolicitud = (id) =>
    setSolicitudes((prev) => prev.filter((s) => s.id !== id))
  const addSolicitud = (sol) =>
    setSolicitudes((prev) => [...prev, { ...sol, id: Date.now(), estado: 'activa', fechaCreacion: new Date().toISOString().split('T')[0] }])

  // Donantes
  const updateDonante = (id, changes) =>
    setDonantes((prev) => prev.map((d) => (d.id === id ? { ...d, ...changes } : d)))
  const deleteDonante = (id) =>
    setDonantes((prev) => prev.filter((d) => d.id !== id))
  const addDonante = (d) =>
    setDonantes((prev) => [...prev, { ...d, id: Date.now() }])

  // Veterinarias
  const updateVeterinaria = (id, changes) =>
    setVeterinarias((prev) => prev.map((v) => (v.id === id ? { ...v, ...changes } : v)))
  const deleteVeterinaria = (id) =>
    setVeterinarias((prev) => prev.filter((v) => v.id !== id))
  const addVeterinaria = (v) =>
    setVeterinarias((prev) => [...prev, { ...v, id: Date.now(), activa: true, solicitudesActivas: [] }])

  // Auth
  const login = (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setAdminUser({ email, nombre: 'Administrador' })
      return true
    }
    return false
  }
  const logout = () => setAdminUser(null)

  return (
    <AppContext.Provider
      value={{
        solicitudes, donantes, veterinarias,
        updateSolicitud, deleteSolicitud, addSolicitud,
        updateDonante, deleteDonante, addDonante,
        updateVeterinaria, deleteVeterinaria, addVeterinaria,
      }}
    >
      <AuthContext.Provider value={{ adminUser, login, logout }}>
        {children}
      </AuthContext.Provider>
    </AppContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppData must be inside AppProvider')
  return ctx
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AppProvider')
  return ctx
}
