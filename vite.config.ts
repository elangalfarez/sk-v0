import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/supermal-api\.vercel\.app\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              }
            }
          },
          {
            urlPattern: /^https:\/\/salamun-crm\.supermal\.com\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'vip-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5 // 5 minutes
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Supermal Karawaci Official',
        short_name: 'Supermal',
        description: 'Your premium shopping companion at Supermal Karawaci. Browse stores, earn points, get exclusive rewards.',
        theme_color: '#D4AF37',
        background_color: '#121421',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/vite.svg',
            sizes: '32x32',
            type: 'image/svg+xml'
          },
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable'
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
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          api: ['axios', '@tanstack/react-query'],
          capacitor: ['@capacitor/core', '@capacitor/camera', '@capacitor/haptics']
        }
      }
    }
  }
})