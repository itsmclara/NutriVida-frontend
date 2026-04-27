import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "URL_DO_BACK",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
})