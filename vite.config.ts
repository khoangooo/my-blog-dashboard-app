import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
      { find: '@routes', replacement: path.resolve(__dirname, 'src/routes') },
      { find: '@modules', replacement: path.resolve(__dirname, 'src/modules') },
      { find: '@containers', replacement: path.resolve(__dirname, 'src/containers') },
      { find: '@types', replacement: path.resolve(__dirname, 'src/types') },
    ],
  },
})
