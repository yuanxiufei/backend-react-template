import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // host: 'hsa.guahao-test.com',
    host: 'localhost',
    port: 8001,
    open: true,
    cors: true,
    proxy: {
      '/api': {
        // target: 'https://apitcme.guahao-test.com/bqex',
        // target: 'http://api-driver.marsview.cc',
        target: 'http://driver.marsview.cc',
        changeOrigin: true,
        secure: false,
        // rewrite: path => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Response:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [react()]
})
