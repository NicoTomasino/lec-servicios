import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_KEY

if (!url || !key) {
  console.error('Faltan las variables VITE_SUPABASE_URL o VITE_SUPABASE_KEY en el .env')
}

export const supabase = createClient(url, key)
