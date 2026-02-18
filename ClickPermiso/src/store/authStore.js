import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      session: null,
      // Función para actualizar sesión y usuario a la vez
      setSession: (session) => set({ 
        session: session, 
        user: session?.user ?? null 
      }),
      // Limpiar el estado al cerrar sesión
      clearAuth: () => set({ user: null, session: null }),
    }),
    {
      name: 'auth-storage', // Nombre de la clave en LocalStorage
    }
  )
);