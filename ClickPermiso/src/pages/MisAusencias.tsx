const MisAusencias = () => {
  // Datos de ejemplo de ausencias
  const ausencias = [
    {
      id: 1,
      periodoAusencia: '14/01/2026 al 15/01/2026',
      estado: 'Pendiente de Justificación',
      ultimaModificacion: '15/01/2026 23:30',
      anexoV: false,
      adjuntos: false
    },
    {
      id: 2,
      periodoAusencia: '10/12/2025 al 10/12/2025',
      estado: 'Justificada',
      ultimaModificacion: '11/12/2025 10:15',
      anexoV: true,
      adjuntos: true
    },
    {
      id: 3,
      periodoAusencia: '05/11/2025 al 06/11/2025',
      estado: 'Justificada',
      ultimaModificacion: '07/11/2025 14:20',
      anexoV: true,
      adjuntos: false
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'Pendiente de Justificación':
        return 'bg-yellow-100 text-yellow-800';
      case 'Justificada':
        return 'bg-green-100 text-green-800';
      case 'No Justificada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Historial de Ausencias Justificadas
            </h2>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Periodo ausencia
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Estado
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Última Modificación
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Anexo V
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Adjuntos
                </th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {ausencias.map((ausencia) => (
                <tr 
                  key={ausencia.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {ausencia.periodoAusencia}
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(ausencia.estado)}`}>
                      {ausencia.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {ausencia.ultimaModificacion}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {ausencia.anexoV ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : (
                      <span className="text-red-600 text-xl">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {ausencia.adjuntos ? (
                      <span className="text-green-600 text-xl">✓</span>
                    ) : (
                      <span className="text-red-600 text-xl">✗</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 rounded border border-blue-600 hover:bg-blue-50 transition-colors">
                      📄 Justificar día
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mensaje si no hay ausencias */}
        {ausencias.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">✅</span>
            <p className="text-gray-500 text-lg">No tienes ausencias registradas</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisAusencias;