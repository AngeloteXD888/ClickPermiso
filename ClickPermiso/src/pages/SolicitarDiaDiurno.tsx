import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SolicitarDiaDiurno = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fecha: '',
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

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validación de fecha formato dd/mm/yyyy
  const validarFecha = (fecha: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!regex.test(fecha)) return false;
    
    const [, dia, mes, año] = fecha.match(regex)!;
    const d = parseInt(dia);
    const m = parseInt(mes);
    const a = parseInt(año);
    
    if (m < 1 || m > 12) return false;
    if (d < 1 || d > 31) return false;
    if (a < 2000 || a > 2100) return false;
    
    return true;
  };

  // Validación de teléfono
  const validarTelefono = (telefono: string): boolean => {
    const regex = /^[6-9]\d{8}$/;
    return regex.test(telefono);
  };

  // Validación de números (horas y días)
  const validarNumero = (valor: string): boolean => {
    const num = parseInt(valor);
    return num > 0 && num < 8;
  };

  const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, fecha: valor});
    
    if (valor && !validarFecha(valor)) {
      setErrors({...errors, fecha: 'Formato incorrecto. Use dd/mm/yyyy'});
    } else {
      const newErrors = {...errors};
      delete newErrors.fecha;
      setErrors(newErrors);
    }
  };

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, telefono: valor});
    
    if (valor && !validarTelefono(valor)) {
      setErrors({...errors, telefono: 'Debe empezar por 6, 7, 8 o 9 y tener 9 dígitos'});
    } else {
      const newErrors = {...errors};
      delete newErrors.telefono;
      setErrors(newErrors);
    }
  };

  const handleNumeroChange = (campo: 'horasDocencia' | 'diasPermiso', e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, [campo]: valor});
    
    if (valor && !validarNumero(valor)) {
      setErrors({...errors, [campo]: 'Debe ser un número entre 1 y 7'});
    } else {
      const newErrors = {...errors};
      delete newErrors[campo];
      setErrors(newErrors);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setFormData({...formData, archivo: file});
        const newErrors = {...errors};
        delete newErrors.archivo;
        setErrors(newErrors);
      } else {
        setErrors({...errors, archivo: 'Solo se permiten archivos PDF'});
      }
    }
  };

  const handleSubmit = () => {
    // Validar todos los campos
    const nuevosErrors: Record<string, string> = {};
    
    if (!formData.fecha) {
      nuevosErrors.fecha = 'La fecha es obligatoria';
    } else if (!validarFecha(formData.fecha)) {
      nuevosErrors.fecha = 'Formato incorrecto. Use dd/mm/yyyy';
    }
    
    if (!formData.telefono) {
      nuevosErrors.telefono = 'El teléfono es obligatorio';
    } else if (!validarTelefono(formData.telefono)) {
      nuevosErrors.telefono = 'Debe empezar por 6, 7, 8 o 9 y tener 9 dígitos';
    }
    
    if (!formData.jornada) {
      nuevosErrors.jornada = 'Debe seleccionar una jornada';
    }
    
    if (formData.horasDocencia && !validarNumero(formData.horasDocencia)) {
      nuevosErrors.horasDocencia = 'Debe ser un número entre 1 y 7';
    }
    
    if (formData.diasPermiso && !validarNumero(formData.diasPermiso)) {
      nuevosErrors.diasPermiso = 'Debe ser un número entre 1 y 7';
    }
    
    if (Object.keys(nuevosErrors).length > 0) {
      setErrors(nuevosErrors);
      return;
    }
    
    console.log('Guardar solicitud:', formData);
    alert('Solicitud guardada correctamente');
    navigate('/mis-dias-solicitados');
  };

  // Obtener fecha formateada para el título
  const obtenerFechaFormateada = () => {
    if (!formData.fecha || !validarFecha(formData.fecha)) {
      return 'Sin fecha seleccionada';
    }
    
    const [dia, mes, año] = formData.fecha.split('/');
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    return `${dia} de ${meses[parseInt(mes) - 1]} de ${año}`;
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
        {/* Header del formulario */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📅</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Solicitar Día: {obtenerFechaFormateada()}
            </h2>
          </div>
          <button 
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium transition-colors"
          >
            ← Volver
          </button>
        </div>

        <div className="space-y-6">
          {/* Fila 1: Fecha y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Día Solicitado <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fecha}
                onChange={handleFechaChange}
                placeholder="dd/mm/yyyy"
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.fecha ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fecha && (
                <p className="mt-1 text-sm text-red-500">{errors.fecha}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Teléfono <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.telefono}
                onChange={handleTelefonoChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.telefono ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: 612345678"
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-500">{errors.telefono}</p>
              )}
            </div>
          </div>

          {/* Fila 2: Jornada y Turno */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Jornada <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.jornada}
                onChange={(e) => setFormData({...formData, jornada: e.target.value})}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                  errors.jornada ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">---------</option>
                <option value="completa">Completa</option>
                <option value="parcial">Parcial</option>
              </select>
              {errors.jornada && (
                <p className="mt-1 text-sm text-red-500">{errors.jornada}</p>
              )}
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
                onChange={(e) => handleNumeroChange('horasDocencia', e)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.horasDocencia ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                max="7"
              />
              {errors.horasDocencia && (
                <p className="mt-1 text-sm text-red-500">{errors.horasDocencia}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Núm. de días de permisos solicitados en el centro
              </label>
              <input
                type="number"
                value={formData.diasPermiso}
                onChange={(e) => handleNumeroChange('diasPermiso', e)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.diasPermiso ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                max="7"
              />
              {errors.diasPermiso && (
                <p className="mt-1 text-sm text-red-500">{errors.diasPermiso}</p>
              )}
            </div>
          </div>

          {/* Checkbox: Permiso no retribuido */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noRetribuido"
              checked={formData.noRetribuido}
              onChange={(e) => setFormData({...formData, noRetribuido: e.target.checked})}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="noRetribuido" className="text-sm text-gray-700 cursor-pointer">
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
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="causaSobrevenida" className="text-sm text-gray-700 cursor-pointer">
              ¿Causa sobrevenida?
            </label>
          </div>

          {/* Justificación */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justificación de la causa sobrevenida
            </label>
            <textarea
              value={formData.justificacion}
              onChange={(e) => setFormData({...formData, justificacion: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y min-h-[120px]"
              placeholder="Describe aquí la justificación..."
            />
          </div>

          {/* Documento PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documento Justificativo en PDF
            </label>
            <div className="flex items-center gap-3">
              <label className="px-5 py-2.5 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-700 font-medium">
                Seleccionar archivo
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-gray-400">
                {formData.archivo ? formData.archivo.name : 'nada seleccionado'}
              </span>
            </div>
            {errors.archivo && (
              <p className="mt-1 text-sm text-red-500">{errors.archivo}</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-8">
            <button 
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Guardar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitarDiaDiurno;