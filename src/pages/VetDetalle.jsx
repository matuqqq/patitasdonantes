import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail, Clock, Stethoscope, CheckCircle } from 'lucide-react'
import { useAppData } from '../context/AppContext'
import RequestCard from '../components/RequestCard'

export default function VetDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { veterinarias, solicitudes } = useAppData()

  const vet = veterinarias.find((v) => v.id === Number(id))

  if (!vet) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Veterinaria no encontrada.</p>
        <Link to="/veterinarias" className="btn-primary mt-4 inline-flex">Volver</Link>
      </div>
    )
  }

  const solActivas = (vet.solicitudesActivas || [])
    .map((sid) => solicitudes.find((s) => s.id === sid))
    .filter(Boolean)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={15} /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="card p-5 mb-4">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-16 h-16 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                <Stethoscope size={28} className="text-teal-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{vet.nombre}</h1>
                <p className="text-slate-500 text-sm">{vet.zona} · {vet.ciudad}</p>
                {vet.activa && (
                  <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
                    <CheckCircle size={11} /> Red PatitasDonantes
                  </span>
                )}
              </div>
            </div>

            {vet.descripcion && (
              <p className="text-sm text-slate-600 leading-relaxed mb-5">{vet.descripcion}</p>
            )}

            {vet.servicios.length > 0 && (
              <>
                <h3 className="font-semibold text-slate-700 mb-2 text-sm">Servicios disponibles</h3>
                <div className="flex flex-wrap gap-2">
                  {vet.servicios.map((s) => (
                    <span key={s} className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full border border-teal-200 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card p-4 space-y-3 h-fit">
          <h3 className="font-semibold text-slate-700 text-sm">Información de contacto</h3>
          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 text-sm">
              <MapPin size={15} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 font-medium">{vet.direccion}</p>
            </div>
            {vet.horarios && (
              <div className="flex items-center gap-2.5 text-sm">
                <Clock size={15} className="text-slate-400 flex-shrink-0" />
                <p className="text-slate-600">{vet.horarios}</p>
              </div>
            )}
            <div className="flex items-center gap-2.5 text-sm">
              <Phone size={15} className="text-slate-400 flex-shrink-0" />
              <p className="text-slate-700 font-medium">{vet.telefono}</p>
            </div>
            {vet.email && (
              <div className="flex items-center gap-2.5 text-sm">
                <Mail size={15} className="text-slate-400 flex-shrink-0" />
                <p className="text-slate-600">{vet.email}</p>
              </div>
            )}
          </div>
          <hr className="border-slate-100" />
          <a href={`tel:${vet.telefono}`} className="btn-primary w-full justify-center text-sm">
            <Phone size={14} /> Llamar ahora
          </a>
          {vet.email && (
            <a href={`mailto:${vet.email}`} className="btn-outline w-full justify-center text-sm">
              <Mail size={14} /> Enviar email
            </a>
          )}
        </div>
      </div>

      {solActivas.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">
            Solicitudes activas en esta veterinaria ({solActivas.length})
          </h2>
          <p className="text-sm text-slate-500 mb-4">
            Estas mascotas están siendo atendidas aquí y necesitan donantes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {solActivas.map((s) => (
              <RequestCard key={s.id} solicitud={s} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
