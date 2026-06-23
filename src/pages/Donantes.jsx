import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Plus } from 'lucide-react'
import { donantes } from '../data'
import DonorCard from '../components/DonorCard'

export default function Donantes() {
  const [busqueda, setBusqueda] = useState('')
  const [filtroEspecie, setFiltroEspecie] = useState('todas')
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [filtroSangre, setFiltroSangre] = useState('todos')

  const tiposSangre = [...new Set(donantes.map((d) => d.tipoSangre))]

  const filtrados = donantes.filter((d) => {
    const textoBusq = busqueda.toLowerCase()
    const coinBusq =
      !textoBusq ||
      d.nombre.toLowerCase().includes(textoBusq) ||
      d.raza.toLowerCase().includes(textoBusq) ||
      d.zona.toLowerCase().includes(textoBusq)
    if (!coinBusq) return false
    if (filtroEspecie !== 'todas' && d.especie !== filtroEspecie) return false
    if (filtroEstado !== 'todos' && d.estado !== filtroEstado) return false
    if (filtroSangre !== 'todos' && d.tipoSangre !== filtroSangre) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Donantes registrados</h1>
          <p className="text-slate-500 text-sm mt-1">{donantes.filter(d => d.estado === 'disponible').length} disponibles de {donantes.length} registrados</p>
        </div>
        <Link to="/donantes/registrar" className="btn-primary">
          <Plus size={16} /> Registrar mi mascota
        </Link>
      </div>

      {/* Búsqueda y filtros */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 space-y-3">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, raza o zona..."
            className="input pl-9"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-3 items-center">
          <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
            <Filter size={14} /> Filtrar:
          </span>
          <select className="select w-auto" value={filtroEspecie} onChange={(e) => setFiltroEspecie(e.target.value)}>
            <option value="todas">Toda especie</option>
            <option value="perro">🐕 Perros</option>
            <option value="gato">🐈 Gatos</option>
          </select>
          <select className="select w-auto" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
            <option value="todos">Todo estado</option>
            <option value="disponible">✅ Disponible</option>
            <option value="en_evaluacion">⏳ En evaluación</option>
            <option value="en_descanso">💤 En descanso</option>
          </select>
          <select className="select w-auto" value={filtroSangre} onChange={(e) => setFiltroSangre(e.target.value)}>
            <option value="todos">Todo tipo</option>
            {tiposSangre.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {(busqueda || filtroEspecie !== 'todas' || filtroEstado !== 'todos' || filtroSangre !== 'todos') && (
            <button
              onClick={() => { setBusqueda(''); setFiltroEspecie('todas'); setFiltroEstado('todos'); setFiltroSangre('todos') }}
              className="text-sm text-rose-600 hover:underline"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg font-medium">No se encontraron donantes</p>
          <p className="text-sm mt-1">Probá con otros criterios de búsqueda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtrados.map((d) => (
            <DonorCard key={d.id} donante={d} />
          ))}
        </div>
      )}
    </div>
  )
}
