

const Header = () => (
  <div className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-50 shadow-sm">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
        <img src="ClickPermiso\src\assets\logo_albarregas.png" alt="" />
      </div>
      <div className="text-gray-700 font-semibold text-lg">
        I.E.S Albarregas
      </div>
    </div>
    <div className="text-sm text-gray-600 flex items-center gap-2">
      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        <span className="text-gray-600 text-xs">👤</span>
      </div>
      <span>Hola, Prof. Borja</span>
    </div>
  </div>
);

export default Header;