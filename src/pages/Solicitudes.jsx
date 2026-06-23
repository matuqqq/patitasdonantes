import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, Plus } from 'lucide-react'
import { solicitudes } from '../data'
import RequestCard from '../components/RequestCard'

export default function Solicitudes() {
  const [filtroUrgencia, setFiltroUrgencia] = useState('todas')
  const [filtroEspecie, setFiltroEspecie] = useState('todas')
  const [filtroSangre, setFiltroSangre] = useState('todas')

  const tiposSangre = [...new Set(solicitudes.map((s) => s.tipoSangre))]

  const filtradas = solicitudes.filter((s) => {
    if (filtroUrgencia !== 'todas' && s.urgencia !== filtroUrgencia) return false
    if (filtroEspecie !== 'todas' && s.especie !== filtroEspecie) return false
    if (filtroSangre !== 'todas' && s.tipoSangre !== filtroSangre) return false
    return s.estado === 'activa'
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Solicitudes de sangre</h1>
          <p className="text-slate-500 text-sm mt-1">{filtradas.length} solicitudes activas</p>
        </div>
        <Link to="/solicitudes/nueva" className="btn-primary">
          <Plus size={16} /> Nueva solicitud
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Filter size={14} /> Filtrar por:
        </span>
        <select className="select w-auto" value={filtroUrgencia} onChange={(e) => setFiltroUrgencia(e.target.value)}>
          <option value="todas">Toda urgencia</option>
          <option value="urgente">Urgente</option>
          <option value="moderado">Moderado</option>
          <option value="programado">Programado</option>
        </select>
        <select className="select w-auto" value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)}>
          <option value="todas">Toda especie</option>
          <option value="perro">Perros</option>
          <option value="gato">Gatos</option>
        </select>
        <select className="select w-auto" value={filtroSangre} onChange={(e) => setFiltroSangre(e.target.value)}>
          <option value="todas">Todo tipo de sangre</option>
          {tiposSangre.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {(filtroUrgencia !== 'todas' || filtroEspecie !== 'todas' || filtroSangre !== 'todas') && (
          <button
            onClick={() => { setFiltroUrgencia('todas'); setFiltroEspecie('todas'); setFiltroSangre('todas') }}
            className="text-sm text-rose-600 hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Leyenda de urgencia */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <span className="badge-urgente">🔴 Urgente — dentro de 24 hs</span>
        <span className="badge-moderado">🟠 Moderado — dentro de 1 semana</span>
        <span className="badge-programado">🔵 Programado — cirugía prevista</span>
      </div>

      {filtradas.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg font-medium">No hay solicitudes con esos filtros</p>
          <p className="text-sm mt-1">Probá cambiando los criterios de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtradas.map((s) => (
            <RequestCard key={s.id} solicitud={s} />
          ))}
        </div>
      )}
    </div>
  )
}
