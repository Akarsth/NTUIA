import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Served from the root of https://ntuia.org, so base is '/'.
// If you test on https://akarsth.github.io/NTUIA/ before the domain is set,
// temporarily change base to '/NTUIA/'.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
