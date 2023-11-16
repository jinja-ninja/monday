import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend/public',
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './node_modules'),
    }
  },
  //for build
  // define: { _global: ({}), },
  
  //working local
  define: {
    global: {},
  }
})
