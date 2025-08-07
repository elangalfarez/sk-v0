"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, User, Lock } from 'lucide-react'
import LoadingSpinner from "@/components/common/LoadingSpinner"

interface LoginFormProps {
  onSubmit: (credentials: { cif: string; password: string }) => Promise<void>
  isLoading: boolean
}

export default function LoginForm({ onSubmit, isLoading }: LoginFormProps) {
  const [formData, setFormData] = useState({
    cif: "",
    password: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ cif?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { cif?: string; password?: string } = {}
    
    if (!formData.cif.trim()) {
      newErrors.cif = "CIF is required"
    } else if (formData.cif.length < 8) {
      newErrors.cif = "CIF must be at least 8 characters"
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* CIF Input */}
      <div>
        <label htmlFor="cif" className="block text-sm font-medium text-text-primary mb-2">
          Customer ID (CIF)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="text-text-secondary" size={18} />
          </div>
          <input
            id="cif"
            type="text"
            value={formData.cif}
            onChange={(e) => handleInputChange("cif", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-surface border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.cif 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            placeholder="Enter your CIF"
            disabled={isLoading}
          />
        </div>
        {errors.cif && (
          <motion.p
            className="mt-1 text-sm text-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.cif}
          </motion.p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="text-text-secondary" size={18} />
          </div>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={`w-full pl-10 pr-12 py-3 bg-surface border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.password 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-text-primary transition-colors"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <motion.p
            className="mt-1 text-sm text-error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errors.password}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-3 rounded-xl font-bold text-lg hover:shadow-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color="white" />
            <span>Signing In...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </motion.button>
    </form>
  )
}
