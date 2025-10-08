'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { TrendingUp, Coins, Sparkles, Zap, Target, ChevronUp, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Slider } from '@/components/ui/slider'

// Particle system for visual effects
function ParticleField({ count = 50 }: { count?: number }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Generate stable particle data
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: ((i * 37) % 100) + '%',
    y: 100 + ((i * 23) % 50),
    scale: 0.5 + ((i * 13) % 50) / 100,
    duration: 5 + ((i * 7) % 5),
    delay: ((i * 3) % 5)
  }))
  
  if (!mounted) return null
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
          }}
          animate={{
            y: [-50, particle.y, -50],
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

// Animated coin component
function AnimatedCoin({ delay = 0, size = 40 }: { delay?: number, size?: number }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0, rotateY: 0 }}
      animate={{ 
        y: 0, 
        opacity: [0, 1, 1, 0],
        rotateY: 360 * 4,
        scale: [0.5, 1.2, 1, 0]
      }}
      transition={{
        duration: 2,
        delay,
        ease: "easeOut"
      }}
      style={{
        width: size,
        height: size,
      }}
      className="absolute"
    >
      <div className="relative w-full h-full">
        <motion.div
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>£</span>
        </motion.div>
      </div>
    </motion.div>
  )
}

// 3D Pension Pot Component
function PensionPot3D({ value, maxValue }: { value: number, maxValue: number }) {
  const percentage = (value / maxValue) * 100
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [20, -20]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-20, 20]), { stiffness: 300, damping: 30 })
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }
  
  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="relative w-64 h-80 mx-auto"
    >
      {/* Pot shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-4 bg-black/20 rounded-full blur-xl" />
      
      {/* Main pot container */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {/* Back face */}
        <div 
          className="absolute inset-0 rounded-b-[60px] bg-gradient-to-b from-gray-800 to-gray-900"
          style={{ transform: 'translateZ(-20px)' }}
        />
        
        {/* Pot sides */}
        <motion.div 
          className="absolute inset-0 rounded-b-[60px] bg-gradient-to-b from-gray-700 to-gray-800 shadow-2xl"
          style={{ 
            transform: 'translateZ(0px)',
            clipPath: 'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)'
          }}
        >
          {/* Glass effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-b-[60px]" />
          
          {/* Fill animation */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 rounded-b-[60px]"
            initial={{ height: '0%' }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Liquid shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Bubbles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/40 rounded-full"
                initial={{ bottom: 0, left: `${20 + i * 15}%` }}
                animate={{
                  bottom: ['0%', '100%'],
                  scale: [0.5, 1, 0],
                  opacity: [0.5, 1, 0]
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
        
        {/* Front highlight */}
        <div 
          className="absolute inset-0 rounded-b-[60px]"
          style={{ 
            transform: 'translateZ(20px)',
            background: 'linear-gradient(to br, rgba(255,255,255,0.1), transparent)'
          }}
        />
        
        {/* Rim */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-t-lg shadow-lg"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-t-lg" />
        </motion.div>
      </div>
      
      {/* Floating value display */}
      <motion.div
        className="absolute -top-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 blur-xl opacity-50" />
          <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl px-6 py-3 shadow-2xl border border-yellow-400/20">
            <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              £{value.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PensionPot3DSection() {
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  const [yearsToRetire, setYearsToRetire] = useState(25)
  const [currentPot, setCurrentPot] = useState(50000)
  const [growthRate] = useState(7)
  const [showCoins, setShowCoins] = useState(false)
  
  // Calculate projected pot value
  const calculateProjectedPot = () => {
    const monthlyReturn = growthRate / 100 / 12
    const months = yearsToRetire * 12
    
    // Future value of existing pot
    const futureValueCurrent = currentPot * Math.pow(1 + monthlyReturn, months)
    
    // Future value of monthly contributions
    const futureValueContributions = monthlyContribution * 
      ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
    
    return Math.round(futureValueCurrent + futureValueContributions)
  }
  
  const projectedPot = calculateProjectedPot()
  const maxPot = 1500000 // Max visualization at £1.5M
  
  // Auto-trigger coin animation on contribution change
  useEffect(() => {
    setShowCoins(true)
    const timer = setTimeout(() => setShowCoins(false), 2000)
    return () => clearTimeout(timer)
  }, [monthlyContribution])
  
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full"
          >
            <Sparkles className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">Interactive 3D Visualization</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            Watch Your
            <span className="block bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Pension Grow
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize your retirement savings with our interactive 3D pension pot
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <ParticleField count={30} />
            
            {/* Coin animation container */}
            <AnimatePresence>
              {showCoins && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(${-50 + (i - 2) * 30}%, -50%)`,
                      }}
                    >
                      <AnimatedCoin delay={i * 0.1} size={30 + Math.random() * 20} />
                    </div>
                  ))}
                </div>
              )}
            </AnimatePresence>
            
            <PensionPot3D value={projectedPot} maxValue={maxPot} />
            
            {/* Stats badges */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">{growthRate}% Growth</span>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7 }}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{yearsToRetire} Years</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Current Pot */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Current Pot Value</label>
                <div className="text-2xl font-bold text-primary">
                  £{currentPot.toLocaleString()}
                </div>
              </div>
              <div className="relative">
                <Slider
                  value={[currentPot]}
                  onValueChange={([value]) => setCurrentPot(value)}
                  min={0}
                  max={500000}
                  step={5000}
                  className="relative z-10"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>£0</span>
                  <span>£500,000</span>
                </div>
              </div>
            </div>
            
            {/* Monthly Contribution */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Monthly Contribution</label>
                <div className="text-2xl font-bold text-primary">
                  £{monthlyContribution.toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMonthlyContribution(Math.max(0, monthlyContribution - 50))}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <Slider
                  value={[monthlyContribution]}
                  onValueChange={([value]) => setMonthlyContribution(value)}
                  min={0}
                  max={5000}
                  step={50}
                  className="flex-1"
                />
                <button
                  onClick={() => setMonthlyContribution(Math.min(5000, monthlyContribution + 50))}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>£0</span>
                <span>£5,000</span>
              </div>
            </div>
            
            {/* Years to Retirement */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-lg font-semibold">Years to Retirement</label>
                <div className="text-2xl font-bold text-primary">
                  {yearsToRetire} years
                </div>
              </div>
              <Slider
                value={[yearsToRetire]}
                onValueChange={([value]) => setYearsToRetire(value)}
                min={1}
                max={40}
                step={1}
                className="relative z-10"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 year</span>
                <span>40 years</span>
              </div>
            </div>
            
            {/* Projection Summary */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur-xl opacity-20" />
              <div className="relative bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-medium">Projected Pot Value</span>
                  <Coins className="h-6 w-6" />
                </div>
                <div className="text-4xl font-bold mb-2">
                  £{projectedPot.toLocaleString()}
                </div>
                <div className="text-sm opacity-90">
                  Total contributions: £{((currentPot + (monthlyContribution * 12 * yearsToRetire))).toLocaleString()}
                </div>
                <div className="text-sm opacity-90">
                  Investment growth: £{(projectedPot - (currentPot + (monthlyContribution * 12 * yearsToRetire))).toLocaleString()}
                </div>
              </div>
            </motion.div>
            
            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              Get Detailed Projection
              <ChevronUp className="h-5 w-5 rotate-90" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}