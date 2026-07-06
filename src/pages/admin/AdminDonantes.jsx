import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Check, X, Droplets, Clock, Trash2 } from 'lucide-react'
import { useAppData } from '../../context/AppContext'

const ESTADO_BADGE = {
  disponible: { cls: 'badge-disponible', label: '✅ Aceptada' },
  en_evaluacion: { cls: 'badge-evaluacion', label: '⏳ En evaluación' },
  en_descanso: { cls: 'badge-descanso', label: '💤 En descanso' },
  rechazada: { cls: 'badge-rechazada', label: '❌ Rechazada' },
}

export default function AdminDonantes() {
  const { donantes, aceptarDonante, rechazarDonante, deleteDonante } = useAppData()
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const pendientes = donantes.filter((d) => d.estado === 'en_evaluacion')
  const resto = donantes.filter((d) => d.estado !== 'en_evaluacion')
  const ordenados = [...pendientes, ...resto]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Donantes</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          {donantes.length} postulaciones · {donantes.filter((d) => d.estado === 'disponible').length} aceptadas ·{' '}
          {pendientes.length} en evaluación
        </p>
      </div>

      {pendientes.length > 0 && (
        <div className="mb-6 bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm rounded-lg px-4 py-2.5 flex items-center gap-2">
          <Clock size={15} />
          Hay <strong>{pendientes.length}</strong> postulación{pendientes.length !== 1 ? 'es' : ''} esperando tu evaluación.
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[720px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Mascota</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Especie</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Sangre</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Dueño/a</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Estado</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenados.map((d) => {
              const badge = ESTADO_BADGE[d.estado] || ESTADO_BADGE.en_evaluacion
              return (
                <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link to={`/donantes/${d.id}`} target="_blank" className="flex items-center gap-2 group">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${d.gradiente || 'from-slate-300 to-slate-400'} flex items-center justify-center text-lg flex-shrink-0`}>
                        {d.emoji || '🐾'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-rose-600">{d.nombre}</p>
                        <p className="text-xs text-slate-400">{d.raza} · {d.zona}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600 capitalize">{d.especie}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded border border-red-200">
                      <Droplets size={11} /> {d.tipoSangre}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    <p className="text-slate-700">{d.propietario?.nombre}</p>
                    <p className="text-xs text-slate-400">{d.propietario?.telefono}</p>
                  </td>
                  <td className="px-4 py-3"><span className={badge.cls}>{badge.label}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 justify-end">
                      {d.estado === 'en_evaluacion' ? (
                        <>
                          <button
                            onClick={() => aceptarDonante(d.id)}
                            className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <Check size={13} /> Aceptar
                          </button>
                          <button
                            onClick={() => rechazarDonante(d.id)}
                            className="inline-flex items-center gap-1 border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                          >
                            <X size={13} /> Rechazar
                          </button>
                        </>
                      ) : d.estado === 'rechazada' ? (
                        <button
                          onClick={() => aceptarDonante(d.id)}
                          className="inline-flex items-center gap-1 border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          <Check size={13} /> Reactivar
                        </button>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      <button
                        onClick={() => setDeleteConfirm(d.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {donantes.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <Heart size={32} className="mx-auto mb-2 text-slate-300" />
            <p>Todavía no hay postulaciones de donantes.</p>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <h3 className="font-bold text-slate-800 mb-2">¿Eliminar donante?</h3>
            <p className="text-sm text-slate-500 mb-5">
              Esta acción no se puede deshacer. El donante se quitará de la base de datos.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1 justify-center">
                Cancelar
              </button>
              <button
                onClick={() => { deleteDonante(deleteConfirm); setDeleteConfirm(null) }}
                className="flex-1 justify-center inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Trash2 size={14} /> Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
