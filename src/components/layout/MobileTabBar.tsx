"use client"
import { NavLink } from "react-router-dom"
import { Home, Search, Camera, Gift, User } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { motion } from "framer-motion"

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/explore", icon: Search, label: "Explore" },
  { path: "/scan", icon: Camera, label: "Scan", vipOnly: true },
  { path: "/rewards", icon: Gift, label: "Rewards", vipOnly: true },
  { path: "/me", icon: User, label: "Profile", vipOnly: true },
]

export default function MobileTabBar() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-interactive-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map(({ path, icon: Icon, label, vipOnly }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-gold bg-gold/10"
                  : vipOnly && !isAuthenticated
                    ? "text-text-tertiary"
                    : "text-text-secondary hover:text-text-primary"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Icon size={20} />
                  {vipOnly && !isAuthenticated && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    </div>
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                      layoutId="activeTab"
                    />
                  )}
                </div>
                <span className="text-xs mt-1 font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
