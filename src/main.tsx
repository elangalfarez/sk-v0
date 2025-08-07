import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { registerSW } from 'virtual:pwa-register'

// PWA Service Worker Registration
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload to update?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
    // You could show a toast notification here
  },
  onRegistered(registration) {
    console.log('Service Worker registered:', registration)
  },
  onRegisterError(error) {
    console.error('Service Worker registration failed:', error)
  }
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)