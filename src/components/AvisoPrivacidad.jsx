import { useState, useEffect } from 'react'
import './AvisoPrivacidad.css'

const CLAVE = 'lec-consentimiento'

export default function AvisoPrivacidad() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE)
      if (!guardado) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  function decidir(valor) {
    try { localStorage.setItem(CLAVE, valor) } catch { /* sin almacenamiento, no pasa nada */ }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="aviso-privacidad" role="dialog" aria-label="Aviso de privacidad">
      <div className="aviso-texto">
        <strong>Aviso de privacidad</strong>
        <p>
          Usamos almacenamiento técnico necesario para el funcionamiento del sitio.
          No usamos seguimiento ni publicidad. Más info en nuestra{' '}
          <a href="/privacidad" target="_blank" rel="noreferrer">Política de Privacidad</a>.
        </p>
      </div>
      <div className="aviso-acciones">
        <button className="aviso-rechazar" onClick={() => decidir('rechazado')}>Rechazar</button>
        <button className="aviso-aceptar" onClick={() => decidir('aceptado')}>Aceptar</button>
      </div>
    </div>
  )
}