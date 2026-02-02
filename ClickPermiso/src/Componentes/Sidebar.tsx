const Sidebar = () => {
  const menuItems = [
    {label: 'Sol. día diurno', active: true },
    {label: 'Sol. día vespertino', active: false },
    {label: 'Mi Perfil', active: false },
    {label: 'Mis días Solicitados', active: false },
    {label: 'Mis ausencias', active: false }
  ];

  return (
    <div className="w-56 bg-gray-50 border-r border-gray-200 py-6">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${
            item.active 
              ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;