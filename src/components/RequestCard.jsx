import { Link } from 'react-router-dom'
import { MapPin, Clock, Droplets, AlertTriangle, Calendar } from 'lucide-react'
import { getVetById } from '../data'

const URGENCIA = {
  urgente: { badge: 'badge-urgente', label: '🔴 Urgente', ring: 'border-l-4 border-l-rose-500' },
  moderado: { badge: 'badge-moderado', label: '🟠 Moderado', ring: 'border-l-4 border-l-orange-400' },
  programado: { badge: 'badge-programado', label: '🔵 Programado', ring: 'border-l-4 border-l-blue-400' },
}

const ESPECIE = { perro: '🐕', gato: '🐈' }

export default function RequestCard({ solicitud }) {
  const u = URGENCIA[solicitud.urgencia] || URGENCIA.programado
  const vet = getVetById(solicitud.veterinariaId)

  return (
    <div className={`card ${u.ring} hover:shadow-md transition-shadow`}>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{ESPECIE[solicitud.especie]}</span>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">{solicitud.mascota}</h3>
              <p className="text-xs text-slate-500">{solicitud.raza} · {solicitud.edad} años</p>
            </div>
          </div>
          <span className={u.badge}>{u.label}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
            <Droplets size={11} /> {solicitud.tipoSangre}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Calendar size={11} />
            Necesita antes del {new Date(solicitud.fechaNecesidad).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
          </span>
        </div>

        <p className="text-sm text-slate-600 line-clamp-2 mb-3">{solicitud.descripcion}</p>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <MapPin size={11} />
          {vet ? `${vet.nombre} · ${vet.zona}` : 'Veterinaria no disponible'}
        </div>

        <Link
          to={`/solicitudes/${solicitud.id}`}
          className="btn-primary w-full justify-center text-sm"
        >
          Ver detalles y donantes
        </Link>
      </div>
    </div>
  )
}
