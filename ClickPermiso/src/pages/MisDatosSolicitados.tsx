const MisDiasSolicitados = () => {
  // Datos de ejemplo de solicitudes
  const solicitudes = [
    {
      id: 1,
      fecha: '23/04/2026',
      turno: 'Diurno',
      estado: 'Pendiente',
      motivo: 'Asuntos personales'
    },
    {
      id: 2,
      fecha: '15/05/2026',
      turno: 'Vespertino',
      estado: 'Aprobado',
      motivo: 'Cita médica'
    },
    {
      id: 3,
      fecha: '10/03/2026',
      turno: 'Diurno',
      estado: 'Rechazado',
      motivo: 'Trámites bancarios'
    }
  ];

  const getEstadoColor = (estado: string) => {
    switch(estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aprobado':
        return 'bg-green-100 text-green-800';
      case 'Rechazado':
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
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Mis Días Solicitados
            </h2>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Fecha
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Turno
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Estado
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Motivo
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((solicitud) => (
                <tr 
                  key={solicitud.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {solicitud.fecha}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    <span className="flex items-center gap-2">
                      {solicitud.turno === 'Diurno' ? '☀️' : '🌙'}
                      {solicitud.turno}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(solicitud.estado)}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700">
                    {solicitud.motivo}
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mensaje si no hay solicitudes */}
        {solicitudes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📭</span>
            <p className="text-gray-500 text-lg">No tienes solicitudes aún</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MisDiasSolicitados;