import { useState } from 'react'
import { X } from 'lucide-react'
import { useFotos } from '../lib/useFotos'
import './Gallery.css'

const cats = ['todos', 'electricidad', 'ac', 'pintura', 'otros']
const catLabels = {
  todos: 'Todos',
  electricidad: 'Electricidad',
  ac: 'Aire Acond.',
  pintura: 'Pintura',
  otros: 'Otros',
}

export default function Gallery() {
  const { fotos, loading } = useFotos()
  const [active, setActive] = useState('todos')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'todos'
    ? fotos
    : fotos.filter(p => p.categoria === active)

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

        {loading ? (
          <p style={{ color: 'var(--gray)', padding: '40px 0' }}>Cargando galería...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--gray)', padding: '40px 0' }}>No hay fotos en esta categoría.</p>
        ) : (
          <div className="gallery-grid">
            {filtered.map(p => (
              <div key={p.id} className="gallery-item" onClick={() => setLightbox(p)}>
                <img src={p.url} alt={p.titulo} loading="lazy" />
                <div className="gallery-overlay">
                  <span>{p.titulo}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close"><X size={24} /></button>
          <img src={lightbox.url} alt={lightbox.titulo} />
          <p>{lightbox.titulo}</p>
        </div>
      )}
    </section>
  )
}