import { Link } from 'react-router-dom'
import { MapPin, Droplets, Award } from 'lucide-react'

const ESTADO = {
  disponible: 'badge-disponible',
  en_evaluacion: 'badge-evaluacion',
  en_descanso: 'badge-descanso',
}
const ESTADO_LABEL = {
  disponible: '✅ Disponible',
  en_evaluacion: '⏳ En evaluación',
  en_descanso: '💤 En descanso',
}

export default function DonorCard({ donante }) {
  const estadoClass = ESTADO[donante.estado] || 'badge-descanso'

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className={`h-2 bg-gradient-to-r ${donante.gradiente}`} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${donante.gradiente} flex items-center justify-center text-2xl shadow-sm`}>
              {donante.emoji}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">{donante.nombre}</h3>
              <p className="text-xs text-slate-500">{donante.raza}</p>
              <p className="text-xs text-slate-400">{donante.edad} años · {donante.peso} kg · {donante.sexo}</p>
            </div>
          </div>
          <span className={estadoClass}>{ESTADO_LABEL[donante.estado]}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 rounded-full text-xs font-semibold border border-red-200">
            <Droplets size={11} /> {donante.tipoSangre}
          </span>
          {donante.donacionesTotales > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-semibold border border-amber-200">
              <Award size={11} /> {donante.donacionesTotales} donación{donante.donacionesTotales !== 1 ? 'es' : ''}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
          <MapPin size={11} />
          {donante.zona}, {donante.ciudad}
        </div>

        <Link
          to={`/donantes/${donante.id}`}
          className="btn-outline w-full justify-center text-sm"
        >
          Ver perfil completo
        </Link>
      </div>
    </div>
  )
}
