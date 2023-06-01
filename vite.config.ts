import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@/*', replacement: path.resolve(__dirname, 'src/*') },
    ],
  },
  server: {
    proxy: {
      '/api/v1': {
        target: 'https://localhost:4000',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
