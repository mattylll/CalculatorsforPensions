'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CircleDollarSign, TrendingUp, Heart, Shield, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

type AnnuityType = 'single' | 'joint'
type EscalationType = 'level' | 'rpi' | 'fixed-3' | 'fixed-5'

export default function AnnuityCalculatorPage() {
  const [inputs, setInputs] = useState({
    pensionPot: 100000,
    age: 65,
    partnerAge: 63,
    annuityType: 'single' as AnnuityType,
    escalationType: 'level' as EscalationType,
    guaranteedPeriod: 5,
    healthConditions: false,
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

  const handleInputChange = (field: string, value: any) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
    setHasCalculated(false)
  }

  const calculateAnnuity = () => {
    // Base annuity rates (simplified - real rates would come from providers)
    // These are annual rates per £100,000 of pension pot
    const baseRates: Record<number, number> = {
      55: 3500,
      60: 4000,
      65: 4800,
      70: 6000,
      75: 7500,
    }

    // Find closest age bracket
    const ageKeys = Object.keys(baseRates).map(Number).sort((a, b) => a - b)
    const closestAge = ageKeys.reduce((prev, curr) =>
      Math.abs(curr - inputs.age) < Math.abs(prev - inputs.age) ? curr : prev
    )

    let annualRate = baseRates[closestAge]

    // Adjust for annuity type
    if (inputs.annuityType === 'joint') {
      annualRate *= 0.85 // Joint life annuities pay ~15% less
    }

    // Adjust for escalation
    const escalationMultipliers: Record<EscalationType, number> = {
      level: 1.0,
      rpi: 0.75,
      'fixed-3': 0.80,
      'fixed-5': 0.70,
    }
    annualRate *= escalationMultipliers[inputs.escalationType]

    // Adjust for health conditions (enhanced annuity)
    if (inputs.healthConditions) {
      annualRate *= 1.15 // Enhanced annuities can pay ~15% more
    }

    // Calculate actual income
    const annualIncome = (inputs.pensionPot / 100000) * annualRate
    const monthlyIncome = annualIncome / 12

    // Tax-free lump sum option (25%)
    const taxFreeLumpSum = inputs.pensionPot * 0.25
    const remainingPot = inputs.pensionPot - taxFreeLumpSum
    const annualIncomeWithLumpSum = (remainingPot / 100000) * annualRate
    const monthlyIncomeWithLumpSum = annualIncomeWithLumpSum / 12

    // Total income over lifetime (assuming life expectancy)
    const lifeExpectancy = inputs.annuityType === 'joint' ? 30 : 25
    const totalLifetimeIncome = annualIncome * lifeExpectancy
    const totalLifetimeIncomeWithLumpSum = (annualIncomeWithLumpSum * lifeExpectancy) + taxFreeLumpSum

    return {
      annualIncome,
      monthlyIncome,
      taxFreeLumpSum,
      annualIncomeWithLumpSum,
      monthlyIncomeWithLumpSum,
      totalLifetimeIncome,
      totalLifetimeIncomeWithLumpSum,
      annualRate: ((annualIncome / inputs.pensionPot) * 100).toFixed(2),
    }
  }

  const handleCalculate = () => {
    setIsCalculating(true)

    setTimeout(() => {
      try {
        const result = calculateAnnuity()

        trackEvent('calculation_completed', {
          calculatorType: 'annuity',
          annualIncome: result.annualIncome,
        })

        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(result)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'annuity',
            inputs,
            {
              primaryValue: result.annualIncome,
              secondaryValues: {
                monthlyIncome: result.monthlyIncome,
                pensionPot: inputs.pensionPot,
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
        'annuity',
        inputs,
        {
          primaryValue: pendingResults.annualIncome,
          secondaryValues: {
            monthlyIncome: pendingResults.monthlyIncome,
            pensionPot: inputs.pensionPot,
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
              <CircleDollarSign className="w-6 h-6 text-gray-900 dark:text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Annuity Calculator
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Estimate your guaranteed retirement income
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Guaranteed</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">For Life</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Income Type</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Fixed</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Protection</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">Optional</p>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center gap-2 mb-2">
                <CircleDollarSign className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Tax Relief</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">25% Free</p>
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
                  <CardTitle className="text-gray-900 dark:text-white">Annuity Details</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Enter your pension and personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pension Pot */}
                  <div className="space-y-2">
                    <Label htmlFor="pensionPot" className="text-gray-900 dark:text-white">
                      Pension Pot Value
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        id="pensionPot"
                        type="number"
                        value={inputs.pensionPot}
                        onChange={(e) => handleInputChange('pensionPot', parseFloat(e.target.value) || 0)}
                        className="pl-7"
                      />
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Your Age</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.age} years</span>
                    </div>
                    <Slider
                      value={[inputs.age]}
                      onValueChange={([value]) => handleInputChange('age', value)}
                      min={55}
                      max={85}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Annuity Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Annuity Type</Label>
                    <Select
                      value={inputs.annuityType}
                      onValueChange={(value: AnnuityType) => handleInputChange('annuityType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single Life</SelectItem>
                        <SelectItem value="joint">Joint Life (with partner)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Partner Age (if joint) */}
                  {inputs.annuityType === 'joint' && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label className="text-gray-900 dark:text-white">Partner's Age</Label>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.partnerAge} years</span>
                      </div>
                      <Slider
                        value={[inputs.partnerAge]}
                        onValueChange={([value]) => handleInputChange('partnerAge', value)}
                        min={55}
                        max={85}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Escalation Type */}
                  <div className="space-y-2">
                    <Label className="text-gray-900 dark:text-white">Income Increases</Label>
                    <Select
                      value={inputs.escalationType}
                      onValueChange={(value: EscalationType) => handleInputChange('escalationType', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="level">Level (no increases)</SelectItem>
                        <SelectItem value="rpi">RPI linked</SelectItem>
                        <SelectItem value="fixed-3">Fixed 3% per year</SelectItem>
                        <SelectItem value="fixed-5">Fixed 5% per year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Guaranteed Period */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-gray-900 dark:text-white">Guaranteed Period</Label>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{inputs.guaranteedPeriod} years</span>
                    </div>
                    <Slider
                      value={[inputs.guaranteedPeriod]}
                      onValueChange={([value]) => handleInputChange('guaranteedPeriod', value)}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Payments guaranteed for this period even if you die early
                    </p>
                  </div>

                  {/* Health Conditions */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="healthConditions"
                      checked={inputs.healthConditions}
                      onChange={(e) => handleInputChange('healthConditions', e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="healthConditions" className="text-gray-900 dark:text-white cursor-pointer">
                      I have health conditions that may reduce life expectancy
                    </Label>
                  </div>
                  {inputs.healthConditions && (
                    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950">
                      <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-blue-600 dark:text-blue-400">
                        You may qualify for an enhanced annuity with higher rates
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900"
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Annuity Income'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div>
              {hasCalculated && results ? (
                <div className="space-y-6">
                  <Card className="border-gray-200 dark:border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white">Your Annuity Income</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        Guaranteed income for life
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Without Lump Sum */}
                      <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Full Annuity (No Lump Sum)</p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                          {formatCurrency(results.annualIncome)}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">per year</p>
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(results.monthlyIncome)}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">per month</p>
                        </div>
                      </div>

                      {/* With Lump Sum */}
                      <div className="p-6 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-sm text-green-700 dark:text-green-300 mb-2 font-medium">With 25% Tax-Free Lump Sum</p>
                        <div className="space-y-4">
                          <div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                              {formatCurrency(results.taxFreeLumpSum)}
                            </p>
                            <p className="text-sm text-green-600 dark:text-green-400">upfront lump sum (tax-free)</p>
                          </div>
                          <div className="pt-4 border-t border-green-200 dark:border-green-900">
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                              {formatCurrency(results.annualIncomeWithLumpSum)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">annual income</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                              {formatCurrency(results.monthlyIncomeWithLumpSum)}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">monthly income</p>
                          </div>
                        </div>
                      </div>

                      {/* Key Stats */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Annual Rate</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {results.annualRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Lifetime Income</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(results.totalLifetimeIncome)}
                          </span>
                        </div>
                      </div>

                      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                        <AlertDescription className="text-yellow-600 dark:text-yellow-400">
                          These are estimates only. Actual annuity rates vary by provider and may change based on health, lifestyle, and market conditions.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <CircleDollarSign className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Enter your details and click Calculate to see your annuity income
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
                  <Shield className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Guaranteed Income</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  An annuity provides a guaranteed income for life, regardless of how long you live or how markets perform.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Protection Options</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose joint-life cover to protect your partner, guaranteed periods, and value protection to pass on to beneficiaries.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-gray-900 dark:text-white" />
                  <CardTitle className="text-lg text-gray-900 dark:text-white">Important Considerations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Once purchased, annuities cannot be changed or cancelled. Consider all options and shop around for the best rates before committing.
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
          calculatorName: 'Annuity',
          resultValue: pendingResults?.annualIncome,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
