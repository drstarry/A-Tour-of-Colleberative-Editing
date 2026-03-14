import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/A-Tour-of-Colleberative-Editing/',
  server: {
    port: 3000,
  },
})
