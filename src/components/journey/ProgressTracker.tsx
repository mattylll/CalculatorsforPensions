'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Lock, ArrowRight, Sparkles, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CalculatorType } from '@/lib/types/journey'

interface CalculatorStep {
  id: CalculatorType
  name: string
  description: string
  icon: string
  link: string
  points: number
  completed: boolean
  locked: boolean
}

interface ProgressTrackerProps {
  completedCalculators: CalculatorType[]
  journeyProgress: number
  leadScore: number
  onCalculatorClick?: (calculator: CalculatorType) => void
  variant?: 'compact' | 'full'
  className?: string
}

const CALCULATOR_STEPS: Omit<CalculatorStep, 'completed' | 'locked'>[] = [
  {
    id: 'state-pension',
    name: 'State Pension',
    description: 'Check your state pension forecast',
    icon: '🏛️',
    link: '/calculators/state-pension',
    points: 20,
  },
  {
    id: 'workplace-pension',
    name: 'Workplace Pension',
    description: 'Calculate workplace pension growth',
    icon: '🏢',
    link: '/calculators/workplace-pension',
    points: 20,
  },
  {
    id: 'tax-relief',
    name: 'Tax Relief',
    description: 'Optimize your tax savings',
    icon: '💰',
    link: '/calculators/tax-relief',
    points: 15,
  },
  {
    id: 'pension-drawdown',
    name: 'Pension Drawdown',
    description: 'Plan your retirement income',
    icon: '📊',
    link: '/calculators/pension-drawdown',
    points: 15,
  },
  {
    id: 'lump-sum-tax',
    name: 'Lump Sum Tax',
    description: 'Calculate lump sum implications',
    icon: '💵',
    link: '/calculators/lump-sum-tax',
    points: 15,
  },
]

export function ProgressTracker({
  completedCalculators,
  journeyProgress,
  leadScore,
  onCalculatorClick,
  variant = 'full',
  className,
}: ProgressTrackerProps) {
  // Build calculator steps with completion status
  const steps: CalculatorStep[] = CALCULATOR_STEPS.map((step, index) => ({
    ...step,
    completed: completedCalculators.includes(step.id),
    locked: index > 0 && !completedCalculators.includes(CALCULATOR_STEPS[index - 1].id),
  }))

  const completedCount = completedCalculators.length
  const totalSteps = CALCULATOR_STEPS.length

  if (variant === 'compact') {
    return (
      <Card className={cn('bg-gradient-to-br from-primary/5 to-secondary/5', className)}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium">Retirement Clarity Score</p>
              <p className="text-2xl font-bold text-primary">{leadScore}/100</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {completedCount} of {totalSteps} complete
              </p>
              <p className="text-xs text-muted-foreground">{journeyProgress}% done</p>
            </div>
          </div>
          <Progress value={journeyProgress} className="h-2" />
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">Complete all for full analysis</p>
            {completedCount < totalSteps && (
              <Link href={steps.find((s) => !s.completed)?.link || '/calculators/state-pension'}>
                <Button size="sm" variant="ghost" className="text-primary">
                  Continue <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      {/* Header with score */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="h-8 w-8 text-yellow-500" />
              Your Retirement Journey
            </h2>
            <p className="text-muted-foreground mt-1">
              Complete all calculators to unlock your comprehensive pension report
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground mb-1">Clarity Score</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {leadScore}
            </p>
            <p className="text-sm text-muted-foreground">/100</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative">
          <Progress value={journeyProgress} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {completedCount} of {totalSteps} calculators completed • {journeyProgress}% complete
          </p>
        </div>
      </motion.div>

      {/* Calculator steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={cn(
                'relative overflow-hidden transition-all',
                step.completed && 'border-green-500/50 bg-green-500/5',
                step.locked && 'opacity-50',
                !step.locked && !step.completed && 'hover:shadow-lg hover:scale-[1.02] cursor-pointer'
              )}
              onClick={() => {
                if (!step.locked && !step.completed) {
                  onCalculatorClick?.(step.id)
                }
              }}
            >
              {/* Completion badge */}
              {step.completed && (
                <div className="absolute top-2 right-2">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                </div>
              )}

              {/* Lock badge */}
              {step.locked && (
                <div className="absolute top-2 right-2">
                  <div className="bg-gray-400 text-white rounded-full p-1">
                    <Lock className="h-4 w-4" />
                  </div>
                </div>
              )}

              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-3xl">{step.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{step.name}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-medium text-primary">
                    +{step.points} points
                  </span>
                  {step.completed ? (
                    <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                  ) : step.locked ? (
                    <span className="text-xs text-gray-400">🔒 Locked</span>
                  ) : (
                    <Link href={step.link}>
                      <Button size="sm" variant="ghost" className="text-primary">
                        Start <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Achievement unlocks */}
      {completedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Sparkles className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Unlocked Benefits</h3>
                  <ul className="space-y-2">
                    {completedCount >= 1 && (
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Basic pension forecast
                      </li>
                    )}
                    {completedCount >= 2 && (
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Combined results view
                      </li>
                    )}
                    {completedCount >= 3 && (
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Detailed PDF report
                      </li>
                    )}
                    {completedCount >= 4 && (
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Free professional consultation
                      </li>
                    )}
                    {completedCount >= 5 && (
                      <li className="text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Comprehensive retirement roadmap
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
