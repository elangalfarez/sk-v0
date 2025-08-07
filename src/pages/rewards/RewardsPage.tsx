"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Search, Filter, Gift, Star } from 'lucide-react'
import { MultiApiService } from "@/services/MultiApiService"
import { useAuth } from "@/hooks/useAuth"
import RewardItem from "@/components/business/RewardItem"
import LoadingSpinner from "@/components/common/LoadingSpinner"
import type { Reward } from "@/types"

export default function RewardsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState<"points" | "popularity" | "expiry">("points")

  const { data: rewards, isLoading } = useQuery({
    queryKey: ["rewards", "all"],
    queryFn: () => MultiApiService.getAllRewards(),
  })

  const { data: pointsBalance } = useQuery({
    queryKey: ["points", "balance"],
    queryFn: () => MultiApiService.getPointsBalance(),
  })

  const categories = [
    { title: "All", count: rewards?.length || 0 },
    { title: "Food & Beverage", count: rewards?.filter(r => r.category === "Food & Beverage").length || 0 },
    { title: "Fashion", count: rewards?.filter(r => r.category === "Fashion").length || 0 },
    { title: "Entertainment", count: rewards?.filter(r => r.category === "Entertainment").length || 0 },
    { title: "Electronics", count: rewards?.filter(r => r.category === "Electronics").length || 0 },
  ]

  const filteredAndSortedRewards = rewards
    ?.filter((reward: Reward) => {
      const matchesSearch = reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           reward.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || selectedCategory === "All" || reward.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    ?.sort((a: Reward, b: Reward) => {
      switch (sortBy) {
        case "points":
          return a.pointsCost - b.pointsCost
        case "popularity":
          return (b.popularity || 0) - (a.popularity || 0)
        case "expiry":
          if (!a.validUntil && !b.validUntil) return 0
          if (!a.validUntil) return 1
          if (!b.validUntil) return -1
          return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
        default:
          return 0
      }
    }) || []

  const handleRedemption = (rewardId: string) => {
    // Handle reward redemption
    console.log("Redeeming reward:", rewardId)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-interactive-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Rewards</h1>
            <p className="text-text-secondary">Redeem your points for exclusive rewards</p>
          </div>
          
          {pointsBalance && (
            <div className="text-right">
              <p className="text-text-secondary text-sm">Available Points</p>
              <p className="text-2xl font-bold text-gold">{pointsBalance.currentBalance.toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search rewards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-interactive-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-gold"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category.title}
                onClick={() => setSelectedCategory(category.title === "All" ? "" : category.title)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  (selectedCategory === category.title) || (selectedCategory === "" && category.title === "All")
                    ? "bg-gold text-black"
                    : "bg-surface-elevated text-text-secondary hover:text-text-primary"
                }`}
              >
                {category.title} ({category.count})
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "points" | "popularity" | "expiry")}
            className="ml-4 bg-surface-elevated border border-interactive-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold"
          >
            <option value="points">Sort by Points</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="expiry">Sort by Expiry</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Featured Rewards */}
        <section className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="text-gold fill-gold" size={20} />
            <h2 className="text-lg font-bold text-text-primary">Featured Rewards</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {filteredAndSortedRewards.slice(0, 2).map((reward) => (
              <div key={reward.id} className="bg-surface border border-interactive-border rounded-xl overflow-hidden">
                <img 
                  src={reward.imageUrl || "/placeholder.svg"} 
                  alt={reward.name}
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-semibold text-text-primary text-sm mb-1">{reward.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gold">
                      <Gift size={12} />
                      <span className="font-bold text-xs">{reward.pointsCost.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handleRedemption(reward.id)}
                      disabled={!pointsBalance || pointsBalance.currentBalance < reward.pointsCost}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        pointsBalance && pointsBalance.currentBalance >= reward.pointsCost
                          ? "bg-gold text-black"
                          : "bg-interactive-button-disabled text-text-tertiary"
                      }`}
                    >
                      Redeem
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Rewards */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-text-primary">All Rewards</h2>
            <p className="text-text-secondary text-sm">
              {filteredAndSortedRewards.length} reward{filteredAndSortedRewards.length !== 1 ? "s" : ""} available
            </p>
          </div>

          {filteredAndSortedRewards.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="text-text-secondary" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">No rewards found</h3>
              <p className="text-text-secondary">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedRewards.map((reward) => (
                <RewardItem
                  key={reward.id}
                  reward={reward}
                  onRedeem={handleRedemption}
                  canAfford={pointsBalance ? pointsBalance.currentBalance >= reward.pointsCost : false}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
