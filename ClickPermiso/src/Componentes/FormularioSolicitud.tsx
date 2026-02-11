import { useState } from "react";

const FormularioSolicitud = () => {
  // ESTADO: Guardamos todos los datos del formulario
  const [datos, setDatos] = useState({
    fecha: '21/01/2026',
    telefono: '',
    jornada: '',
    turno: 'Diurno',
    horas: '',
    dias: '',
    noRetribuido: false,
    causaSobrevenida: true,
    justificacion: '',
    archivo: null
  });

  // FUNCIÓN 1: Cambiar cualquier campo
  const cambiarCampo = (campo, valor) => {
    setDatos({ ...datos, [campo]: valor });
  };

  // FUNCIÓN 2: Guardar formulario
  const guardar = () => {
    // Validación simple
    if (!datos.jornada || !datos.horas || !datos.dias) {
      alert('⚠️ Completa los campos obligatorios');
      return;
    }
    
    console.log('✅ Datos guardados:', datos);
    alert('✅ Solicitud enviada correctamente');
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-5xl">
        
        {/* ENCABEZADO */}
        <div className="flex justify-between items-center mb-6 pb-6 border-b">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            📅 Solicitar Día: 21 de enero de 2026
          </h1>
          <button className="text-blue-600 text-sm">← Volver</button>
        </div>

        <div className="space-y-6">
          
          {/* FILA 1 */}
          <div className="grid grid-cols-2 gap-6">
            {/* Día Solicitado */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Día Solicitado
              </label>
              <input
                type="text"
                value={datos.fecha}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                readOnly
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Teléfono
              </label>
              <input
                type="tel"
                value={datos.telefono}
                onChange={(e) => cambiarCampo('telefono', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="612345678"
              />
            </div>
          </div>

          {/* FILA 2 */}
          <div className="grid grid-cols-2 gap-6">
            {/* Jornada */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jornada
              </label>
              <select
                value={datos.jornada}
                onChange={(e) => cambiarCampo('jornada', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
            </div>

            {/* Turno */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turno Solicitado
              </label>
              <select
                value={datos.turno}
                onChange={(e) => cambiarCampo('turno', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-white"
              >
                <option value="Diurno">Diurno</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
          </div>

          {/* FILA 3 */}
          <div className="grid grid-cols-2 gap-6">
            {/* Horas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Núm. de horas de docencia directa y guardias afectadas
              </label>
              <input
                type="number"
                value={datos.horas}
                onChange={(e) => cambiarCampo('horas', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="0"
              />
            </div>

            {/* Días */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Núm. de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={datos.dias}
                onChange={(e) => cambiarCampo('dias', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="0"
              />
            </div>
          </div>

          {/* CHECKBOX 1 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={datos.noRetribuido}
              onChange={(e) => cambiarCampo('noRetribuido', e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>

          {/* CHECKBOX 2 */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={datos.causaSobrevenida}
              onChange={(e) => cambiarCampo('causaSobrevenida', e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-700">
              ¿Causa sobrevenida?
            </label>
          </div>

          {/* JUSTIFICACIÓN */}
          {datos.causaSobrevenida && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justificación de la causa sobrevenida
              </label>
              <textarea
                value={datos.justificacion}
                onChange={(e) => cambiarCampo('justificacion', e.target.value)}
                className="w-full px-4 py-2 border rounded-lg min-h-[120px]"
                placeholder="Escribe aquí..."
              />
            </div>
          )}

          {/* ARCHIVO PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento Justificativo en PDF
            </label>
            <div className="flex items-center gap-3">
              <label className="px-5 py-2 bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
                Seleccionar archivo
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => cambiarCampo('archivo', e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {datos.archivo ? datos.archivo.name : 'nada seleccionado'}
              </span>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={guardar}
              className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
            >
              Guardar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSolicitud;