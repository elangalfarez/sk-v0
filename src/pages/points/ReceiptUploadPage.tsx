"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Camera, Upload, X, Check, AlertCircle } from 'lucide-react'
import { useCamera } from "@/hooks/useCamera"
// import { useAuth } from "@/hooks/useAuth"
import ReceiptUploadForm from "@/components/forms/ReceiptUploadForm"
import ReceiptPreview from "@/components/business/ReceiptPreview"
import type { CameraPhoto } from "@/types"

export default function ReceiptUploadPage() {
 // const { user } = useAuth()
  const { takePhoto, isSupported } = useCamera()
  const [capturedPhoto, setCapturedPhoto] = useState<CameraPhoto | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const [showForm, setShowForm] = useState(false)

  const handleTakePhoto = async () => {
    try {
      const photo = await takePhoto()
      setCapturedPhoto(photo)
      setShowForm(true)
    } catch (error) {
      console.error('Failed to take photo:', error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const photo: CameraPhoto = {
          webPath: e.target?.result as string,
          format: file.type.split('/')[1],
          saved: false
        }
        setCapturedPhoto(photo)
        setShowForm(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = async (formData: any) => {
    setUploadStatus('uploading')
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000))
      setUploadStatus('success')
      
      // Reset after success
      setTimeout(() => {
        setCapturedPhoto(null)
        setShowForm(false)
        setUploadStatus('idle')
      }, 3000)
    } catch (error) {
      setUploadStatus('error')
    }
  }

  const handleRetake = () => {
    setCapturedPhoto(null)
    setShowForm(false)
    setUploadStatus('idle')
  }

  if (uploadStatus === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-success" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Receipt Uploaded!</h2>
          <p className="text-text-secondary mb-4">
            Your receipt is being processed. Points will be added to your account within 24 hours.
          </p>
          <div className="bg-surface border border-interactive-border rounded-xl p-4">
            <p className="text-text-primary font-medium">Estimated Points: 150-300</p>
            <p className="text-text-secondary text-sm">Based on receipt analysis</p>
          </div>
        </motion.div>
      </div>
    )
  }

  if (uploadStatus === 'error') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-error" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Upload Failed</h2>
          <p className="text-text-secondary mb-6">
            There was an error uploading your receipt. Please try again.
          </p>
          <button
            onClick={handleRetake}
            className="bg-gradient-to-r from-gold to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold"
          >
            Try Again
          </button>
        </motion.div>
      </div>
    )
  }

  if (showForm && capturedPhoto) {
    return (
      <div className="min-h-screen bg-background">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-text-primary">Receipt Details</h1>
            <button
              onClick={handleRetake}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <ReceiptPreview photo={capturedPhoto} />
          
          <ReceiptUploadForm
            photo={capturedPhoto}
            onSubmit={handleFormSubmit}
            isLoading={uploadStatus === 'uploading'}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-interactive-border p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Scan Receipt</h1>
        <p className="text-text-secondary">Upload your receipt to earn points</p>
      </div>

      <div className="p-4 space-y-6">
        {/* User Points Info */}
        <div className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text-primary">Current Balance</h3>
              <p className="text-2xl font-bold text-gold">15,750 points</p>
            </div>
            <div className="text-right">
              <p className="text-text-secondary text-sm">This Month</p>
              <p className="text-text-primary font-medium">+2,450 points</p>
            </div>
          </div>
        </div>

        {/* Upload Options */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-text-primary">Upload Receipt</h2>
          
          {/* Camera Option */}
          {isSupported && (
            <motion.button
              onClick={handleTakePhoto}
              className="w-full bg-surface border border-interactive-border rounded-xl p-6 hover:bg-surface-elevated transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <Camera className="text-gold" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-text-primary">Take Photo</h3>
                  <p className="text-text-secondary text-sm">Use camera to capture receipt</p>
                </div>
              </div>
            </motion.button>
          )}

          {/* File Upload Option */}
          <motion.label
            className="w-full bg-surface border border-interactive-border rounded-xl p-6 hover:bg-surface-elevated transition-colors cursor-pointer block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-info/20 rounded-full flex items-center justify-center">
                <Upload className="text-info" size={24} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-text-primary">Upload from Gallery</h3>
                <p className="text-text-secondary text-sm">Choose existing photo</p>
              </div>
            </div>
          </motion.label>
        </div>

        {/* Tips */}
        <div className="bg-surface border border-interactive-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-3">Tips for Better Results</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>• Ensure receipt is clearly visible and well-lit</p>
            <p>• Include store name, date, and total amount</p>
            <p>• Avoid shadows and reflections</p>
            <p>• Keep receipt flat and straight</p>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-surface border border-interactive-border rounded-xl p-4">
          <h3 className="font-semibold text-text-primary mb-3">Recent Uploads</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">Zara - Jan 10</p>
                <p className="text-text-secondary text-sm">+250 points</p>
              </div>
              <span className="px-2 py-1 bg-success/20 text-success text-xs rounded-full">Approved</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-primary font-medium">Starbucks - Jan 9</p>
                <p className="text-text-secondary text-sm">+150 points</p>
              </div>
              <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
