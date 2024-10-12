import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server : {host : true}
  server: {
    port: 3000 // or any port you want
  }
})

