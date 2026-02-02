import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import SolicitarDiaDiurno from './pages/SolicitarDiaDiurno';
import SolicitarDiaVespertino from './pages/SolicitarDiaVespertino';
import MiPerfil from './pages/MiPerfil';
import MisDiasSolicitados from './pages/MisDiasSolicitados';
import MisAusencias from './pages/MisAusencias';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/solicitar-dia-diurno" replace />} />
          <Route path="solicitar-dia-diurno" element={<SolicitarDiaDiurno />} />
          <Route path="solicitar-dia-vespertino" element={<SolicitarDiaVespertino />} />
          <Route path="mi-perfil" element={<MiPerfil />} />
          <Route path="mis-dias-solicitados" element={<MisDiasSolicitados />} />
          <Route path="mis-ausencias" element={<MisAusencias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;