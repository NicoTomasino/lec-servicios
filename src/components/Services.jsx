import { Zap, Wind, PaintBucket, CheckCircle } from 'lucide-react'
import './Services.css'

const services = [
  {
    icon: <Zap size={32} />,
    title: 'Electricidad',
    desc: 'Instalaciones eléctricas residenciales y comerciales, tableros, circuitos, iluminación LED y mantenimiento preventivo.',
    items: ['Instalaciones nuevas', 'Reparaciones y mantenimiento', 'Tableros eléctricos', 'Iluminación LED'],
    accent: true,
  },
  {
    icon: <Wind size={32} />,
    title: 'Aire Acondicionado',
    desc: 'Instalación, mantenimiento y reparación de equipos de aire acondicionado.',
    items: ['Instalación de splits', 'Servicio técnico'],
    accent: false,
  },
  {
    icon: <PaintBucket size={32} />,
    title: 'Pintura',
    desc: 'Pintura interior y exterior para hogares y comercios. Terminaciones de calidad con materiales de primera.',
    items: ['Pintura interior', 'Pintura exterior', 'Texturados y esmaltes', 'Preparación de superficies'],
    accent: false,
  },
]

export default function Services() {
  return (
    <section id="servicios" className="services-section">
      <div className="container">
        <div className="services-header">
          <p className="section-label">Lo que hacemos</p>
          <h2 className="section-title">Nuestros <span>servicios</span></h2>
          <p className="services-desc">
            Brindamos soluciones integrales para tu hogar o empresa con la
            seriedad y calidad que tu proyecto merece.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card ${s.accent ? 'service-card--accent' : ''}`}>
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-list">
                {s.items.map((item, j) => (
                  <li key={j}>
                    <CheckCircle size={14} />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#presupuesto" className={s.accent ? 'btn-primary' : 'btn-outline'} style={{ marginTop: 'auto' }}>
                Consultar
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
