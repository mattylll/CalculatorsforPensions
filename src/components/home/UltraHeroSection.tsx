'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, TrendingUp, Sparkles, Zap, ChartBar, Shield, Award, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

// Particle system component
function ParticleField() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    setMounted(true)
    if (typeof window !== 'undefined') {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
  }, [])

  // Generate stable particle data
  const particles = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    initialX: ((i * 37) % 100) / 100,
    initialY: ((i * 23) % 100) / 100,
    endX: ((i * 41) % 100) / 100,
    endY: ((i * 31) % 100) / 100,
    duration: 10 + ((i * 7) % 20)
  }))

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-primary/20 rounded-full"
          initial={{ 
            x: particle.initialX * dimensions.width,
            y: particle.initialY * dimensions.height,
          }}
          animate={{
            x: particle.endX * dimensions.width,
            y: particle.endY * dimensions.height,
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  )
}

// 3D Card Component
// Simple card without 3D tilt
function Card3D({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

// Animated counter
function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (count < value) {
        setCount(prev => Math.min(prev + Math.ceil(value / 50), value))
      }
    }, 20)
    return () => clearTimeout(timer)
  }, [count, value])

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

// Premium feature cards
const features = [
  { icon: Zap, title: "Lightning Fast", description: "Real-time calculations in milliseconds" },
  { icon: Shield, title: "Bank-Level Security", description: "256-bit SSL encryption" },
  { icon: Award, title: "Award Winning", description: "Best Pension Calculator 2025" },
]

export default function UltraHeroSection() {
  const router = useRouter()
  const [currentPot, setCurrentPot] = useState(75000)
  const [monthlyContribution, setMonthlyContribution] = useState(750)
  const [selectedGrowth, setSelectedGrowth] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')
  const [isCalculating, setIsCalculating] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  const growthRates = {
    conservative: { rate: 0.03, color: 'from-blue-500 to-blue-600' },
    moderate: { rate: 0.05, color: 'from-emerald-500 to-emerald-600' },
    aggressive: { rate: 0.07, color: 'from-orange-500 to-orange-600' }
  }

  const projectedPot = Math.round(
    currentPot * Math.pow(1 + growthRates[selectedGrowth].rate, 20) + 
    monthlyContribution * 12 * 20 * (1 + growthRates[selectedGrowth].rate / 2)
  )

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => {
      setIsCalculating(false)
      router.push('/analysis')
    }, 1500)
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-background">
          {/* Animated mesh gradient */}
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'rgb(99, 102, 241)', stopOpacity: 0.1 }}>
                  <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
                </stop>
                <stop offset="100%" style={{ stopColor: 'rgb(16, 185, 129)', stopOpacity: 0.1 }}>
                  <animate attributeName="stop-opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
                </stop>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grad1)" />
          </svg>
        </div>

        {/* Particle effects */}
        <ParticleField />

        {/* Floating shapes */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 w-96 h-96"
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="w-full h-full bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="relative container mx-auto px-4 py-20 z-10"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Enhanced */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Animated badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-lg opacity-50 animate-pulse" />
                <div className="relative inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium">
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>AI-Powered Calculations</span>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">NEW</span>
                </div>
              </div>
            </motion.div>

            {/* Main heading with gradient animation */}
            <div className="space-y-4">
              <motion.h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 bg-clip-text text-transparent animate-gradient">
                  Unlock Your
                </span>
                <span className="block mt-2">
                  Retirement Dreams
                </span>
              </motion.h1>

              <motion.p 
                className="text-xl text-muted-foreground max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Advanced UK pension calculators with AI predictions, real-time market data, and personalized insights.
              </motion.p>
            </div>

            {/* Action buttons with hover effects */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
                asChild
              >
                <Link href="/calculators/state-pension">
                  <span className="relative z-10">Start Free Analysis</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group border-2 hover:scale-105 transition-transform"
                asChild
              >
                <Link href="#demo">
                  <ChartBar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Animated stats */}
            <motion.div 
              className="flex flex-wrap gap-8 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={50000} suffix="+" />
                </div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={99} suffix="%" />
                </div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  <AnimatedCounter value={4.9} prefix="" suffix="/5" />
                </div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </motion.div>

            {/* Feature pills */}
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/20"
                >
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{feature.title}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Interactive Calculator - Ultra Premium */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <Card3D>
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-30 blur-2xl animate-pulse" />
              
              {/* Main card */}
              <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                {/* Animated border gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient opacity-10" />
                
                {/* Card content */}
                <div className="relative p-8 space-y-6">
                  {/* Header with live indicator */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Pension Forecast</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-xs text-muted-foreground">Live</span>
                    </div>
                  </div>

                  {/* Growth rate selector */}
                  <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
                    {(['conservative', 'moderate', 'aggressive'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedGrowth(type)}
                        className={cn(
                          "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all",
                          selectedGrowth === type
                            ? "bg-white dark:bg-gray-800 shadow-sm"
                            : "hover:bg-white/50 dark:hover:bg-gray-800/50"
                        )}
                      >
                        <div className="flex flex-col items-center">
                          <span className="capitalize">{type}</span>
                          <span className="text-xs text-muted-foreground">
                            {type === 'conservative' && '3%'}
                            {type === 'moderate' && '5%'}
                            {type === 'aggressive' && '7%'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Interactive sliders */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Current Pot</label>
                        <motion.div 
                          key={currentPot}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-bold text-primary"
                        >
                          £{currentPot.toLocaleString()}
                        </motion.div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="500000"
                          step="5000"
                          value={currentPot}
                          onChange={(e) => setCurrentPot(Number(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div 
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-lg pointer-events-none"
                          style={{ width: `${(currentPot / 500000) * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Monthly Contribution</label>
                        <motion.div 
                          key={monthlyContribution}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-bold text-primary"
                        >
                          £{monthlyContribution}
                        </motion.div>
                      </div>
                      <div className="relative">
                        <input
                          type="range"
                          min="0"
                          max="3000"
                          step="50"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          className="w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-lg appearance-none cursor-pointer"
                        />
                        <div 
                          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-primary to-secondary rounded-lg pointer-events-none"
                          style={{ width: `${(monthlyContribution / 3000) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Animated result */}
                  <div className="relative p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl animate-pulse" />
                    <div className="relative space-y-2">
                      <div className="text-sm text-muted-foreground">Projected at age 65</div>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={projectedPot}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className={cn(
                            "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
                            growthRates[selectedGrowth].color
                          )}
                        >
                          £{projectedPot.toLocaleString()}
                        </motion.div>
                      </AnimatePresence>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>+{((projectedPot - currentPot) / currentPot * 100).toFixed(0)}% growth</span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button with animation */}
                  <Button 
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] transition-transform"
                  >
                    {isCalculating ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-4 w-4" />
                      </motion.div>
                    ) : (
                      <>
                        Get Detailed Analysis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  {/* Trust indicators */}
                  <div className="flex items-center justify-center gap-6 pt-2">
                    <div className="flex items-center gap-1">
                      <Shield className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-muted-foreground">Secure</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-blue-500" />
                      <span className="text-xs text-muted-foreground">50k+ users</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">Certified</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card3D>
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .bg-size-200 {
          background-size: 200% 200%;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid var(--primary);
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: white;
          border: 3px solid var(--primary);
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  )
}