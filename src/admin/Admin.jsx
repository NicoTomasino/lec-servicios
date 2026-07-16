import { useState, useEffect } from 'react'
import { LogOut, Image, Type } from 'lucide-react'
import { supabase } from '../lib/supabase'
import Login from './Login'
import PanelFotos from './PanelFotos'
import PanelTextos from './PanelTextos'
import './Admin.css'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [tab, setTab] = useState('fotos')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setCargando(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  if (cargando) return <div className="login-wrapper"><p>Cargando...</p></div>
  if (!session) return <Login />

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="admin-header-inner">
          <h1 className="admin-logo">LEC <span>Admin</span></h1>
          <div className="admin-user">
            <span>{session.user.email}</span>
            <button onClick={() => supabase.auth.signOut()} className="btn-logout">
              <LogOut size={16} /> Salir
            </button>
          </div>
        </div>
      </header>

      <nav className="admin-tabs">
        <button
          className={tab === 'fotos' ? 'active' : ''}
          onClick={() => setTab('fotos')}
        >
          <Image size={16} /> Fotos
        </button>
        <button
          className={tab === 'textos' ? 'active' : ''}
          onClick={() => setTab('textos')}
        >
          <Type size={16} /> Textos
        </button>
      </nav>

      <main className="admin-main">
        {tab === 'fotos' ? <PanelFotos /> : <PanelTextos />}
      </main>
    </div>
  )
}