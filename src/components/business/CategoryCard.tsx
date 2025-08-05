"use client"
import { motion } from "framer-motion"

interface CategoryCardProps {
  title: string
  imageUrl: string
  onPress: (category: string) => void
  storeCount?: number
}

export default function CategoryCard({ title, imageUrl, onPress, storeCount }: CategoryCardProps) {
  return (
    <motion.div
      className="bg-surface border border-interactive-border rounded-xl overflow-hidden hover:bg-surface-elevated transition-colors cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onPress(title)}
    >
      <div className="relative">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-24 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="font-semibold text-white text-sm">{title}</h3>
          {storeCount && <p className="text-white/80 text-xs">{storeCount} stores</p>}
        </div>
      </div>
    </motion.div>
  )
}
