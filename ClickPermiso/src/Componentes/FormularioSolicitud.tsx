import { useState } from "react";



const FormularioSolicitud = () => {
  const [formData, setFormData] = useState({
    fecha: '21/01/2026',
    telefono: '',
    jornada: '',
    turno: 'Diurno',
    horasDocencia: '',
    diasPermiso: '',
    noRetribuido: false,
    causaSobrevenida: true,
    justificacion: '',
    archivo: null
  });

  const handleSubmit = () => {
    console.log('Guardar solicitud:', formData);
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div>
        <div>
          <div>
            <span>📅</span>
            <h2 className="text-lg font-medium">Solicitar Día: 21 de enero de 2026</h2>
          </div>
          <button className="text-blue-600 text-sm flex items-center gap-1">
            ← Volver
          </button>
        </div>

        <div className="space-y-6">
          {/* Fila 1: Fecha y Teléfono */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Día Solicitado</label>
              <input
                type="text"
                value={formData.fecha}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Número de Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Fila 2: Jornada y Turno */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Jornada</label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({...formData, jornada: e.target.value})}>
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Turno Solicitado</label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}>
                <option value="Diurno">Diurno</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Horas y Días */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Núm de horas de docencia directa y guardias afectadas
              </label>
              <input
                type="number"
                value={formData.horasDocencia}
                onChange={(e) => setFormData({...formData, horasDocencia: e.target.value})}/>
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Núm de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={formData.diasPermiso}
                onChange={(e) => setFormData({...formData, diasPermiso: e.target.value})}/>
            </div>
          </div>

          {/* Checkbox: Permiso no retribuido */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noRetribuido"
              checked={formData.noRetribuido}
              onChange={(e) => setFormData({...formData, noRetribuido: e.target.checked})}
              className="w-4 h-4"
            />
            <label htmlFor="noRetribuido" className="text-sm text-gray-700">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>

          {/* Checkbox: Causa sobrevenida */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="causaSobrevenida"
              checked={formData.causaSobrevenida}
              onChange={(e) => setFormData({...formData, causaSobrevenida: e.target.checked})}
              className="w-4 h-4 accent-blue-600"
            />
            <label htmlFor="causaSobrevenida" className="text-sm text-gray-700">
              ¿Causa sobrevenida?
            </label>
          </div>

          {/* Justificación */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Justificación de la causa sobrevenida
            </label>
            <textarea
              value={formData.justificacion}
              onChange={(e) => setFormData({...formData, justificacion: e.target.value})}/>
          </div>

          {/* Documento PDF */}
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Documento Justificativo en PDF
            </label>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Seleccionar archivo
              </button>
              <span className="text-sm text-gray-400">nada seleccionado</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-4">
            <button className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300">
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Guardar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioSolicitud