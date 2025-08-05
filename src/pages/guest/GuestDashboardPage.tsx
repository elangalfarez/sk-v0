"use client"
import { motion } from "framer-motion"
import { Crown, ShoppingBag, Calendar, MapPin, Star, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { MultiApiService } from "@/services/MultiApiService"
import StoreCard from "@/components/business/StoreCard"
import PromotionCard from "@/components/business/PromotionCard"
import CategoryCard from "@/components/business/CategoryCard"

export default function GuestDashboardPage() {
  const navigate = useNavigate()

  const { data: stores } = useQuery({
    queryKey: ["stores", "featured"],
    queryFn: () => MultiApiService.getFeaturedStores(),
  })

  const { data: promotions } = useQuery({
    queryKey: ["promotions", "public"],
    queryFn: () => MultiApiService.getPublicPromotions(),
  })

  const { data: events } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => MultiApiService.getUpcomingEvents(),
  })

  const categories = [
    { title: "Fashion", imageUrl: "/fashion-store-boutique.png", storeCount: 45 },
    { title: "Food & Dining", imageUrl: "/placeholder-lkw36.png", storeCount: 32 },
    { title: "Electronics", imageUrl: "/electronics-store-interior.png", storeCount: 18 },
    { title: "Beauty", imageUrl: "/beauty-cosmetics-store.png", storeCount: 24 },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-br from-surface to-surface-elevated p-6 m-4 rounded-2xl border border-interactive-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary mb-1">Welcome to Supermal Karawaci</h1>
            <p className="text-text-secondary">Discover amazing stores and exclusive offers</p>
          </div>
          <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-600 rounded-2xl flex items-center justify-center">
            <Crown className="text-black" size={24} />
          </div>
        </div>

        {/* VIP Upgrade Prompt */}
        <motion.div
          className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4 mb-4"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Star className="text-gold fill-gold" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">Unlock VIP Benefits</h3>
                <p className="text-sm text-text-secondary">Earn points, get exclusive rewards</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/vip-info")}
              className="bg-gradient-to-r from-gold to-yellow-600 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-gold transition-all duration-300 flex items-center space-x-1"
            >
              <span>Learn More</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate("/explore")}
            className="bg-surface-elevated border border-interactive-border rounded-xl p-3 hover:bg-onyx-gray transition-colors"
          >
            <ShoppingBag className="text-gold mx-auto mb-2" size={20} />
            <p className="text-xs text-text-secondary">Browse Stores</p>
          </button>

          <button
            onClick={() => navigate("/events")}
            className="bg-surface-elevated border border-interactive-border rounded-xl p-3 hover:bg-onyx-gray transition-colors"
          >
            <Calendar className="text-gold mx-auto mb-2" size={20} />
            <p className="text-xs text-text-secondary">Events</p>
          </button>

          <button
            onClick={() => navigate("/explore")}
            className="bg-surface-elevated border border-interactive-border rounded-xl p-3 hover:bg-onyx-gray transition-colors"
          >
            <MapPin className="text-gold mx-auto mb-2" size={20} />
            <p className="text-xs text-text-secondary">Mall Map</p>
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Shop by Category</h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-gold font-medium text-sm hover:text-yellow-600 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              imageUrl={category.imageUrl}
              storeCount={category.storeCount}
              onPress={() => navigate(`/explore?category=${category.title}`)}
            />
          ))}
        </div>
      </section>

      {/* Featured Stores */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Featured Stores</h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-gold font-medium text-sm hover:text-yellow-600 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {stores?.slice(0, 3).map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onPress={(storeId) => navigate(`/stores/${storeId}`)}
              showVIPBadge={true}
            />
          ))}
        </div>
      </section>

      {/* Current Promotions */}
      <section className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary">Current Promotions</h2>
          <button
            onClick={() => navigate("/explore")}
            className="text-gold font-medium text-sm hover:text-yellow-600 transition-colors"
          >
            View All
          </button>
        </div>

        <div className="space-y-3">
          {promotions?.slice(0, 2).map((promotion) => (
            <PromotionCard key={promotion.id} promotion={promotion} onPress={() => {}} showVIPBadge={true} />
          ))}
        </div>
      </section>
    </div>
  )
}
