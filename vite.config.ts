import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      // '/api': 'http://api-driver.marsview.cc'
      '/api': 'http://driver.marsview.cc'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@amis-themes': path.resolve(__dirname, 'node_modules/amis/lib/themes')
    }
  },
  plugins: [react()]
})
