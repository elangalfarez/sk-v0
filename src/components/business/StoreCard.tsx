"use client"
import { motion } from "framer-motion"
import { MapPin, Clock, Star, Crown } from "lucide-react"
import type { Store } from "@/types"

interface StoreCardProps {
  store: Store
  onPress: (storeId: string) => void
  showVIPBadge?: boolean
}

export default function StoreCard({ store, onPress, showVIPBadge = false }: StoreCardProps) {
  const isOpen = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentTime = currentHour * 60 + currentMinute

    const isWeekend = now.getDay() === 0 || now.getDay() === 6
    const hours = isWeekend ? store.operatingHours.weekends : store.operatingHours.weekdays

    const [openHour, openMinute] = hours.open.split(":").map(Number)
    const [closeHour, closeMinute] = hours.close.split(":").map(Number)

    const openTime = openHour * 60 + openMinute
    const closeTime = closeHour * 60 + closeMinute

    return currentTime >= openTime && currentTime <= closeTime
  }

  return (
    <motion.div
      className="bg-surface border border-interactive-border rounded-xl overflow-hidden hover:bg-surface-elevated transition-colors cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onPress(store.id)}
    >
      <div className="relative">
        <img src={store.imageUrl || "/placeholder.svg"} alt={store.name} className="w-full h-32 object-cover" />

        {showVIPBadge && store.isVIPPartner && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-gold to-yellow-600 text-black px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
            <Crown size={12} />
            <span>VIP</span>
          </div>
        )}

        <div
          className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
            isOpen()
              ? "bg-success/20 text-success border border-success/30"
              : "bg-error/20 text-error border border-error/30"
          }`}
        >
          {isOpen() ? "Open" : "Closed"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-text-primary text-lg">{store.name}</h3>
            <p className="text-text-secondary text-sm">{store.category}</p>
          </div>

          {store.rating && (
            <div className="flex items-center space-x-1 ml-2">
              <Star className="text-gold fill-gold" size={14} />
              <span className="text-text-secondary text-sm">{store.rating}</span>
            </div>
          )}
        </div>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">{store.description}</p>

        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <div className="flex items-center space-x-1">
            <MapPin size={12} />
            <span>
              {store.floor} • {store.unitNumber}
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <Clock size={12} />
            <span>
              {isOpen()
                ? `Until ${store.operatingHours.weekdays.close}`
                : `Opens ${store.operatingHours.weekdays.open}`}
            </span>
          </div>
        </div>

        {store.currentPromotions.length > 0 && (
          <div className="mt-3 pt-3 border-t border-interactive-border">
            <div className="flex items-center space-x-1 text-gold text-xs">
              <Star size={12} />
              <span className="font-medium">{store.currentPromotions[0]}</span>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
