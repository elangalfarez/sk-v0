"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { User, Settings, History, LogOut, Edit, Crown, Calendar, Phone, Mail, MapPin } from 'lucide-react'
import { useAuth } from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { MultiApiService } from "@/services/MultiApiService"
import TierBadge from "@/components/business/TierBadge"
import TransactionItem from "@/components/business/TransactionItem"

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState<"profile" | "history" | "settings">("profile")

  const { data: pointsBalance } = useQuery({
    queryKey: ["points", "balance"],
    queryFn: () => MultiApiService.getPointsBalance(),
  })

  const { data: transactions } = useQuery({
    queryKey: ["transactions", "all"],
    queryFn: () => MultiApiService.getRecentTransactions(),
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    )
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-surface to-surface-elevated p-6 border-b border-interactive-border">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-gold to-yellow-600 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xl">{user.name.charAt(0)}</span>
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-text-primary">{user.name}</h1>
            <p className="text-text-secondary">{user.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <TierBadge tier={user.memberTier} size="sm" />
              <span className="text-gold text-sm font-medium">{user.memberTier} Member</span>
            </div>
          </div>
          
          <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
            <Edit size={20} />
          </button>
        </div>

        {/* Quick Stats */}
        {pointsBalance && (
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold">{pointsBalance.currentBalance.toLocaleString()}</p>
              <p className="text-text-secondary text-xs">Current Points</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{pointsBalance.totalEarned.toLocaleString()}</p>
              <p className="text-text-secondary text-xs">Total Earned</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-text-primary">{pointsBalance.totalRedeemed.toLocaleString()}</p>
              <p className="text-text-secondary text-xs">Total Redeemed</p>
            </div>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="bg-surface border-b border-interactive-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center space-x-2 py-4 transition-colors ${
                activeTab === tab.id
                  ? "text-gold border-b-2 border-gold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <tab.icon size={18} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Personal Information */}
            <div className="bg-surface border border-interactive-border rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-4">Personal Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="text-text-secondary" size={16} />
                  <div>
                    <p className="text-text-primary font-medium">{user.phone}</p>
                    <p className="text-text-secondary text-sm">Phone Number</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="text-text-secondary" size={16} />
                  <div>
                    <p className="text-text-primary font-medium">{user.email}</p>
                    <p className="text-text-secondary text-sm">Email Address</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="text-text-secondary" size={16} />
                  <div>
                    <p className="text-text-primary font-medium">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p className="text-text-secondary text-sm">Date of Birth</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="text-text-secondary" size={16} />
                  <div>
                    <p className="text-text-primary font-medium">{user.address}</p>
                    <p className="text-text-secondary text-sm">Address</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Info */}
            <div className="bg-surface border border-interactive-border rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-4">Membership Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Member Since</span>
                  <span className="text-text-primary font-medium">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Current Tier</span>
                  <div className="flex items-center space-x-2">
                    <TierBadge tier={user.memberTier} size="sm" />
                    <span className="text-text-primary font-medium">{user.memberTier}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active" 
                      ? "bg-success/20 text-success" 
                      : "bg-error/20 text-error"
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Tier Progress */}
            {user.tierProgress && (
              <div className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Crown className="text-gold" size={20} />
                  <h3 className="font-semibold text-text-primary">Tier Progress</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Progress to {user.tierProgress.nextTier}</span>
                    <span className="text-text-primary font-medium">
                      {user.tierProgress.current.toLocaleString()} / {user.tierProgress.target.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="w-full bg-onyx-gray rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-gold to-yellow-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(user.tierProgress.current / user.tierProgress.target) * 100}%` }}
                    />
                  </div>
                  
                  <p className="text-text-tertiary text-sm">
                    {(user.tierProgress.target - user.tierProgress.current).toLocaleString()} more points to {user.tierProgress.nextTier}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "history" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary">Transaction History</h3>
            
            {transactions && transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="text-text-secondary" size={24} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">No transactions yet</h3>
                <p className="text-text-secondary">Start shopping to see your transaction history</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-text-primary mb-4">Settings</h3>
            
            <div className="space-y-3">
              <button className="w-full bg-surface border border-interactive-border rounded-xl p-4 text-left hover:bg-surface-elevated transition-colors">
                <h4 className="font-medium text-text-primary">Notifications</h4>
                <p className="text-text-secondary text-sm">Manage your notification preferences</p>
              </button>
              
              <button className="w-full bg-surface border border-interactive-border rounded-xl p-4 text-left hover:bg-surface-elevated transition-colors">
                <h4 className="font-medium text-text-primary">Privacy</h4>
                <p className="text-text-secondary text-sm">Control your privacy settings</p>
              </button>
              
              <button className="w-full bg-surface border border-interactive-border rounded-xl p-4 text-left hover:bg-surface-elevated transition-colors">
                <h4 className="font-medium text-text-primary">Security</h4>
                <p className="text-text-secondary text-sm">Manage your account security</p>
              </button>
              
              <button className="w-full bg-surface border border-interactive-border rounded-xl p-4 text-left hover:bg-surface-elevated transition-colors">
                <h4 className="font-medium text-text-primary">Help & Support</h4>
                <p className="text-text-secondary text-sm">Get help and contact support</p>
              </button>
              
              <button 
                onClick={logout}
                className="w-full bg-error/10 border border-error/30 rounded-xl p-4 text-left hover:bg-error/20 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <LogOut className="text-error" size={20} />
                  <div>
                    <h4 className="font-medium text-error">Sign Out</h4>
                    <p className="text-error/70 text-sm">Sign out of your account</p>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
