'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calculator, TrendingUp, Shield, Clock, Receipt, PiggyBank,
  ChevronRight, Sparkles, Award, Users, CheckCircle, ArrowRight,
  Target, Zap, AlertTriangle, FileText, BarChart3, Wallet,
  Building2, HeartHandshake, Briefcase, CircleDollarSign
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LeadCaptureModal, LeadData } from '@/components/calculators/LeadCaptureModal'
import { ProfessionalAdviceCTA } from '@/components/calculators/ProfessionalAdviceCTA'

// Floating particles background
function FloatingParticles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-br from-primary to-secondary rounded-full opacity-10 blur-md"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            x: [0, 100, -50, 150, 0],
            y: [0, -100, 50, -150, 0],
            scale: [1, 1.5, 0.8, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// Analysis steps
const analysisSteps = [
  {
    id: 'profile',
    title: 'Your Profile',
    description: 'Tell us about yourself',
    icon: Users,
    fields: ['age', 'income', 'employment']
  },
  {
    id: 'goals',
    title: 'Retirement Goals',
    description: 'When and how you want to retire',
    icon: Target,
    fields: ['retirementAge', 'lifestyle', 'income']
  },
  {
    id: 'current',
    title: 'Current Pensions',
    description: 'Your existing pension arrangements',
    icon: PiggyBank,
    fields: ['workplace', 'personal', 'state']
  },
  {
    id: 'analysis',
    title: 'Analysis',
    description: 'Getting your personalized report',
    icon: BarChart3,
    fields: []
  }
]

// Calculator recommendations based on analysis
const calculatorRecommendations = [
  {
    id: 'state-pension',
    name: 'State Pension Calculator',
    description: 'Check your state pension forecast and retirement age',
    icon: Shield,
    link: '/calculators/state-pension',
    priority: 1,
    color: 'from-blue-500 to-indigo-600',
    benefit: 'Understand your guaranteed baseline income'
  },
  {
    id: 'workplace-pension',
    name: 'Workplace Pension Calculator',
    description: 'Calculate your workplace pension growth with employer contributions',
    icon: Building2,
    link: '/calculators/workplace-pension',
    priority: 1,
    color: 'from-emerald-500 to-green-600',
    benefit: 'Maximize employer matching and tax relief'
  },
  {
    id: 'tax-relief',
    name: 'Tax Relief Optimizer',
    description: 'Calculate tax savings on pension contributions',
    icon: Receipt,
    link: '/calculators/tax-relief',
    priority: 2,
    color: 'from-orange-500 to-red-600',
    benefit: 'Save up to 45% through tax efficiency'
  },
  {
    id: 'drawdown',
    name: 'Pension Drawdown Planner',
    description: 'Model sustainable retirement income',
    icon: Wallet,
    link: '/calculators/pension-drawdown',
    priority: 3,
    color: 'from-purple-500 to-pink-600',
    benefit: 'Plan sustainable withdrawals'
  },
  {
    id: 'sipp',
    name: 'SIPP Calculator',
    description: 'Self-invested pension planning',
    icon: Briefcase,
    link: '/calculators/sipp',
    priority: 3,
    color: 'from-cyan-500 to-blue-600',
    benefit: 'Take control of your investments'
  },
  {
    id: 'annuity',
    name: 'Annuity Income Estimator',
    description: 'Convert your pot into guaranteed income',
    icon: CircleDollarSign,
    link: '/calculators/annuity',
    priority: 3,
    color: 'from-rose-500 to-pink-600',
    benefit: 'Secure lifetime income'
  }
]

export default function DetailedAnalysisPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [hasProvidedEmail, setHasProvidedEmail] = useState(false)
  const [analysisStarted, setAnalysisStarted] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  
  // Form data
  const [formData, setFormData] = useState({
    // Profile
    age: '',
    income: '',
    employment: 'employed',
    
    // Goals
    retirementAge: '',
    desiredIncome: '',
    lifestyle: 'comfortable',
    
    // Current Pensions
    workplacePension: '',
    personalPension: '',
    hasStatePension: true,
    
    // Contact (for lead capture)
    email: '',
    name: '',
    phone: ''
  })

  useEffect(() => {
    setMounted(true)
    // Check if user has already provided email
    const emailProvided = sessionStorage.getItem('pensionCalculatorEmail')
    if (emailProvided) {
      setHasProvidedEmail(true)
      setFormData(prev => ({ ...prev, email: emailProvided }))
    }
  }, [])

  useEffect(() => {
    if (analysisStarted && !analysisComplete) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setAnalysisComplete(true)
            clearInterval(timer)
            return 100
          }
          return prev + 5
        })
      }, 150)
      return () => clearInterval(timer)
    }
  }, [analysisStarted, analysisComplete])

  const handleLeadSubmit = (data: LeadData) => {
    // Store email in session
    sessionStorage.setItem('pensionCalculatorEmail', data.email)
    
    // Store full lead data
    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...data,
      source: 'detailed-analysis',
      timestamp: new Date().toISOString(),
      analysisData: formData
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))
    
    setHasProvidedEmail(true)
    setShowLeadCapture(false)
    setFormData(prev => ({ ...prev, email: data.email, name: data.name || '', phone: data.phone || '' }))
    
    // Continue to next step
    if (currentStep < analysisSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleNextStep = () => {
    // Show lead capture modal after first step if no email
    if (currentStep === 0 && !hasProvidedEmail) {
      setShowLeadCapture(true)
      return
    }
    
    if (currentStep < analysisSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      
      // Start analysis on last step
      if (currentStep === analysisSteps.length - 2) {
        setAnalysisStarted(true)
      }
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <FloatingParticles />
      
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-32 pb-20 px-4 overflow-hidden"
      >
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20"
            animate={{
              scale: [1, 1.1, 1],
              x: [0, -30, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-2 mb-8"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Personalized Pension Analysis</span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-clip-text text-transparent animate-gradient">
              Get Your Complete
            </span>
            <br />
            <span className="text-white">Pension Analysis</span>
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mb-8"
          >
            Answer a few questions and receive a personalized pension report with actionable recommendations tailored to your situation.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-gray-300">100% Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              <span className="text-gray-300">5 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">Free Analysis</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {!analysisComplete ? (
            <>
              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center justify-between mb-4">
                  {analysisSteps.map((step, index) => (
                    <div
                      key={step.id}
                      className={cn(
                        "flex items-center",
                        index < analysisSteps.length - 1 && "flex-1"
                      )}
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                          index <= currentStep
                            ? "bg-primary border-primary text-white"
                            : "bg-gray-800 border-gray-600 text-gray-400"
                        )}
                      >
                        {index < currentStep ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <step.icon className="h-5 w-5" />
                        )}
                      </motion.div>
                      {index < analysisSteps.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-0.5 mx-2 transition-colors",
                            index < currentStep
                              ? "bg-primary"
                              : "bg-gray-700"
                          )}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-white">
                    {analysisSteps[currentStep].title}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {analysisSteps[currentStep].description}
                  </p>
                </div>
              </motion.div>

              {/* Form Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="mb-8"
                >
                  <Card className="p-8 bg-white/5 backdrop-blur-xl border-white/10">
                    {/* Step 1: Profile */}
                    {currentStep === 0 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-white">Your Age</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 35"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            This helps us calculate your state pension age
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-white">Annual Income</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 50000"
                            value={formData.income}
                            onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Used to optimize tax relief recommendations
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-white">Employment Status</Label>
                          <select
                            value={formData.employment}
                            onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md"
                          >
                            <option value="employed">Employed</option>
                            <option value="self-employed">Self-Employed</option>
                            <option value="director">Company Director</option>
                            <option value="retired">Retired</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Goals */}
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-white">Target Retirement Age</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 65"
                            value={formData.retirementAge}
                            onChange={(e) => setFormData({ ...formData, retirementAge: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-white">Desired Annual Income in Retirement</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 30000"
                            value={formData.desiredIncome}
                            onChange={(e) => setFormData({ ...formData, desiredIncome: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                          <p className="text-xs text-gray-400 mt-1">
                            Include all income you'd like in retirement
                          </p>
                        </div>
                        
                        <div>
                          <Label className="text-white">Retirement Lifestyle</Label>
                          <select
                            value={formData.lifestyle}
                            onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 text-white rounded-md"
                          >
                            <option value="essential">Essential (£14,400/year)</option>
                            <option value="comfortable">Comfortable (£31,300/year)</option>
                            <option value="luxury">Luxury (£43,100/year)</option>
                          </select>
                          <p className="text-xs text-gray-400 mt-1">
                            Based on Retirement Living Standards
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Current Pensions */}
                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <Label className="text-white">Current Workplace Pension Value</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 25000"
                            value={formData.workplacePension}
                            onChange={(e) => setFormData({ ...formData, workplacePension: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-white">Personal/SIPP Pension Value</Label>
                          <Input
                            type="number"
                            placeholder="e.g., 10000"
                            value={formData.personalPension}
                            onChange={(e) => setFormData({ ...formData, personalPension: e.target.value })}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>
                        
                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                          <p className="text-sm text-white mb-2">
                            📊 Based on your age, you'll qualify for State Pension at age {parseInt(formData.age) < 39 ? 68 : 67}
                          </p>
                          <p className="text-xs text-gray-400">
                            Current weekly rate: £221.20 (£11,502/year)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Analysis */}
                    {currentStep === 3 && (
                      <div className="text-center py-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-6"
                        >
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          >
                            <BarChart3 className="h-10 w-10 text-white" />
                          </motion.div>
                        </motion.div>
                        
                        <h3 className="text-2xl font-bold text-white mb-4">
                          Analyzing Your Pension...
                        </h3>
                        
                        <div className="w-full max-w-md mx-auto mb-6">
                          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-secondary"
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <p className="text-sm text-gray-400 mt-2">{progress}% Complete</p>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          <motion.p
                            key={Math.floor(progress / 20)}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-gray-400"
                          >
                            {progress < 20 && "Calculating your state pension forecast..."}
                            {progress >= 20 && progress < 40 && "Analyzing tax relief opportunities..."}
                            {progress >= 40 && progress < 60 && "Projecting pension growth scenarios..."}
                            {progress >= 60 && progress < 80 && "Identifying optimization strategies..."}
                            {progress >= 80 && progress < 100 && "Preparing your personalized report..."}
                            {progress >= 100 && "Analysis complete!"}
                          </motion.p>
                        </AnimatePresence>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={handlePreviousStep}
                    disabled={currentStep === 0}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    {currentStep === 2 ? 'Get Analysis' : 'Continue'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Results Section */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success Message */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center mb-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 mb-6"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
                
                <h2 className="text-3xl font-bold text-white mb-4">
                  Your Analysis is Ready!
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                  Based on your information, we've identified key areas to optimize your retirement planning. 
                  Use our specialized calculators below to dive deeper into each aspect.
                </p>
              </motion.div>

              {/* Key Insights */}
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl border-primary/20 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  Key Insights
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <h4 className="font-semibold text-white mb-2">Retirement Gap</h4>
                    <p className="text-3xl font-bold text-red-400 mb-2">
                      £{((parseInt(formData.desiredIncome) || 30000) - 11502).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Annual shortfall between desired income and state pension
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <h4 className="font-semibold text-white mb-2">Tax Relief Available</h4>
                    <p className="text-3xl font-bold text-green-400 mb-2">
                      {parseInt(formData.income) > 50270 ? '40%' : '20%'}
                    </p>
                    <p className="text-sm text-gray-400">
                      Your marginal tax rate for pension contributions
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <h4 className="font-semibold text-white mb-2">Years to Retirement</h4>
                    <p className="text-3xl font-bold text-blue-400 mb-2">
                      {(parseInt(formData.retirementAge) || 65) - (parseInt(formData.age) || 35)}
                    </p>
                    <p className="text-sm text-gray-400">
                      Time to build your pension pot
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <h4 className="font-semibold text-white mb-2">Current Pension Value</h4>
                    <p className="text-3xl font-bold text-primary mb-2">
                      £{(parseInt(formData.workplacePension || '0') + parseInt(formData.personalPension || '0')).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Combined workplace and personal pensions
                    </p>
                  </motion.div>
                </div>
              </Card>

              {/* Recommended Calculators */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Your Personalized Action Plan
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {calculatorRecommendations.map((calc, index) => (
                    <motion.div
                      key={calc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Link href={calc.link}>
                        <Card className="h-full p-6 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all hover:scale-[1.02] cursor-pointer">
                          <div className={cn(
                            "inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                            `bg-gradient-to-br ${calc.color}`
                          )}>
                            <calc.icon className="h-6 w-6 text-white" />
                          </div>
                          
                          {calc.priority === 1 && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium mb-3">
                              <Sparkles className="h-3 w-3" />
                              Recommended
                            </span>
                          )}
                          
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {calc.name}
                          </h4>
                          <p className="text-sm text-gray-400 mb-4">
                            {calc.description}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {calc.benefit}
                          </p>
                          
                          <div className="flex items-center gap-2 mt-4 text-primary">
                            <span className="text-sm font-medium">Use Calculator</span>
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Professional Advice CTA */}
              <ProfessionalAdviceCTA
                resultValue={parseInt(formData.desiredIncome) || 30000}
                calculatorType="detailed-analysis"
                variant="banner"
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={() => {
                    setCurrentStep(0)
                    setAnalysisComplete(false)
                    setAnalysisStarted(false)
                    setProgress(0)
                  }}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Start New Analysis
                </Button>
                <Button
                  onClick={() => router.push('/calculators/state-pension')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Start with State Pension
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={handleLeadSubmit}
        calculatorType="detailed-analysis"
        variant="detailed"
      />
    </div>
  )
}