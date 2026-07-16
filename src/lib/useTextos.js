import { useState, useEffect } from 'react'
import { supabase } from './supabase'

// Valores por defecto: si Supabase falla, la web igual muestra algo
const FALLBACK = {
  hero_titulo: 'Soluciones para tu hogar y empresa',
  hero_subtitulo: 'Electricidad, aire acondicionado y pintura con la calidad que tu hogar o empresa merece.',
  about_parrafo1: 'LEC nació con una misión clara: llevar calidad real a cada rincón de tu hogar o empresa.',
  about_parrafo2: 'Electricidad, aire acondicionado y pintura bajo un mismo techo.',
  contacto_telefono: '+54 9 236 469-4855',
  contacto_email: 'lecservicios@gmail.com',
  contacto_horario: 'Lun–Sáb · 8:00–12:00 y 14:00–18:00',
  contacto_zona: 'Junín y zona',
}

export function useTextos() {
  const [textos, setTextos] = useState(FALLBACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('textos')
      .select('clave, valor')
      .then(({ data, error }) => {
        if (error) {
          console.error('Error cargando textos:', error)
        } else if (data) {
          const obj = Object.fromEntries(data.map(t => [t.clave, t.valor]))
          setTextos({ ...FALLBACK, ...obj })
        }
        setLoading(false)
      })
  }, [])

  return { textos, loading }
}
