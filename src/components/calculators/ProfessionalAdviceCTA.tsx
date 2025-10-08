'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Phone, MessageSquare, Users, TrendingUp, 
  Shield, Award, ArrowRight, Star, CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LeadCaptureModal, LeadData } from './LeadCaptureModal'
import { cn } from '@/lib/utils'

interface ProfessionalAdviceCTAProps {
  resultValue?: number
  calculatorType: string
  variant?: 'inline' | 'card' | 'banner'
  className?: string
}

export function ProfessionalAdviceCTA({
  resultValue,
  calculatorType,
  variant = 'card',
  className
}: ProfessionalAdviceCTAProps) {
  const [showModal, setShowModal] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const handleLeadSubmit = async (data: LeadData) => {
    // Here you would send the lead data to your API
    console.log('Lead captured:', data)
    
    // Store lead in localStorage for now (replace with API call)
    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...data,
      calculatorType,
      timestamp: new Date().toISOString(),
      resultValue
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))
    
    setShowModal(false)
    setHasSubmitted(true)
  }

  if (hasSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn("text-center p-6", className)}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          An advisor will contact you within 24 hours to discuss your pension options.
        </p>
      </motion.div>
    )
  }

  if (variant === 'inline') {
    return (
      <>
        <div className={cn("flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10", className)}>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Need Professional Advice?</p>
              <p className="text-sm text-muted-foreground">
                Speak to a qualified advisor about your options
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
          >
            Get Advice
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <LeadCaptureModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleLeadSubmit}
          calculatorType={calculatorType}
          resultValue={resultValue}
          variant="professional"
        />
      </>
    )
  }

  if (variant === 'banner') {
    return (
      <>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white",
            className
          )}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }} />
          </div>
          
          <div className="relative">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-6 w-6" />
                  <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded">
                    Exclusive Offer
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Get a Free Pension Review
                </h3>
                <p className="text-white/90 mb-4 max-w-md">
                  Our network of FCA-regulated advisors can help you optimize your pension 
                  and potentially save thousands in taxes and fees.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">Free consultation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">No obligation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm">FCA regulated</span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowModal(true)}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Speak to an Advisor
                </Button>
              </div>
              <div className="hidden md:block">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30"
                    >
                      <Users className="h-6 w-6 text-white/80" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-white/80 mt-2">
                  <span className="font-bold">2,847</span> people got advice this month
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <LeadCaptureModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleLeadSubmit}
          calculatorType={calculatorType}
          resultValue={resultValue}
          variant="professional"
        />
      </>
    )
  }

  // Default card variant
  return (
    <>
      <Card className={cn("bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20", className)}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Want Expert Guidance?
            </CardTitle>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              ))}
              <span className="text-sm text-muted-foreground ml-2">4.9/5</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Based on your pension projection of{' '}
            <span className="font-bold text-foreground">
              £{resultValue?.toLocaleString() || '0'}
            </span>, our advisors can help you:
          </p>
          
          <ul className="space-y-2">
            {[
              'Reduce fees and charges by up to 70%',
              'Optimize tax relief and save thousands',
              'Access exclusive SIPP/SSAS opportunities',
              'Get personalized retirement strategies'
            ].map((benefit, index) => (
              <motion.li
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </motion.li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Average client savings:</p>
              <p className="text-xl font-bold text-primary">£47,000</p>
            </div>
          </div>
          
          <Button
            onClick={() => setShowModal(true)}
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            Get Free Consultation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-xs text-center text-muted-foreground">
            No obligation • FCA regulated advisors • Usually responds in 1 hour
          </p>
        </CardContent>
      </Card>
      
      <LeadCaptureModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleLeadSubmit}
        calculatorType={calculatorType}
        resultValue={resultValue}
        variant="professional"
      />
    </>
  )
}