import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const waLink = 'https://wa.me/5492364694855?text=Hola!%20Quiero%20hacer%20una%20consulta.'

  return (
    <section id="contacto" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <p className="section-label">Hablemos</p>
          <h2 className="section-title">Contacto <span>directo</span></h2>
        </div>

        <div className="contact-grid">
          <div className="contact-cards">
            <a href={waLink} target="_blank" rel="noreferrer" className="contact-card contact-card--main">
              <div className="cc-icon"><MessageCircle size={28} /></div>
              <div>
                <p className="cc-label">WhatsApp</p>
                <p className="cc-value">+54 9 236 469-4855 </p>
                <p className="cc-sub">Respuesta rápida</p>
              </div>
            </a>

            <div className="contact-card">
              <div className="cc-icon"><Phone size={22} /></div>
              <div>
                <p className="cc-label">Teléfono</p>
                <p className="cc-value">+54 9 236 469-4855</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon"><Mail size={22} /></div>
              <div>
                <p className="cc-label">Email</p>
                <p className="cc-value">lecservicios@email.com</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon"><MapPin size={22} /></div>
              <div>
                <p className="cc-label">Zona de trabajo</p>
                <p className="cc-value">Junin y alrededores</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="cc-icon"><Clock size={22} /></div>
              <div>
                <p className="cc-label">Horario</p>
                <p className="cc-value">Disponibilidad Horaria Amplia</p>
              </div>
            </div>
          </div>

          <div className="contact-cta-box">
            <h3 className="cta-title">¿Necesitás una solución rápida?</h3>
            <p className="cta-desc">
              Escribinos ahora por WhatsApp y te respondemos en minutos.
              Presupuesto sin cargo, sin compromiso.
            </p>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary cta-btn">
              <MessageCircle size={20} />
              Escribir por WhatsApp
            </a>
            <p className="cta-note">También podés pedir turno por este medio</p>
          </div>
        </div>
      </div>
    </section>
  )
}
