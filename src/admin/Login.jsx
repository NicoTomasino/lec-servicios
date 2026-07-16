import { useState } from 'react'
import { LogIn } from 'lucide-react'
import { supabase } from '../lib/supabase'
import './Admin.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const entrar = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email o contraseña incorrectos')
    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <form className="login-box" onSubmit={entrar}>
        <h1 className="login-title">LEC <span>Admin</span></h1>
        <p className="login-sub">Ingresá para administrar la web</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Entrando...' : <>Entrar <LogIn size={16} /></>}
        </button>
      </form>
    </div>
  )
}