'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp, Download, Share2, AlertTriangle, CheckCircle,
  PiggyBank, Building2, Receipt, Wallet, Shield, ArrowRight,
  Calendar, DollarSign, Target, Zap, Award, Phone, FileText,
  BarChart3, PieChart
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useJourneyState } from '@/hooks/useJourneyState'
import { ProgressTracker } from '@/components/journey/ProgressTracker'
import { ProfessionalAdviceCTA } from '@/components/calculators/ProfessionalAdviceCTA'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const router = useRouter()
  const {
    journeyState,
    isInitialized,
    getSummary,
    getPersonalizedMsg,
    getNextAction,
    completedCalculators,
    journeyProgress,
    leadScore,
    userEmail,
    userName,
    markPDFDownloaded,
    trackEvent,
  } = useJourneyState()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (isInitialized) {
      trackEvent('dashboard_viewed')
    }
  }, [isInitialized, trackEvent])

  if (!mounted || !isInitialized || !journeyState) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  }

  // Redirect if no email
  if (!userEmail) {
    router.push('/calculators/state-pension')
    return null
  }

  const summary = getSummary()
  const personalizedMsg = getPersonalizedMsg()
  const nextAction = getNextAction()
  const completedCalcs = Object.keys(journeyState.calculators)

  // Calculate total projected income
  const statePension = journeyState.financialSnapshot.statePensionAmount || 0
  const workplacePension = journeyState.financialSnapshot.workplacePensionValue || 0
  const personalPension = journeyState.financialSnapshot.personalPensionValue || 0
  const totalAnnualIncome = statePension + (workplacePension / 20) + (personalPension / 20) // Rough annual conversion

  // Calculate gap
  const desiredIncome = journeyState.financialSnapshot.desiredRetirementIncome || 35000
  const gap = desiredIncome - totalAnnualIncome

  const retirementAge = journeyState.financialSnapshot.retirementAge || 67
  const yearsToRetirement = journeyState.financialSnapshot.yearsToRetirement || 20

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  {userName ? `${userName}'s` : 'Your'} Pension Dashboard
                </h1>
                <p className="text-white/90">
                  Complete picture of your retirement planning
                </p>
              </div>
              <div className="hidden md:block">
                <div className="text-right">
                  <p className="text-sm text-white/80 mb-1">Clarity Score</p>
                  <p className="text-5xl font-bold">{leadScore}</p>
                  <p className="text-sm text-white/80">/100</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
        {/* Personalized Alert */}
        {personalizedMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Alert className={cn(
              personalizedMsg.type === 'warning' && 'border-yellow-500 bg-yellow-500/10',
              personalizedMsg.type === 'success' && 'border-green-500 bg-green-500/10',
              personalizedMsg.type === 'info' && 'border-blue-500 bg-blue-500/10'
            )}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{personalizedMsg.title}</strong>
                <p className="mt-1">{personalizedMsg.message}</p>
                {personalizedMsg.cta && (
                  <Button size="sm" className="mt-3">
                    {personalizedMsg.cta}
                  </Button>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" />
                  Total Pension Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">£{Math.round(totalAnnualIncome).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">per year in retirement</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Retirement Gap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn(
                  "text-3xl font-bold",
                  gap > 0 ? "text-red-500" : "text-green-500"
                )}>
                  {gap > 0 ? '-' : '+'}£{Math.abs(Math.round(gap)).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {gap > 0 ? 'shortfall' : 'surplus'} per year
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Years to Retirement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{yearsToRetirement}</p>
                <p className="text-xs text-muted-foreground mt-1">retiring at age {retirementAge}</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Journey Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{journeyProgress}%</p>
                <Progress value={journeyProgress} className="mt-2" />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Pension Sources Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Your Pension Sources
              </CardTitle>
              <CardDescription>
                Annual income breakdown from different pension types
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* State Pension */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">State Pension</span>
                    </div>
                    <span className="font-bold">£{Math.round(statePension).toLocaleString()}</span>
                  </div>
                  <Progress
                    value={totalAnnualIncome > 0 ? (statePension / totalAnnualIncome) * 100 : 0}
                    className="h-2"
                  />
                  {!journeyState.calculators['state-pension'] && (
                    <Link href="/calculators/state-pension">
                      <Button size="sm" variant="ghost" className="mt-2 text-xs">
                        Calculate <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Workplace Pension */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-emerald-500" />
                      <span className="font-medium">Workplace Pension</span>
                    </div>
                    <span className="font-bold">£{Math.round(workplacePension / 20).toLocaleString()}</span>
                  </div>
                  <Progress
                    value={totalAnnualIncome > 0 ? ((workplacePension / 20) / totalAnnualIncome) * 100 : 0}
                    className="h-2"
                  />
                  {!journeyState.calculators['workplace-pension'] && (
                    <Link href="/calculators/workplace-pension">
                      <Button size="sm" variant="ghost" className="mt-2 text-xs">
                        Calculate <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Personal Pension */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Personal/SIPP</span>
                    </div>
                    <span className="font-bold">£{Math.round(personalPension / 20).toLocaleString()}</span>
                  </div>
                  <Progress
                    value={totalAnnualIncome > 0 ? ((personalPension / 20) / totalAnnualIncome) * 100 : 0}
                    className="h-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completed Calculators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Completed Calculations
              </CardTitle>
              <CardDescription>
                {completedCalculators} of 5 core calculators complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(journeyState.calculators).map(([type, data]) => (
                  <Link key={type} href={`/calculators/${type}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer border-green-500/50 bg-green-500/5">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <h4 className="font-semibold text-sm capitalize">
                                {type.replace(/-/g, ' ')}
                              </h4>
                            </div>
                            <p className="text-2xl font-bold text-primary">
                              £{data.results.primaryValue.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Calculated {new Date(data.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Journey Progress Tracker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <ProgressTracker
            completedCalculators={completedCalcs as any}
            journeyProgress={journeyProgress}
            leadScore={leadScore}
            variant="full"
          />
        </motion.div>

        {/* Recommendations */}
        {nextAction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Recommended Next Step
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{nextAction.title}</h3>
                    <p className="text-muted-foreground mb-4">{nextAction.description}</p>
                    {nextAction.estimatedValue && (
                      <p className="text-sm text-green-600 font-medium mb-4">
                        Potential benefit: £{nextAction.estimatedValue.toLocaleString()}
                      </p>
                    )}
                    {nextAction.link ? (
                      <Link href={nextAction.link}>
                        <Button className="bg-gradient-to-r from-primary to-secondary">
                          {nextAction.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    ) : (
                      <Button
                        className="bg-gradient-to-r from-primary to-secondary"
                        onClick={() => {
                          if (nextAction.type === 'download') {
                            markPDFDownloaded()
                          }
                        }}
                      >
                        {nextAction.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Professional Advice CTA */}
        {gap > 5000 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ProfessionalAdviceCTA
              resultValue={Math.round(totalAnnualIncome)}
              calculatorType="dashboard"
              variant="banner"
            />
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="flex flex-wrap gap-4"
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              markPDFDownloaded()
              // Trigger PDF download logic here
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
          <Button size="lg" variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Results
          </Button>
          <Button size="lg" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            View Detailed Analysis
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
