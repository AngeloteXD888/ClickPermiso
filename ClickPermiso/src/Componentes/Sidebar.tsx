const Sidebar = () => {
  const menuItems = [
    '☀️ Sol. día diurno',
    '🌙 Sol. día vespertino', 
    '👤 Mi Perfil',
    '📅 Mis días Solicitados',
    '📋 Mis ausencias'
  ];

  return (
    <div className="w-56 bg-gray-50 border-r">
      {menuItems.map((item, i) => (
        <div
          key={i}
          className={`px-6 py-3 text-sm cursor-pointer ${
            i === 0 
              ? 'bg-white border-r-4 border-indigo-600 text-gray-900' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;