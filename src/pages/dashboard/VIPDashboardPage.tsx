"use client"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "@/hooks/useAuth"
import { MultiApiService } from "@/services/MultiApiService"
import PointsCard from "@/components/business/PointsCard"
import TransactionItem from "@/components/business/TransactionItem"
import RewardItem from "@/components/business/RewardItem"
import { Camera, Gift, TrendingUp, Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function VIPDashboardPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { data: pointsBalance } = useQuery({
    queryKey: ["points", "balance"],
    queryFn: () => MultiApiService.getPointsBalance(),
  })

  const { data: recentTransactions } = useQuery({
    queryKey: ["transactions", "recent"],
    queryFn: () => MultiApiService.getRecentTransactions(),
  })

  const { data: recommendedRewards } = useQuery({
    queryKey: ["rewards", "recommended"],
    queryFn: () => MultiApiService.getRecommendedRewards(),
  })

  if (!user || !pointsBalance) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Points Card */}
      <div className="p-4">
        <PointsCard balance={pointsBalance} tierProgress={user.tierProgress} user={user} animated={true} />
      </div>

      {/* Quick Actions */}
      <section className="px-4 mb-6">
        <h2 className="text-lg font-bold text-text-primary mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-3">
          <motion.button
            onClick={() => navigate("/scan")}
            className="bg-surface border border-interactive-border rounded-xl p-4 hover:bg-surface-elevated transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Camera className="text-gold mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-text-primary">Scan Receipt</p>
            <p className="text-xs text-text-secondary">Earn Points</p>
          </motion.button>

          <motion.button
            onClick={() => navigate("/rewards")}
            className="bg-surface border border-interactive-border rounded-xl p-4 hover:bg-surface-elevated transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Gift className="text-gold mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-text-primary">Redeem</p>
            <p className="text-xs text-text-secondary">Use Points</p>
          </motion.button>

          <motion.button
            onClick={() => navigate("/me")}
            className="bg-surface border border-interactive-border rounded-xl p-4 hover:bg-surface-elevated transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="text-gold mx-auto mb-2" size={24} />
            <p className="text-sm font-medium text-text-primary">History</p>
            <p className="text-xs text-text-secondary">View All</p>
          </motion.button>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Recent Activity</h2>
          <button
            onClick={() => navigate("/me")}
            className="text-gold font-medium text-sm hover:text-yellow-600 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-2">
          {recentTransactions?.slice(0, 3).map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} onPress={() => {}} />
          ))}
        </div>
      </section>

      {/* Recommended Rewards */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-text-primary">Recommended for You</h2>
          <button
            onClick={() => navigate("/rewards")}
            className="text-gold font-medium text-sm hover:text-yellow-600 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {recommendedRewards?.slice(0, 2).map((reward) => (
            <RewardItem
              key={reward.id}
              reward={reward}
              onRedeem={(rewardId) => navigate(`/rewards/${rewardId}`)}
              canAfford={pointsBalance.currentBalance >= reward.pointsCost}
            />
          ))}
        </div>
      </section>

      {/* VIP Benefits Banner */}
      <section className="px-4">
        <motion.div
          className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <Bell className="text-gold" size={20} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary">VIP Exclusive Offers</h3>
              <p className="text-sm text-text-secondary">
                Check out special promotions available only for {user.memberTier} members
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
