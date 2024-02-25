import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '192.168.0.36', // Change the host as needed, e.g., '0.0.0.0' for external access
  //   // Other server configurations can be added here
  // }
})
