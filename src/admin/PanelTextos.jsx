import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { supabase } from '../lib/supabase'

const CAMPOS = [
  { clave: 'hero_titulo',       label: 'Título principal',        area: false },
  { clave: 'hero_subtitulo',    label: 'Subtítulo del inicio',    area: true },
  { clave: 'about_parrafo1',    label: 'Nosotros - párrafo 1',    area: true },
  { clave: 'about_parrafo2',    label: 'Nosotros - párrafo 2',    area: true },
  { clave: 'contacto_telefono', label: 'Teléfono',                area: false },
  { clave: 'contacto_email',    label: 'Email',                   area: false },
  { clave: 'contacto_horario',  label: 'Horario de atención',     area: false },
  { clave: 'contacto_zona',     label: 'Zona de trabajo',         area: false },
]

export default function PanelTextos() {
  const [valores, setValores] = useState({})
  const [loading, setLoading] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('textos').select('clave, valor').then(({ data }) => {
      setValores(Object.fromEntries((data || []).map(t => [t.clave, t.valor])))
      setLoading(false)
    })
  }, [])

  const guardar = async () => {
    setGuardando(true)
    setMsg('')
    const filas = CAMPOS.map(c => ({ clave: c.clave, valor: valores[c.clave] ?? '' }))
    const { error } = await supabase.from('textos').upsert(filas)
    setMsg(error ? 'Error al guardar' : '✓ Cambios guardados')
    setGuardando(false)
    setTimeout(() => setMsg(''), 3000)
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Textos de la web</h2>
          <p className="panel-sub">Los cambios se ven al instante</p>
        </div>
        <button className="btn-primary" onClick={guardar} disabled={guardando}>
          <Save size={16} /> {guardando ? 'Guardando...' : 'Guardar todo'}
        </button>
      </div>

      {msg && <p className="panel-msg">{msg}</p>}

      <div className="texto-list">
        {CAMPOS.map(c => (
          <div key={c.clave} className="texto-row">
            <label>{c.label}</label>
            {c.area ? (
              <textarea
                rows={3}
                value={valores[c.clave] ?? ''}
                onChange={e => setValores(v => ({ ...v, [c.clave]: e.target.value }))}
              />
            ) : (
              <input
                value={valores[c.clave] ?? ''}
                onChange={e => setValores(v => ({ ...v, [c.clave]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}