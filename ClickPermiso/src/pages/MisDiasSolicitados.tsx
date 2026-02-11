const MisDiasSolicitados = () => {
  const solicitudes = [
    {
      id: 1,
      periodo: '14/01/2026 al 15/01/2026',
      estado: 'Pendiente de Justificación',
      ultimaModificacion: '15/01/2026 23:30',
      anexoV: false,
      adjuntos: false
    }
  ];

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-6xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold">Historial de Ausencias Justificadas</h2>
          <button className="text-blue-600 hover:underline">Volver</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Período ausencia
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Estado
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Última Modificación
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Anexo V
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Adjuntos
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {solicitudes.map((solicitud) => (
                <tr key={solicitud.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{solicitud.periodo}</td>
                  <td className="px-4 py-3 text-sm">{solicitud.estado}</td>
                  <td className="px-4 py-3 text-sm">{solicitud.ultimaModificacion}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-red-600">{solicitud.anexoV ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span className="text-red-600">{solicitud.adjuntos ? '✓' : '✗'}</span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-blue-600 hover:underline">Justificar día</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {solicitudes.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No hay solicitudes registradas
          </div>
        )}
      </div>
    </div>
  );
};

export default MisDiasSolicitados;