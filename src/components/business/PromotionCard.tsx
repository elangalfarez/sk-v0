"use client"
import { motion } from "framer-motion"
import { Calendar, Tag, Crown } from "lucide-react"
import type { Promotion } from "@/types"

interface PromotionCardProps {
  promotion: Promotion
  onPress: (promotionId: string) => void
  showVIPBadge?: boolean
}

export default function PromotionCard({ promotion, onPress, showVIPBadge = false }: PromotionCardProps) {
  const isExpiringSoon = () => {
    const endDate = new Date(promotion.endDate)
    const now = new Date()
    const diffTime = endDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 3 && diffDays > 0
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <motion.div
      className="bg-surface border border-interactive-border rounded-xl overflow-hidden hover:bg-surface-elevated transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onPress(promotion.id)}
    >
      <div className="relative">
        <img
          src={promotion.imageUrl || "/placeholder.svg"}
          alt={promotion.title}
          className="w-full h-32 object-cover"
        />

        {showVIPBadge && promotion.isVIPExclusive && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-gold to-yellow-600 text-black px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
            <Crown size={12} />
            <span>VIP</span>
          </div>
        )}

        {isExpiringSoon() && (
          <div className="absolute top-2 left-2 bg-warning/20 text-warning border border-warning/30 px-2 py-1 rounded-full text-xs font-medium">
            Ending Soon
          </div>
        )}

        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
          {promotion.discountType === "Percentage" && `${promotion.discountValue}% OFF`}
          {promotion.discountType === "Fixed" && `Rp ${promotion.discountValue.toLocaleString()} OFF`}
          {promotion.discountType === "Points" && `${promotion.discountValue}x Points`}
          {promotion.discountType === "BOGO" && "Buy 1 Get 1"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-lg">{promotion.title}</h3>
            <p className="text-text-secondary text-sm">{promotion.category}</p>
          </div>

          <div className="flex items-center space-x-1 ml-2 text-gold">
            <Tag size={14} />
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">{promotion.description}</p>

        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex items-center space-x-1">
            <Calendar size={12} />
            <span>
              {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
            </span>
          </div>

          {promotion.minimumSpend && <span>Min. Rp {promotion.minimumSpend.toLocaleString()}</span>}
        </div>
      </div>
    </motion.div>
  )
}
