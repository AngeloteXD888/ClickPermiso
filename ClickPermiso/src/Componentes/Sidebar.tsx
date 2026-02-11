interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const Sidebar = ({ activePage, onPageChange }: SidebarProps) => {
  const menuItems = [
    { id: 'sol-dia-diurno', label: 'Sol. día diurno' },
    { id: 'sol-dia-vespertino', label: 'Sol. día vespertino' },
    { id: 'mi-perfil', label: 'Mi Perfil' },
    { id: 'mis-dias-solicitados', label: 'Mis días Solicitados' },
    { id: 'mis-ausencias', label: 'Mis ausencias' }
  ];

  return (
    <div className="w-56 bg-gray-50 border-r border-gray-200">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onPageChange(item.id)}
          className={`w-full flex items-center gap-3 px-6 py-3.5 text-left transition-colors ${
            activePage === item.id
              ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="text-sm">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;