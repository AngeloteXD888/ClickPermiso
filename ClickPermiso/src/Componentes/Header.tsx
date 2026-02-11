import logo from "../assets/logo_albarregas.png";

const Header = () => (
  <div className="bg-white px-6 py-3 border-b flex justify-between items-center">
    {/* Logo */}
    <img src={logo} alt="IES Albarregas" className="h-12" />
    
    {/* Título */}
    <div className="text-gray-800 font-semibold">I.E.S Albarregas</div>
    
    {/* Usuario */}
    <div className="text-sm text-gray-600">Hola, Prof. Borja2 ⚙️</div>
  </div>
);

export default Header;