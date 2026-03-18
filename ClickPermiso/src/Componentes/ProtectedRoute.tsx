import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const ProtectedRoute = () => {
  const { session, loading } = useAuthStore();

  // Mientras se verifica la sesión mostramos un loader
  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Cargando...</div>;

  // Sin sesión → login
  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
};