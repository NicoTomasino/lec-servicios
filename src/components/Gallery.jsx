import { useState } from 'react'
import { X } from 'lucide-react'
import './Gallery.css'

const archivos = import.meta.glob('../assets/galeria/*', { eager: true })

const photos = Object.entries(archivos).map(([ruta, modulo]) => {
  const nombre = ruta.split('/').pop()
  const cat = nombre.startsWith('elec') ? 'electricidad'
            : nombre.startsWith('ac') ? 'ac'
            : nombre.startsWith('pin') ? 'pintura'
            : 'todos'
  const label = nombre
    .replace(/\.[^.]+$/, '')
    .replace(/^(elec|ac|pin)-/, '')
    .replace(/-/g, ' ')
  return {
    src: modulo.default,
    label,
    cat
  }
})

const cats = ['todos', 'electricidad', 'ac', 'pintura']
const catLabels = { todos: 'Todos', electricidad: 'Electricidad', ac: 'Aire Acond.', pintura: 'Pintura' }

export default function Gallery() {
  const [active, setActive] = useState('todos')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'todos' ? photos : photos.filter(p => p.cat === active)

  return (
    <section id="galeria" className="gallery-section">
      <div className="container">
        <p className="section-label">Nuestros trabajos</p>
        <h2 className="section-title">Galería de <span>proyectos</span></h2>

        <div className="gallery-filters">
          {cats.map(c => (
            <button
              key={c}
              className={`filter-btn ${active === c ? 'active' : ''}`}
              onClick={() => setActive(c)}
            >
              {catLabels[c]}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filtered.map((p, i) => (
            <div key={i} className="gallery-item" onClick={() => setLightbox(p)}>
              <img src={p.src} alt={p.label} loading="lazy" />
              <div className="gallery-overlay">
                <span>{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close"><X size={24} /></button>
          <img src={lightbox.src} alt={lightbox.label} />
          <p>{lightbox.label}</p>
        </div>
      )}
    </section>
  )
}