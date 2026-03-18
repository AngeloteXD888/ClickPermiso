import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

// Si no hay variables de entorno el cliente se crea igualmente sin lanzar error.
// La autenticación real fallará, pero la UI puede renderizarse sin problemas.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
