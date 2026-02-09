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
    archivo: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar solicitud:', formData);
    alert('Solicitud guardada correctamente');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({...formData, archivo: e.target.files[0]});
    }
  };

  const handleCancel = () => {
    if (confirm('¿Estás seguro de que quieres cancelar? Se perderán los cambios.')) {
      setFormData({
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
    }
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl mx-auto">
        {/* Header del formulario */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">📅</span>
            <h2 className="text-2xl font-semibold text-gray-900">
              Solicitar Día: 21 de enero de 2026
            </h2>
          </div>
          <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors">
            ← Volver
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fila 1: Fecha y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Día Solicitado <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fecha}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Teléfono
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 666 123 456"
              />
            </div>
          </div>

          {/* Fila 2: Jornada y Turno */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jornada
              </label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({...formData, jornada: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turno Solicitado
              </label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Diurno">Diurno</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
          </div>

          {/* Fila 3: Horas y Días */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Núm. de horas de docencia directa y guardias afectadas
              </label>
              <input
                type="number"
                value={formData.horasDocencia}
                onChange={(e) => setFormData({...formData, horasDocencia: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Núm. de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={formData.diasPermiso}
                onChange={(e) => setFormData({...formData, diasPermiso: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          {/* Checkbox: Permiso no retribuido */}
          <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
            <input
              type="checkbox"
              id="noRetribuido"
              checked={formData.noRetribuido}
              onChange={(e) => setFormData({...formData, noRetribuido: e.target.checked})}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="noRetribuido" className="text-sm text-gray-700 cursor-pointer font-medium">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>

          {/* Checkbox: Causa sobrevenida */}
          <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-lg">
            <input
              type="checkbox"
              id="causaSobrevenida"
              checked={formData.causaSobrevenida}
              onChange={(e) => setFormData({...formData, causaSobrevenida: e.target.checked})}
              className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
            />
            <label htmlFor="causaSobrevenida" className="text-sm text-gray-700 cursor-pointer font-medium">
              ¿Causa sobrevenida?
            </label>
          </div>

          {/* Justificación */}
          {formData.causaSobrevenida && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justificación de la causa sobrevenida
              </label>
              <textarea
                value={formData.justificacion}
                onChange={(e) => setFormData({...formData, justificacion: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px]"
                placeholder="Describe aquí la justificación de la causa sobrevenida..."
              />
            </div>
          )}

          {/* Documento PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento Justificativo en PDF
            </label>
            <div className="flex items-center gap-3">
              <label className="px-5 py-2.5 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium hover:border-blue-500">
                📎 Seleccionar archivo
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-500">
                {formData.archivo ? `✓ ${formData.archivo.name}` : 'Ningún archivo seleccionado'}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Guardar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioSolicitud;