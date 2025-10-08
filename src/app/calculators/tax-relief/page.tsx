'use client'

import { useState, useEffect } from 'react'
import { Receipt, Check, ArrowRight, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import { TaxReliefCalculator } from '@/lib/calculators/tax-relief/calculator'
import { TaxReliefResult } from '@/lib/calculators/tax-relief/types'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

const calculator = new TaxReliefCalculator()

export default function TaxReliefCalculatorPage() {
  const [showSmartGate, setShowSmartGate] = useState(false)
  const [pendingResults, setPendingResults] = useState<TaxReliefResult | null>(null)

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
    annualSalary: 35000,
    bonusAmount: 0,
    otherIncome: 0,
    monthlyContribution: 300,
    employerContribution: 150,
    salarySacrifice: false,
    scottishTaxpayer: false,
    carryForwardAvailable: false
  })

  const [results, setResults] = useState<TaxReliefResult | null>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (isInitialized) {
      trackEvent('calculator_started', { calculator: 'tax-relief' })
    }
  }, [isInitialized, trackEvent])

  const handleSmartGateSubmit = (profileData: any) => {
    updateUserProfile(profileData)

    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...profileData,
      calculatorType: 'tax-relief',
      timestamp: new Date().toISOString(),
      resultValue: pendingResults?.taxReliefAmount || 0
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))

    setShowSmartGate(false)

    if (pendingResults) {
      completeCalculator(
        'tax-relief',
        inputs,
        {
          primaryValue: pendingResults.taxReliefAmount,
          secondaryValues: {
            netCost: pendingResults.netCostToYou,
            totalSavings: pendingResults.totalTaxSavings,
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
        const result = calculator.calculate(inputs)
        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(result)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'tax-relief',
            inputs,
            {
              primaryValue: result.taxReliefAmount,
              secondaryValues: {
                netCost: result.netCostToYou,
                totalSavings: result.totalTaxSavings,
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

  const totalIncome = inputs.annualSalary + inputs.bonusAmount + inputs.otherIncome
  const annualContribution = inputs.monthlyContribution * 12

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm mb-6">
              <Receipt className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">Tax Year 2025/26</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Pension Tax Relief Calculator
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Calculate your pension tax relief and see how much the government adds to your contributions. Maximize your retirement savings.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Basic Rate', value: '20%' },
                { label: 'Higher Rate', value: '40%' },
                { label: 'Additional', value: '45%' },
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
                    Enter your income and contribution information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Annual Bonus</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">£</span>
                        <Input
                          type="number"
                          value={inputs.bonusAmount}
                          onChange={(e) => setInputs({ ...inputs, bonusAmount: Number(e.target.value) })}
                          className="border-gray-200 dark:border-gray-800"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Other Income</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">£</span>
                        <Input
                          type="number"
                          value={inputs.otherIncome}
                          onChange={(e) => setInputs({ ...inputs, otherIncome: Number(e.target.value) })}
                          className="border-gray-200 dark:border-gray-800"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Your Monthly Pension Contribution</Label>
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
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Annual contribution: £{annualContribution.toLocaleString()}
                    </p>
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

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="salarySacrifice"
                      checked={inputs.salarySacrifice}
                      onChange={(e) => setInputs({ ...inputs, salarySacrifice: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="salarySacrifice" className="cursor-pointer">
                      Using salary sacrifice (salary exchange)
                    </Label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="scottishTaxpayer"
                      checked={inputs.scottishTaxpayer}
                      onChange={(e) => setInputs({ ...inputs, scottishTaxpayer: e.target.checked })}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="scottishTaxpayer" className="cursor-pointer">
                      I'm a Scottish taxpayer
                    </Label>
                  </div>

                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Summary</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total income</span>
                        <span className="font-semibold text-gray-900 dark:text-white">£{totalIncome.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Annual contribution</span>
                        <span className="font-semibold text-gray-900 dark:text-white">£{annualContribution.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white h-11"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate Tax Relief'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div id="results">
              {hasCalculated && results ? (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Tax Relief</CardTitle>
                    <CardDescription>Based on {results.taxBand} rate taxpayer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual Tax Relief</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        £{results.taxReliefAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Contribution</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{results.annualContribution.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Net Cost to You</p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          £{results.netCostToYou.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Tax Relief Breakdown</h3>
                      <div className="space-y-3">
                        {results.basicRateRelief > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Basic rate relief (20%)</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              £{results.basicRateRelief.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {results.higherRateRelief > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Higher rate relief (20%)</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              £{results.higherRateRelief.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {results.additionalRateRelief > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Additional rate relief (5%)</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              £{results.additionalRateRelief.toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {inputs.salarySacrifice && results.totalSalarySacrificeBenefit && (
                      <Alert className="border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-950/30">
                        <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertDescription className="text-gray-900 dark:text-white">
                          <strong>Salary Sacrifice Benefit</strong>
                          <div className="mt-2 space-y-1 text-sm">
                            <div>Your NI saving: £{results.salarySacrificeNISaving?.toLocaleString()}</div>
                            <div>Employer NI saving: £{results.employerNISaving?.toLocaleString()}</div>
                            <div>Total benefit: <strong>£{results.totalSalarySacrificeBenefit.toLocaleString()}</strong></div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Annual Allowance</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Allowance used</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            £{results.annualAllowanceUsed.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Remaining allowance</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            £{results.annualAllowanceRemaining.toLocaleString()}
                          </span>
                        </div>
                        {results.taperApplied && (
                          <div className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                            ⚠️ Taper applied - reduced to £{results.taperedAllowance?.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Take-Home Pay Impact</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Current take-home</span>
                          <span className="text-gray-900 dark:text-white">
                            £{results.currentTakeHome.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">New take-home</span>
                          <span className="text-gray-900 dark:text-white">
                            £{results.newTakeHome.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                          <span className="text-gray-600 dark:text-gray-400">Monthly reduction</span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            £{results.monthlyReduction.toLocaleString()}
                          </span>
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
                    <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Calculate</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your details and click "Calculate Tax Relief" to see your savings
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
                title: 'Basic Rate (20%)',
                points: [
                  'Automatic relief on contributions',
                  'Added directly to pension',
                  'No need to claim'
                ]
              },
              {
                title: 'Higher Rate (40%)',
                points: [
                  'Extra 20% relief available',
                  'Claim through tax return',
                  'Or adjust your tax code'
                ]
              },
              {
                title: 'Annual Allowance',
                points: [
                  'Standard limit: £60,000',
                  'Tapered for high earners',
                  'Carry forward available'
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
        triggerReason="third_calculator_complete"
        context={{
          calculatorName: 'Tax Relief',
          resultValue: pendingResults?.taxReliefAmount,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
