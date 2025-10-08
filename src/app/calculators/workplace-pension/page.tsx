'use client'

import { useState, useEffect } from 'react'
import { Building2, TrendingUp, Check, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import { DCPensionCalculator } from '@/lib/calculators/dc-pension/calculator'
import { DCPensionResult } from '@/lib/calculators/dc-pension/types'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

export default function WorkplacePensionCalculatorPage() {
  const [showSmartGate, setShowSmartGate] = useState(false)
  const [pendingResults, setPendingResults] = useState<DCPensionResult | null>(null)

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

  const [inputs, setInputs] = useState({
    currentAge: 30,
    retirementAge: 67,
    currentPot: 10000,
    monthlyContribution: 300,
    employerContribution: 150,
    annualSalary: 35000,
    salaryGrowthRate: 0.025,
    investmentReturn: 0.05,
    inflationRate: 0.025,
    annualCharges: 0.0075,
    taxRelief: true,
    salaryExchange: false
  })

  const [results, setResults] = useState<DCPensionResult | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (isInitialized) {
      trackEvent('calculator_started', { calculator: 'workplace-pension' })
    }
  }, [isInitialized, trackEvent])

  const handleSmartGateSubmit = (profileData: any) => {
    updateUserProfile(profileData)

    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...profileData,
      calculatorType: 'workplace-pension',
      timestamp: new Date().toISOString(),
      resultValue: pendingResults?.projectedPot || 0
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))

    setShowSmartGate(false)

    if (pendingResults) {
      completeCalculator(
        'workplace-pension',
        inputs,
        {
          primaryValue: pendingResults.projectedPot,
          secondaryValues: {
            monthlyIncome: pendingResults.estimatedMonthlyIncome,
            totalContributions: pendingResults.totalContributions,
          }
        },
        60
      )

      setResults(pendingResults)
      setPendingResults(null)
      setHasCalculated(true)

      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const handleCalculate = () => {
    setIsCalculating(true)
    setTimeout(() => {
      try {
        const calculator = new DCPensionCalculator(inputs)
        const result = calculator.calculate()
        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(result)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'workplace-pension',
            inputs,
            {
              primaryValue: result.projectedPot,
              secondaryValues: {
                monthlyIncome: result.estimatedMonthlyIncome,
                totalContributions: result.totalContributions,
              }
            },
            60
          )

          setResults(result)
          setHasCalculated(true)
          setIsCalculating(false)
          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
        }
      } catch (error) {
        console.error('Calculation error:', error)
        setResults(null)
        setIsCalculating(false)
      }
    }, 500)
  }

  const yearsToRetirement = inputs.retirementAge - inputs.currentAge
  const totalMonthlyContribution = inputs.monthlyContribution + inputs.employerContribution

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm mb-6">
              <Building2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Workplace & Personal Pensions</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Workplace Pension Calculator
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Project your pension growth with employer contributions and tax relief. See how your workplace pension could grow by retirement.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Min Contribution', value: '8%' },
                { label: 'Employer Min', value: '3%' },
                { label: 'Tax Relief', value: '20%' },
                { label: 'Annual Limit', value: '£60k' },
              ].map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
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
                  <CardTitle className="text-2xl">Your Details</CardTitle>
                  <CardDescription>
                    Enter your pension information to project your retirement savings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Current Age</Label>
                      <Input
                        type="number"
                        value={inputs.currentAge}
                        onChange={(e) => setInputs({ ...inputs, currentAge: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Retirement Age</Label>
                      <Input
                        type="number"
                        value={inputs.retirementAge}
                        onChange={(e) => setInputs({ ...inputs, retirementAge: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Annual Salary</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.annualSalary}
                        onChange={(e) => setInputs({ ...inputs, annualSalary: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Current Pension Pot</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.currentPot}
                        onChange={(e) => setInputs({ ...inputs, currentPot: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Your Monthly Contribution</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.monthlyContribution}
                        onChange={(e) => setInputs({ ...inputs, monthlyContribution: Number(e.target.value) })}
                        className="w-32 border-gray-200 dark:border-gray-800"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">/month</span>
                    </div>
                    <Slider
                      value={[inputs.monthlyContribution]}
                      onValueChange={([value]) => setInputs({ ...inputs, monthlyContribution: value })}
                      min={0}
                      max={2000}
                      step={50}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Employer Monthly Contribution</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.employerContribution}
                        onChange={(e) => setInputs({ ...inputs, employerContribution: Number(e.target.value) })}
                        className="w-32 border-gray-200 dark:border-gray-800"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">/month</span>
                    </div>
                    <Slider
                      value={[inputs.employerContribution]}
                      onValueChange={([value]) => setInputs({ ...inputs, employerContribution: value })}
                      min={0}
                      max={1000}
                      step={25}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Investment Return (%)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={(inputs.investmentReturn * 100).toFixed(1)}
                        onChange={(e) => setInputs({ ...inputs, investmentReturn: Number(e.target.value) / 100 })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                        step="0.1"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">% per year</span>
                    </div>
                    <Slider
                      value={[inputs.investmentReturn * 100]}
                      onValueChange={([value]) => setInputs({ ...inputs, investmentReturn: value / 100 })}
                      min={0}
                      max={12}
                      step={0.5}
                      className="py-4"
                    />
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Summary</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Years to retirement</span>
                        <span className="font-semibold text-gray-900 dark:text-white">{yearsToRetirement}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total monthly contribution</span>
                        <span className="font-semibold text-gray-900 dark:text-white">£{totalMonthlyContribution}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white h-11"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Pension Growth'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div id="results">
              {hasCalculated && results ? (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Projection</CardTitle>
                    <CardDescription>Estimated pension at retirement age {inputs.retirementAge}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Projected Pension Pot</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        £{results.projectedPot.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Contributions</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{results.totalContributions.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Investment Growth</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{(results.projectedPot - results.totalContributions).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Estimated Monthly Income</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Sustainable drawdown (4%)</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            £{results.estimatedMonthlyIncome.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Annual income</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            £{(results.estimatedMonthlyIncome * 12).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Alert className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/30">
                      <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <AlertDescription className="text-gray-900 dark:text-white">
                        <strong>Tax-Free Lump Sum:</strong> You can typically take 25% tax-free at retirement
                        <div className="mt-2 text-sm">
                          Available lump sum: <strong>£{(results.projectedPot * 0.25).toLocaleString()}</strong>
                        </div>
                      </AlertDescription>
                    </Alert>

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Contribution Breakdown</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Your contributions</span>
                          <span className="text-gray-900 dark:text-white">
                            £{(inputs.monthlyContribution * 12 * yearsToRetirement).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Employer contributions</span>
                          <span className="text-gray-900 dark:text-white">
                            £{(inputs.employerContribution * 12 * yearsToRetirement).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Tax relief (estimated)</span>
                          <span className="text-gray-900 dark:text-white">
                            £{(inputs.monthlyContribution * 12 * yearsToRetirement * 0.25).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => window.location.href = '/calculators/tax-relief'}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Calculate Tax Relief
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="py-16 text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Calculate</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your details and click "Calculate Pension Growth" to see your projection
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Information</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Minimum Contributions',
                points: [
                  'Total minimum: 8% of salary',
                  'Employer minimum: 3%',
                  'Your minimum: 5%'
                ]
              },
              {
                title: 'Tax Benefits',
                points: [
                  'Automatic 20% tax relief',
                  'Higher rate taxpayers get more',
                  'Annual allowance: £60,000'
                ]
              },
              {
                title: 'Accessing Your Pension',
                points: [
                  'Access from age 55 (rising to 57)',
                  '25% tax-free lump sum',
                  'Flexible withdrawals available'
                ]
              }
            ].map((section) => (
              <Card key={section.title} className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check className="h-4 w-4 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Progress */}
      {isInitialized && journeyState && completedCount > 0 && (
        <section className="py-16 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <ProgressTracker
              completedCalculators={Object.keys(journeyState.calculators) as any}
              journeyProgress={journeyProgress}
              leadScore={leadScore}
              variant="compact"
            />
          </div>
        </section>
      )}

      {/* SmartGate Modal */}
      <SmartGate
        isOpen={showSmartGate}
        onClose={() => setShowSmartGate(false)}
        onSubmit={handleSmartGateSubmit}
        tier={2}
        triggerReason="second_calculator_complete"
        context={{
          calculatorName: 'Workplace Pension',
          resultValue: pendingResults?.projectedPot,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
