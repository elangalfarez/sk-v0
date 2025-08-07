"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Gift, Star, Calendar, Settings, Check, Trash2 } from 'lucide-react'
import NotificationItem from "@/components/business/NotificationItem"
import type { Notification } from "@/types"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Points Earned!",
      message: "You earned 250 points from your purchase at Zara",
      type: "points",
      timestamp: "2024-01-10T14:30:00Z",
      isRead: false,
      actionData: {
        type: "navigate",
        target: "/me"
      },
      imageUrl: "/generic-fashion-logo.png"
    },
    {
      id: "2",
      title: "New VIP Promotion",
      message: "Exclusive 30% off at participating fashion stores this weekend",
      type: "promotion",
      timestamp: "2024-01-10T10:00:00Z",
      isRead: false,
      actionData: {
        type: "navigate",
        target: "/explore"
      }
    },
    {
      id: "3",
      title: "Fashion Week Event",
      message: "Don't miss the fashion showcase tomorrow at 7 PM",
      type: "event",
      timestamp: "2024-01-09T16:00:00Z",
      isRead: true,
      actionData: {
        type: "navigate",
        target: "/events"
      }
    },
    {
      id: "4",
      title: "Receipt Approved",
      message: "Your Starbucks receipt has been approved. 150 points added!",
      type: "receipt_update",
      timestamp: "2024-01-09T12:15:00Z",
      isRead: true,
      actionData: {
        type: "navigate",
        target: "/me"
      }
    }
  ])

  const [filter, setFilter] = useState<"all" | "unread">("all")

  const filteredNotifications = notifications.filter(notification => 
    filter === "all" || !notification.isRead
  )

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const handleDeleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
  }

  const handleNotificationPress = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId)
    if (notification && !notification.isRead) {
      handleMarkAsRead(notificationId)
    }
    
    // Handle navigation based on actionData
    if (notification?.actionData) {
      console.log("Navigate to:", notification.actionData.target)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-interactive-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-text-secondary">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                title="Mark all as read"
              >
                <Check size={20} />
              </button>
            )}
            
            <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-surface-elevated rounded-lg p-1">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-gold text-black"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              filter === "unread"
                ? "bg-gold text-black"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-text-secondary" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-text-secondary">
              {filter === "unread" 
                ? "You're all caught up!" 
                : "We'll notify you when something important happens"
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <NotificationItem
                  notification={notification}
                  onPress={handleNotificationPress}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
