import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Admin from './admin/Admin.jsx'
import Privacidad from './pages/Privacidad.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/privacidad" element={<Privacidad />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)