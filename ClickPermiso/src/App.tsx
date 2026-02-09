import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';
import FormularioSolicitud from './Componentes/FormularioSolicitud';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <FormularioSolicitud />
        </main>
      </div>
    </div>
  );
}

export default App;