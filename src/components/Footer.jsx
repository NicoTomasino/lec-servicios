import { MessageCircle } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="src/assets/logo.png" alt="LEC Servicios" className="footer-logo" />
          <div>
            <p className="footer-name">LEC <strong>Servicios</strong></p>
            <p className="footer-tagline">Electricidad · AC · Pintura</p>
          </div>
        </div>

        <nav className="footer-links">
          {['#servicios', '#nosotros', '#galeria', '#presupuesto', '#contacto'].map((href, i) => {
            const labels = ['Servicios', 'Nosotros', 'Galería', 'Presupuesto', 'Contacto']
            return <a key={href} href={href}>{labels[i]}</a>
          })}
        </nav>

        <a
          href="https://wa.me/5492364694855"
          target="_blank"
          rel="noreferrer"
          className="footer-wa"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} LEC Servicios · Rosario, Argentina</p>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/5492364694855?text=Hola!%20Quiero%20hacer%20una%20consulta."
        target="_blank"
        rel="noreferrer"
        className="wa-float"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    </footer>
  )
}
