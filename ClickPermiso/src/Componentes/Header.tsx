import logo from '../assets/logo_albarregas.png';

const Header = () => (
  <div className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-50 shadow-sm">
    <div className="flex items-center gap-3">
      <img 
        src={logo} 
        alt="IES Albarregas Logo" 
        className="h-12 w-auto"
      />
    </div>
    <div className="text-gray-800 font-semibold text-lg">
      I.E.S Albarregas
    </div>
    <div className="text-sm text-gray-600">
      Hola, Prof. Borja
    </div>
  </div>
);

export default Header;