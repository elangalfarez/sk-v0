"use client"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Crown, Star, Gift, Camera, TrendingUp, MapPin, ArrowLeft, Phone } from "lucide-react"

export default function VIPRegistrationInfoPage() {
  const navigate = useNavigate()

  const benefits = [
    {
      icon: Gift,
      title: "Earn Points",
      description: "Get points for every purchase and redeem exclusive rewards",
    },
    {
      icon: Camera,
      title: "Receipt Scanning",
      description: "Simply scan your receipts to automatically earn points",
    },
    {
      icon: Star,
      title: "Exclusive Offers",
      description: "Access VIP-only promotions and early sale notifications",
    },
    {
      icon: TrendingUp,
      title: "Tier Benefits",
      description: "Unlock Gold, Platinum, and Diamond tier privileges",
    },
  ]

  const tiers = [
    {
      name: "Gold",
      color: "from-tier-gold to-yellow-600",
      benefits: ["1x Points Multiplier", "Basic Rewards", "Birthday Bonus"],
    },
    {
      name: "Platinum",
      color: "from-tier-platinum to-gray-300",
      benefits: ["1.5x Points Multiplier", "Premium Rewards", "Priority Support"],
    },
    {
      name: "Diamond",
      color: "from-tier-diamond to-blue-400",
      benefits: ["2x Points Multiplier", "Exclusive Events", "Personal Shopper"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-interactive-border p-4">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface-elevated rounded-lg transition-colors">
            <ArrowLeft className="text-text-secondary" size={20} />
          </button>
          <h1 className="text-xl font-bold text-text-primary">VIP Membership</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          className="bg-gradient-to-br from-surface to-surface-elevated rounded-2xl p-6 border border-interactive-border text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-20 h-20 bg-gradient-to-r from-gold to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Crown className="text-black" size={32} />
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">Become a VIP Member</h2>
          <p className="text-text-secondary mb-6">
            Unlock exclusive benefits and earn rewards with every purchase at Supermal Karawaci
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-gold">
              <Star className="fill-gold" size={16} />
              <span>Free to Join</span>
            </div>
            <div className="flex items-center space-x-1 text-gold">
              <Gift size={16} />
              <span>Instant Rewards</span>
            </div>
          </div>
        </motion.div>

        {/* Benefits */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">VIP Benefits</h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="bg-surface border border-interactive-border rounded-xl p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="text-gold" size={20} />
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1">{benefit.title}</h4>
                <p className="text-text-secondary text-xs">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Membership Tiers */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">Membership Tiers</h3>
          <div className="space-y-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                className="bg-surface border border-interactive-border rounded-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${tier.color} rounded-full flex items-center justify-center`}
                  >
                    <Crown className="text-white" size={16} />
                  </div>
                  <h4 className="font-bold text-text-primary">{tier.name}</h4>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {tier.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="text-xs text-text-secondary bg-surface-elevated rounded-lg p-2 text-center"
                    >
                      {benefit}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How to Register */}
        <section>
          <h3 className="text-lg font-bold text-text-primary mb-4">How to Register</h3>
          <motion.div
            className="bg-gradient-to-r from-gold/10 to-yellow-600/10 border border-gold/30 rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="text-gold" size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary mb-2">Visit Customer Service</h4>
                <p className="text-text-secondary text-sm mb-3">
                  Registration is available at our Customer Service counter located on the Ground Floor near the main
                  entrance.
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    <span>Bring valid ID (KTP/Passport)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    <span>Fill out registration form</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
                    <span>Get instant VIP access</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Info */}
        <section>
          <motion.div
            className="bg-surface border border-interactive-border rounded-xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-text-primary mb-3">Need Help?</h4>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-info/20 rounded-full flex items-center justify-center">
                <Phone className="text-info" size={20} />
              </div>
              <div>
                <p className="text-text-primary font-medium">Customer Service</p>
                <p className="text-text-secondary text-sm">+62-21-5555-0100</p>
                <p className="text-text-secondary text-sm">Daily 10:00 - 22:00</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-gradient-to-r from-gold to-yellow-600 text-black py-4 rounded-xl font-bold text-lg hover:shadow-gold transition-all duration-300"
          >
            Already a Member? Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full bg-surface border border-interactive-border text-text-primary py-3 rounded-xl font-medium hover:bg-surface-elevated transition-colors"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  )
}
