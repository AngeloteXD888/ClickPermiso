import { useState } from "react";

const MiPerfil = () => {
  const [perfil, setPerfil] = useState({
    nombre: 'Borja',
    apellidos: 'Rodriguez Puerta',
    email: 'brodriguezp09@iesalbarregas.es',
    dni: '',
    relacionJuridica: 'Otro',
    anosServicio: 0,
    haceRestitucion: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guardar perfil:', perfil);
    alert('Perfil guardado correctamente');
  };

  return (
    <div className="flex-1 bg-gray-50 p-8">
      <div className="bg-white rounded-lg shadow p-8 max-w-5xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b">
          <h2 className="text-xl font-semibold">Editar Mi Perfil</h2>
          <button className="text-blue-600 hover:underline">Volver</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Nombre</label>
              <input
                type="text"
                value={perfil.nombre}
                onChange={(e) => setPerfil({...perfil, nombre: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Apellidos</label>
              <input
                type="text"
                value={perfil.apellidos}
                onChange={(e) => setPerfil({...perfil, apellidos: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={perfil.email}
                onChange={(e) => setPerfil({...perfil, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">DNI</label>
              <input
                type="text"
                value={perfil.dni}
                onChange={(e) => setPerfil({...perfil, dni: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Relación Jurídica</label>
              <select
                value={perfil.relacionJuridica}
                onChange={(e) => setPerfil({...perfil, relacionJuridica: e.target.value})}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="Otro">Otro</option>
                <option value="Funcionario">Funcionario</option>
                <option value="Interino">Interino</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Años de Servicio</label>
              <input
                type="number"
                value={perfil.anosServicio}
                onChange={(e) => setPerfil({...perfil, anosServicio: Number(e.target.value)})}
                className="w-full px-3 py-2 border rounded-md"
                min="0"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={perfil.haceRestitucion}
                onChange={(e) => setPerfil({...perfil, haceRestitucion: e.target.checked})}
                className="w-4 h-4"
              />
              <span className="text-sm">Hace sustitución</span>
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MiPerfil;