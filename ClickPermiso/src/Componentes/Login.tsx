import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate   = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    // Modo sin Supabase: login directo para desarrollo
    if (!supabase) {
      setSession({ user: { email } } as never);
      navigate('/');
      return;
    }

    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });

    setCargando(false);

    if (authError) {
      setError('Email o contraseña incorrectos. Inténtalo de nuevo.');
    } else {
      setSession(data.session);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-sm p-8 w-full max-w-sm">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">ClickPermiso</h1>
          <p className="text-sm text-gray-500 mt-1">I.E.S Albarregas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 mt-2"
          >
            {cargando ? 'Entrando...' : 'Iniciar sesión'}
          </button>
        </form>

      </div>
    </div>
  );
}