import FormularioSolicitud from "./Componentes/FormularioSolicitud";
import Header from "./Componentes/Header";
import Sidebar from "./Componentes/Sidebar";


function App() {
  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar />
        <FormularioSolicitud />
      </div>
    </>
  );
}

export default App;