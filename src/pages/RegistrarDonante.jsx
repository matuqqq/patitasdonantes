import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Heart, Clock } from 'lucide-react'
import { useAppData } from '../context/AppContext'

const STEPS = ['Mascota', 'Salud', 'Dueño/a', 'Confirmación']

const initialForm = {
  nombre: '', especie: 'perro', raza: '', edad: '', peso: '', sexo: 'macho', tipoSangre: '',
  vacunado: false, desparasitado: false, ultimaVacuna: '', ultimaDesparasitacion: '', enfermedades: '', medicacion: '',
  ownerNombre: '', ownerTelefono: '', ownerEmail: '', ownerZona: '',
}

export default function RegistrarDonante() {
  const navigate = useNavigate()
  const { addDonante } = useAppData()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initialForm)
  const [submitted, setSubmitted] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const tiposSangrePerro = ['DEA 1.1+', 'DEA 1.1-', 'DEA 3', 'DEA 4', 'DEA 5', 'No sé / sin determinar']
  const tiposSangreGato = ['Tipo A', 'Tipo B', 'Tipo AB', 'No sé / sin determinar']
  const tiposSangre = form.especie === 'gato' ? tiposSangreGato : tiposSangrePerro

  const canNext = () => {
    if (step === 0) return form.nombre && form.raza && form.edad && form.peso
    if (step === 1) return true
    if (step === 2) return form.ownerNombre && form.ownerTelefono && form.ownerEmail && form.ownerZona
    return true
  }

  const handleSubmit = () => {
    const tipoSangre =
      form.tipoSangre && !form.tipoSangre.startsWith('No sé') ? form.tipoSangre : 'Sin determinar'
    addDonante({
      nombre: form.nombre,
      especie: form.especie,
      raza: form.raza,
      edad: form.edad ? Number(form.edad) : null,
      peso: form.peso ? Number(form.peso) : null,
      sexo: form.sexo,
      tipoSangre,
      zona: form.ownerZona,
      ciudad: 'Buenos Aires',
      vacunado: form.vacunado,
      desparasitado: form.desparasitado,
      propietario: {
        nombre: form.ownerNombre,
        telefono: form.ownerTelefono,
        email: form.ownerEmail,
      },
      descripcion:
        `Postulación de ${form.nombre}. ` +
        (form.enfermedades ? `Antecedentes: ${form.enfermedades}. ` : 'Sin antecedentes declarados. ') +
        (form.medicacion ? `Medicación: ${form.medicacion}.` : 'Sin medicación actual.'),
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock size={36} className="text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Postulación de {form.nombre} enviada! 🐾</h1>
        <p className="text-slate-500 mb-6">
          Registramos a <strong>{form.nombre}</strong>. La solicitud de alta quedó <strong>en evaluación</strong>: el administrador revisará los datos y la aceptará o rechazará. Te avisaremos por email a <strong>{form.ownerEmail}</strong>.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800 mb-6">
          <p className="font-semibold mb-1">Próximos pasos:</p>
          <ul className="text-left space-y-1 list-disc list-inside">
            <li>El administrador evalúa la postulación (⏳ En evaluación)</li>
            <li>Al ser <strong>aceptada</strong>, {form.nombre} pasa a estar disponible para donar</li>
            <li>Cuando surja una solicitud compatible, te notificaremos automáticamente</li>
          </ul>
        </div>
        <div className="flex gap-3 justify-center">
          <Link to="/donantes" className="btn-outline">Ver donantes</Link>
          <Link to="/" className="btn-primary">Ir al inicio</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={15} /> {step > 0 ? 'Paso anterior' : 'Volver'}
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
        <Heart size={22} className="text-rose-600" /> Registrar donante
      </h1>
      <p className="text-slate-500 text-sm mb-6">El registro es gratuito y tarda menos de 3 minutos.</p>

      {/* Progress */}
      <div className="flex items-center mb-8">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <div className="flex-1">
              <div className={`h-0.5 mx-1 ${i < STEPS.length - 1 ? (i < step ? 'bg-emerald-500' : 'bg-slate-200') : ''}`} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mb-6 text-center">Paso {step + 1} de {STEPS.length}: <span className="font-semibold">{STEPS[step]}</span></p>

      <div className="card p-5">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-3">Datos de tu mascota</h2>
            <div>
              <label className="label">Nombre *</label>
              <input className="input" placeholder="ej. Laika" value={form.nombre} onChange={set('nombre')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Especie *</label>
                <select className="select" value={form.especie} onChange={set('especie')}>
                  <option value="perro">🐕 Perro</option>
                  <option value="gato">🐈 Gato</option>
                </select>
              </div>
              <div>
                <label className="label">Sexo *</label>
                <select className="select" value={form.sexo} onChange={set('sexo')}>
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </select>
              </div>
            </div>
            <div>
              <label className="label">Raza *</label>
              <input className="input" placeholder="ej. Border Collie" value={form.raza} onChange={set('raza')} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Edad (años) *</label>
                <input className="input" type="number" min="1" max="15" placeholder="ej. 3" value={form.edad} onChange={set('edad')} />
              </div>
              <div>
                <label className="label">Peso (kg) *</label>
                <input className="input" type="number" min="1" max="60" placeholder="ej. 20" value={form.peso} onChange={set('peso')} />
              </div>
            </div>
            <div>
              <label className="label">Tipo de sangre (si lo sabés)</label>
              <select className="select" value={form.tipoSangre} onChange={set('tipoSangre')}>
                <option value="">Seleccionar...</option>
                {tiposSangre.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-3">Estado de salud</h2>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-rose-600" checked={form.vacunado} onChange={set('vacunado')} />
                <div>
                  <p className="font-medium text-slate-700 text-sm">Vacunación al día</p>
                  <p className="text-xs text-slate-400">Antirrábica, polivalente/cuádruple/séxtuple</p>
                </div>
              </label>
              {form.vacunado && (
                <div className="ml-7">
                  <label className="label">Fecha de última vacuna</label>
                  <input type="date" className="input" value={form.ultimaVacuna} onChange={set('ultimaVacuna')} />
                </div>
              )}
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 accent-rose-600" checked={form.desparasitado} onChange={set('desparasitado')} />
                <div>
                  <p className="font-medium text-slate-700 text-sm">Desparasitación al día</p>
                  <p className="text-xs text-slate-400">Interna y/o externa</p>
                </div>
              </label>
              {form.desparasitado && (
                <div className="ml-7">
                  <label className="label">Fecha de última desparasitación</label>
                  <input type="date" className="input" value={form.ultimaDesparasitacion} onChange={set('ultimaDesparasitacion')} />
                </div>
              )}
            </div>
            <div>
              <label className="label">Enfermedades previas</label>
              <textarea
                className="input resize-none"
                rows={3}
                placeholder="Describí si tuvo alguna enfermedad importante... (dejá vacío si no)"
                value={form.enfermedades}
                onChange={set('enfermedades')}
              />
            </div>
            <div>
              <label className="label">Medicación actual</label>
              <input className="input" placeholder="ej. Ninguna, o detallá cuál..." value={form.medicacion} onChange={set('medicacion')} />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700">
              <strong>Importante:</strong> Antes de la primera donación, un veterinario de la red realizará un chequeo gratuito para confirmar que tu mascota está en condiciones de donar.
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-3">Tus datos</h2>
            <div>
              <label className="label">Nombre completo *</label>
              <input className="input" placeholder="Tu nombre y apellido" value={form.ownerNombre} onChange={set('ownerNombre')} />
            </div>
            <div>
              <label className="label">Teléfono *</label>
              <input className="input" type="tel" placeholder="+54 11 ..." value={form.ownerTelefono} onChange={set('ownerTelefono')} />
            </div>
            <div>
              <label className="label">Email *</label>
              <input className="input" type="email" placeholder="tu@email.com" value={form.ownerEmail} onChange={set('ownerEmail')} />
            </div>
            <div>
              <label className="label">Zona / Barrio *</label>
              <input className="input" placeholder="ej. Palermo, San Isidro..." value={form.ownerZona} onChange={set('ownerZona')} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-bold text-slate-800 mb-4">Confirmá los datos</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Mascota</span>
                <span className="font-semibold text-slate-800">{form.nombre} ({form.raza}, {form.edad} años)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Especie y sexo</span>
                <span className="font-semibold text-slate-800 capitalize">{form.especie} · {form.sexo}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Peso</span>
                <span className="font-semibold text-slate-800">{form.peso} kg</span>
              </div>
              {form.tipoSangre && (
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">Tipo de sangre</span>
                  <span className="font-semibold text-slate-800">{form.tipoSangre}</span>
                </div>
              )}
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Vacunado/a</span>
                <span className={`font-semibold ${form.vacunado ? 'text-emerald-700' : 'text-rose-600'}`}>{form.vacunado ? 'Sí' : 'No'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Dueño/a</span>
                <span className="font-semibold text-slate-800">{form.ownerNombre}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Contacto</span>
                <span className="font-semibold text-slate-800">{form.ownerTelefono}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Zona</span>
                <span className="font-semibold text-slate-800">{form.ownerZona}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-5">
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} className="btn-outline flex-1">
            <ArrowLeft size={15} /> Anterior
          </button>
        )}
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canNext()}
            className={`btn-primary flex-1 ${!canNext() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Siguiente <ArrowRight size={15} />
          </button>
        ) : (
          <button onClick={handleSubmit} className="btn-primary flex-1">
            <Check size={15} /> Confirmar registro
          </button>
        )}
      </div>
    </div>
  )
}
