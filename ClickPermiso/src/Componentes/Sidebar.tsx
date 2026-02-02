const Sidebar = () => {
  const menuItems = [
    { label: 'Sol. día diurno', active: true },
    { label: 'Sol. día vespertino', active: false },
    { label: 'Mi Perfil', active: false },
    { label: 'Mis días Solicitados', active: false },
    { label: 'Mis ausencias', active: false }
  ];

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${item.active ? 'active' : ''}`}
        >
          <span className="menu-label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;