"use client"

import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Crown, ShoppingBag, Gift, Star } from "lucide-react"

export default function WelcomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto-redirect to main app after 3 seconds
    const timer = setTimeout(() => {
      navigate("/", { replace: true })
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  const handleSkip = () => {
    navigate("/", { replace: true })
  }

  const handleGetStarted = () => {
    navigate("/vip-info")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background flex flex-col items-center justify-center p-6">
      {/* Logo Animation */}
      <motion.div
        className="mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        <div className="w-24 h-24 bg-gradient-to-r from-gold to-yellow-600 rounded-3xl flex items-center justify-center shadow-gold">
          <Crown className="text-black" size={48} />
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h1 className="text-4xl font-bold text-text-primary mb-2">Welcome to</h1>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent mb-4">
          Supermal Karawaci
        </h2>
        <p className="text-text-secondary text-lg max-w-md">
          Your premium shopping companion. Discover stores, earn rewards, and enjoy exclusive benefits.
        </p>
      </motion.div>

      {/* Features */}
      <motion.div
        className="grid grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-3 border border-interactive-border">
            <ShoppingBag className="text-gold" size={24} />
          </div>
          <p className="text-text-secondary text-sm">Browse Stores</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-3 border border-interactive-border">
            <Gift className="text-gold" size={24} />
          </div>
          <p className="text-text-secondary text-sm">Earn Rewards</p>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-3 border border-interactive-border">
            <Star className="text-gold" size={24} />
          </div>
          <p className="text-text-secondary text-sm">VIP Benefits</p>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="w-full max-w-sm space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <button
          onClick={handleGetStarted}
          className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:shadow-gold transition-all duration-300"
        >
          Get Started
        </button>

        <button
          onClick={handleSkip}
          className="w-full text-text-secondary py-3 rounded-xl font-medium hover:text-text-primary transition-colors"
        >
          Skip for now
        </button>
      </motion.div>

      {/* Auto-redirect indicator */}
      <motion.div
        className="mt-8 flex items-center space-x-2 text-text-tertiary text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="w-2 h-2 bg-gold rounded-full animate-pulse" />
        <span>Auto-redirecting in 3 seconds...</span>
      </motion.div>
    </div>
  )
}
