import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/supermal-api\.vercel\.app\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?${Date.now()}`
              },
            },
          },
          {
            urlPattern: /^https:\/\/salamun-crm\.supermal\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "vip-api-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
            },
          },
        ],
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Supermal Karawaci Official",
        short_name: "Supermal",
        description: "Your premium shopping companion at Supermal Karawaci",
        theme_color: "#D4AF37",
        background_color: "#121421",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
          },
          {
            src: "icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
          },
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        categories: ["shopping", "lifestyle", "business"],
        shortcuts: [
          {
            name: "Find Stores",
            short_name: "Stores",
            description: "Browse all stores in the mall",
            url: "/explore",
            icons: [{ src: "icons/icon-96x96.png", sizes: "96x96" }],
          },
          {
            name: "Scan Receipt",
            short_name: "Scan",
            description: "Upload receipt to earn points",
            url: "/scan",
            icons: [{ src: "icons/icon-96x96.png", sizes: "96x96" }],
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          api: ["axios", "@tanstack/react-query"],
          capacitor: ["@capacitor/core", "@capacitor/camera", "@capacitor/haptics"],
        },
      },
    },
  },
})
