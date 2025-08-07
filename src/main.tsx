import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

// Robust PWA registration that works in all environments
const initializePWA = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Try to use vite-plugin-pwa first
      const { registerSW } = await import('virtual:pwa-register')
      
      const updateSW = registerSW({
        onNeedRefresh() {
          if (confirm('New content available. Reload to update?')) {
            updateSW(true)
          }
        },
        onOfflineReady() {
          console.log('App ready to work offline')
        }
      })
    } catch (error) {
      console.log('Using fallback service worker registration')
      
      // Fallback manual registration if vite-plugin-pwa fails
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/'
        })
        
        console.log('Service worker registered manually:', registration)
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                if (confirm('New version available. Reload to update?')) {
                  window.location.reload()
                }
              }
            })
          }
        })
      } catch (swError) {
        console.log('Service worker registration failed:', swError)
      }
    }
  }
}

// Initialize PWA
initializePWA()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)