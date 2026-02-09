const Sidebar = () => {
  const menuItems = [
    { label: 'Sol. día diurno', active: true, icon: '☀️' },
    { label: 'Sol. día vespertino', active: false, icon: '🌙' },
    { label: 'Mi Perfil', active: false, icon: '👤' },
    { label: 'Mis días Solicitados', active: false, icon: '📋' },
    { label: 'Mis ausencias', active: false, icon: '📅' }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 py-6 min-h-screen">
      <nav className="space-y-1">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center gap-3 px-6 py-3 cursor-pointer transition-all ${
              item.active 
                ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;