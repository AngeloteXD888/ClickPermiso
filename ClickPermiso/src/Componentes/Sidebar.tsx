
const Sidebar = () => {
  const menuItems = [
    { icon: '☀️', label: 'Sol. día diurno' },
    { icon: '🌙', label: 'Sol. día vespertino' },
    { icon: '👤', label: 'Mi Perfil' },
    { icon: '📅', label: 'Mis días Solicitados' },
    { icon: '📋', label: 'Mis ausencias' }
  ];

  return (
    <div className="w-48 bg-gray-50 border-r min-h-screen p-4">
      {menuItems.map((item, index) => (
        <div
          key={index}>
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar