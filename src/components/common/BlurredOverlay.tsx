"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Star, Crown } from "lucide-react"

interface BlurredOverlayProps {
  children: React.ReactNode
  featureName: string
  onUpgradeClick: () => void
}

export default function BlurredOverlay({ children, featureName, onUpgradeClick }: BlurredOverlayProps) {
  return (
    <div className="relative">
      <div className="filter blur-sm pointer-events-none opacity-60">{children}</div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xs rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-center p-6 bg-surface/90 rounded-xl border-2 border-gold/50 backdrop-blur-sm max-w-xs mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-gold to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="text-black" size={20} />
          </div>

          <div className="flex items-center justify-center gap-1 mb-2">
            <Star className="text-gold fill-gold" size={16} />
            <h3 className="text-gold font-bold text-lg">VIP Exclusive</h3>
            <Star className="text-gold fill-gold" size={16} />
          </div>

          <p className="text-text-secondary text-sm mb-4">
            Unlock <span className="text-gold font-medium">{featureName}</span> with VIP membership
          </p>

          <button
            onClick={onUpgradeClick}
            className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-gold transition-all duration-300 text-sm"
          >
            Become VIP Member
          </button>

          <p className="text-xs text-text-tertiary mt-2">Visit Customer Service to register</p>
        </motion.div>
      </motion.div>
    </div>
  )
}
