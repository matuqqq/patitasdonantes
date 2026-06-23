import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Droplets, AlertTriangle, User } from 'lucide-react'
import { getSolicitudById, getVetById, getCompatibleDonors, donantes } from '../data'
import DonorCard from '../components/DonorCard'

const URGENCIA = {
  urgente: { badge: 'badge-urgente', label: '🔴 Urgente', bg: 'bg-rose-50 border-rose-200' },
  moderado: { badge: 'badge-moderado', label: '🟠 Moderado', bg: 'bg-orange-50 border-orange-200' },
  programado: { badge: 'badge-programado', label: '🔵 Programado', bg: 'bg-blue-50 border-blue-200' },
}

const ESPECIE = { perro: '🐕', gato: '🐈' }

export default function SolicitudDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const sol = getSolicitudById(id)

  if (!sol) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Solicitud no encontrada.</p>
        <Link to="/solicitudes" className="btn-primary mt-4 inline-flex">Volver</Link>
      </div>
    )
  }

  const vet = getVetById(sol.veterinariaId)
  const u = URGENCIA[sol.urgencia]
  const compatibles = getCompatibleDonors(sol, donantes)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={15} /> Volver
      </button>

      <div className={`border rounded-xl p-4 mb-6 flex items-start gap-3 ${u.bg}`}>
        <AlertTriangle size={20} className="text-rose-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className={`${u.badge} mb-1`}>{u.label}</span>
          <p className="text-sm text-slate-700 mt-1">
            Esta solicitud necesita sangre antes del{' '}
            <strong>{new Date(sol.fechaNecesidad).toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="card p-5 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{ESPECIE[sol.especie]}</span>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{sol.mascota}</h1>
                <p className="text-slate-500 text-sm">{sol.raza} · {sol.edad} años · Propietario/a: {sol.propietario}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-0.5">Tipo de sangre</p>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Droplets size={14} className="text-rose-600" /> {sol.tipoSangre}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-0.5">Cantidad estimada</p>
                <p className="font-bold text-slate-800">{sol.cantidadML} mL</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-0.5">Especie</p>
                <p className="font-bold text-slate-800 capitalize">{sol.especie}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-xs text-slate-400 mb-0.5">Fecha límite</p>
                <p className="font-bold text-slate-800 flex items-center gap-1">
                  <Calendar size={13} />
                  {new Date(sol.fechaNecesidad).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            </div>

            <h3 className="font-semibold text-slate-700 mb-2 text-sm">Descripción del caso</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{sol.descripcion}</p>
          </div>
        </div>

        <div className="space-y-4">
          {vet && (
            <div className="card p-4">
              <h3 className="font-semibold text-slate-700 mb-3 text-sm">Veterinaria responsable</h3>
              <p className="font-bold text-slate-800 text-sm">{vet.nombre}</p>
              <div className="space-y-1.5 mt-2">
                <div className="flex items-start gap-1.5 text-xs text-slate-500">
                  <MapPin size={11} className="mt-0.5 flex-shrink-0" /> {vet.direccion}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Phone size={11} /> {vet.telefono}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Mail size={11} /> {vet.email}
                </div>
              </div>
              <Link to={`/veterinarias/${vet.id}`} className="btn-outline w-full justify-center text-xs mt-3">
                Ver veterinaria
              </Link>
            </div>
          )}
          <div className="card p-4">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm">Contacto médico</h3>
            <div className="flex items-center gap-2 mb-2">
              <User size={14} className="text-slate-400" />
              <span className="text-sm text-slate-700">{sol.contacto}</span>
            </div>
            <a
              href={`tel:${sol.telefono}`}
              className="btn-primary w-full justify-center text-sm"
            >
              <Phone size={14} /> Llamar ahora
            </a>
          </div>
        </div>
      </div>

      {/* Donantes compatibles */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          Donantes compatibles ({compatibles.length})
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Estos donantes tienen sangre compatible con {sol.mascota} y están disponibles.
        </p>
        {compatibles.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
            <p className="font-medium">No hay donantes disponibles en este momento</p>
            <p className="text-sm mt-1">Podés registrar tu mascota como donante.</p>
            <Link to="/donantes/registrar" className="btn-primary mt-4 inline-flex">Registrar donante</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibles.map((d) => (
              <DonorCard key={d.id} donante={d} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
