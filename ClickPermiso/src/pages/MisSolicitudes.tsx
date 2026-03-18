interface Props {
  tipo?: 'solicitudes' | 'ausencias';
}

const solicitudesEjemplo = [
  { id: 1, fecha: '15/01/2026', turno: 'Diurno',     estado: 'Aprobado',   jornada: 'Completa' },
  { id: 2, fecha: '10/01/2026', turno: 'Vespertino', estado: 'Pendiente',  jornada: 'Parcial'  },
  { id: 3, fecha: '05/01/2026', turno: 'Diurno',     estado: 'Rechazado',  jornada: 'Completa' },
];

const estadoColor: Record<string, string> = {
  Aprobado:  'bg-green-100 text-green-700',
  Pendiente: 'bg-yellow-100 text-yellow-700',
  Rechazado: 'bg-red-100 text-red-700',
};

const MisSolicitudes = ({ tipo = 'solicitudes' }: Props) => {
  const titulo = tipo === 'ausencias' ? 'Mis Ausencias' : 'Mis Días Solicitados';
  const icono  = tipo === 'ausencias' ? '📅' : '📋';

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">

        <div className="flex items-center gap-2 mb-8 pb-6 border-b-2 border-gray-200">
          <span className="text-2xl">{icono}</span>
          <h2 className="text-xl font-semibold text-gray-900">{titulo}</h2>
        </div>

        {solicitudesEjemplo.length === 0 ? (
          <p className="text-gray-500 text-center py-12">No hay registros disponibles.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200">
                <th className="pb-3 font-medium">Fecha</th>
                <th className="pb-3 font-medium">Turno</th>
                <th className="pb-3 font-medium">Jornada</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesEjemplo.map((s) => (
                <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 text-gray-700">{s.fecha}</td>
                  <td className="py-3 text-gray-700">{s.turno}</td>
                  <td className="py-3 text-gray-700">{s.jornada}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${estadoColor[s.estado]}`}>
                      {s.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default MisSolicitudes;