"use client"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Gift, Calendar } from "lucide-react"
import type { PointsTransaction } from "@/types"

interface TransactionItemProps {
  transaction: PointsTransaction
  onPress?: (transactionId: string) => void
}

export default function TransactionItem({ transaction, onPress }: TransactionItemProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case "Earn":
      case "Bonus":
        return TrendingUp
      case "Redeem":
        return Gift
      case "Expire":
      case "Adjustment":
        return TrendingDown
      default:
        return Calendar
    }
  }

  const getIconColor = () => {
    switch (transaction.type) {
      case "Earn":
      case "Bonus":
        return "text-success"
      case "Redeem":
        return "text-gold"
      case "Expire":
      case "Adjustment":
        return "text-error"
      default:
        return "text-text-secondary"
    }
  }

  const getAmountColor = () => {
    return transaction.amount > 0 ? "text-success" : "text-error"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const Icon = getIcon()

  return (
    <motion.div
      className={`bg-surface border border-interactive-border rounded-xl p-4 ${
        onPress ? "hover:bg-surface-elevated transition-colors cursor-pointer" : ""
      }`}
      whileHover={onPress ? { scale: 1.02 } : {}}
      whileTap={onPress ? { scale: 0.98 } : {}}
      onClick={() => onPress?.(transaction.id)}
    >
      <div className="flex items-center space-x-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            transaction.type === "Earn" || transaction.type === "Bonus"
              ? "bg-success/20"
              : transaction.type === "Redeem"
                ? "bg-gold/20"
                : "bg-error/20"
          }`}
        >
          <Icon className={getIconColor()} size={20} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-text-primary">{transaction.description}</h3>
            <span className={`font-bold ${getAmountColor()}`}>
              {transaction.amount > 0 ? "+" : ""}
              {transaction.amount.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm text-text-secondary">
            <span>{transaction.source}</span>
            <span>{formatDate(transaction.date)}</span>
          </div>

          {transaction.storeInfo && (
            <div className="flex items-center space-x-2 mt-2">
              <img
                src={transaction.storeInfo.logo || "/placeholder.svg"}
                alt={transaction.storeInfo.name}
                className="w-4 h-4 rounded"
              />
              <span className="text-xs text-text-tertiary">{transaction.storeInfo.name}</span>
              {transaction.multiplier && transaction.multiplier > 1 && (
                <span className="text-xs text-gold font-medium">{transaction.multiplier}x multiplier</span>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
