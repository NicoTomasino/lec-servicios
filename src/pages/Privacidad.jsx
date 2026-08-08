import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import './Privacidad.css'

export default function Privacidad() {
  return (
    <div className="privacidad">
      <div className="privacidad-container">
        <Link to="/" className="privacidad-volver">
          <ArrowLeft size={18} /> Volver al inicio
        </Link>

        <h1>Política de Privacidad</h1>
        <p className="privacidad-fecha">Última actualización: {new Date().getFullYear()}</p>

        <section>
          <h2>1. Responsable</h2>
          <p>
            LEC Servicios es responsable del tratamiento de los datos personales que se
            recolectan a través de este sitio web (lecservicios.com.ar). Prestamos servicios
            de electricidad, aire acondicionado y pintura en Junín, provincia de Buenos Aires.
          </p>
        </section>

        <section>
          <h2>2. Qué datos recolectamos</h2>
          <p>
            Solo recolectamos los datos que vos nos proporcionás voluntariamente al completar
            el formulario de presupuesto: tu nombre y tu número de teléfono. No pedimos ni
            almacenamos datos sensibles.
          </p>
        </section>

        <section>
          <h2>3. Para qué los usamos</h2>
          <p>
            Usamos esos datos con un único fin: contactarte por WhatsApp para responder tu
            consulta o enviarte un presupuesto. No los usamos para publicidad, no los vendemos
            ni los compartimos con terceros.
          </p>
        </section>

        <section>
          <h2>4. Cómo se envían</h2>
          <p>
            Al completar el formulario, tus datos se envían directamente a nuestro WhatsApp a
            través de un enlace. No se almacenan en una base de datos de este sitio.
          </p>
        </section>

        <section>
          <h2>5. Almacenamiento técnico</h2>
          <p>
            Este sitio utiliza almacenamiento local del navegador únicamente para recordar tus
            preferencias (como la aceptación de este aviso). No utilizamos cookies de
            seguimiento, analítica ni publicidad de terceros.
          </p>
        </section>

        <section>
          <h2>6. Tus derechos</h2>
          <p>
            De acuerdo con la Ley 25.326 de Protección de los Datos Personales de la República
            Argentina, tenés derecho a acceder, rectificar y solicitar la supresión de tus
            datos. Para ejercerlos, contactanos por WhatsApp al +54 9 236 469-4855.
          </p>
          <p>
            La AGENCIA DE ACCESO A LA INFORMACIÓN PÚBLICA, órgano de control de la Ley 25.326,
            tiene la atribución de atender denuncias y reclamos relacionados con el
            incumplimiento de las normas sobre protección de datos personales.
          </p>
        </section>

        <section>
          <h2>7. Contacto</h2>
          <p>
            Ante cualquier duda sobre esta política, escribinos por WhatsApp al
            +54 9 236 469-4855 o a través de nuestras redes sociales.
          </p>
        </section>
      </div>
    </div>
  )
}