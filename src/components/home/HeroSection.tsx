'use client'

import Link from 'next/link'
import { ArrowRight, TrendingUp, Shield, Clock, Calculator } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const stats = [
  { value: '£221.20', label: 'Weekly State Pension 2025' },
  { value: '4.1%', label: 'Triple Lock Increase' },
  { value: '35', label: 'Qualifying Years Needed' },
  { value: '£60k', label: 'Annual Allowance' },
]

export default function HeroSection() {
  const [currentPot, setCurrentPot] = useState(50000)
  const [monthlyContribution, setMonthlyContribution] = useState(500)
  
  // Simple growth calculation for demo
  const projectedPot = Math.round(currentPot * Math.pow(1.05, 20) + monthlyContribution * 12 * 20 * 1.5)

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background">
        <div className="absolute inset-0">
          {/* Floating orbs */}
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium"
            >
              <TrendingUp className="h-4 w-4" />
              Updated for 2025/26 Tax Year
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Plan Your Perfect
              </span>
              <br />
              <span className="text-foreground">
                Retirement Today
              </span>
            </h1>

            <p className="text-xl text-muted-foreground">
              Professional UK pension calculators with real-time projections. 
              Check your state pension, optimize tax relief, and forecast your retirement income with confidence.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Link href="/calculators/state-pension">
                  Check State Pension <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/calculators">
                  View All Calculators
                </Link>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                FCA Compliant
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary" />
                Real-time Calculations
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calculator className="h-4 w-4 text-primary" />
                50,000+ Users
              </div>
            </div>
          </motion.div>

          {/* Right Interactive Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            {/* Glass morphism card */}
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl" />
              
              <div className="relative space-y-6">
                <h3 className="text-2xl font-bold">Quick Pension Forecast</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Current Pension Pot
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="0"
                        max="500000"
                        step="5000"
                        value={currentPot}
                        onChange={(e) => setCurrentPot(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-bold text-lg min-w-[100px]">
                        £{currentPot.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Monthly Contribution
                    </label>
                    <div className="flex items-center gap-4 mt-2">
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-bold text-lg min-w-[80px]">
                        £{monthlyContribution}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <div className="text-sm text-muted-foreground mb-2">
                    Projected pot at retirement (20 years)
                  </div>
                  <motion.div
                    key={projectedPot}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  >
                    £{projectedPot.toLocaleString()}
                  </motion.div>
                  <p className="text-xs text-muted-foreground mt-2">
                    *Assuming 5% annual growth
                  </p>
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary">
                  <Link href="/calculators/workplace-pension">
                    Get Detailed Calculation <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg rounded-xl border border-white/10"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}