'use client'

import Link from 'next/link'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { 
  Calculator, Shield, TrendingUp, PiggyBank, Receipt, 
  Building2, Wallet, CircleDollarSign, FileText, Briefcase,
  HeartHandshake, Coins, ArrowRight, Sparkles, Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const calculators = [
  {
    id: 'state-pension',
    icon: Shield,
    title: 'State Pension Forecast',
    description: 'Check your state pension age and forecast your retirement income',
    href: '/calculators/state-pension',
    color: 'from-blue-500 to-indigo-600',
    glow: 'rgb(99, 102, 241)',
    badge: 'Most Popular',
    stats: '8K searches/mo',
    features: ['Triple Lock', '2025 Rates', 'NI Gaps']
  },
  {
    id: 'workplace-pension',
    icon: Building2,
    title: 'Workplace Pension Calculator',
    description: 'Calculate your workplace pension growth with employer contributions',
    href: '/calculators/workplace-pension',
    color: 'from-emerald-500 to-green-600',
    glow: 'rgb(16, 185, 129)',
    badge: 'Most Used',
    stats: '1K searches/mo',
    features: ['Employer Match', 'Tax Relief', 'Growth Projections']
  },
  {
    id: 'drawdown',
    icon: Wallet,
    title: 'Pension Drawdown Planner',
    description: 'Model sustainable retirement income and pot longevity',
    href: '/calculators/pension-drawdown',
    color: 'from-purple-500 to-pink-600',
    glow: 'rgb(168, 85, 247)',
    badge: 'Interactive',
    stats: '2K searches/mo',
    features: ['Withdrawal Rates', 'Longevity Risk', 'Market Impact']
  },
  {
    id: 'tax-relief',
    icon: Receipt,
    title: 'Tax Relief Optimizer',
    description: 'Calculate tax savings on pension contributions',
    href: '/calculators/tax-relief',
    color: 'from-orange-500 to-red-600',
    glow: 'rgb(251, 146, 60)',
    badge: '40% Relief',
    stats: '5K searches/mo',
    features: ['Salary Sacrifice', 'Annual Allowance', 'Carry Forward']
  },
  {
    id: 'sipp',
    icon: Briefcase,
    title: 'SIPP Calculator',
    description: 'Self-invested pension planning with custom portfolios',
    href: '/calculators/sipp',
    color: 'from-cyan-500 to-blue-600',
    glow: 'rgb(6, 182, 212)',
    badge: 'Advanced',
    stats: '3K searches/mo',
    features: ['Platform Fees', 'Fund Choice', 'Transfer Value']
  },
  {
    id: 'annuity',
    icon: CircleDollarSign,
    title: 'Annuity Income Estimator',
    description: 'Convert your pot into guaranteed lifetime income',
    href: '/calculators/annuity',
    color: 'from-rose-500 to-pink-600',
    glow: 'rgb(244, 63, 94)',
    badge: 'Live Rates',
    stats: '2K searches/mo',
    features: ['Joint Life', 'Escalation', 'Enhanced Rates']
  }
]

function SpotlightCard({ calculator }: { calculator: typeof calculators[0] }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const springConfig = { damping: 25, stiffness: 700 }
  const mouseXSpring = useSpring(mouseX, springConfig)
  const mouseYSpring = useSpring(mouseY, springConfig)

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseXSpring}px ${mouseYSpring}px,
      ${calculator.glow}20,
      transparent 80%
    )
  `

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <Link href={calculator.href}>
        {/* Glow effect on hover */}
        <motion.div
          className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: spotlightBackground,
          }}
        />
        
        {/* Card border gradient */}
        <div className={cn(
          "absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          `bg-gradient-to-r ${calculator.color} blur-sm`
        )} />
        
        {/* Main card */}
        <div className="relative h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 overflow-hidden">
          {/* Animated background pattern */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" xmlns="http://www.w3.org/2000/svg"%3E%3Cdefs%3E%3Cpattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"%3E%3Cpath d="M 60 0 L 0 0 0 60" fill="none" stroke="gray" stroke-width="0.5"/%3E%3C/pattern%3E%3C/defs%3E%3Crect width="100%25" height="100%25" fill="url(%23grid)" /%3E%3C/svg%3E")',
              backgroundSize: '60px 60px',
            }}
          />
          
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "px-2 py-1 rounded-full text-xs font-medium text-white",
                `bg-gradient-to-r ${calculator.color}`
              )}
            >
              {calculator.badge}
            </motion.div>
          </div>
          
          {/* Content */}
          <div className="relative space-y-4">
            {/* Icon with animation */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
              className="relative"
            >
              <div className={cn(
                "absolute inset-0 rounded-full blur-xl opacity-50",
                `bg-gradient-to-r ${calculator.color}`
              )} />
              <div className={cn(
                "relative w-14 h-14 rounded-full flex items-center justify-center",
                `bg-gradient-to-r ${calculator.color}`
              )}>
                <calculator.icon className="h-7 w-7 text-white" />
              </div>
            </motion.div>
            
            {/* Title and description */}
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {calculator.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {calculator.description}
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>{calculator.stats}</span>
            </div>
            
            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {calculator.features.map((feature, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs"
                >
                  {feature}
                </motion.span>
              ))}
            </div>
            
            {/* CTA with arrow */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm font-medium text-primary">
                Calculate Now
              </span>
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="h-4 w-4 text-primary" />
              </motion.div>
            </div>
          </div>
          
          {/* Sparkle effects on hover */}
          {isHovered && (
            <motion.div
              className="absolute top-2 left-2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500" />
            </motion.div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

export default function PremiumCalculatorCards() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
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
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"
          >
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">13+ Professional Calculators</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Choose Your Calculator
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Industry-leading pension tools with real-time calculations, AI predictions, and comprehensive analysis
          </p>
        </motion.div>
        
        {/* Calculator grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <SpotlightCard key={calculator.id} calculator={calculator} />
          ))}
        </div>
        
        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/calculators">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              <span>View All 13+ Calculators</span>
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}