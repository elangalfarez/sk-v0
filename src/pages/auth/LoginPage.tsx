"use client"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Crown, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useAuth } from "@/hooks/useAuth"
import LoginForm from "@/components/forms/LoginForm"

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (credentials: { cif: string; password: string }) => {
    setIsLoading(true)
    try {
      const success = await login(credentials)
      if (success) {
        navigate("/")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-background">
      {/* Header */}
      <div className="p-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center px-6 py-8">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-gold to-yellow-600 rounded-3xl flex items-center justify-center shadow-gold">
            <Crown className="text-black" size={40} />
          </div>
        </motion.div>

        {/* Welcome Text */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to your VIP account</p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </motion.div>

        {/* Footer Links */}
        <motion.div
          className="mt-8 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <button
            onClick={() => navigate("/vip-info")}
            className="text-gold hover:text-yellow-600 transition-colors font-medium"
          >
            Don't have an account? Learn about VIP membership
          </button>
          
          <div className="text-text-tertiary text-sm">
            <button className="hover:text-text-secondary transition-colors">
              Forgot Password?
            </button>
            <span className="mx-2">•</span>
            <button className="hover:text-text-secondary transition-colors">
              Need Help?
            </button>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          className="mt-8 bg-surface/50 border border-interactive-border rounded-xl p-4 max-w-sm w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h3 className="font-semibold text-text-primary mb-2 text-sm">Demo Account</h3>
          <div className="text-xs text-text-secondary space-y-1">
            <p>CIF: 12345678</p>
            <p>Password: demo123</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
