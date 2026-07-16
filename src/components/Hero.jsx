import { ArrowRight, Zap } from 'lucide-react'
import { useTextos } from '../lib/useTextos'
import './Hero.css'

// "Soluciones para *tu hogar* y empresa" → pinta naranja lo que está entre *
function resaltar(texto) {
  return texto.split(/(\*[^*]+\*)/g).map((parte, i) =>
    parte.startsWith('*') && parte.endsWith('*')
      ? <span key={i}>{parte.slice(1, -1)}</span>
      : parte
  )
}

export default function Hero() {
  const { textos } = useTextos()

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
          {resaltar(textos.hero_titulo)}
        </h1>

        <p className="hero-sub fade-up" style={{ animationDelay: '0.2s' }}>
          {textos.hero_subtitulo}
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