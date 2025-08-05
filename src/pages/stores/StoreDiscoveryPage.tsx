"use client"

import { useState } from "react"
import { Search, MapPin, Grid, List } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useSearchParams } from "react-router-dom"
import { MultiApiService } from "@/services/MultiApiService"
import StoreCard from "@/components/business/StoreCard"
import type { Store } from "@/types"

export default function StoreDiscoveryPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [selectedFloor, setSelectedFloor] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores", "all"],
    queryFn: () => MultiApiService.getAllStores(),
  })

  const categories = [
    { title: "All", count: stores?.length || 0 },
    { title: "Fashion", count: stores?.filter((s) => s.category === "Fashion").length || 0 },
    { title: "Food & Dining", count: stores?.filter((s) => s.category === "Food & Dining").length || 0 },
    { title: "Electronics", count: stores?.filter((s) => s.category === "Electronics").length || 0 },
    { title: "Beauty", count: stores?.filter((s) => s.category === "Beauty").length || 0 },
  ]

  const floors = ["All", "Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"]

  const filteredStores =
    stores?.filter((store: Store) => {
      const matchesSearch =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || selectedCategory === "All" || store.category === selectedCategory
      const matchesFloor = !selectedFloor || selectedFloor === "All" || store.floor === selectedFloor

      return matchesSearch && matchesCategory && matchesFloor
    }) || []

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
        <h1 className="text-2xl font-bold text-text-primary mb-4">Explore Stores</h1>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" size={20} />
          <input
            type="text"
            placeholder="Search stores..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-background border border-interactive-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:border-gold"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
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

          <div className="flex items-center space-x-2 ml-4">
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="bg-surface-elevated border border-interactive-border rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-gold"
            >
              {floors.map((floor) => (
                <option key={floor} value={floor === "All" ? "" : floor}>
                  {floor}
                </option>
              ))}
            </select>

            <div className="flex bg-surface-elevated rounded-lg p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-gold text-black" : "text-text-secondary"}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-gold text-black" : "text-text-secondary"}`}
              >
                <Grid size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-text-secondary">
            {filteredStores.length} store{filteredStores.length !== 1 ? "s" : ""} found
          </p>

          <button className="flex items-center space-x-2 text-gold hover:text-yellow-600 transition-colors">
            <MapPin size={16} />
            <span className="text-sm">View on Map</span>
          </button>
        </div>

        {filteredStores.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-text-secondary" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No stores found</h3>
            <p className="text-text-secondary">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-2 gap-3" : "space-y-3"}>
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onPress={(storeId) => navigate(`/stores/${storeId}`)}
                showVIPBadge={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
