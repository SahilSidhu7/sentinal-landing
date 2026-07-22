import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/sentinal-landing/', // GitHub Pages project site — served from this subpath, not domain root
  plugins: [react()],
})
