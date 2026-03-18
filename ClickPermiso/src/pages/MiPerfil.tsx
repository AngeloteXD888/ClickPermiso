import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Validadores ──────────────────────────────────────────────────────────────

/** Primera letra en mayúscula y resto existente */
function nombreValido(valor: string): boolean {
  if (valor.trim().length === 0) return false;
  return /^[A-ZÁÉÍÓÚÑÜ]/.test(valor.trim());
}

/** Dos apellidos separados por espacio, cada uno con primera letra en mayúscula */
function apellidosValidos(valor: string): boolean {
  const partes = valor.trim().split(/\s+/);
  if (partes.length < 2) return false;
  return partes.every((p) => /^[A-ZÁÉÍÓÚÑÜ]/.test(p));
}

/** Patrón básico de email */
function emailValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
}

/** DNI español: 8 dígitos + letra correcta (módulo 23) */
function dniValido(valor: string): boolean {
  const regex = /^(\d{8})([A-Z])$/i;
  const match = valor.trim().toUpperCase().match(regex);
  if (!match) return false;
  const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
  return letras[parseInt(match[1]) % 23] === match[2];
}

/** Número positivo entero < 50 */
function anosValidos(valor: string): boolean {
  const n = Number(valor);
  return Number.isInteger(n) && n >= 0 && n < 50;
}

// ── Componente ────────────────────────────────────────────────────────────────

const MiPerfil = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: 'Borja',
    apellidos: 'Rodríguez Puerta',
    correo: 'brodriguezp09@iesalbarregas.es',
    dni: '',
    relacionJuridica: 'Otro',
    anosServicio: '0',
    haceSustitucion: false,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [guardado, setGuardado] = useState(false);

  const set = (campo: string, valor: string | boolean) =>
    setForm((f) => ({ ...f, [campo]: valor }));

  const validar = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.nombre.trim())
      e.nombre = 'El nombre es obligatorio.';
    else if (!nombreValido(form.nombre))
      e.nombre = 'La primera letra debe estar en mayúsculas.';

    if (!form.apellidos.trim())
      e.apellidos = 'Los apellidos son obligatorios.';
    else if (!apellidosValidos(form.apellidos))
      e.apellidos = 'Introduce dos apellidos, cada uno con la primera letra en mayúsculas.';

    if (!form.correo.trim())
      e.correo = 'El correo es obligatorio.';
    else if (!emailValido(form.correo))
      e.correo = 'Introduce una dirección de correo válida.';

    if (!form.dni.trim())
      e.dni = 'El DNI es obligatorio.';
    else if (!dniValido(form.dni))
      e.dni = 'Introduce un DNI válido (8 dígitos + letra).';

    if (!form.anosServicio && form.anosServicio !== '0')
      e.anosServicio = 'Este campo es obligatorio.';
    else if (!anosValidos(form.anosServicio))
      e.anosServicio = 'Introduce un número positivo menor a 50.';

    setErrores(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) return;
    console.log('Perfil guardado:', form);
    setGuardado(true);
    setTimeout(() => setGuardado(false), 3000);
  };

  const handleCancelar = () => {
    setErrores({});
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-5xl">

        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔧 Editar Mi Perfil
          </h2>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
          >
            ↩ Volver
          </button>
        </div>

        {guardado && (
          <div className="mb-4 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm">
            ✅ Cambios guardados correctamente.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Fila 1: Nombre + Apellidos */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={(e) => set('nombre', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.nombre ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.nombre && <p className="text-red-500 text-xs mt-1">{errores.nombre}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">👤</span>
                <input
                  type="text"
                  value={form.apellidos}
                  onChange={(e) => set('apellidos', e.target.value)}
                  placeholder="Primer Apellido Segundo"
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.apellidos ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.apellidos && <p className="text-red-500 text-xs mt-1">{errores.apellidos}</p>}
            </div>
          </div>

          {/* Fila 2: Correo + DNI */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉️</span>
                <input
                  type="email"
                  value={form.correo}
                  onChange={(e) => set('correo', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.correo ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.correo && <p className="text-red-500 text-xs mt-1">{errores.correo}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DNI</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🪪</span>
                <input
                  type="text"
                  value={form.dni}
                  onChange={(e) => set('dni', e.target.value.toUpperCase())}
                  placeholder="12345678A"
                  maxLength={9}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.dni ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.dni && <p className="text-red-500 text-xs mt-1">{errores.dni}</p>}
            </div>
          </div>

          {/* Fila 3: Relación jurídica + Años de servicio */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Relación Jurídica</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🏛️</span>
                <select
                  value={form.relacionJuridica}
                  onChange={(e) => set('relacionJuridica', e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md text-sm bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Otro">Otro</option>
                  <option value="Indefinido">Indefinido</option>
                  <option value="Temporal">Temporal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Años de Servicio</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📅</span>
                <input
                  type="number"
                  value={form.anosServicio}
                  onChange={(e) => set('anosServicio', e.target.value)}
                  min={0}
                  max={49}
                  className={`w-full pl-9 pr-3 py-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errores.anosServicio ? 'border-red-400' : 'border-gray-300'}`}
                />
              </div>
              {errores.anosServicio && <p className="text-red-500 text-xs mt-1">{errores.anosServicio}</p>}
            </div>
          </div>

          {/* Checkbox */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.haceSustitucion}
                onChange={(e) => set('haceSustitucion', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">Hace sustitución</span>
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
              Guardar Cambios
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default MiPerfil;