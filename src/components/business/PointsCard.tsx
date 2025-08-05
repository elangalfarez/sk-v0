"use client"
import { motion } from "framer-motion"
import { TrendingUp, Calendar, Gift } from "lucide-react"
import type { PointsBalance, CustomerProfile } from "@/types"
import TierBadge from "./TierBadge"

interface PointsCardProps {
  balance: PointsBalance
  tierProgress?: CustomerProfile["tierProgress"]
  user: CustomerProfile
  animated?: boolean
}

export default function PointsCard({ balance, tierProgress, user, animated = true }: PointsCardProps) {
  const progressPercentage = tierProgress ? (tierProgress.current / tierProgress.target) * 100 : 0

  return (
    <motion.div
      className="bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-6 border border-interactive-border shadow-premium"
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Header with Tier Badge */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Welcome back, {user.name.split(" ")[0]}!</h2>
          <p className="text-text-secondary text-sm">Member since {new Date(user.registrationDate).getFullYear()}</p>
        </div>
        <TierBadge tier={user.memberTier} size="lg" />
      </div>

      {/* Points Balance */}
      <div className="mb-6">
        <div className="flex items-end gap-2 mb-2">
          <motion.span
            className="text-4xl font-bold text-gold"
            initial={animated ? { scale: 0 } : {}}
            animate={animated ? { scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            {balance.currentBalance.toLocaleString()}
          </motion.span>
          <span className="text-text-secondary text-lg mb-1">points</span>
        </div>

        {balance.expiringPoints && (
          <div className="flex items-center gap-2 text-warning text-sm">
            <Calendar size={16} />
            <span>
              {balance.expiringPoints.amount.toLocaleString()} points expire on{" "}
              {new Date(balance.expiringPoints.expiryDate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      {/* Tier Progress */}
      {tierProgress && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary text-sm">Progress to {tierProgress.nextTier}</span>
            <span className="text-text-secondary text-sm">
              {tierProgress.current.toLocaleString()} / {tierProgress.target.toLocaleString()}
            </span>
          </div>

          <div className="w-full bg-onyx-gray rounded-full h-2 mb-2">
            <motion.div
              className="bg-gradient-to-r from-gold to-yellow-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>

          <p className="text-xs text-text-tertiary">
            {(tierProgress.target - tierProgress.current).toLocaleString()} more points to {tierProgress.nextTier}
          </p>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-success/20 rounded-full mx-auto mb-2">
            <TrendingUp className="text-success" size={20} />
          </div>
          <p className="text-xs text-text-tertiary">Total Earned</p>
          <p className="text-sm font-semibold text-text-primary">{balance.totalEarned.toLocaleString()}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-gold/20 rounded-full mx-auto mb-2">
            <Gift className="text-gold" size={20} />
          </div>
          <p className="text-xs text-text-tertiary">Redeemed</p>
          <p className="text-sm font-semibold text-text-primary">{balance.totalRedeemed.toLocaleString()}</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-info/20 rounded-full mx-auto mb-2">
            <Calendar className="text-info" size={20} />
          </div>
          <p className="text-xs text-text-tertiary">{balance.streakDays ? "Streak" : "Days"}</p>
          <p className="text-sm font-semibold text-text-primary">{balance.streakDays || 0}</p>
        </div>
      </div>
    </motion.div>
  )
}
