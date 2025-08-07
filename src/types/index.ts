import type React from "react"

// Camera Types
export interface CameraPhoto {
  webPath: string;
  format: string;
  saved: boolean;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'points' | 'promotion' | 'event' | 'system' | 'receipt_update';
  timestamp: string;
  isRead: boolean;
  actionData?: {
    type: 'navigate' | 'external_link';
    target: string;
  };
  imageUrl?: string;
}

// User Authentication & Profile
export interface CustomerProfile {
  cif: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  gender: "L" | "P"
  memberTier: "Gold" | "Platinum" | "Diamond"
  registrationDate: string
  status: "Active" | "Inactive"
  profilePicture?: string
  tierProgress?: {
    current: number
    target: number
    nextTier: string
  }
}

export interface AuthState {
  isAuthenticated: boolean
  isGuest: boolean
  user: CustomerProfile | null
  token: string | null
  guestId: string
}

export interface LoginCredentials {
  cif: string
  password: string
}

// Points & Rewards System
export interface PointsBalance {
  currentBalance: number
  totalEarned: number
  totalRedeemed: number
  expiringPoints?: {
    amount: number
    expiryDate: string
  }
  lastTransaction: string
  streakDays?: number
}

export interface PointsTransaction {
  id: string
  date: string
  type: "Earn" | "Redeem" | "Bonus" | "Expire" | "Adjustment"
  amount: number
  source: string
  description: string
  balanceAfter: number
  receiptId?: string
  storeInfo?: {
    name: string
    logo: string
  }
  multiplier?: number
}

// Enhanced Store Directory
export interface Store {
  id: string
  name: string
  category: string
  subcategory: string
  floor: string
  unitNumber: string
  description: string
  imageUrl: string
  gallery?: string[]
  operatingHours: {
    weekdays: { open: string; close: string }
    weekends: { open: string; close: string }
    holidays?: { open: string; close: string }
  }
  contactInfo: {
    phone?: string
    email?: string
    website?: string
    instagram?: string
  }
  amenities: string[]
  currentPromotions: string[]
  rating?: number
  tags: string[]
  location: {
    coordinates: { x: number; y: number }
    landmarks: string[]
  }
  isVIPPartner: boolean
  pointsMultiplier?: number
}

// Enhanced Promotions & Events
export interface Promotion {
  id: string
  title: string
  description: string
  longDescription: string
  imageUrl: string
  gallery?: string[]
  startDate: string
  endDate: string
  discountType: "Percentage" | "Fixed" | "Points" | "BOGO"
  discountValue: number
  minimumSpend?: number
  maximumDiscount?: number
  applicableStores: string[]
  termsConditions: string
  isActive: boolean
  isExpired: boolean
  category: string
  isVIPExclusive: boolean
  usageLimit?: number
  usedCount?: number
  priority: number
}

export interface Event {
  id: string
  title: string
  description: string
  imageUrl: string
  startDate: string
  endDate: string
  location: string
  category: "Entertainment" | "Shopping" | "Food" | "Fashion" | "Kids"
  isVIPExclusive: boolean
  registrationRequired: boolean
  capacity?: number
  registeredCount?: number
  tags: string[]
}

// Rewards System
export interface Reward {
  id: string
  name: string
  description: string
  imageUrl: string
  pointsCost: number
  category: string
  stockAvailable: number
  isLimited: boolean
  validUntil?: string
  termsConditions: string
  partnerId: string
  partnerName: string
  partnerLogo: string
  isVIPExclusive: boolean
  popularity?: number
}

// Component Props Types
export interface VIPGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  featureName: string
  showTeaser?: boolean
}

export interface BlurredOverlayProps {
  children: React.ReactNode
  featureName: string
  onUpgradeClick: () => void
}

export interface PointsCardProps {
  balance: PointsBalance
  tierProgress?: CustomerProfile["tierProgress"]
  user: CustomerProfile
  animated?: boolean
}

export interface StoreCardProps {
  store: Store
  onPress: (storeId: string) => void
  showVIPBadge?: boolean
}

export interface RewardItemProps {
  reward: Reward
  onRedeem: (rewardId: string) => void
  canAfford: boolean
}

export interface TransactionItemProps {
  transaction: PointsTransaction
  onPress?: (transactionId: string) => void
}

export interface PromotionCardProps {
  promotion: Promotion
  onPress: (promotionId: string) => void
  showVIPBadge?: boolean
}

export interface CategoryCardProps {
  title: string
  imageUrl: string
  onPress: (category: string) => void
  storeCount?: number
}

export interface TierBadgeProps {
  tier: CustomerProfile["memberTier"]
  size?: "sm" | "md" | "lg"
}

export interface NotificationItemProps {
  notification: Notification
  onPress: (notificationId: string) => void
  onMarkAsRead: (notificationId: string) => void
  onDelete?: (notificationId: string) => void
}