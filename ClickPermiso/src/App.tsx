import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import FormularioSolicitud from './Componentes/FormularioSolicitud';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <FormularioSolicitud />
      </div>
    </div>
  );
}

export default App;