import { useState } from 'react'
import { Filter } from 'lucide-react'
import { veterinarias } from '../data'
import VetCard from '../components/VetCard'

const zonas = [...new Set(veterinarias.map((v) => v.zona))]
const servicios = ['Banco de sangre', 'Transfusiones', 'Urgencias 24 hs', 'Especialista en felinos']

export default function Veterinarias() {
  const [filtroZona, setFiltroZona] = useState('todas')
  const [filtroServicio, setFiltroServicio] = useState('todos')

  const filtradas = veterinarias.filter((v) => {
    if (filtroZona !== 'todas' && v.zona !== filtroZona) return false
    if (filtroServicio !== 'todos' && !v.servicios.includes(filtroServicio)) return false
    return true
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Veterinarias adheridas</h1>
        <p className="text-slate-500 text-sm mt-1">
          {veterinarias.length} clínicas y hospitales de la red PatitasDonantes
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
        <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
          <Filter size={14} /> Filtrar por:
        </span>
        <select className="select w-auto" value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)}>
          <option value="todas">Toda zona</option>
          {zonas.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <select className="select w-auto" value={filtroServicio} onChange={(e) => setFiltroServicio(e.target.value)}>
          <option value="todos">Todo servicio</option>
          {servicios.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {(filtroZona !== 'todas' || filtroServicio !== 'todos') && (
          <button
            onClick={() => { setFiltroZona('todas'); setFiltroServicio('todos') }}
            className="text-sm text-rose-600 hover:underline"
          >
            Limpiar
          </button>
        )}
      </div>

      {filtradas.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <p className="font-medium">No hay veterinarias con esos filtros</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtradas.map((v) => (
            <VetCard key={v.id} vet={v} />
          ))}
        </div>
      )}

      <div className="mt-10 bg-teal-50 border border-teal-200 rounded-xl p-6 text-center">
        <h3 className="font-bold text-teal-800 mb-1">¿Tu veterinaria quiere sumarse?</h3>
        <p className="text-teal-700 text-sm mb-3">
          Clínicas y hospitales veterinarios pueden adherirse a la red PatitasDonantes de forma gratuita.
        </p>
        <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
          Contactar para adherirse
        </button>
      </div>
    </div>
  )
}
