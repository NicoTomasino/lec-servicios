import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cambiá 'lec-servicios' por el nombre exacto de tu repo en GitHub
export default defineConfig({
  plugins: [react()],
  base: '/lec-servicios/',
})
