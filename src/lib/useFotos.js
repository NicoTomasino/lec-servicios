import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

export function useFotos() {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(true)

  const cargar = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('fotos')
      .select('*')
      .order('orden', { ascending: true })

    if (error) console.error('Error cargando fotos:', error)
    setFotos(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { cargar() }, [cargar])

  return { fotos, loading, recargar: cargar }
}
