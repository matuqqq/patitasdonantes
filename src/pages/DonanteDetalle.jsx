import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Mail, Droplets, Award, Shield, Calendar, Heart } from 'lucide-react'
import { getDonorById, getCompatibleRequests, solicitudes, getVetById } from '../data'
import RequestCard from '../components/RequestCard'

const ESTADO_LABEL = {
  disponible: { text: '✅ Disponible para donar', cls: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  en_evaluacion: { text: '⏳ En proceso de evaluación', cls: 'text-yellow-700 bg-yellow-50 border-yellow-200' },
  en_descanso: { text: '💤 En período de descanso (donó recientemente)', cls: 'text-slate-600 bg-slate-50 border-slate-200' },
}

export default function DonanteDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const donante = getDonorById(id)

  if (!donante) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500">Donante no encontrado.</p>
        <Link to="/donantes" className="btn-primary mt-4 inline-flex">Volver</Link>
      </div>
    )
  }

  const compatibles = getCompatibleRequests(donante, solicitudes)
  const estado = ESTADO_LABEL[donante.estado]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={15} /> Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <div className="card p-5 mb-4">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${donante.gradiente} flex items-center justify-center text-4xl shadow-md flex-shrink-0`}>
                {donante.emoji}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{donante.nombre}</h1>
                <p className="text-slate-500">{donante.raza}</p>
                <div className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-3 py-1 mt-2 ${estado.cls}`}>
                  {estado.text}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Edad', value: `${donante.edad} años` },
                { label: 'Peso', value: `${donante.peso} kg` },
                { label: 'Sexo', value: donante.sexo === 'macho' ? 'Macho' : 'Hembra' },
                { label: 'Especie', value: donante.especie === 'perro' ? '🐕 Perro' : '🐈 Gato' },
              ].map((item) => (
                <div key={item.label} className="bg-slate-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className="font-bold text-slate-800 text-sm mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-semibold border border-red-200">
                <Droplets size={13} /> Tipo {donante.tipoSangre}
              </span>
              {donante.donacionesTotales > 0 && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-semibold border border-amber-200">
                  <Award size={13} /> {donante.donacionesTotales} donación{donante.donacionesTotales !== 1 ? 'es' : ''} realizadas
                </span>
              )}
              {donante.vacunado && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                  <Shield size={13} /> Vacunado/a
                </span>
              )}
            </div>

            <h3 className="font-semibold text-slate-700 mb-2 text-sm">Sobre {donante.nombre}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{donante.descripcion}</p>

            {donante.ultimaDonacion && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500 border-t border-slate-100 pt-4">
                <Calendar size={14} />
                Última donación: {new Date(donante.ultimaDonacion).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h3 className="font-semibold text-slate-700 mb-3 text-sm">Dueño/a</h3>
            <p className="font-bold text-slate-800 text-sm">{donante.propietario.nombre}</p>
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={11} /> {donante.zona}, {donante.ciudad}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Phone size={11} /> {donante.propietario.telefono}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Mail size={11} /> {donante.propietario.email}
              </div>
            </div>
            {donante.estado === 'disponible' && (
              <a
                href={`tel:${donante.propietario.telefono}`}
                className="btn-primary w-full justify-center text-sm mt-3"
              >
                <Phone size={14} /> Contactar dueño/a
              </a>
            )}
          </div>

          <div className="card p-4 text-sm">
            <h3 className="font-semibold text-slate-700 mb-2">Estado de salud</h3>
            <ul className="space-y-1.5 text-slate-600">
              <li className={`flex items-center gap-2 ${donante.vacunado ? 'text-emerald-700' : 'text-rose-600'}`}>
                {donante.vacunado ? '✅' : '❌'} Vacunación al día
              </li>
              <li className={`flex items-center gap-2 ${donante.desparasitado ? 'text-emerald-700' : 'text-rose-600'}`}>
                {donante.desparasitado ? '✅' : '❌'} Desparasitación al día
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Solicitudes compatibles */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">
          Solicitudes que {donante.nombre} puede ayudar ({compatibles.length})
        </h2>
        <p className="text-sm text-slate-500 mb-4">
          Solicitudes activas compatibles con el tipo de sangre de {donante.nombre}.
        </p>
        {compatibles.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-slate-200 text-slate-500">
            <p className="font-medium">No hay solicitudes compatibles en este momento</p>
            <p className="text-sm mt-1">Te avisaremos cuando haya una nueva.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {compatibles.map((s) => (
              <RequestCard key={s.id} solicitud={s} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
