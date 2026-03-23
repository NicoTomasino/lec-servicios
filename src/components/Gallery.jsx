import { useState } from 'react'
import { X } from 'lucide-react'
import './Gallery.css'
import fotoElectricidad from '../assets/electricidad.jpg'
import fotoElectricidad2 from '../assets/electricidad2.jpg'
import fotoAC from '../assets/limpiezaymantenimientoaire.jpg'

const photos = [
  { src: fotoElectricidad, label: 'Instalación eléctrica', cat: 'electricidad' },
  { src: fotoElectricidad2, label: 'Instalación eléctrica 2', cat: 'electricidad' },
  { src: fotoAC, label: 'Limpieza y mantenimiento', cat: 'ac' },
  { src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', label: 'Pintura interior', cat: 'pintura' },
  { src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80', label: 'Pintura exterior', cat: 'pintura' },
  { src: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80', label: 'Trabajo terminado', cat: 'electricidad' },
]

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
