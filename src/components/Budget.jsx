import { useState } from 'react'
import { MessageSquare, ChevronRight, Check, Send } from 'lucide-react'
import './Budget.css'

const STEPS = [
  {
    id: 'servicio',
    question: '¿Qué servicio necesitás?',
    options: ['Electricidad', 'Aire Acondicionado', 'Pintura', 'Varios servicios'],
  },
  {
    id: 'tipo',
    question: '¿Es para un hogar o empresa?',
    options: ['Hogar / Departamento', 'Local comercial', 'Oficina', 'Industria / Depósito'],
  },
  {
    id: 'urgencia',
    question: '¿Con qué urgencia lo necesitás?',
    options: ['Lo antes posible', 'Esta semana', 'Este mes', 'Solo quiero una idea de precio'],
  },
]

export default function Budget() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [contact, setContact] = useState({ nombre: '', telefono: '' })
  const [sent, setSent] = useState(false)

  const current = STEPS[step]
  const isContactStep = step === STEPS.length
  const isDone = sent

  const choose = (option) => {
    const updated = { ...answers, [current.id]: option }
    setAnswers(updated)
    setStep(s => s + 1)
  }

  const handleSend = (e) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Hola! Quiero un presupuesto.\n\n` +
      `Servicio: ${answers.servicio}\n` +
      `Tipo: ${answers.tipo}\n` +
      `Urgencia: ${answers.urgencia}\n` +
      `Nombre: ${contact.nombre}\n` +
      `Teléfono: ${contact.telefono}`
    )
    window.open(`https://wa.me/5492364694855?text=${msg}`, '_blank')
    setSent(true)
  }

  const reset = () => { setStep(0); setAnswers({}); setContact({ nombre: '', telefono: '' }); setSent(false) }

  return (
    <section id="presupuesto" className="budget-section">
      <div className="container budget-inner">
        <div className="budget-left">
          <p className="section-label">Sin cargo</p>
          <h2 className="section-title">Pedí tu<br /><span>presupuesto</span></h2>
          <p className="budget-desc">
            Respondé 3 preguntas rápidas y te contactamos por WhatsApp con un presupuesto
            personalizado. Sin compromiso, sin costo.
          </p>
          <div className="budget-features">
            {['Respuesta las 24hs', 'Visita técnica sin cargo', 'Presupuesto detallado por escrito'].map((f, i) => (
              <div key={i} className="budget-feature">
                <Check size={16} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="budget-bot">
          <div className="bot-header">
            <div className="bot-avatar">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="bot-name">Asistente LEC</p>
              <p className="bot-status">● En línea</p>
            </div>
          </div>

          <div className="bot-chat">
            {/* Answered steps */}
            {Object.entries(answers).map(([id, val], i) => {
              const s = STEPS.find(s => s.id === id)
              return (
                <div key={id} className="chat-row">
                  <div className="chat-bubble bot-bubble">{s.question}</div>
                  <div className="chat-bubble user-bubble">{val} <Check size={12} /></div>
                </div>
              )
            })}

            {/* Current step */}
            {!isDone && !isContactStep && (
              <div className="chat-row">
                <div className="chat-bubble bot-bubble">{current.question}</div>
                <div className="options-row">
                  {current.options.map(opt => (
                    <button key={opt} className="option-btn" onClick={() => choose(opt)}>
                      {opt} <ChevronRight size={14} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact step */}
            {isContactStep && !isDone && (
              <div className="chat-row">
                <div className="chat-bubble bot-bubble">Perfecto! ¿Cómo te llamás y cuál es tu número?</div>
                <form className="contact-form-inline" onSubmit={handleSend}>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={contact.nombre}
                    onChange={e => setContact(c => ({ ...c, nombre: e.target.value }))}
                  />
                  <input
                    type="tel"
                    placeholder="Tu teléfono"
                    required
                    value={contact.telefono}
                    onChange={e => setContact(c => ({ ...c, telefono: e.target.value }))}
                  />
                  <button type="submit" className="btn-primary">
                    Enviar por WhatsApp <Send size={16} />
                  </button>
                </form>
              </div>
            )}

            {/* Done */}
            {isDone && (
              <div className="chat-row">
                <div className="chat-bubble bot-bubble">
                  ¡Genial, {contact.nombre}! Te redirigimos a WhatsApp. En breve te contactamos. 🎉
                </div>
                <button className="option-btn" onClick={reset}>Hacer otra consulta</button>
              </div>
            )}
          </div>

          <div className="bot-progress">
            {STEPS.map((_, i) => (
              <div key={i} className={`progress-dot ${i < step ? 'done' : i === step ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
