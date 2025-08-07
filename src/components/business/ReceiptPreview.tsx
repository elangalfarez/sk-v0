"use client"
import { motion } from "framer-motion"
import { X, RotateCcw } from 'lucide-react'
import type { CameraPhoto } from "@/types"

interface ReceiptPreviewProps {
  photo: CameraPhoto
  onRetake?: () => void
  onClose?: () => void
}

export default function ReceiptPreview({ photo, onRetake, onClose }: ReceiptPreviewProps) {
  return (
    <motion.div
      className="bg-surface border border-interactive-border rounded-xl overflow-hidden mb-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-interactive-border">
        <h3 className="font-semibold text-text-primary">Receipt Preview</h3>
        <div className="flex items-center space-x-2">
          {onRetake && (
            <button
              onClick={onRetake}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              title="Retake photo"
            >
              <RotateCcw size={18} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              title="Close"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={photo.webPath || "/placeholder.svg"}
          alt="Receipt"
          className="w-full h-64 object-contain bg-black/5"
        />
        
        {/* Overlay with scanning animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/10 to-transparent animate-pulse" />
      </div>

      {/* Info */}
      <div className="p-4 bg-surface-elevated">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Format:</span>
          <span className="text-text-primary font-medium">{photo.format.toUpperCase()}</span>
        </div>
        
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-text-secondary">Status:</span>
          <span className="text-success font-medium">Ready to process</span>
        </div>
      </div>
    </motion.div>
  )
}
