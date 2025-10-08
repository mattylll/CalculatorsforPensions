'use client'

import { useState, useEffect } from 'react'
import { Wallet, Check, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

export default function PensionDrawdownCalculatorPage() {
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

  const [inputs, setInputs] = useState({
    pensionPot: 250000,
    retirementAge: 67,
    currentAge: 67,
    lifeExpectancy: 90,
    withdrawalRate: 4,
    annualGrowthRate: 5,
    inflationRate: 2.5,
    taxFreeLumpSum: 25
  })

  const [results, setResults] = useState<any>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (isInitialized) {
      trackEvent('calculator_started', { calculator: 'pension-drawdown' })
    }
  }, [isInitialized, trackEvent])

  const handleSmartGateSubmit = (profileData: any) => {
    updateUserProfile(profileData)

    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...profileData,
      calculatorType: 'pension-drawdown',
      timestamp: new Date().toISOString(),
      resultValue: pendingResults?.annualIncome || 0
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))

    setShowSmartGate(false)

    if (pendingResults) {
      completeCalculator(
        'pension-drawdown',
        inputs,
        {
          primaryValue: pendingResults.annualIncome,
          secondaryValues: {
            monthlyIncome: pendingResults.monthlyIncome,
            taxFreeLumpSum: pendingResults.taxFreeLumpSum,
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
        // Simple drawdown calculation
        const taxFreeLumpSumAmount = inputs.pensionPot * (inputs.taxFreeLumpSum / 100)
        const remainingPot = inputs.pensionPot - taxFreeLumpSumAmount
        const annualIncome = remainingPot * (inputs.withdrawalRate / 100)
        const monthlyIncome = annualIncome / 12
        const yearsOfIncome = inputs.lifeExpectancy - inputs.currentAge
        const totalWithdrawn = annualIncome * yearsOfIncome
        const potDepletionYear = remainingPot / annualIncome

        const result = {
          taxFreeLumpSum: taxFreeLumpSumAmount,
          remainingPot,
          annualIncome,
          monthlyIncome,
          yearsOfIncome,
          totalWithdrawn,
          potDepletionYear,
          sustainabilityRating: potDepletionYear >= yearsOfIncome ? 'Sustainable' : 'At Risk'
        }

        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(result)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'pension-drawdown',
            inputs,
            {
              primaryValue: result.annualIncome,
              secondaryValues: {
                monthlyIncome: result.monthlyIncome,
                taxFreeLumpSum: result.taxFreeLumpSum,
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm mb-6">
              <Wallet className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Flexible Retirement Income</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Pension Drawdown Calculator
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Calculate sustainable income from your pension pot. Plan flexible withdrawals and understand how long your savings will last.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Min Access Age', value: '55' },
                { label: 'Tax-Free', value: '25%' },
                { label: 'Safe Rate', value: '4%' },
                { label: 'Flexible', value: '100%' },
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
                    Enter your pension pot and withdrawal preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Total Pension Pot</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.pensionPot}
                        onChange={(e) => setInputs({ ...inputs, pensionPot: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

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
                      <Label>Life Expectancy</Label>
                      <Input
                        type="number"
                        value={inputs.lifeExpectancy}
                        onChange={(e) => setInputs({ ...inputs, lifeExpectancy: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Annual Withdrawal Rate (%)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.withdrawalRate}
                        onChange={(e) => setInputs({ ...inputs, withdrawalRate: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                        step="0.5"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">% per year</span>
                    </div>
                    <Slider
                      value={[inputs.withdrawalRate]}
                      onValueChange={([value]) => setInputs({ ...inputs, withdrawalRate: value })}
                      min={1}
                      max={10}
                      step={0.5}
                      className="py-4"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Safe withdrawal rate: 3-4% per year
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Tax-Free Lump Sum (%)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.taxFreeLumpSum}
                        onChange={(e) => setInputs({ ...inputs, taxFreeLumpSum: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">%</span>
                    </div>
                    <Slider
                      value={[inputs.taxFreeLumpSum]}
                      onValueChange={([value]) => setInputs({ ...inputs, taxFreeLumpSum: value })}
                      min={0}
                      max={25}
                      step={5}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Expected Annual Growth (%)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.annualGrowthRate}
                        onChange={(e) => setInputs({ ...inputs, annualGrowthRate: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                        step="0.5"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">% per year</span>
                    </div>
                    <Slider
                      value={[inputs.annualGrowthRate]}
                      onValueChange={([value]) => setInputs({ ...inputs, annualGrowthRate: value })}
                      min={0}
                      max={12}
                      step={0.5}
                      className="py-4"
                    />
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white h-11"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Drawdown'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div id="results">
              {hasCalculated && results ? (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Drawdown Plan</CardTitle>
                    <CardDescription>Sustainable income projection</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {inputs.taxFreeLumpSum > 0 && (
                      <div className="p-6 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                        <p className="text-sm text-green-800 dark:text-green-300 mb-2">Tax-Free Lump Sum</p>
                        <p className="text-4xl font-bold text-green-900 dark:text-green-100">
                          £{results.taxFreeLumpSum.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                          Available immediately, no tax to pay
                        </p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual Income</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        £{results.annualIncome.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Income</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{Math.round(results.monthlyIncome).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Remaining Pot</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{results.remainingPot.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sustainability Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Years of income needed</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {results.yearsOfIncome} years
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Pot depletion (current rate)</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {Math.round(results.potDepletionYear)} years
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Sustainability rating</span>
                          <span className={`font-semibold ${results.sustainabilityRating === 'Sustainable' ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                            {results.sustainabilityRating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {results.sustainabilityRating === 'At Risk' && (
                      <Alert className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30">
                        <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <AlertDescription className="text-gray-900 dark:text-white">
                          <strong>Warning:</strong> Your current withdrawal rate may deplete your pot before life expectancy.
                          <div className="mt-2 text-sm">
                            Consider reducing your withdrawal rate to {Math.floor((results.remainingPot / results.yearsOfIncome) / results.remainingPot * 100)}% for better sustainability.
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Key Assumptions</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Withdrawal rate</span>
                          <span className="text-gray-900 dark:text-white">{inputs.withdrawalRate}% per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Expected growth</span>
                          <span className="text-gray-900 dark:text-white">{inputs.annualGrowthRate}% per year</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Inflation assumption</span>
                          <span className="text-gray-900 dark:text-white">{inputs.inflationRate}% per year</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => window.location.href = '/dashboard'}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      View Complete Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="py-16 text-center">
                    <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Calculate</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your details and click "Calculate Drawdown" to see your income plan
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
                title: 'Flexibility',
                points: [
                  'Access from age 55 (57 from 2028)',
                  'Take as much or little as needed',
                  'Change withdrawals anytime'
                ]
              },
              {
                title: 'Tax Treatment',
                points: [
                  '25% tax-free lump sum',
                  'Withdrawals taxed as income',
                  'Manage tax efficiently'
                ]
              },
              {
                title: 'Risks',
                points: [
                  'Investment value can fall',
                  'Pot may run out early',
                  'No guaranteed income'
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
        tier={3}
        triggerReason="fourth_calculator_complete"
        context={{
          calculatorName: 'Pension Drawdown',
          resultValue: pendingResults?.annualIncome,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
