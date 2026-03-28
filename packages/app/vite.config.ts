import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react({jsxRuntime: 'classic'})],
  resolve: {
    alias: {
      '@pigmentstudio/convert': path.resolve(__dirname, '../convert/src/index.ts')
    }
  },
  define: {
    global: 'globalThis'
  },
  optimizeDeps: {
    exclude: ['react/jsx-runtime', 'react/jsx-dev-runtime']
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'build'
  }
})
