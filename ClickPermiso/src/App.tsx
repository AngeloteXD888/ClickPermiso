import { useState } from 'react';
import SolDiaDiurno from './pages/SolDiaDiurno';
import SolDiaVespertino from './pages/SolDiaVespertino';
import MiPerfil from './pages/MiPerfil';
import MisDiasSolicitados from './pages/MisDiasSolicitados';
import MisAusencias from './pages/MisAusencias';
import Header from './Componentes/Header';
import Sidebar from './Componentes/Sidebar';

function App() {
  const [activePage, setActivePage] = useState('sol-dia-diurno');

  const renderPage = () => {
    switch (activePage) {
      case 'sol-dia-diurno':
        return <SolDiaDiurno />;
      case 'sol-dia-vespertino':
        return <SolDiaVespertino />;
      case 'mi-perfil':
        return <MiPerfil />;
      case 'mis-dias-solicitados':
        return <MisDiasSolicitados />;
      case 'mis-ausencias':
        return <MisAusencias />;
      default:
        return <SolDiaDiurno />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex min-h-[calc(100vh-64px)]">
        <Sidebar activePage={activePage} onPageChange={setActivePage} />
        {renderPage()}
      </div>
    </div>
  );
}

export default App;