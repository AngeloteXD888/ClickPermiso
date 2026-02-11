import { useState } from "react";

const SolDiaDiurno = () => {
  const [formData, setFormData] = useState({
    fecha: '23/04/2026',
    telefono: '',
    jornada: '',
    turno: 'Diurno',
    horasDocencia: '',
    diasPermiso: '',
    noRetribuido: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar solicitud:', formData);
    alert('Solicitud guardada correctamente');
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold">Solicitar Día: 23 de abril de 2026</h2>
          <button className="text-blue-600 hover:underline">Volver</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Día Solicitado</label>
              <input
                type="text"
                value={formData.fecha}
                className="w-full px-3 py-2 border rounded-md bg-gray-50"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Número de Teléfono</label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Jornada</label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({...formData, jornada: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Turno Solicitado</label>
              <select
                value={formData.turno}
                onChange={(e) => setFormData({...formData, turno: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Diurno">Diurno</option>
                <option value="Vespertino">Vespertino</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Núm de horas de docencia directa y guardias afectadas
              </label>
              <input
                type="number"
                value={formData.horasDocencia}
                onChange={(e) => setFormData({...formData, horasDocencia: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Núm de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={formData.diasPermiso}
                onChange={(e) => setFormData({...formData, diasPermiso: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.noRetribuido}
                onChange={(e) => setFormData({...formData, noRetribuido: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm">Estoy solicitando un día de permiso no retribuido</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Guardar Solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SolDiaDiurno;