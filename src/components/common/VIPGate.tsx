"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import BlurredOverlay from "./BlurredOverlay"

interface VIPGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  featureName: string
  showTeaser?: boolean
}

export default function VIPGate({ children, fallback, featureName, showTeaser = true }: VIPGateProps) {
  const { isAuthenticated, showVIPRegistrationInfo } = useAuth()

  if (isAuthenticated) {
    return <>{children}</>
  }

  if (showTeaser) {
    return (
      <BlurredOverlay featureName={featureName} onUpgradeClick={showVIPRegistrationInfo}>
        {children}
      </BlurredOverlay>
    )
  }

  return (
    fallback || (
      <motion.div
        className="p-8 text-center bg-surface rounded-xl border border-interactive-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="text-gold" size={24} />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-2">VIP Feature</h3>
        <p className="text-text-secondary mb-4">This feature requires VIP membership</p>
        <button
          onClick={showVIPRegistrationInfo}
          className="bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:shadow-gold transition-all duration-300"
        >
          Learn About VIP
        </button>
      </motion.div>
    )
  )
}
