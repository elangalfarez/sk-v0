"use client"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Calendar, MapPin, Users, Crown, Clock } from 'lucide-react'
import { MultiApiService } from "@/services/MultiApiService"
import { useAuth } from "@/hooks/useAuth"
import { motion } from "framer-motion"
import type { Event } from "@/types"

export default function EventsPage() {
  const { isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showVIPOnly, setShowVIPOnly] = useState(false)

  const { data: events, isLoading } = useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: () => MultiApiService.getUpcomingEvents(),
  })

  const categories = [
    { title: "All", count: events?.length || 0 },
    { title: "Entertainment", count: events?.filter(e => e.category === "Entertainment").length || 0 },
    { title: "Shopping", count: events?.filter(e => e.category === "Shopping").length || 0 },
    { title: "Food", count: events?.filter(e => e.category === "Food").length || 0 },
    { title: "Fashion", count: events?.filter(e => e.category === "Fashion").length || 0 },
  ]

  const filteredEvents = events?.filter((event: Event) => {
    const matchesCategory = !selectedCategory || selectedCategory === "All" || event.category === selectedCategory
    const matchesVIP = !showVIPOnly || event.isVIPExclusive
    return matchesCategory && matchesVIP
  }) || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isEventToday = (dateString: string) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    return eventDate.toDateString() === today.toDateString()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-interactive-border p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-4">Events</h1>

        {/* Filters */}
        <div className="space-y-4">
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

          {isAuthenticated && (
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="vip-only"
                checked={showVIPOnly}
                onChange={(e) => setShowVIPOnly(e.target.checked)}
                className="rounded border-interactive-border text-gold focus:ring-gold"
              />
              <label htmlFor="vip-only" className="text-text-secondary text-sm flex items-center space-x-1">
                <Crown size={14} className="text-gold" />
                <span>VIP Events Only</span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Events List */}
      <div className="p-4">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-text-secondary" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No events found</h3>
            <p className="text-text-secondary">Check back later for upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className="bg-surface border border-interactive-border rounded-xl overflow-hidden hover:bg-surface-elevated transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative">
                  <img
                    src={event.imageUrl || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {event.isVIPExclusive && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-gold to-yellow-600 text-black px-2 py-1 rounded-full flex items-center space-x-1 text-xs font-bold">
                      <Crown size={12} />
                      <span>VIP</span>
                    </div>
                  )}

                  {isEventToday(event.startDate) && (
                    <div className="absolute top-3 left-3 bg-success/20 text-success border border-success/30 px-2 py-1 rounded-full text-xs font-medium">
                      Today
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-text-primary text-lg mb-1">{event.title}</h3>
                      <p className="text-text-secondary text-sm">{event.category}</p>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <Clock size={14} />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-text-secondary text-sm">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>

                    {event.capacity && (
                      <div className="flex items-center space-x-2 text-text-secondary text-sm">
                        <Users size={14} />
                        <span>
                          {event.registeredCount || 0} / {event.capacity} registered
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-surface-elevated text-text-tertiary text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        event.registrationRequired
                          ? "bg-gradient-to-r from-gold to-yellow-600 text-black hover:shadow-gold"
                          : "bg-surface-elevated text-text-secondary hover:bg-onyx-gray"
                      }`}
                    >
                      {event.registrationRequired ? "Register" : "Learn More"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
