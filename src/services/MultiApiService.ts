import axios from "axios"
import type { Store, Promotion, Event, PointsBalance, PointsTransaction, Reward } from "@/types"

class MultiApiServiceClass {
  private publicApi = axios.create({
    baseURL: "https://supermal-api.vercel.app",
    timeout: 10000,
  })

  private vipApi = axios.create({
    baseURL: "https://salamun-crm.supermal.com",
    timeout: 15000,
  })

  constructor() {
    // Add auth interceptor for VIP API
    this.vipApi.interceptors.request.use((config) => {
      const token = localStorage.getItem("auth_token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Public API methods (fast, guest-accessible)
  async getFeaturedStores(): Promise<Store[]> {
    try {
      const response = await this.publicApi.get("/stores/featured")
      return response.data.data || this.getMockStores()
    } catch (error) {
      console.warn("Using mock data for featured stores")
      return this.getMockStores()
    }
  }

  async getPublicPromotions(): Promise<Promotion[]> {
    try {
      const response = await this.publicApi.get("/promotions/public")
      return response.data.data || this.getMockPromotions()
    } catch (error) {
      console.warn("Using mock data for promotions")
      return this.getMockPromotions()
    }
  }

  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const response = await this.publicApi.get("/events/upcoming")
      return response.data.data || this.getMockEvents()
    } catch (error) {
      console.warn("Using mock data for events")
      return this.getMockEvents()
    }
  }

  async getAllStores(): Promise<Store[]> {
    try {
      const response = await this.publicApi.get("/stores")
      return response.data.data || this.getMockStores()
    } catch (error) {
      console.warn("Using mock data for all stores")
      return this.getMockStores()
    }
  }

  async getStoreById(id: string): Promise<Store | null> {
    try {
      const response = await this.publicApi.get(`/stores/${id}`)
      return response.data.data || this.getMockStores().find((s) => s.id === id) || null
    } catch (error) {
      console.warn("Using mock data for store detail")
      return this.getMockStores().find((s) => s.id === id) || null
    }
  }

  // VIP API methods (slower, requires authentication)
  async getPointsBalance(): Promise<PointsBalance> {
    try {
      const response = await this.vipApi.get("/points/balance")
      return response.data.data || this.getMockPointsBalance()
    } catch (error) {
      console.warn("Using mock data for points balance")
      return this.getMockPointsBalance()
    }
  }

  async getRecentTransactions(): Promise<PointsTransaction[]> {
    try {
      const response = await this.vipApi.get("/points/transactions/recent")
      return response.data.data || this.getMockTransactions()
    } catch (error) {
      console.warn("Using mock data for transactions")
      return this.getMockTransactions()
    }
  }

  async getRecommendedRewards(): Promise<Reward[]> {
    try {
      const response = await this.vipApi.get("/rewards/recommended")
      return response.data.data || this.getMockRewards()
    } catch (error) {
      console.warn("Using mock data for rewards")
      return this.getMockRewards()
    }
  }

  async getAllRewards(): Promise<Reward[]> {
    try {
      const response = await this.vipApi.get("/rewards")
      return response.data.data || this.getMockRewards()
    } catch (error) {
      console.warn("Using mock data for all rewards")
      return this.getMockRewards()
    }
  }

  // Mock data methods
  private getMockStores(): Store[] {
    return [
      {
        id: "1",
        name: "Zara",
        category: "Fashion",
        subcategory: "Clothing",
        floor: "Ground Floor",
        unitNumber: "G-101",
        description: "International fashion retailer offering trendy clothing for men, women, and children.",
        imageUrl: "/zara-fashion-store.png",
        gallery: ["/retail-store-interior.png", "/placeholder-ets53.png"],
        operatingHours: {
          weekdays: { open: "10:00", close: "22:00" },
          weekends: { open: "10:00", close: "23:00" },
        },
        contactInfo: {
          phone: "+62-21-5555-0101",
          website: "https://zara.com",
          instagram: "@zara",
        },
        amenities: ["Air Conditioning", "Fitting Rooms", "Credit Card"],
        currentPromotions: ["Up to 50% off selected items"],
        rating: 4.5,
        tags: ["Fashion", "Trendy", "International"],
        location: {
          coordinates: { x: 100, y: 150 },
          landmarks: ["Near Main Entrance", "Opposite Food Court"],
        },
        isVIPPartner: true,
        pointsMultiplier: 2,
      },
      {
        id: "2",
        name: "Starbucks",
        category: "Food & Dining",
        subcategory: "Coffee",
        floor: "1st Floor",
        unitNumber: "1-205",
        description: "Premium coffee chain serving specialty coffee drinks and light meals.",
        imageUrl: "/bustling-coffee-shop.png",
        operatingHours: {
          weekdays: { open: "07:00", close: "22:00" },
          weekends: { open: "07:00", close: "23:00" },
        },
        contactInfo: {
          phone: "+62-21-5555-0205",
        },
        amenities: ["WiFi", "Air Conditioning", "Takeaway"],
        currentPromotions: ["Buy 2 Get 1 Free on selected drinks"],
        rating: 4.3,
        tags: ["Coffee", "Premium", "WiFi"],
        location: {
          coordinates: { x: 200, y: 100 },
          landmarks: ["Near Escalator", "Food Court Area"],
        },
        isVIPPartner: true,
        pointsMultiplier: 1.5,
      },
      {
        id: "3",
        name: "Samsung Store",
        category: "Electronics",
        subcategory: "Mobile & Gadgets",
        floor: "2nd Floor",
        unitNumber: "2-301",
        description: "Official Samsung store featuring the latest smartphones, tablets, and accessories.",
        imageUrl: "/samsung-electronics-store.png",
        operatingHours: {
          weekdays: { open: "10:00", close: "21:00" },
          weekends: { open: "10:00", close: "22:00" },
        },
        contactInfo: {
          phone: "+62-21-5555-0301",
          website: "https://samsung.com/id",
        },
        amenities: ["Product Demo", "Technical Support", "Warranty Service"],
        currentPromotions: ["Trade-in program available"],
        rating: 4.4,
        tags: ["Electronics", "Smartphones", "Official Store"],
        location: {
          coordinates: { x: 150, y: 200 },
          landmarks: ["Electronics Section", "Near Cinema"],
        },
        isVIPPartner: false,
      },
    ]
  }

  private getMockPromotions(): Promotion[] {
    return [
      {
        id: "1",
        title: "Weekend Fashion Sale",
        description: "Up to 70% off on selected fashion items",
        longDescription:
          "Enjoy massive discounts on premium fashion brands this weekend. Valid for all participating fashion stores.",
        imageUrl: "/fashion-sale.png",
        startDate: "2024-01-15T00:00:00Z",
        endDate: "2024-01-21T23:59:59Z",
        discountType: "Percentage",
        discountValue: 70,
        minimumSpend: 500000,
        applicableStores: ["1", "4", "7"],
        termsConditions: "Valid for selected items only. Cannot be combined with other offers.",
        isActive: true,
        isExpired: false,
        category: "Fashion",
        isVIPExclusive: false,
        priority: 1,
      },
      {
        id: "2",
        title: "VIP Double Points",
        description: "Earn 2x points on all purchases",
        longDescription: "VIP members get double points on every purchase made during this promotion period.",
        imageUrl: "/vip-double-points.png",
        startDate: "2024-01-10T00:00:00Z",
        endDate: "2024-01-31T23:59:59Z",
        discountType: "Points",
        discountValue: 2,
        applicableStores: [],
        termsConditions: "Valid for VIP members only. Applies to all participating stores.",
        isActive: true,
        isExpired: false,
        category: "Points",
        isVIPExclusive: true,
        priority: 2,
      },
    ]
  }

  private getMockEvents(): Event[] {
    return [
      {
        id: "1",
        title: "Fashion Week Showcase",
        description: "Latest fashion trends from top designers",
        imageUrl: "/fashion-week-event.png",
        startDate: "2024-01-25T19:00:00Z",
        endDate: "2024-01-25T21:00:00Z",
        location: "Main Atrium",
        category: "Fashion",
        isVIPExclusive: false,
        registrationRequired: true,
        capacity: 200,
        registeredCount: 150,
        tags: ["Fashion", "Showcase", "Trends"],
      },
      {
        id: "2",
        title: "VIP Wine Tasting",
        description: "Exclusive wine tasting event for VIP members",
        imageUrl: "/wine-tasting.png",
        startDate: "2024-01-30T18:00:00Z",
        endDate: "2024-01-30T20:00:00Z",
        location: "VIP Lounge",
        category: "Food",
        isVIPExclusive: true,
        registrationRequired: true,
        capacity: 50,
        registeredCount: 35,
        tags: ["VIP", "Wine", "Exclusive"],
      },
    ]
  }

  private getMockPointsBalance(): PointsBalance {
    return {
      currentBalance: 15750,
      totalEarned: 45200,
      totalRedeemed: 29450,
      expiringPoints: {
        amount: 2500,
        expiryDate: "2024-03-15T23:59:59Z",
      },
      lastTransaction: "2024-01-10T14:30:00Z",
      streakDays: 7,
    }
  }

  private getMockTransactions(): PointsTransaction[] {
    return [
      {
        id: "1",
        date: "2024-01-10T14:30:00Z",
        type: "Earn",
        amount: 250,
        source: "Purchase",
        description: "Shopping at Zara",
        balanceAfter: 15750,
        receiptId: "RCP-001",
        storeInfo: {
          name: "Zara",
          logo: "/generic-fashion-logo.png",
        },
        multiplier: 2,
      },
      {
        id: "2",
        date: "2024-01-09T16:45:00Z",
        type: "Earn",
        amount: 150,
        source: "Purchase",
        description: "Coffee at Starbucks",
        balanceAfter: 15500,
        receiptId: "RCP-002",
        storeInfo: {
          name: "Starbucks",
          logo: "/generic-coffee-logo.png",
        },
        multiplier: 1.5,
      },
      {
        id: "3",
        date: "2024-01-08T12:20:00Z",
        type: "Redeem",
        amount: -500,
        source: "Reward",
        description: "Free Coffee Voucher",
        balanceAfter: 15350,
        multiplier: 1,
      },
    ]
  }

  private getMockRewards(): Reward[] {
    return [
      {
        id: "1",
        name: "Free Coffee Voucher",
        description: "Get a free regular coffee at participating cafes",
        imageUrl: "/coffee-voucher-reward.png",
        pointsCost: 500,
        category: "Food & Beverage",
        stockAvailable: 100,
        isLimited: false,
        termsConditions: "Valid for 30 days from redemption. One per customer.",
        partnerId: "2",
        partnerName: "Starbucks",
        partnerLogo: "/generic-coffee-logo.png",
        isVIPExclusive: false,
        popularity: 85,
      },
      {
        id: "2",
        name: "10% Discount Voucher",
        description: "10% off your next fashion purchase",
        imageUrl: "/placeholder-bkxrj.png",
        pointsCost: 1000,
        category: "Fashion",
        stockAvailable: 50,
        isLimited: true,
        validUntil: "2024-02-29T23:59:59Z",
        termsConditions: "Minimum purchase of Rp 500,000. Valid at participating fashion stores.",
        partnerId: "1",
        partnerName: "Zara",
        partnerLogo: "/generic-fashion-logo.png",
        isVIPExclusive: true,
        popularity: 92,
      },
      {
        id: "3",
        name: "Movie Ticket",
        description: "Free movie ticket for any show",
        imageUrl: "/placeholder.svg?height=150&width=200",
        pointsCost: 2000,
        category: "Entertainment",
        stockAvailable: 25,
        isLimited: true,
        validUntil: "2024-01-31T23:59:59Z",
        termsConditions: "Valid for regular seats only. Subject to availability.",
        partnerId: "5",
        partnerName: "Cinema XXI",
        partnerLogo: "/placeholder.svg?height=40&width=40",
        isVIPExclusive: false,
        popularity: 78,
      },
    ]
  }
}

export const MultiApiService = new MultiApiServiceClass()
