import { useNavigate } from 'react-router-dom';

interface Ausencia {
  id: number;
  periodo: string;
  estado: string;
  ultimaModificacion: string;
  anexoV: boolean;
  adjuntos: boolean;
}

const ausenciasEjemplo: Ausencia[] = [
  {
    id: 1,
    periodo: '14/01/2026 al 15/01/2026',
    estado: 'Pendiente de Justificación',
    ultimaModificacion: '15/01/2026 23:30',
    anexoV: false,
    adjuntos: false,
  },
];

const MisAusencias = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-6xl">

        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🗓️ Historial de Ausencias Justificadas
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            ↩ Volver
          </button>
        </div>

        {ausenciasEjemplo.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No hay ausencias registradas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Período ausencia</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Estado</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Última Modificación</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Anexo V</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Adjuntos</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ausenciasEjemplo.map((ausencia) => (
                  <tr key={ausencia.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700">{ausencia.periodo}</td>
                    <td className="px-4 py-3 text-gray-700">{ausencia.estado}</td>
                    <td className="px-4 py-3 text-gray-700">{ausencia.ultimaModificacion}</td>
                    <td className="px-4 py-3">
                      <span className={ausencia.anexoV ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                        {ausencia.anexoV ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={ausencia.adjuntos ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                        {ausencia.adjuntos ? '✓' : '✗'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="flex items-center gap-1 px-3 py-1.5 border border-blue-300 text-blue-600 rounded-md text-xs hover:bg-blue-50 transition-colors"
                      >
                        🗓️ Justificar día
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisAusencias;