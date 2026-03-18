import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Convierte "dd/mm/yyyy" a nombre largo: "23 de abril de 2026" */
function fechaLarga(ddmmyyyy: string): string {
  const partes = ddmmyyyy.split('/');
  if (partes.length !== 3) return ddmmyyyy;
  const [d, m, y] = partes.map(Number);
  if (!d || !m || !y) return ddmmyyyy;
  const meses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  return `${d} de ${meses[m - 1] ?? ''} de ${y}`;
}

/** Valida formato dd/mm/yyyy y que la fecha sea real */
function esFechaValida(valor: string): boolean {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(valor)) return false;
  const [d, m, y] = valor.split('/').map(Number);
  const fecha = new Date(y, m - 1, d);
  return fecha.getFullYear() === y && fecha.getMonth() === m - 1 && fecha.getDate() === d;
}

/** Valida teléfono español: 9 dígitos empezando por 6,7,8 o 9 */
function esTelValido(tel: string): boolean {
  return /^[6789]\d{8}$/.test(tel);
}

/** Valida que el número sea entero positivo > 0 y < 8 */
function esNumValido(val: string): boolean {
  const n = Number(val);
  return Number.isInteger(n) && n > 0 && n < 8;
}

// ── Componente ────────────────────────────────────────────────────────────────

const SolDiaDiurno = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fecha: '',
    telefono: '',
    jornada: '',
    turno: 'Diurno',
    horasDocencia: '',
    diasPermiso: '',
    noRetribuido: false,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  const set = (campo: string, valor: string | boolean) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const validar = (): boolean => {
    const e: Record<string, string> = {};

    if (!esFechaValida(form.fecha))
      e.fecha = 'Introduce una fecha válida en formato dd/mm/yyyy.';

    if (!form.telefono)
      e.telefono = 'El teléfono es obligatorio.';
    else if (!esTelValido(form.telefono))
      e.telefono = 'Debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';

    if (!form.jornada)
      e.jornada = 'Selecciona una jornada.';

    if (!form.horasDocencia)
      e.horasDocencia = 'Este campo es obligatorio.';
    else if (!esNumValido(form.horasDocencia))
      e.horasDocencia = 'Introduce un número entero entre 1 y 7.';

    if (!form.diasPermiso)
      e.diasPermiso = 'Este campo es obligatorio.';
    else if (!esNumValido(form.diasPermiso))
      e.diasPermiso = 'Introduce un número entero entre 1 y 7.';

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    console.log('Solicitud diurna guardada:', form);
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  const handleCancelar = () => {
    setForm({ fecha: '', telefono: '', jornada: '', turno: 'Diurno', horasDocencia: '', diasPermiso: '', noRetribuido: false });
    setErrores({});
  };

  const tituloFecha = esFechaValida(form.fecha) ? fechaLarga(form.fecha) : '—';

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-5xl">

        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🗓️ Solicitar Día: <span className="text-gray-600">{tituloFecha}</span>
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            ↩ Volver
          </button>
        </div>

        {enviado && (
          <div className="mb-4 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
            ✅ Solicitud guardada correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Fila 1: Fecha + Teléfono */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Día Solicitado
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🗓️</span>
                <input
                  type="text"
                  value={form.fecha}
                  onChange={(e) => set('fecha', e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.fecha ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.fecha && <p className="text-red-500 text-xs mt-1">{errores.fecha}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Teléfono
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📞</span>
                <input
                  type="text"
                  value={form.telefono}
                  onChange={(e) => set('telefono', e.target.value)}
                  placeholder="Ej: 612345678"
                  maxLength={9}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.telefono ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.telefono && <p className="text-red-500 text-xs mt-1">{errores.telefono}</p>}
            </div>
          </div>

          {/* Fila 2: Jornada + Turno */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Jornada
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🕐</span>
                <select
                  value={form.jornada}
                  onChange={(e) => set('jornada', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.jornada ? 'border-red-400' : 'border-gray-300'}`}
                >
                  <option value="">— Selecciona —</option>
                  <option value="Completa">Completa</option>
                  <option value="Parcial">Parcial</option>
                </select>
              </div>
              {errores.jornada && <p className="text-red-500 text-xs mt-1">{errores.jornada}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Turno Solicitado
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">☀️</span>
                <select
                  value={form.turno}
                  onChange={(e) => set('turno', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Diurno">Diurno</option>
                  <option value="Vespertino">Vespertino</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fila 3: Horas + Días */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Núm de horas de docencia directa y guardias afectadas
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🕐</span>
                <input
                  type="number"
                  value={form.horasDocencia}
                  onChange={(e) => set('horasDocencia', e.target.value)}
                  min={1}
                  max={7}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.horasDocencia ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.horasDocencia && <p className="text-red-500 text-xs mt-1">{errores.horasDocencia}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Núm de días de permisos solicitados en el centro
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📅</span>
                <input
                  type="number"
                  value={form.diasPermiso}
                  onChange={(e) => set('diasPermiso', e.target.value)}
                  min={1}
                  max={7}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.diasPermiso ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.diasPermiso && <p className="text-red-500 text-xs mt-1">{errores.diasPermiso}</p>}
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.noRetribuido}
                onChange={(e) => set('noRetribuido', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Estoy solicitando un día de permiso no retribuido</span>
            </label>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancelar}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors text-sm font-medium"
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