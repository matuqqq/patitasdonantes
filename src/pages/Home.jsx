import { Link } from 'react-router-dom'
import { Droplets, Heart, MapPin, ArrowRight, CheckCircle, Bell, Users } from 'lucide-react'
import { useAppData } from '../context/AppContext'
import RequestCard from '../components/RequestCard'

const pasos = [
  {
    icon: <Heart className="text-rose-600" size={28} />,
    titulo: 'Registrá y validá tu mascota',
    desc: 'Completá el perfil de tu perro o gato con sus datos de salud. El administrador evalúa la postulación y la acepta como donante.',
  },
  {
    icon: <Bell className="text-orange-500" size={28} />,
    titulo: 'Recibí alertas automáticas',
    desc: 'El sistema cruza tipos de sangre y te notifica cuando hay una solicitud compatible con tu mascota.',
  },
  {
    icon: <CheckCircle className="text-emerald-500" size={28} />,
    titulo: 'Coordiná y hacé el check-in',
    desc: 'Contactás a la veterinaria, coordinás la transfusión y al realizarla se hace el check-in que cierra el caso.',
  },
]

export default function Home() {
  const { solicitudes, donantes, veterinarias } = useAppData()
  const urgentes = solicitudes
    .filter((s) => s.urgencia === 'urgente' && s.estado === 'activa')
    .slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-600 via-rose-700 to-rose-800 text-white">
        <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center text-center gap-6">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-4 py-1.5 text-sm font-medium">
            <Droplets size={15} /> Banco de sangre comunitario para mascotas
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl">
            Tu mascota puede salvar una vida 🐾
          </h1>
          <p className="text-rose-100 text-lg max-w-xl">
            Conectamos a perros y gatos donantes de sangre con mascotas que la necesitan,
            a través de una red de veterinarias especializadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link to="/solicitudes" className="bg-white text-rose-700 font-bold px-6 py-3 rounded-xl hover:bg-rose-50 transition-colors flex items-center gap-2">
              <Droplets size={18} /> Ver solicitudes activas
            </Link>
            <Link to="/donantes/registrar" className="border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2">
              <Heart size={18} /> Registrar mi mascota
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-extrabold text-rose-600">{donantes.filter(d => d.estado === 'disponible').length}</div>
            <div className="text-sm text-slate-500 mt-0.5">donantes disponibles</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-orange-500">{solicitudes.filter(s => s.estado === 'activa').length}</div>
            <div className="text-sm text-slate-500 mt-0.5">solicitudes activas</div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-teal-600">{veterinarias.length}</div>
            <div className="text-sm text-slate-500 mt-0.5">veterinarias adheridas</div>
          </div>
        </div>
      </section>

      {/* Urgentes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">🚨 Solicitudes urgentes</h2>
            <p className="text-slate-500 text-sm mt-1">Estas mascotas necesitan sangre con urgencia</p>
          </div>
          <Link to="/solicitudes" className="flex items-center gap-1 text-rose-600 font-semibold text-sm hover:underline">
            Ver todas <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urgentes.map((s) => (
            <RequestCard key={s.id} solicitud={s} />
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">¿Cómo funciona?</h2>
          <p className="text-slate-500 text-center text-sm mb-10">Donar sangre es seguro, rápido y puede salvar una vida</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pasos.map((p, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-200">
                  {p.icon}
                </div>
                <div className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center mx-auto -mt-8 mb-4 relative z-10">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-800 mb-2">{p.titulo}</h3>
                <p className="text-slate-500 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">¿Tu mascota puede donar?</h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Perros de más de 25 kg y gatos de más de 4 kg en buen estado de salud pueden ser donantes.
            El proceso es seguro y lleva menos de una hora.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/donantes/registrar" className="btn-primary">
              <Heart size={16} /> Registrar mi mascota donante
            </Link>
            <Link to="/donantes" className="btn-outline">
              <Users size={16} /> Ver donantes activos
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
