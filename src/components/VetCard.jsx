import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock, Stethoscope } from 'lucide-react'

export default function VetCard({ vet }) {
  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="h-1.5 bg-gradient-to-r from-teal-400 to-teal-600" />
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
              <Stethoscope size={18} className="text-teal-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base leading-tight">{vet.nombre}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{vet.zona}</p>
            </div>
          </div>
          {vet.activa && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
              Adherida
            </span>
          )}
        </div>

        <div className="space-y-1.5 mb-3">
          <div className="flex items-start gap-1.5 text-xs text-slate-500">
            <MapPin size={11} className="mt-0.5 flex-shrink-0" />
            <span>{vet.direccion}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Phone size={11} className="flex-shrink-0" />
            <span>{vet.telefono}</span>
          </div>
          <div className="flex items-start gap-1.5 text-xs text-slate-500">
            <Clock size={11} className="mt-0.5 flex-shrink-0" />
            <span>{vet.horarios}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {vet.servicios.slice(0, 3).map((s) => (
            <span key={s} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">
              {s}
            </span>
          ))}
        </div>

        <Link
          to={`/veterinarias/${vet.id}`}
          className="btn-outline w-full justify-center text-sm"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
