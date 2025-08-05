import { Crown, Star, Diamond } from "lucide-react"
import type { CustomerProfile } from "@/types"

interface TierBadgeProps {
  tier: CustomerProfile["memberTier"]
  size?: "sm" | "md" | "lg"
}

export default function TierBadge({ tier, size = "md" }: TierBadgeProps) {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  }

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 20,
  }

  const getTierConfig = () => {
    switch (tier) {
      case "Gold":
        return {
          bg: "bg-gradient-to-r from-tier-gold to-yellow-600",
          text: "text-black",
          icon: Crown,
          label: "Gold",
        }
      case "Platinum":
        return {
          bg: "bg-gradient-to-r from-tier-platinum to-gray-300",
          text: "text-black",
          icon: Star,
          label: "Platinum",
        }
      case "Diamond":
        return {
          bg: "bg-gradient-to-r from-tier-diamond to-blue-400",
          text: "text-white",
          icon: Diamond,
          label: "Diamond",
        }
      default:
        return {
          bg: "bg-gradient-to-r from-tier-gold to-yellow-600",
          text: "text-black",
          icon: Crown,
          label: "Gold",
        }
    }
  }

  const config = getTierConfig()
  const Icon = config.icon

  return (
    <div
      className={`${config.bg} ${config.text} ${sizeClasses[size]} rounded-full flex items-center justify-center font-bold shadow-lg`}
    >
      <Icon size={iconSize[size]} />
    </div>
  )
}
