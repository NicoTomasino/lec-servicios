import { useState } from 'react'
import { Upload, Trash2, ChevronUp, ChevronDown, Save } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useFotos } from '../lib/useFotos'

const CATS = [
  { v: 'electricidad', l: 'Electricidad' },
  { v: 'ac', l: 'Aire Acondicionado' },
  { v: 'pintura', l: 'Pintura' },
  { v: 'otros', l: 'Otros' },
]

function limpiar(nombre) {
  return nombre
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '-')
}

export default function PanelFotos() {
  const { fotos, loading, recargar } = useFotos()
  const [subiendo, setSubiendo] = useState(false)
  const [msg, setMsg] = useState('')

  const subir = async (e) => {
    const archivos = Array.from(e.target.files)
    if (!archivos.length) return

    setSubiendo(true)
    setMsg('')
    let orden = fotos.length

    for (const file of archivos) {
      if (file.size > 5 * 1024 * 1024) {
        setMsg(`"${file.name}" pesa más de 5MB, se salteó`)
        continue
      }

      const path = `${Date.now()}-${limpiar(file.name)}`
      const { error: upErr } = await supabase.storage
        .from('galeria').upload(path, file)

      if (upErr) { setMsg(`Error subiendo ${file.name}`); continue }

      const { data: { publicUrl } } = supabase.storage
        .from('galeria').getPublicUrl(path)

      await supabase.from('fotos').insert({
        url: publicUrl,
        storage_path: path,
        titulo: file.name.replace(/\.[^.]+$/, ''),
        categoria: 'otros',
        orden: orden++,
      })
    }

    setSubiendo(false)
    e.target.value = ''
    recargar()
  }

  const borrar = async (foto) => {
    if (!confirm(`¿Borrar "${foto.titulo}"? No se puede deshacer.`)) return
    await supabase.storage.from('galeria').remove([foto.storage_path])
    await supabase.from('fotos').delete().eq('id', foto.id)
    recargar()
  }

  const actualizar = async (id, campos) => {
    await supabase.from('fotos').update(campos).eq('id', id)
    recargar()
  }

  const mover = async (i, dir) => {
    const j = i + dir
    if (j < 0 || j >= fotos.length) return
    await supabase.from('fotos').update({ orden: fotos[j].orden }).eq('id', fotos[i].id)
    await supabase.from('fotos').update({ orden: fotos[i].orden }).eq('id', fotos[j].id)
    recargar()
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Fotos de la galería</h2>
          <p className="panel-sub">{fotos.length} fotos · máx 5MB cada una</p>
        </div>
        <label className="btn-primary upload-btn">
          <Upload size={16} /> {subiendo ? 'Subiendo...' : 'Subir fotos'}
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={subir}
            disabled={subiendo}
            hidden
          />
        </label>
      </div>

      {msg && <p className="panel-msg">{msg}</p>}

      {loading ? <p>Cargando...</p> : (
        <div className="foto-list">
          {fotos.map((f, i) => (
            <div key={f.id} className="foto-row">
              <img src={f.url} alt={f.titulo} className="foto-thumb" />

              <input
                className="foto-input"
                defaultValue={f.titulo}
                onBlur={e => {
                  if (e.target.value !== f.titulo) {
                    actualizar(f.id, { titulo: e.target.value })
                  }
                }}
              />

              <select
                className="foto-select"
                value={f.categoria}
                onChange={e => actualizar(f.id, { categoria: e.target.value })}
              >
                {CATS.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
              </select>

              <div className="foto-actions">
                <button onClick={() => mover(i, -1)} disabled={i === 0} title="Subir">
                  <ChevronUp size={16} />
                </button>
                <button onClick={() => mover(i, 1)} disabled={i === fotos.length - 1} title="Bajar">
                  <ChevronDown size={16} />
                </button>
                <button onClick={() => borrar(f)} className="btn-del" title="Borrar">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}