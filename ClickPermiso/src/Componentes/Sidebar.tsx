import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Sol. día diurno',      ruta: '/diurno',       icono: '☀️' },
  { label: 'Sol. día vespertino',  ruta: '/vespertino',   icono: '🌙' },
  { label: 'Mi Perfil',            ruta: '/perfil',       icono: '👤' },
  { label: 'Mis días solicitados', ruta: '/solicitudes',  icono: '📋' },
  { label: 'Mis ausencias',        ruta: '/ausencias',    icono: '📅' },
];

const Sidebar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();

  return (
    <div className="w-56 bg-gray-50 border-r border-gray-200 py-6 min-h-screen">
      {menuItems.map((item) => {
        const activo = location.pathname === item.ruta;
        return (
          <button
            key={item.ruta}
            onClick={() => navigate(item.ruta)}
            className={`w-full flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors text-left ${
              activo
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-medium'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <span>{item.icono}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default Sidebar;