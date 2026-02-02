import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MiPerfil = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: 'Borja',
    apellidos: 'Rodriguez Puerta',
    email: 'brodriguezp09@iesalbarregas.es',
    dni: '',
    relacionJuridica: 'Otro',
    añosServicio: '0'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Validar primera letra en mayúsculas
  const validarNombre = (nombre: string): boolean => {
    if (!nombre) return false;
    return /^[A-Z][a-z]*$/.test(nombre);
  };

  // Validar dos apellidos con primeras letras en mayúsculas
  const validarApellidos = (apellidos: string): boolean => {
    if (!apellidos) return false;
    const apellidosArray = apellidos.trim().split(/\s+/);
    if (apellidosArray.length < 2) return false;
    
    return apellidosArray.every(apellido => /^[A-Z][a-z]*$/.test(apellido));
  };

  // Validar email
  const validarEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar DNI
  const validarDNI = (dni: string): boolean => {
    const regex = /^[0-9]{8}[A-Z]$/;
    if (!regex.test(dni)) return false;
    
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const numero = parseInt(dni.substr(0, 8));
    const letra = dni.substr(8, 1);
    
    return letras[numero % 23] === letra;
  };

  // Validar años de servicio
  const validarAñosServicio = (años: string): boolean => {
    const num = parseInt(años);
    return num >= 0 && num < 50;
  };

  const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, nombre: valor});
    
    if (valor && !validarNombre(valor)) {
      setErrors({...errors, nombre: 'La primera letra debe estar en mayúsculas'});
    } else {
      const newErrors = {...errors};
      delete newErrors.nombre;
      setErrors(newErrors);
    }
  };

  const handleApellidosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, apellidos: valor});
    
    if (valor && !validarApellidos(valor)) {
      setErrors({...errors, apellidos: 'Debe introducir dos apellidos con la primera letra en mayúsculas'});
    } else {
      const newErrors = {...errors};
      delete newErrors.apellidos;
      setErrors(newErrors);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, email: valor});
    
    if (valor && !validarEmail(valor)) {
      setErrors({...errors, email: 'El formato del email no es válido'});
    } else {
      const newErrors = {...errors};
      delete newErrors.email;
      setErrors(newErrors);
    }
  };

  const handleDNIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.toUpperCase();
    setFormData({...formData, dni: valor});
    
    if (valor && !validarDNI(valor)) {
      setErrors({...errors, dni: 'El DNI no es válido'});
    } else {
      const newErrors = {...errors};
      delete newErrors.dni;
      setErrors(newErrors);
    }
  };

  const handleAñosServicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setFormData({...formData, añosServicio: valor});
    
    if (valor && !validarAñosServicio(valor)) {
      setErrors({...errors, añosServicio: 'Debe ser un número positivo menor a 50'});
    } else {
      const newErrors = {...errors};
      delete newErrors.añosServicio;
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    // Validar todos los campos
    const nuevosErrors: Record<string, string> = {};
    
    if (!formData.nombre) {
      nuevosErrors.nombre = 'El nombre es obligatorio';
    } else if (!validarNombre(formData.nombre)) {
      nuevosErrors.nombre = 'La primera letra debe estar en mayúsculas';
    }
    
    if (!formData.apellidos) {
      nuevosErrors.apellidos = 'Los apellidos son obligatorios';
    } else if (!validarApellidos(formData.apellidos)) {
      nuevosErrors.apellidos = 'Debe introducir dos apellidos con la primera letra en mayúsculas';
    }
    
    if (!formData.email) {
      nuevosErrors.email = 'El email es obligatorio';
    } else if (!validarEmail(formData.email)) {
      nuevosErrors.email = 'El formato del email no es válido';
    }
    
    if (formData.dni && !validarDNI(formData.dni)) {
      nuevosErrors.dni = 'El DNI no es válido';
    }
    
    if (formData.añosServicio && !validarAñosServicio(formData.añosServicio)) {
      nuevosErrors.añosServicio = 'Debe ser un número positivo menor a 50';
    }
    
    if (Object.keys(nuevosErrors).length > 0) {
      setErrors(nuevosErrors);
      return;
    }
    
    console.log('Guardar perfil:', formData);
    alert('Perfil guardado correctamente');
  };

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-sm p-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✏️</span>
            <h2 className="text-xl font-semibold text-gray-900">
              Editar Mi Perfil
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
          {/* Fila 1: Nombre y Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={handleNombreChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.nombre ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Borja"
              />
              {errors.nombre && (
                <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={handleApellidosChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.apellidos ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: Rodriguez Puerta"
              />
              {errors.apellidos && (
                <p className="mt-1 text-sm text-red-500">{errors.apellidos}</p>
              )}
            </div>
          </div>

          {/* Fila 2: Email y DNI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="ejemplo@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                DNI
              </label>
              <input
                type="text"
                value={formData.dni}
                onChange={handleDNIChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.dni ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="12345678Z"
                maxLength={9}
              />
              {errors.dni && (
                <p className="mt-1 text-sm text-red-500">{errors.dni}</p>
              )}
            </div>
          </div>

          {/* Fila 3: Relación Jurídica y Años de Servicio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relación Jurídica
              </label>
              <select
                value={formData.relacionJuridica}
                onChange={(e) => setFormData({...formData, relacionJuridica: e.target.value})}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="Otro">Otro</option>
                <option value="Indefinido">Indefinido</option>
                <option value="Temporal">Temporal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Años de Servicio
              </label>
              <input
                type="number"
                value={formData.añosServicio}
                onChange={handleAñosServicioChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.añosServicio ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0"
                min="0"
                max="49"
              />
              {errors.añosServicio && (
                <p className="mt-1 text-sm text-red-500">{errors.añosServicio}</p>
              )}
            </div>
          </div>

          {/* Checkbox Hace sustitución */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="haceSustitucion"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="haceSustitucion" className="text-sm text-gray-700 cursor-pointer">
              Hace sustitución
            </label>
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
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiPerfil;