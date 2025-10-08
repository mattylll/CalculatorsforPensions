'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, Mail, Phone, User, Calendar, DollarSign, Download,
  Shield, CheckCircle, ArrowRight, Sparkles, Lock, Award,
  TrendingUp, AlertTriangle, Gift, Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { QualificationTier, UserProfile } from '@/lib/types/journey'

interface SmartGateProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Partial<UserProfile>) => void
  tier: QualificationTier
  triggerReason: string
  context?: {
    calculatorName?: string
    resultValue?: number
    pensionGap?: number
    completedCalculators?: number
  }
  existingProfile?: Partial<UserProfile>
}

interface TierConfig {
  title: string
  subtitle: string
  benefits: string[]
  requiredFields: (keyof UserProfile)[]
  icon: React.ReactNode
  badgeText: string
  badgeColor: string
  ctaText: string
  skippable: boolean
}

const TIER_CONFIGS: Record<QualificationTier, TierConfig> = {
  1: {
    title: 'See Your Results',
    subtitle: 'Enter your email to view your pension calculation',
    benefits: [
      'Instant calculation results',
      'Save your progress across devices',
      'Continue your pension journey anytime',
    ],
    requiredFields: ['email'],
    icon: <Mail className="h-6 w-6" />,
    badgeText: 'Free Results',
    badgeColor: 'bg-blue-500',
    ctaText: 'View My Results',
    skippable: false,
  },
  2: {
    title: 'Get Your Detailed Report',
    subtitle: 'Unlock personalized recommendations and download your comprehensive PDF report',
    benefits: [
      'Detailed calculation breakdown with charts',
      'Downloadable PDF report',
      'Personalized recommendations',
      'Access to Results Dashboard',
      'Tax optimization strategies',
    ],
    requiredFields: ['email', 'name', 'age'],
    icon: <Download className="h-6 w-6" />,
    badgeText: 'Enhanced Access',
    badgeColor: 'bg-emerald-500',
    ctaText: 'Download Report',
    skippable: true,
  },
  3: {
    title: 'Speak to a Pension Specialist',
    subtitle: 'Get expert guidance tailored to your pension situation',
    benefits: [
      'Free 30-minute consultation',
      'FCA-regulated advisors',
      'Personalized action plan',
      'Fee reduction opportunities',
      'Tax optimization strategies',
      'No obligation',
    ],
    requiredFields: ['email', 'name', 'phone', 'bestTimeToCall'],
    icon: <Phone className="h-6 w-6" />,
    badgeText: 'Professional Advice',
    badgeColor: 'bg-purple-500',
    ctaText: 'Book Consultation',
    skippable: true,
  },
  4: {
    title: 'Priority Consultation',
    subtitle: 'Fast-track your pension optimization with immediate expert support',
    benefits: [
      'Same-day consultation available',
      'Dedicated senior advisor',
      'Comprehensive portfolio review',
      'Fee analysis report',
      'Transfer value assessment',
      'Priority support',
    ],
    requiredFields: ['email', 'name', 'phone', 'bestTimeToCall', 'urgency'],
    icon: <Award className="h-6 w-6" />,
    badgeText: 'Premium Access',
    badgeColor: 'bg-yellow-500',
    ctaText: 'Get Priority Support',
    skippable: false,
  },
}

export function SmartGate({
  isOpen,
  onClose,
  onSubmit,
  tier,
  triggerReason,
  context,
  existingProfile = {},
}: SmartGateProps) {
  const config = TIER_CONFIGS[tier]
  const [formData, setFormData] = useState<Partial<UserProfile>>(existingProfile)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(existingProfile)
  }, [existingProfile])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (config.requiredFields.includes('email') && !formData.email) {
      newErrors.email = 'Email is required'
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (config.requiredFields.includes('name') && !formData.name) {
      newErrors.name = 'Name is required'
    }

    if (config.requiredFields.includes('phone') && !formData.phone) {
      newErrors.phone = 'Phone number is required'
    }

    if (config.requiredFields.includes('age') && !formData.age) {
      newErrors.age = 'Age is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData)
      setIsSubmitting(false)
    }, 1000)
  }

  // Get contextual messaging
  const getContextualMessage = () => {
    if (tier === 4 && context?.pensionGap && context.pensionGap > 50000) {
      return {
        type: 'warning',
        icon: <AlertTriangle className="h-5 w-5" />,
        message: `With a £${context.pensionGap.toLocaleString()} pension gap, immediate action could save you hundreds of thousands over your retirement.`,
      }
    }

    if (tier === 3 && context?.pensionGap && context.pensionGap > 10000) {
      return {
        type: 'info',
        icon: <TrendingUp className="h-5 w-5" />,
        message: `Professional advice could help you bridge your £${context.pensionGap.toLocaleString()} pension gap and potentially save thousands in fees.`,
      }
    }

    if (tier === 2 && context?.completedCalculators && context.completedCalculators >= 3) {
      return {
        type: 'success',
        icon: <Gift className="h-5 w-5" />,
        message: `You've completed ${context.completedCalculators} calculators! Unlock your comprehensive pension report now.`,
      }
    }

    return null
  }

  const contextMessage = getContextualMessage()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={config.skippable ? onClose : undefined}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Close button (only if skippable) */}
              {config.skippable && (
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-primary to-secondary p-8 text-white">
                <div className="absolute inset-0 bg-black/20" />

                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-10"
                  animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                  }}
                />

                <div className="relative">
                  {/* Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mb-4',
                      config.badgeColor,
                      'text-white'
                    )}
                  >
                    <Sparkles className="h-4 w-4" />
                    {config.badgeText}
                  </motion.div>

                  {/* Title */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{config.title}</h2>
                      <p className="text-white/90 text-sm">{config.subtitle}</p>
                    </div>
                  </div>

                  {/* Result value display */}
                  {context?.resultValue && (
                    <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                      <p className="text-xs text-white/80 mb-1">Your calculation result:</p>
                      <p className="text-3xl font-bold">£{context.resultValue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contextual message */}
              {contextMessage && (
                <div className={cn(
                  'p-4',
                  contextMessage.type === 'warning' && 'bg-yellow-500/10 border-b border-yellow-500/20',
                  contextMessage.type === 'info' && 'bg-blue-500/10 border-b border-blue-500/20',
                  contextMessage.type === 'success' && 'bg-green-500/10 border-b border-green-500/20'
                )}>
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      contextMessage.type === 'warning' && 'text-yellow-600',
                      contextMessage.type === 'info' && 'text-blue-600',
                      contextMessage.type === 'success' && 'text-green-600'
                    )}>
                      {contextMessage.icon}
                    </div>
                    <p className="text-sm font-medium">{contextMessage.message}</p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-b">
                <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  What You'll Get:
                </p>
                <ul className="grid md:grid-cols-2 gap-2">
                  {config.benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Email - Tier 1+ */}
                {config.requiredFields.includes('email') && (
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={cn('pl-10', errors.email && 'border-red-500')}
                        value={formData.email || ''}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={!!existingProfile.email}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>
                )}

                {/* Name & Age - Tier 2+ */}
                {(config.requiredFields.includes('name') || config.requiredFields.includes('age')) && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {config.requiredFields.includes('name') && (
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Smith"
                            className={cn('pl-10', errors.name && 'border-red-500')}
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>
                        {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                      </div>
                    )}

                    {config.requiredFields.includes('age') && (
                      <div className="space-y-2">
                        <Label htmlFor="age">
                          Age <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="age"
                            type="number"
                            placeholder="35"
                            className={cn('pl-10', errors.age && 'border-red-500')}
                            value={formData.age || ''}
                            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                            min="18"
                            max="100"
                          />
                        </div>
                        {errors.age && <p className="text-xs text-red-500">{errors.age}</p>}
                      </div>
                    )}
                  </div>
                )}

                {/* Income Range - Tier 2 */}
                {tier >= 2 && !config.requiredFields.includes('phone') && (
                  <div className="space-y-2">
                    <Label htmlFor="incomeRange">Annual Income (Optional)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <select
                        id="incomeRange"
                        value={formData.incomeRange || ''}
                        onChange={(e) => setFormData({ ...formData, incomeRange: e.target.value })}
                        className="w-full pl-10 px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="">Select income range</option>
                        <option value="0-30k">£0 - £30,000</option>
                        <option value="30k-50k">£30,000 - £50,000</option>
                        <option value="50k-100k">£50,000 - £100,000</option>
                        <option value="100k+">£100,000+</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Phone & Best Time - Tier 3+ */}
                {config.requiredFields.includes('phone') && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="07123 456789"
                          className={cn('pl-10', errors.phone && 'border-red-500')}
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bestTime">Best Time to Call</Label>
                      <select
                        id="bestTime"
                        value={formData.bestTimeToCall || 'anytime'}
                        onChange={(e) => setFormData({ ...formData, bestTimeToCall: e.target.value as any })}
                        className="w-full px-3 py-2 border rounded-md bg-background"
                      >
                        <option value="morning">Morning (9am - 12pm)</option>
                        <option value="afternoon">Afternoon (12pm - 5pm)</option>
                        <option value="evening">Evening (5pm - 8pm)</option>
                        <option value="anytime">Anytime</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Urgency - Tier 4 */}
                {config.requiredFields.includes('urgency') && (
                  <div className="space-y-2">
                    <Label htmlFor="urgency">How Urgent is Your Need?</Label>
                    <select
                      id="urgency"
                      value={formData.urgency || 'medium'}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value as any })}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="low">Not urgent - exploring options</option>
                      <option value="medium">Medium - planning within 6 months</option>
                      <option value="high">High - need advice immediately</option>
                    </select>
                  </div>
                )}

                {/* Consent checkboxes */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.consentMarketing || false}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, consentMarketing: checked as boolean })
                      }
                    />
                    <label htmlFor="marketing" className="text-xs text-muted-foreground leading-relaxed">
                      Send me pension tips and calculator updates (you can unsubscribe anytime)
                    </label>
                  </div>

                  {tier >= 3 && (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="partners"
                        checked={formData.consentPartners || false}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consentPartners: checked as boolean })
                        }
                      />
                      <label htmlFor="partners" className="text-xs text-muted-foreground leading-relaxed">
                        Allow FCA-regulated advisors to contact me with relevant offers
                      </label>
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {tier >= 3 ? <Phone className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                      {config.ctaText}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>

                {/* Trust signals */}
                <div className="flex items-center justify-center gap-6 pt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Lock className="h-3 w-3" />
                    Secure & encrypted
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3" />
                    FCA regulated
                  </div>
                  {tier >= 3 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      4.9/5 rating
                    </div>
                  )}
                </div>

                {/* Skip option */}
                {config.skippable && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={onClose}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Maybe later
                    </button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
