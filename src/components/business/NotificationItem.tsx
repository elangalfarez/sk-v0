"use client"
import { motion } from "framer-motion"
import { Gift, Star, Calendar, AlertCircle, Trash2, MoreVertical } from 'lucide-react'
import { useState } from "react"
import type { Notification } from "@/types"

interface NotificationItemProps {
  notification: Notification
  onPress: (notificationId: string) => void
  onMarkAsRead: (notificationId: string) => void
  onDelete?: (notificationId: string) => void
}

export default function NotificationItem({ 
  notification, 
  onPress, 
  onMarkAsRead,
  onDelete 
}: NotificationItemProps) {
  const [showActions, setShowActions] = useState(false)

  const getIcon = () => {
    switch (notification.type) {
      case "points":
      case "receipt_update":
        return Gift
      case "promotion":
        return Star
      case "event":
        return Calendar
      case "system":
      default:
        return AlertCircle
    }
  }

  const getIconColor = () => {
    switch (notification.type) {
      case "points":
      case "receipt_update":
        return "text-success"
      case "promotion":
        return "text-gold"
      case "event":
        return "text-info"
      case "system":
      default:
        return "text-text-secondary"
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes}m ago`
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const Icon = getIcon()

  return (
    <motion.div
      className={`relative bg-surface border border-interactive-border rounded-xl p-4 hover:bg-surface-elevated transition-colors cursor-pointer ${
        !notification.isRead ? "border-l-4 border-l-gold" : ""
      }`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onPress(notification.id)}
    >
      <div className="flex items-start space-x-3">
        {/* Icon */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          notification.type === "points" || notification.type === "receipt_update"
            ? "bg-success/20"
            : notification.type === "promotion"
              ? "bg-gold/20"
              : notification.type === "event"
                ? "bg-info/20"
                : "bg-surface-elevated"
        }`}>
          <Icon className={getIconColor()} size={20} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-1">
            <h3 className={`font-medium ${
              notification.isRead ? "text-text-secondary" : "text-text-primary"
            }`}>
              {notification.title}
            </h3>
            
            <div className="flex items-center space-x-2 ml-2">
              <span className="text-text-tertiary text-xs whitespace-nowrap">
                {formatTime(notification.timestamp)}
              </span>
              
              {onDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowActions(!showActions)
                  }}
                  className="p-1 text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  <MoreVertical size={14} />
                </button>
              )}
            </div>
          </div>
          
          <p className={`text-sm leading-relaxed ${
            notification.isRead ? "text-text-tertiary" : "text-text-secondary"
          }`}>
            {notification.message}
          </p>

          {/* Notification Image */}
          {notification.imageUrl && (
            <div className="mt-3">
              <img 
                src={notification.imageUrl || "/placeholder.svg"} 
                alt=""
                className="w-12 h-12 rounded-lg object-cover"
              />
            </div>
          )}
        </div>

        {/* Unread Indicator */}
        {!notification.isRead && (
          <div className="w-2 h-2 bg-gold rounded-full flex-shrink-0 mt-2" />
        )}
      </div>

      {/* Actions Menu */}
      {showActions && onDelete && (
        <motion.div
          className="absolute top-2 right-2 bg-surface-elevated border border-interactive-border rounded-lg shadow-lg z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {!notification.isRead && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onMarkAsRead(notification.id)
                setShowActions(false)
              }}
              className="w-full px-3 py-2 text-left text-text-secondary hover:text-text-primary hover:bg-surface transition-colors text-sm"
            >
              Mark as read
            </button>
          )}
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(notification.id)
              setShowActions(false)
            }}
            className="w-full px-3 py-2 text-left text-error hover:bg-error/10 transition-colors text-sm flex items-center space-x-2"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
