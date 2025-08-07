"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Store, Receipt, DollarSign, FileText } from 'lucide-react'
import LoadingSpinner from "@/components/common/LoadingSpinner"
import type { CameraPhoto } from "@/types"

interface ReceiptUploadFormProps {
  photo: CameraPhoto
  onSubmit: (data: any) => Promise<void>
  isLoading: boolean
}

export default function ReceiptUploadForm({ photo, onSubmit, isLoading }: ReceiptUploadFormProps) {
  const [formData, setFormData] = useState({
    storeName: "",
    transactionDate: "",
    receiptNumber: "",
    totalAmount: "",
    notes: ""
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.storeName.trim()) {
      newErrors.storeName = "Store name is required"
    }
    
    if (!formData.transactionDate) {
      newErrors.transactionDate = "Transaction date is required"
    }
    
    if (!formData.receiptNumber.trim()) {
      newErrors.receiptNumber = "Receipt number is required"
    }
    
    if (!formData.totalAmount.trim()) {
      newErrors.totalAmount = "Total amount is required"
    } else if (isNaN(Number(formData.totalAmount)) || Number(formData.totalAmount) <= 0) {
      newErrors.totalAmount = "Please enter a valid amount"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    const submitData = {
      ...formData,
      totalAmount: Number(formData.totalAmount),
      imageUri: photo.webPath
    }
    
    await onSubmit(submitData)
  }

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Store Name */}
      <div>
        <label htmlFor="storeName" className="block text-sm font-medium text-text-primary mb-2">
          Store Name
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Store className="text-text-secondary" size={18} />
          </div>
          <input
            id="storeName"
            type="text"
            value={formData.storeName}
            onChange={(e) => handleInputChange("storeName", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-surface border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.storeName 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            placeholder="e.g., Zara, Starbucks"
            disabled={isLoading}
          />
        </div>
        {errors.storeName && (
          <p className="mt-1 text-sm text-error">{errors.storeName}</p>
        )}
      </div>

      {/* Transaction Date */}
      <div>
        <label htmlFor="transactionDate" className="block text-sm font-medium text-text-primary mb-2">
          Transaction Date
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calendar className="text-text-secondary" size={18} />
          </div>
          <input
            id="transactionDate"
            type="date"
            value={formData.transactionDate}
            onChange={(e) => handleInputChange("transactionDate", e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full pl-10 pr-4 py-3 bg-surface border rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.transactionDate 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            disabled={isLoading}
          />
        </div>
        {errors.transactionDate && (
          <p className="mt-1 text-sm text-error">{errors.transactionDate}</p>
        )}
      </div>

      {/* Receipt Number */}
      <div>
        <label htmlFor="receiptNumber" className="block text-sm font-medium text-text-primary mb-2">
          Receipt Number
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Receipt className="text-text-secondary" size={18} />
          </div>
          <input
            id="receiptNumber"
            type="text"
            value={formData.receiptNumber}
            onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-surface border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.receiptNumber 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            placeholder="Receipt or transaction number"
            disabled={isLoading}
          />
        </div>
        {errors.receiptNumber && (
          <p className="mt-1 text-sm text-error">{errors.receiptNumber}</p>
        )}
      </div>

      {/* Total Amount */}
      <div>
        <label htmlFor="totalAmount" className="block text-sm font-medium text-text-primary mb-2">
          Total Amount (Rp)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="text-text-secondary" size={18} />
          </div>
          <input
            id="totalAmount"
            type="number"
            value={formData.totalAmount}
            onChange={(e) => handleInputChange("totalAmount", e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-surface border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold transition-colors ${
              errors.totalAmount 
                ? "border-error focus:ring-error" 
                : "border-interactive-border focus:border-gold"
            }`}
            placeholder="0"
            min="0"
            step="1000"
            disabled={isLoading}
          />
        </div>
        {errors.totalAmount && (
          <p className="mt-1 text-sm text-error">{errors.totalAmount}</p>
        )}
      </div>

      {/* Notes (Optional) */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
          Notes (Optional)
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText className="text-text-secondary" size={18} />
          </div>
          <textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            rows={3}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-interactive-border rounded-xl text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors resize-none"
            placeholder="Any additional information..."
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:shadow-gold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" color="white" />
            <span>Processing...</span>
          </>
        ) : (
          <span>Submit Receipt</span>
        )}
      </motion.button>

      {/* Info */}
      <div className="bg-info/10 border border-info/30 rounded-xl p-4">
        <p className="text-info text-sm">
          <strong>Processing Time:</strong> Your receipt will be reviewed within 24 hours. 
          Points will be automatically added to your account once approved.
        </p>
      </div>
    </motion.form>
  )
}