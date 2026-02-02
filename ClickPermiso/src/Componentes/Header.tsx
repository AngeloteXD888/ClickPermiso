import logo_albarregas from "../assets/logo_albarregas.png"

const Header = () => (
  <div className="bg-white px-8 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 z-50">
    <div>
      <img src={logo_albarregas} alt="Logo" className=" w-50 h-30"/>
    </div>
    <div className="text-gray-700 font-semibold text-lg">
      I.E.S Albarregas
    </div>
    <div className="text-sm text-gray-600">
      Hola, Prof. Borja
    </div>
  </div>
);

export default Header;