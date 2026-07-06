import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Droplets, AlertTriangle } from 'lucide-react'
import { getCompatibleDonors } from '../data'
import { useAppData } from '../context/AppContext'
import DonorCard from '../components/DonorCard'

const STEPS = ['Mascota', 'Urgencia', 'Veterinaria', 'Confirmación']

const initial = {
  mascota: '', especie: 'perro', raza: '', edad: '', tipoSangre: '',
  urgencia: 'moderado', fechaNecesidad: '', cantidadML: '', descripcion: '',
  veterinariaId: '', contacto: '', telefono: '', propietario: '',
}

export default function NuevaSolicitud() {
  const navigate = useNavigate()
  const { veterinarias, donantes, addSolicitud } = useAppData()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initial)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    addSolicitud({
      ...form,
      veterinariaId: Number(form.veterinariaId),
      edad: form.edad ? Number(form.edad) : null,
      cantidadML: form.cantidadML ? Number(form.cantidadML) : null,
      propietario: form.propietario || form.contacto,
    })
    setSubmitted(true)
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const tiposSangrePerro = ['DEA 1.1+', 'DEA 1.1-', 'DEA 3', 'DEA 4', 'No sé']
  const tiposSangreGato = ['Tipo A', 'Tipo B', 'Tipo AB', 'No sé']
  const tiposSangre = form.especie === 'gato' ? tiposSangreGato : tiposSangrePerro

  const canNext = () => {
    if (step === 0) return form.mascota && form.raza && form.tipoSangre
    if (step === 1) return form.urgencia && form.fechaNecesidad && form.descripcion
    if (step === 2) return form.veterinariaId && form.contacto && form.telefono
    return true
  }

  const mockSol = { especie: form.especie, tipoSangre: form.tipoSangre }
  const compatibles = form.tipoSangre && form.tipoSangre !== 'No sé'
    ? getCompatibleDonors(mockSol, donantes)
    : []

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={36} className="text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Solicitud publicada!</h1>
          <p className="text-slate-500">
            La solicitud de sangre para <strong>{form.mascota}</strong> fue enviada a la red. Los donantes compatibles serán notificados.
          </p>
        </div>

        {compatibles.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3">
              🎉 ¡Encontramos {compatibles.length} donante{compatibles.length !== 1 ? 's' : ''} compatibles!
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {compatibles.map((d) => (
                <DonorCard key={d.id} donante={d} />
              ))}
            </div>
          </div>
        )}

        {compatibles.length === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-700">
            <AlertTriangle size={16} className="inline mr-1" />
            No hay donantes disponibles ahora mismo con ese tipo de sangre. La veterinaria se pondrá en contacto a la brevedad.
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <Link to="/solicitudes" className="btn-outline">Ver solicitudes</Link>
          <Link to="/" className="btn-primary">Ir al inicio</Link>
        </div>
      </div>
    )
  }

  const vetSelec = veterinarias.find((v) => v.id === Number(form.veterinariaId))

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <button onClick={() => step > 0 ? setStep(step - 1) : navigate(-1)} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 mb-6 transition-colors">
        <ArrowLeft size={15} /> {step > 0 ? 'Paso anterior' : 'Volver'}
      </button>

      <h1 className="text-2xl font-bold text-slate-800 mb-1 flex items-center gap-2">
        <Droplets size={22} className="text-rose-600" /> Nueva solicitud de sangre
      </h1>
      <p className="text-slate-500 text-sm mb-6">Completá los datos y notificaremos a donantes compatibles.</p>

      {/* Progress */}
      <div className="flex items-center mb-6">
        {STEPS.map((label, i) => (
          <div key={i} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${
              i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-500'
            }`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mb-5 text-center">Paso {step + 1} de {STEPS.length}: <strong>{STEPS[step]}</strong></p>

      <div className="card p-5">
        {step === 0 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-2">Datos de la mascota</h2>
            <div>
              <label className="label">Nombre de la mascota *</label>
              <input className="input" placeholder="ej. Max" value={form.mascota} onChange={set('mascota')} />
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
                <label className="label">Edad (años)</label>
                <input className="input" type="number" min="0" max="20" placeholder="ej. 4" value={form.edad} onChange={set('edad')} />
              </div>
            </div>
            <div>
              <label className="label">Raza *</label>
              <input className="input" placeholder="ej. Pastor Alemán" value={form.raza} onChange={set('raza')} />
            </div>
            <div>
              <label className="label">Tipo de sangre necesario *</label>
              <select className="select" value={form.tipoSangre} onChange={set('tipoSangre')}>
                <option value="">Seleccionar...</option>
                {tiposSangre.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {form.tipoSangre && form.tipoSangre !== 'No sé' && (
              <div className="bg-rose-50 border border-rose-100 rounded-lg p-3 text-xs text-rose-700">
                Con tipo <strong>{form.tipoSangre}</strong> encontramos{' '}
                <strong>{compatibles.filter(d => d.estado === 'disponible').length} donantes disponibles</strong> en la red.
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-2">Urgencia y contexto</h2>
            <div>
              <label className="label">Nivel de urgencia *</label>
              <div className="space-y-2 mt-1">
                {[
                  { val: 'urgente', label: '🔴 Urgente', desc: 'Necesita sangre dentro de las próximas 24–48 horas' },
                  { val: 'moderado', label: '🟠 Moderado', desc: 'Necesita sangre dentro de esta semana' },
                  { val: 'programado', label: '🔵 Programado', desc: 'Cirugía o tratamiento previamente agendado' },
                ].map((opt) => (
                  <label key={opt.val} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    form.urgencia === opt.val ? 'border-rose-400 bg-rose-50' : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <input
                      type="radio"
                      name="urgencia"
                      value={opt.val}
                      checked={form.urgencia === opt.val}
                      onChange={set('urgencia')}
                      className="mt-0.5 accent-rose-600"
                    />
                    <div>
                      <p className="font-semibold text-sm text-slate-800">{opt.label}</p>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Fecha límite *</label>
              <input type="date" className="input" value={form.fechaNecesidad} onChange={set('fechaNecesidad')} />
            </div>
            <div>
              <label className="label">Cantidad estimada (mL)</label>
              <input className="input" type="number" placeholder="ej. 300" value={form.cantidadML} onChange={set('cantidadML')} />
            </div>
            <div>
              <label className="label">Descripción del caso *</label>
              <textarea
                className="input resize-none"
                rows={4}
                placeholder="Describí brevemente la situación de la mascota y por qué necesita sangre..."
                value={form.descripcion}
                onChange={set('descripcion')}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-bold text-slate-800 mb-2">Veterinaria y contacto</h2>
            <div>
              <label className="label">Veterinaria responsable *</label>
              <select className="select" value={form.veterinariaId} onChange={set('veterinariaId')}>
                <option value="">Seleccioná una veterinaria...</option>
                {veterinarias.map((v) => (
                  <option key={v.id} value={v.id}>{v.nombre} — {v.zona}</option>
                ))}
              </select>
            </div>
            {vetSelec && (
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-xs text-teal-700">
                📍 {vetSelec.direccion} · {vetSelec.horarios}
              </div>
            )}
            <div>
              <label className="label">Nombre del médico responsable *</label>
              <input className="input" placeholder="Dr./Dra. ..." value={form.contacto} onChange={set('contacto')} />
            </div>
            <div>
              <label className="label">Teléfono de contacto *</label>
              <input className="input" type="tel" placeholder="+54 11 ..." value={form.telefono} onChange={set('telefono')} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="font-bold text-slate-800 mb-4">Confirmá la solicitud</h2>
            <div className="space-y-3 text-sm">
              {[
                ['Mascota', `${form.mascota} (${form.raza})`],
                ['Especie', form.especie],
                ['Tipo de sangre', form.tipoSangre],
                ['Urgencia', form.urgencia],
                ['Fecha límite', form.fechaNecesidad ? new Date(form.fechaNecesidad).toLocaleDateString('es-AR') : '—'],
                ['Veterinaria', vetSelec?.nombre || '—'],
                ['Contacto médico', form.contacto],
                ['Teléfono', form.telefono],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500">{k}</span>
                  <span className="font-semibold text-slate-800 text-right capitalize">{v}</span>
                </div>
              ))}
            </div>
            {compatibles.length > 0 && (
              <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-xs text-emerald-700">
                ✅ Al publicar, notificaremos a <strong>{compatibles.length} donantes compatibles</strong> disponibles en la red.
              </div>
            )}
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
            <Droplets size={15} /> Publicar solicitud
          </button>
        )}
      </div>
    </div>
  )
}
