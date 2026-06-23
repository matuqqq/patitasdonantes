import { useState } from 'react'
import { Plus, Trash2, ToggleLeft, ToggleRight, Stethoscope, X, Check } from 'lucide-react'
import { useAppData } from '../../context/AppContext'

const SERVICIOS_OPCIONES = [
  'Banco de sangre',
  'Transfusiones',
  'Urgencias 24 hs',
  'Especialista en felinos',
  'Internación',
  'Cirugías complejas',
  'Análisis clínicos',
]

const emptyForm = {
  nombre: '',
  direccion: '',
  zona: '',
  ciudad: 'Buenos Aires',
  telefono: '',
  email: '',
  horarios: '',
  descripcion: '',
  servicios: [],
}

function Badge({ activa }) {
  return activa ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-700 border border-teal-200">
      <Check size={10} /> Activa
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
      Inactiva
    </span>
  )
}

export default function AdminVeterinarias() {
  const { veterinarias, addVeterinaria, updateVeterinaria, deleteVeterinaria } = useAppData()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [saved, setSaved] = useState(false)

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const toggleServicio = (s) => {
    setForm((f) => ({
      ...f,
      servicios: f.servicios.includes(s) ? f.servicios.filter((x) => x !== s) : [...f.servicios, s],
    }))
  }

  const canSubmit = form.nombre && form.direccion && form.zona && form.telefono

  const handleSubmit = (e) => {
    e.preventDefault()
    addVeterinaria(form)
    setForm(emptyForm)
    setShowForm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleDelete = (id) => {
    deleteVeterinaria(id)
    setDeleteConfirm(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Veterinarias</h2>
          <p className="text-slate-500 text-sm mt-0.5">
            {veterinarias.length} clínicas en la red · {veterinarias.filter((v) => v.activa).length} activas
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <Plus size={16} /> Agregar veterinaria
        </button>
      </div>

      {saved && (
        <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-lg px-4 py-2.5 flex items-center gap-2">
          <Check size={15} /> Veterinaria agregada correctamente y ya visible en el sitio público.
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Nombre</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Zona</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Teléfono</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Servicios</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {veterinarias.map((v) => (
              <tr key={v.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Stethoscope size={13} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{v.nombre}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[180px]">{v.direccion}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{v.zona}</td>
                <td className="px-4 py-3 text-slate-600">{v.telefono}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {v.servicios.slice(0, 2).map((s) => (
                      <span key={s} className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-xs rounded">
                        {s}
                      </span>
                    ))}
                    {v.servicios.length > 2 && (
                      <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-xs rounded">
                        +{v.servicios.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge activa={v.activa} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => updateVeterinaria(v.id, { activa: !v.activa })}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                      title={v.activa ? 'Desactivar' : 'Activar'}
                    >
                      {v.activa ? <ToggleRight size={18} className="text-teal-500" /> : <ToggleLeft size={18} />}
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(v.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {veterinarias.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Stethoscope size={32} className="mx-auto mb-2 text-slate-300" />
            <p>No hay veterinarias. Agregá la primera.</p>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <h3 className="font-bold text-slate-800 mb-2">¿Eliminar veterinaria?</h3>
            <p className="text-sm text-slate-500 mb-5">
              Esta acción no se puede deshacer. La veterinaria dejará de aparecer en el sitio.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1 justify-center">
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 justify-center inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add form slide-in panel */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between flex-shrink-0">
              <h3 className="font-bold text-slate-800">Agregar veterinaria</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
              <div>
                <label className="label">Nombre *</label>
                <input className="input" placeholder="ej. Clínica Veterinaria Centro" value={form.nombre} onChange={set('nombre')} required />
              </div>

              <div>
                <label className="label">Dirección *</label>
                <input className="input" placeholder="ej. Av. Corrientes 1540, CABA" value={form.direccion} onChange={set('direccion')} required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Zona / Barrio *</label>
                  <input className="input" placeholder="ej. Palermo" value={form.zona} onChange={set('zona')} required />
                </div>
                <div>
                  <label className="label">Ciudad</label>
                  <input className="input" placeholder="Buenos Aires" value={form.ciudad} onChange={set('ciudad')} />
                </div>
              </div>

              <div>
                <label className="label">Teléfono *</label>
                <input className="input" type="tel" placeholder="+54 11 ..." value={form.telefono} onChange={set('telefono')} required />
              </div>

              <div>
                <label className="label">Email</label>
                <input className="input" type="email" placeholder="info@clinica.com.ar" value={form.email} onChange={set('email')} />
              </div>

              <div>
                <label className="label">Horarios</label>
                <input
                  className="input"
                  placeholder="ej. Lun–Vie 9:00–19:00 · Urgencias 24 hs"
                  value={form.horarios}
                  onChange={set('horarios')}
                />
              </div>

              <div>
                <label className="label">Servicios</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {SERVICIOS_OPCIONES.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleServicio(s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        form.servicios.includes(s)
                          ? 'bg-teal-600 text-white border-teal-600'
                          : 'bg-white text-slate-600 border-slate-300 hover:border-teal-400'
                      }`}
                    >
                      {form.servicios.includes(s) && <Check size={10} className="inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label">Descripción</label>
                <textarea
                  className="input resize-none"
                  rows={3}
                  placeholder="Breve descripción de la clínica y sus especialidades..."
                  value={form.descripcion}
                  onChange={set('descripcion')}
                />
              </div>
            </form>

            <div className="px-5 py-4 border-t border-slate-200 flex gap-3 flex-shrink-0">
              <button type="button" onClick={() => setShowForm(false)} className="btn-outline flex-1 justify-center">
                Cancelar
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`btn-primary flex-1 justify-center ${!canSubmit ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Plus size={15} /> Guardar veterinaria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
