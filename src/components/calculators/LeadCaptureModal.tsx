'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, Mail, Phone, User, Building, Download, 
  FileText, Shield, CheckCircle, ArrowRight,
  Sparkles, Lock, Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

interface LeadCaptureModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: LeadData) => void
  calculatorType: string
  resultValue?: number
  variant?: 'basic' | 'detailed' | 'professional'
}

export interface LeadData {
  email: string
  name?: string
  phone?: string
  company?: string
  pensionValue?: number
  interestedIn?: string[]
  consentMarketing?: boolean
  consentPartners?: boolean
}

export function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
  calculatorType,
  resultValue,
  variant = 'basic'
}: LeadCaptureModalProps) {
  const [formData, setFormData] = useState<LeadData>({
    email: '',
    name: '',
    phone: '',
    company: '',
    pensionValue: resultValue,
    interestedIn: [],
    consentMarketing: false,
    consentPartners: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (variant !== 'basic' && !formData.name) {
      newErrors.name = 'Name is required'
    }
    
    if (variant === 'professional' && !formData.phone) {
      newErrors.phone = 'Phone number is required'
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

  const benefits = {
    basic: [
      'Instant calculation results',
      'Personalized pension forecast',
      'Free pension guide PDF'
    ],
    detailed: [
      'Detailed calculation breakdown',
      'Downloadable PDF report',
      'Monthly pension tips newsletter',
      'Tax optimization strategies'
    ],
    professional: [
      'Professional analysis report',
      'Free consultation with advisor',
      'Personalized recommendations',
      'Exclusive SIPP/SSAS offers',
      'Priority support'
    ]
  }

  const titles = {
    basic: 'See Your Results',
    detailed: 'Get Your Detailed Report',
    professional: 'Unlock Professional Analysis'
  }

  const subtitles = {
    basic: 'Enter your email to view your pension calculation',
    detailed: 'Get a comprehensive PDF report with your results',
    professional: 'Connect with vetted advisors and get expert guidance'
  }

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
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>
              
              {/* Header with gradient */}
              <div className="relative bg-gradient-to-br from-primary to-secondary p-8 text-white">
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-sm mb-4"
                  >
                    <Sparkles className="h-4 w-4" />
                    {variant === 'professional' ? 'Premium Access' : 'Free Results'}
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold mb-2">{titles[variant]}</h2>
                  <p className="text-white/90 text-sm">{subtitles[variant]}</p>
                  
                  {resultValue && (
                    <div className="mt-4 p-3 bg-white/10 rounded-lg">
                      <p className="text-xs text-white/80">Your projected pension pot:</p>
                      <p className="text-2xl font-bold">£{resultValue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Benefits */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                <p className="text-xs font-medium text-muted-foreground mb-3">WHAT YOU'LL GET:</p>
                <ul className="space-y-2">
                  {benefits[variant].map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Email - always required */}
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
                      className={cn("pl-10", errors.email && "border-red-500")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                
                {/* Name - for detailed and professional */}
                {variant !== 'basic' && (
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
                        className={cn("pl-10", errors.name && "border-red-500")}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>
                )}
                
                {/* Phone - for professional */}
                {variant === 'professional' && (
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
                          className={cn("pl-10", errors.phone && "border-red-500")}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-red-500">{errors.phone}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Acme Corp"
                          className="pl-10"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    {/* Interest checkboxes */}
                    <div className="space-y-2">
                      <Label>I'm interested in:</Label>
                      <div className="space-y-2">
                        {['SIPP Transfer', 'Financial Advice', 'Tax Planning', 'Retirement Planning'].map((interest) => (
                          <div key={interest} className="flex items-center space-x-2">
                            <Checkbox
                              id={interest}
                              checked={formData.interestedIn?.includes(interest)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData({
                                    ...formData,
                                    interestedIn: [...(formData.interestedIn || []), interest]
                                  })
                                } else {
                                  setFormData({
                                    ...formData,
                                    interestedIn: formData.interestedIn?.filter(i => i !== interest)
                                  })
                                }
                              }}
                            />
                            <label htmlFor={interest} className="text-sm">{interest}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Consent checkboxes */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={formData.consentMarketing}
                      onCheckedChange={(checked) => 
                        setFormData({ ...formData, consentMarketing: checked as boolean })
                      }
                    />
                    <label htmlFor="marketing" className="text-xs text-muted-foreground">
                      Send me pension tips and calculator updates (you can unsubscribe anytime)
                    </label>
                  </div>
                  
                  {variant === 'professional' && (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="partners"
                        checked={formData.consentPartners}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, consentPartners: checked as boolean })
                        }
                      />
                      <label htmlFor="partners" className="text-xs text-muted-foreground">
                        Allow trusted advisors to contact me with relevant offers
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {variant === 'professional' ? (
                        <>
                          <Award className="h-4 w-4" />
                          Get Professional Analysis
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          {variant === 'detailed' ? 'Download Report' : 'View Results'}
                        </>
                      )}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  <Lock className="h-3 w-3 inline mr-1" />
                  Your information is secure and will never be sold
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}