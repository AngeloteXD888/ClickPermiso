import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './Componentes/ProtectedRoute';
import Login from './Componentes/Login';
import Layout from './Componentes/LayOut';
import { useAuthStore } from './store/authStore.js';
import SolDiaDiurno from './pages/SolDiaDiurno';
import SolDiaVespertino from './pages/SolDiaVespertino';
import MiPerfil from './pages/MiPerfil';
import MisDiasSolicitados from './pages/MisDiasSolicitados';
import MisAusencias from './pages/MisAusencias';

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    const cleanup = initAuth();
    return cleanup;
  }, [initAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/diurno" replace />} />
            <Route path="/diurno"      element={<SolDiaDiurno />} />
            <Route path="/vespertino"  element={<SolDiaVespertino />} />
            <Route path="/solicitudes" element={<MisDiasSolicitados />} />
            <Route path="/ausencias"   element={<MisAusencias />} />
            <Route path="/perfil"      element={<MiPerfil />} />
          </Route>
        </Route>

        {/* Ruta comodín */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;