"use client"
import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { ArrowLeft, MapPin, Clock, Phone, Globe, Instagram, Star, Crown, Share, Heart, Navigation } from 'lucide-react'
import { MultiApiService } from "@/services/MultiApiService"
import { useAuth } from "@/hooks/useAuth"
import LoadingSpinner from "@/components/common/LoadingSpinner"

export default function StoreDetailPage() {
  const { storeId } = useParams<{ storeId: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const { data: store, isLoading } = useQuery({
    queryKey: ["store", storeId],
    queryFn: () => MultiApiService.getStoreById(storeId!),
    enabled: !!storeId,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-text-primary mb-2">Store Not Found</h2>
          <p className="text-text-secondary mb-4">The store you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/explore")}
            className="bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Browse All Stores
          </button>
        </div>
      </div>
    )
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: store.name,
          text: store.description,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  const images = [store.imageUrl, ...(store.gallery || [])]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </button>
            
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            >
              <Share size={20} />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-64">
          <img
            src={images[selectedImageIndex] || "/placeholder.svg"}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          
          {store.isVIPPartner && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-gold to-yellow-600 text-black px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-bold">
              <Crown size={14} />
              <span>VIP Partner</span>
            </div>
          )}

          <div
            className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
              isOpen()
                ? "bg-success/20 text-success border border-success/30"
                : "bg-error/20 text-error border border-error/30"
            }`}
          >
            {isOpen() ? "Open Now" : "Closed"}
          </div>
        </div>

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? "border-gold" : "border-transparent"
                }`}
              >
                <img src={image || "/placeholder.svg"} alt={`${store.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Store Info */}
      <div className="p-4 space-y-6">
        {/* Basic Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-text-primary">{store.name}</h1>
              <p className="text-text-secondary">{store.category} • {store.subcategory}</p>
            </div>
            
            {store.rating && (
              <div className="flex items-center space-x-1 ml-4">
                <Star className="text-gold fill-gold" size={16} />
                <span className="text-text-primary font-medium">{store.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-text-secondary leading-relaxed">{store.description}</p>
        </div>

        {/* Location */}
        <div className="bg-surface border border-interactive-border rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <MapPin className="text-gold" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-text-primary">Location</h3>
              <p className="text-text-secondary text-sm">{store.floor} • Unit {store.unitNumber}</p>
            </div>
          </div>
          
          {store.location.landmarks.length > 0 && (
            <div className="ml-13">
              <p className="text-text-tertiary text-sm">Near: {store.location.landmarks.join(", ")}</p>
            </div>
          )}
          
          <button className="w-full mt-3 bg-gold/10 border border-gold/30 text-gold py-2 rounded-lg font-medium hover:bg-gold/20 transition-colors flex items-center justify-center space-x-2">
            <Navigation size={16} />
            <span>Get Directions</span>
          </button>
        </div>

        {/* Operating Hours */}
        <div className="bg-surface border border-interactive-border rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-info/20 rounded-full flex items-center justify-center">
              <Clock className="text-info" size={20} />
            </div>
            <h3 className="font-semibold text-text-primary">Operating Hours</h3>
          </div>
          
          <div className="ml-13 space-y-2">
            <div className="flex justify-between">
              <span className="text-text-secondary">Weekdays</span>
              <span className="text-text-primary font-medium">
                {store.operatingHours.weekdays.open} - {store.operatingHours.weekdays.close}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Weekends</span>
              <span className="text-text-primary font-medium">
                {store.operatingHours.weekends.open} - {store.operatingHours.weekends.close}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        {(store.contactInfo.phone || store.contactInfo.website || store.contactInfo.instagram) && (
          <div className="bg-surface border border-interactive-border rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-3">Contact Information</h3>
            
            <div className="space-y-3">
              {store.contactInfo.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="text-text-secondary" size={16} />
                  <a href={`tel:${store.contactInfo.phone}`} className="text-gold hover:text-yellow-600">
                    {store.contactInfo.phone}
                  </a>
                </div>
              )}
              
              {store.contactInfo.website && (
                <div className="flex items-center space-x-3">
                  <Globe className="text-text-secondary" size={16} />
                  <a 
                    href={store.contactInfo.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-yellow-600"
                  >
                    Visit Website
                  </a>
                </div>
              )}
              
              {store.contactInfo.instagram && (
                <div className="flex items-center space-x-3">
                  <Instagram className="text-text-secondary" size={16} />
                  <a 
                    href={`https://instagram.com/${store.contactInfo.instagram.replace('@', '')}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gold hover:text-yellow-600"
                  >
                    {store.contactInfo.instagram}
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Amenities */}
        {store.amenities.length > 0 && (
          <div className="bg-surface border border-interactive-border rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {store.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-3 py-1 bg-surface-elevated text-text-secondary text-sm rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Current Promotions */}
        {store.currentPromotions.length > 0 && (
          <div className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4">
            <h3 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
              <Star className="text-gold fill-gold" size={16} />
              <span>Current Promotions</span>
            </h3>
            <div className="space-y-2">
              {store.currentPromotions.map((promotion, index) => (
                <p key={index} className="text-text-secondary">• {promotion}</p>
              ))}
            </div>
          </div>
        )}

        {/* VIP Benefits */}
        {store.isVIPPartner && isAuthenticated && (
          <motion.div
            className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                <Crown className="text-gold" size={20} />
              </div>
              <h3 className="font-semibold text-text-primary">VIP Benefits</h3>
            </div>
            
            <div className="ml-13">
              <p className="text-text-secondary text-sm mb-2">
                As a VIP member, you get special benefits at this store:
              </p>
              <div className="space-y-1">
                {store.pointsMultiplier && (
                  <p className="text-gold text-sm">• {store.pointsMultiplier}x Points Multiplier</p>
                )}
                <p className="text-gold text-sm">• Exclusive VIP Promotions</p>
                <p className="text-gold text-sm">• Priority Customer Service</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
