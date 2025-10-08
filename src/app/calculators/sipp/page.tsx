'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Briefcase, TrendingUp, DollarSign, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

export default function SIPPCalculatorPage() {
  const [inputs, setInputs] = useState({
    currentAge: 35,
    retirementAge: 67,
    currentPot: 50000,
    monthlyContribution: 500,
    annualGrowthRate: 7,
    annualFees: 0.5,
    oneOffContribution: 0,
  })

  const [results, setResults] = useState<any>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showSmartGate, setShowSmartGate] = useState(false)
  const [pendingResults, setPendingResults] = useState<any>(null)

  const {
    journeyState,
    isInitialized,
    completeCalculator,
    checkGate,
    updateUserProfile,
    trackEvent,
    completedCalculators: completedCount,
    journeyProgress,
    leadScore,
    userEmail,
  } = useJourneyState()

  const handleInputChange = (field: string, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setHasCalculated(false)
  }

  const calculateSIPP = () => {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    const monthsToRetirement = yearsToRetirement * 12
    const netGrowthRate = (inputs.annualGrowthRate - inputs.annualFees) / 100
    const monthlyRate = netGrowthRate / 12

    // Future value of current pot
    const futureValueOfCurrentPot = inputs.currentPot * Math.pow(1 + netGrowthRate, yearsToRetirement)

    // Future value of monthly contributions
    let futureValueOfContributions = 0
    if (monthlyRate !== 0) {
      futureValueOfContributions = inputs.monthlyContribution *
        ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate)
    } else {
      futureValueOfContributions = inputs.monthlyContribution * monthsToRetirement
    }

    // Future value of one-off contribution
    const futureValueOfOneOff = inputs.oneOffContribution * Math.pow(1 + netGrowthRate, yearsToRetirement)

    const totalProjectedPot = futureValueOfCurrentPot + futureValueOfContributions + futureValueOfOneOff
    const totalContributions = inputs.currentPot + (inputs.monthlyContribution * monthsToRetirement) + inputs.oneOffContribution
    const investmentGrowth = totalProjectedPot - totalContributions

    // Tax-free lump sum (25%)
    const taxFreeLumpSum = totalProjectedPot * 0.25
    const remainingPot = totalProjectedPot - taxFreeLumpSum

    // Estimated annual income (4% withdrawal rate)
    const estimatedAnnualIncome = remainingPot * 0.04
    const estimatedMonthlyIncome = estimatedAnnualIncome / 12

    // Lifetime fees impact
    const totalFeesEstimate = totalProjectedPot * (inputs.annualFees / 100) * yearsToRetirement

    return {
      totalProjectedPot,
      totalContributions,
      investmentGrowth,
      taxFreeLumpSum,
      remainingPot,
      estimatedAnnualIncome,
      estimatedMonthlyIncome,
      totalFeesEstimate,
      yearsToRetirement,
      growthPercentage: ((investmentGrowth / totalContributions) * 100).toFixed(1),
    }
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    setTimeout(() => {
      try {
        const result = calculateSIPP()

        trackEvent('calculation_completed', {
          calculatorType: 'sipp',
          projectedPot: result.totalProjectedPot,
        })

        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(result)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'sipp',
            inputs,
            {
              primaryValue: result.totalProjectedPot,
              secondaryValues: {
                monthlyIncome: result.estimatedMonthlyIncome,
                totalContributions: result.totalContributions,
              },
            },
            60
          )

          setResults(result)
          setHasCalculated(true)
          setIsCalculating(false)
        }
      } catch (error) {
        console.error('Calculation error:', error)
        setIsCalculating(false)
      }
    }, 500)
  }

  const handleSmartGateSubmit = async (data: any) => {
    updateUserProfile(data)
    setShowSmartGate(false)

    if (pendingResults) {
      completeCalculator(
        'sipp',
        inputs,
        {
          primaryValue: pendingResults.totalProjectedPot,
          secondaryValues: {
            monthlyIncome: pendingResults.estimatedMonthlyIncome,
            totalContributions: pendingResults.totalContributions,
          },
        },
        60
      )

      setResults(pendingResults)
      setHasCalculated(true)
      setPendingResults(null)
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
              <Briefcase className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                SIPP Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Self-Invested Personal Pension projection
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Investment Control</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Full</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Tax Relief</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Up to 45%</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Annual Allowance</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">£60,000</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Flexibility</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">High</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Input Form */}
            <div>
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Your SIPP Details</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Enter your self-invested pension information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Current Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Current Age</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.currentAge} years</span>
                    </div>
                    <Slider
                      value={[inputs.currentAge]}
                      onValueChange={([value]) => handleInputChange('currentAge', value)}
                      min={18}
                      max={75}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Retirement Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Planned Retirement Age</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.retirementAge} years</span>
                    </div>
                    <Slider
                      value={[inputs.retirementAge]}
                      onValueChange={([value]) => handleInputChange('retirementAge', value)}
                      min={55}
                      max={75}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Current Pot */}
                  <div className="space-y-2">
                    <Label htmlFor="currentPot" className="text-gray-900 dark:text-white">
                      Current SIPP Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        id="currentPot"
                        type="number"
                        value={inputs.currentPot}
                        onChange={(e) => handleInputChange('currentPot', parseFloat(e.target.value) || 0)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Monthly Contribution */}
                  <div className="space-y-2">
                    <Label htmlFor="monthlyContribution" className="text-gray-900 dark:text-white">
                      Monthly Contribution
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        id="monthlyContribution"
                        type="number"
                        value={inputs.monthlyContribution}
                        onChange={(e) => handleInputChange('monthlyContribution', parseFloat(e.target.value) || 0)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* One-Off Contribution */}
                  <div className="space-y-2">
                    <Label htmlFor="oneOffContribution" className="text-gray-900 dark:text-white">
                      One-Off Contribution (Optional)
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        id="oneOffContribution"
                        type="number"
                        value={inputs.oneOffContribution}
                        onChange={(e) => handleInputChange('oneOffContribution', parseFloat(e.target.value) || 0)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Annual Growth Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Expected Annual Growth</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.annualGrowthRate}%</span>
                    </div>
                    <Slider
                      value={[inputs.annualGrowthRate]}
                      onValueChange={([value]) => handleInputChange('annualGrowthRate', value)}
                      min={0}
                      max={15}
                      step={0.5}
                      className="w-full"
                    />
                  </div>

                  {/* Annual Fees */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Annual Fees</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.annualFees}%</span>
                    </div>
                    <Slider
                      value={[inputs.annualFees]}
                      onValueChange={([value]) => handleInputChange('annualFees', value)}
                      min={0}
                      max={2}
                      step={0.1}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating || inputs.currentAge >= inputs.retirementAge}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate SIPP Projection'}
                  </Button>

                  {inputs.currentAge >= inputs.retirementAge && (
                    <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
                      <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                      <AlertDescription className="text-yellow-600 dark:text-yellow-400">
                        Retirement age must be greater than current age
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div>
              {hasCalculated && results ? (
                <div className="space-y-6">
                  <Card className="border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Your SIPP Projection</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Estimated value at age {inputs.retirementAge}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Total Projected Pot */}
                      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Projected Pot</p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white">
                          {formatCurrency(results.totalProjectedPot)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          Growth of {results.growthPercentage}% over {results.yearsToRetirement} years
                        </p>
                      </div>

                      {/* Breakdown */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Total Contributions</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(results.totalContributions)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Investment Growth</span>
                          <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(results.investmentGrowth)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                          <span className="text-sm text-green-700 dark:text-green-300 font-medium">Tax-Free Lump Sum (25%)</span>
                          <span className="text-lg font-semibold text-green-700 dark:text-green-300">
                            {formatCurrency(results.taxFreeLumpSum)}
                          </span>
                        </div>
                      </div>

                      {/* Income Estimates */}
                      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Estimated Retirement Income (4% withdrawal)</p>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Annual Income</span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(results.estimatedAnnualIncome)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Monthly Income</span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-white">
                              {formatCurrency(results.estimatedMonthlyIncome)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Fees Impact */}
                      {results.totalFeesEstimate > 0 && (
                        <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          <AlertDescription className="text-blue-600 dark:text-blue-400">
                            Estimated lifetime fees: {formatCurrency(results.totalFeesEstimate)}
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <Briefcase className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Enter your details and click Calculate to see your SIPP projection
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Key Information */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Investment Freedom</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  A SIPP gives you full control over your investment choices, allowing you to select individual stocks, bonds, funds, and other assets.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Tax Benefits</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Contributions receive tax relief at your marginal rate (20%, 40%, or 45%), and investments grow tax-free within the SIPP.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Investment Risk</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  With greater control comes greater responsibility. Your SIPP value can go down as well as up depending on investment performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      {isInitialized && userEmail && completedCount > 0 && (
        <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <ProgressTracker />
          </div>
        </section>
      )}

      {/* SmartGate Modal */}
      <SmartGate
        isOpen={showSmartGate}
        onClose={() => setShowSmartGate(false)}
        onSubmit={handleSmartGateSubmit}
        tier={3}
        triggerReason="high_value_calculator"
        context={{
          calculatorName: 'SIPP',
          resultValue: pendingResults?.totalProjectedPot,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
