"use client"
import { Link, useNavigate } from "react-router-dom"
import { Bell, LogIn, Crown } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { motion } from "framer-motion"

export default function Header() {
  const { isAuthenticated, user, showVIPRegistrationInfo } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-surface border-b border-interactive-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-gold to-yellow-600 rounded-lg flex items-center justify-center">
              <Crown className="text-black" size={20} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-text-primary">Supermal</h1>
              <p className="text-xs text-text-secondary -mt-1">Karawaci</p>
            </div>
          </Link>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <button
                  onClick={() => navigate("/notifications")}
                  className="relative p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <Bell size={20} />
                  <div className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                    <p className="text-xs text-gold">{user?.memberTier} Member</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-gold to-yellow-600 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-sm">{user?.name.charAt(0)}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <motion.button
                  onClick={showVIPRegistrationInfo}
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-gold transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Crown size={16} />
                  <span>Become VIP</span>
                </motion.button>

                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <LogIn size={20} />
                  <span className="hidden sm:inline">Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
