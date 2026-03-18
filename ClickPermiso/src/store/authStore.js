import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,          // ← lo usaba ProtectedRoute
      setSession: (session) => set({
        session: session,
        user: session?.user ?? null,
      }),
      clearAuth: () => set({ user: null, session: null }),
      // initAuth era llamado en App.tsx — ahora devuelve una función de cleanup vacía
      initAuth: () => {
        // Sin Supabase activo simplemente no hace nada
        return () => {};
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);