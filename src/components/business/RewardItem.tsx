"use client"
import { motion } from "framer-motion"
import { Gift, Clock, Crown } from "lucide-react"
import type { Reward } from "@/types"

interface RewardItemProps {
  reward: Reward
  onRedeem: (rewardId: string) => void
  canAfford: boolean
}

export default function RewardItem({ reward, onRedeem, canAfford }: RewardItemProps) {
  const isExpiringSoon = () => {
    if (!reward.validUntil) return false
    const endDate = new Date(reward.validUntil)
    const now = new Date()
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 7 && diffDays > 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      className="bg-surface border border-interactive-border rounded-xl overflow-hidden hover:bg-surface-elevated transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex">
        <div className="relative w-24 h-24 flex-shrink-0">
          <img src={reward.imageUrl || "/placeholder.svg"} alt={reward.name} className="w-full h-full object-cover" />

          {reward.isVIPExclusive && (
            <div className="absolute top-1 right-1 bg-gradient-to-r from-gold to-yellow-600 text-black p-1 rounded-full">
              <Crown size={10} />
            </div>
          )}

          {isExpiringSoon() && (
            <div className="absolute bottom-1 left-1 bg-warning/20 text-warning border border-warning/30 px-1 py-0.5 rounded text-xs font-medium">
              <Clock size={8} className="inline mr-1" />
              Soon
            </div>
          )}
        </div>

        <div className="flex-1 p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary text-sm">{reward.name}</h3>
              <p className="text-text-secondary text-xs">{reward.partnerName}</p>
            </div>

            <div className="text-right ml-2">
              <div className="flex items-center space-x-1 text-gold">
                <Gift size={12} />
                <span className="font-bold text-sm">{reward.pointsCost.toLocaleString()}</span>
              </div>
              <p className="text-xs text-text-tertiary">points</p>
            </div>
          </div>

          <p className="text-text-secondary text-xs mb-2 line-clamp-2">{reward.description}</p>

          <div className="flex items-center justify-between">
            <div className="text-xs text-text-tertiary">
              {reward.isLimited && <span>Stock: {reward.stockAvailable}</span>}
              {reward.validUntil && <span>Until {formatDate(reward.validUntil)}</span>}
            </div>

            <button
              onClick={() => onRedeem(reward.id)}
              disabled={!canAfford || reward.stockAvailable === 0}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                canAfford && reward.stockAvailable > 0
                  ? "bg-gradient-to-r from-gold to-yellow-600 text-black hover:shadow-gold"
                  : "bg-interactive-button-disabled text-text-tertiary cursor-not-allowed"
              }`}
            >
              {reward.stockAvailable === 0 ? "Out of Stock" : "Redeem"}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
