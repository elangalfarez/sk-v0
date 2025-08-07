import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        maximumFileSizeToCacheInBytes: 5000000,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/supermal-api\.vercel\.app\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      },
      manifest: {
        name: 'Supermal Karawaci Official',
        short_name: 'Supermal',
        description: 'Your premium shopping companion at Supermal Karawaci',
        theme_color: '#D4AF37',
        background_color: '#121421',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '32x32',
            type: 'image/svg+xml'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          api: ['axios', '@tanstack/react-query']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['workbox-window']
  }
})