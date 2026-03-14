import { ShieldCheck, Clock, ThumbsUp, Users } from 'lucide-react'
import './About.css'

const values = [
  { icon: <ShieldCheck size={22} />, title: 'Trabajo garantizado', desc: 'Todos nuestros trabajos tienen garantía por escrito.' },
  { icon: <Clock size={22} />, title: 'Puntualidad', desc: 'Respetamos los horarios acordados sin excusas.' },
  { icon: <ThumbsUp size={22} />, title: 'Calidad comprobada', desc: 'Usamos materiales de primera marca en cada proyecto.' },
  { icon: <Users size={22} />, title: 'Atención personalizada', desc: 'Asesoramiento honesto y trato directo con el dueño.' },
]

export default function About() {
  return (
    <section id="nosotros" className="about-section">
      <div className="container about-inner">
        <div className="about-visual">
          <div className="about-badge-big">
            <span className="ab-num">10+</span>
            <span className="ab-text">Años en el<br/>mercado</span>
          </div>
          <div className="about-accent-line" />
        </div>

        <div className="about-content">
          <p className="section-label">Quiénes somos</p>
          <h2 className="section-title">Experiencia que <span>se nota</span></h2>
          <p className="about-text">
            LEC Servicios es una empresa familiar con más de 10 años brindando
            soluciones en electricidad, instalación de aire acondicionado y pintura
            en Rosario y alrededores.
          </p>
          <p className="about-text">
            Nuestro compromiso es simple: hacer el trabajo bien, a tiempo y con materiales
            de calidad. Sin sorpresas en el presupuesto, sin vueltas.
          </p>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={i} className="value-item">
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h4 className="value-title">{v.title}</h4>
                  <p className="value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
