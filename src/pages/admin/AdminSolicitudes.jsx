import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipboardList, CheckCircle, Trash2, Droplets } from 'lucide-react'
import { useAppData } from '../../context/AppContext'

const URGENCIA = {
  urgente: 'badge-urgente',
  moderado: 'badge-moderado',
  programado: 'badge-programado',
}
const URGENCIA_LABEL = {
  urgente: '🔴 Urgente',
  moderado: '🟠 Moderado',
  programado: '🔵 Programado',
}
const ESPECIE = { perro: '🐕', gato: '🐈' }

export default function AdminSolicitudes() {
  const { solicitudes, veterinarias, finalizarSolicitud, deleteSolicitud } = useAppData()
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  const activas = solicitudes.filter((s) => s.estado === 'activa')
  const finalizadas = solicitudes.filter((s) => s.estado === 'finalizada')
  const ordenadas = [...activas, ...finalizadas]

  const vetNombre = (id) => veterinarias.find((v) => v.id === Number(id))?.nombre || '—'

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">Solicitudes de sangre</h2>
        <p className="text-slate-500 text-sm mt-0.5">
          {solicitudes.length} en total · {activas.length} activas · {finalizadas.length} finalizadas
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[760px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Receptor</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Sangre</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Urgencia</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Veterinaria</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-600">Estado</th>
              <th className="px-4 py-3 text-right font-semibold text-slate-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenadas.map((s) => (
              <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <Link to={`/solicitudes/${s.id}`} target="_blank" className="flex items-center gap-2 group">
                    <span className="text-xl">{ESPECIE[s.especie] || '🐾'}</span>
                    <div>
                      <p className="font-semibold text-slate-800 group-hover:text-rose-600">{s.mascota}</p>
                      <p className="text-xs text-slate-400">{s.raza}</p>
                    </div>
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded border border-red-200">
                    <Droplets size={11} /> {s.tipoSangre}
                  </span>
                </td>
                <td className="px-4 py-3"><span className={URGENCIA[s.urgencia]}>{URGENCIA_LABEL[s.urgencia]}</span></td>
                <td className="px-4 py-3 text-slate-600">{vetNombre(s.veterinariaId)}</td>
                <td className="px-4 py-3">
                  {s.estado === 'finalizada' ? (
                    <span className="badge-finalizada">✅ Finalizada</span>
                  ) : (
                    <span className="badge-moderado">🟠 Activa</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 justify-end">
                    {s.estado === 'activa' && (
                      <button
                        onClick={() => finalizarSolicitud(s.id)}
                        className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                        title="Marcar transfusión realizada"
                      >
                        <CheckCircle size={13} /> Check-in
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirm(s.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {solicitudes.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <ClipboardList size={32} className="mx-auto mb-2 text-slate-300" />
            <p>No hay solicitudes registradas.</p>
          </div>
        )}
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <h3 className="font-bold text-slate-800 mb-2">¿Eliminar solicitud?</h3>
            <p className="text-sm text-slate-500 mb-5">
              Esta acción no se puede deshacer. La solicitud dejará de aparecer en el sitio.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="btn-outline flex-1 justify-center">
                Cancelar
              </button>
              <button
                onClick={() => { deleteSolicitud(deleteConfirm); setDeleteConfirm(null) }}
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
