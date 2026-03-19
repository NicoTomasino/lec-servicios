import { ArrowRight, Zap } from 'lucide-react'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-bg">
        <div className="hero-grid" />
        <div className="hero-glow" />
      </div>

      <div className="container hero-inner">
        <div className="hero-badge fade-up">
          <Zap size={14} fill="currentColor" />
          Electricidad · Pintura · Aire Acondicionado
        </div>

        <h1 className="hero-title fade-up" style={{ animationDelay: '0.1s' }}>
          Soluciones para<br />
          <span>tu hogar</span> y<br />
          empresa
        </h1>

        <p className="hero-sub fade-up" style={{ animationDelay: '0.2s' }}>
          Más de 10 años de experiencia brindando servicios
          de calidad en Junin y zona. Trabajo garantizado,
          presupuesto sin cargo.
        </p>

        <div className="hero-actions fade-up" style={{ animationDelay: '0.3s' }}>
          <a href="#presupuesto" className="btn-primary">
            Pedir presupuesto <ArrowRight size={18} />
          </a>
          <a href="#servicios" className="btn-outline">
            Ver servicios
          </a>
        </div>

        <div className="hero-stats fade-up" style={{ animationDelay: '0.4s' }}>
          <div className="stat">
            <span className="stat-num">+100</span>
            <span className="stat-label">Trabajos realizados</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">10+</span>
            <span className="stat-label">Años de experiencia</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Trabajos garantizados</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-line" />
      </div>
    </section>
  )
}
