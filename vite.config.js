import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['b9d44b88-adf5-4298-b978-cc85336bb63a-00-2ofc0gt9z25d6.sisko.replit.dev'],
  }
})
