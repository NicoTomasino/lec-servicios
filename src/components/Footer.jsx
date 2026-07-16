import { useState } from 'react'
import { MessageCircle, Instagram, Facebook, Share2, X } from 'lucide-react'
import { useTextos } from '../lib/useTextos'
import { waLink } from '../lib/wa'
import './Footer.css'

export default function Footer() {
  const [open, setOpen] = useState(false)
  const { textos } = useTextos()
  const wa = waLink(textos.contacto_telefono)

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="LEC Servicios" className="footer-logo" />
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

        <a href={wa} target="_blank" rel="noreferrer" className="footer-wa">
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} LEC Servicios · Junín, Buenos Aires, Argentina</p>
        </div>
      </div>

      <div className="wa-float-wrapper">
        {open && (
          <div className="wa-float-menu">
            <a href={wa} target="_blank" rel="noreferrer" className="wa-float-item wa-item" aria-label="WhatsApp">
              <MessageCircle size={20} />
            </a>
            <a href="https://www.instagram.com/lec.servicios/" target="_blank" rel="noreferrer" className="wa-float-item ig-item" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063773880998" target="_blank" rel="noreferrer" className="wa-float-item fb-item" aria-label="Facebook">
              <Facebook size={20} />
            </a>
          </div>
        )}
        <button className="wa-float" onClick={() => setOpen(!open)} aria-label="Redes sociales">
          {open ? <X size={26} /> : <Share2 size={26} />}
        </button>
      </div>
    </footer>
  )
}