'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertCircle, Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Slider } from '@/components/ui/slider'
import { StatePensionCalculator, StatePensionInputs } from '@/lib/calculators/state-pension/calculator'
import { useJourneyState } from '@/hooks/useJourneyState'
import { SmartGate } from '@/components/journey/SmartGate'
import { ProgressTracker } from '@/components/journey/ProgressTracker'

const calculator = new StatePensionCalculator()

export default function StatePensionCalculatorPage() {
  const [pendingResults, setPendingResults] = useState<any>(null)
  const [showSmartGate, setShowSmartGate] = useState(false)

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

  const [inputs, setInputs] = useState<StatePensionInputs>({
    dateOfBirth: '1980-01-01',
    gender: 'male',
    currentAge: 45,
    niYears: 20,
    niGaps: 5,
    plannedContributions: 10,
    maritalStatus: 'single',
    overseasYears: 0
  })

  const [results, setResults] = useState<any>(null)
  const [hasCalculated, setHasCalculated] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    if (isInitialized) {
      trackEvent('calculator_started', { calculator: 'state-pension' })
    }
  }, [isInitialized, trackEvent])

  const handleSmartGateSubmit = (profileData: any) => {
    updateUserProfile(profileData)

    const leads = JSON.parse(localStorage.getItem('pension_leads') || '[]')
    leads.push({
      ...profileData,
      calculatorType: 'state-pension',
      timestamp: new Date().toISOString(),
      resultValue: pendingResults?.breakdown?.[1]?.value || 0
    })
    localStorage.setItem('pension_leads', JSON.stringify(leads))

    setShowSmartGate(false)

    if (pendingResults) {
      completeCalculator(
        'state-pension',
        inputs,
        {
          primaryValue: pendingResults.breakdown?.[1]?.value || 0,
          breakdown: pendingResults.breakdown?.map((item: any) => ({
            label: item.label,
            value: item.value
          }))
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
            'state-pension',
            inputs,
            {
              primaryValue: result.breakdown?.[1]?.value || 0,
              breakdown: result.breakdown?.map((item: any) => ({
                label: item.label,
                value: item.value
              }))
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

  const currentYear = new Date().getFullYear()
  const birthYear = new Date(inputs.dateOfBirth).getFullYear()
  const currentAge = currentYear - birthYear

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm mb-6">
              <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">UK Legislation 2025/26</span>
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              State Pension Calculator
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Check your state pension age and forecast your retirement income based on your National Insurance contributions.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Weekly Max', value: '£230.25' },
                { label: 'Annual Max', value: '£11,973' },
                { label: 'Full Years', value: '35' },
                { label: 'Min Years', value: '10' },
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
                    Enter your information to calculate your state pension forecast
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={inputs.dateOfBirth}
                      onChange={(e) => setInputs({ ...inputs, dateOfBirth: e.target.value, currentAge: currentYear - new Date(e.target.value).getFullYear() })}
                      className="border-gray-200 dark:border-gray-800"
                    />
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current age: {currentAge} years</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Qualifying Years (NI Contributions)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.niYears}
                        onChange={(e) => setInputs({ ...inputs, niYears: Number(e.target.value) })}
                        max="50"
                        min="0"
                        className="w-24 border-gray-200 dark:border-gray-800"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">years</span>
                    </div>
                    <Slider
                      value={[inputs.niYears]}
                      onValueChange={([value]) => setInputs({ ...inputs, niYears: value })}
                      min={0}
                      max={50}
                      step={1}
                      className="py-4"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Need 35 years for full pension, minimum 10 years to qualify
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm">Gender</Label>
                      <select
                        value={inputs.gender}
                        onChange={(e) => setInputs({ ...inputs, gender: e.target.value as 'male' | 'female' })}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Marital Status</Label>
                      <select
                        value={inputs.maritalStatus}
                        onChange={(e) => setInputs({ ...inputs, maritalStatus: e.target.value as any })}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
                      >
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>NI Gaps (Years Missing)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.niGaps}
                        onChange={(e) => setInputs({ ...inputs, niGaps: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">gap years</span>
                    </div>
                    <Slider
                      value={[inputs.niGaps]}
                      onValueChange={([value]) => setInputs({ ...inputs, niGaps: value })}
                      min={0}
                      max={20}
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Planned Future Contributions</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.plannedContributions}
                        onChange={(e) => setInputs({ ...inputs, plannedContributions: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                        min="0"
                        max="50"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">years</span>
                    </div>
                    <Slider
                      value={[inputs.plannedContributions]}
                      onValueChange={([value]) => setInputs({ ...inputs, plannedContributions: value })}
                      min={0}
                      max={50}
                      step={1}
                      className="py-4"
                    />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Years you plan to contribute before retirement</p>
                  </div>

                  <Button
                    onClick={handleCalculate}
                    className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white h-11"
                    disabled={isCalculating}
                  >
                    {isCalculating ? 'Calculating...' : 'Calculate My State Pension'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div id="results">
              {hasCalculated && results ? (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl">Your Forecast</CardTitle>
                    <CardDescription>Based on your current contributions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Weekly Amount</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          £{(results.breakdown?.[0]?.value || 0).toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual Amount</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          £{(results.primaryValue || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Pension Age Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Your Pension Age</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{results.breakdown?.[2]?.value || 67} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Years Until Pension</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{results.breakdown?.[3]?.value || 0} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Qualifying Years</span>
                          <span className="font-semibold text-gray-900 dark:text-white">{inputs.niYears}/35</span>
                        </div>
                      </div>
                    </div>

                    {inputs.niGaps > 0 && (
                      <Alert className="border-orange-200 dark:border-orange-900 bg-orange-50 dark:bg-orange-950/30">
                        <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                        <AlertDescription className="text-gray-900 dark:text-white">
                          <strong>You have {inputs.niGaps} years of missing NI contributions</strong>
                          <div className="mt-2 space-y-1 text-sm">
                            <div>Cost to fill gaps: <strong>£{(inputs.niGaps * 52 * 17.45).toLocaleString('en-GB', { maximumFractionDigits: 0 })}</strong></div>
                            <div>Additional weekly pension: <strong>£{((inputs.niGaps / 35) * 230.25).toFixed(2)}</strong></div>
                            <div>Payback period: ~{Math.ceil((inputs.niGaps * 52 * 17.45) / (((inputs.niGaps / 35) * 230.25) * 52))} years</div>
                          </div>
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Percentage of Full Pension</p>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                          <div
                            className="bg-gray-900 dark:bg-white h-3 rounded-full transition-all"
                            style={{ width: `${Math.min(100, ((results.breakdown?.[0]?.value || 0) / 230.25) * 100)}%` }}
                          />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {(((results.breakdown?.[0]?.value || 0) / 230.25) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => window.location.href = '/calculators/workplace-pension'}
                      className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      Calculate Workplace Pension
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-gray-200 dark:border-gray-800">
                  <CardContent className="py-16 text-center">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Ready to Calculate</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Enter your details and click "Calculate My State Pension" to see your forecast
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
                title: 'How to Qualify',
                points: [
                  'Need 10 years minimum to qualify',
                  '35 years for full entitlement',
                  'Includes employment and credits'
                ]
              },
              {
                title: 'Increasing Your Pension',
                points: [
                  'Fill NI gaps with voluntary contributions',
                  'Each year costs £907 (2025/26)',
                  'Defer claiming for higher payments'
                ]
              },
              {
                title: 'Claiming Your Pension',
                points: [
                  'Apply 4 months before pension age',
                  'Check your forecast on gov.uk',
                  'Paid every 4 weeks'
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
        tier={1}
        triggerReason="first_calculator_complete"
        context={{
          calculatorName: 'State Pension',
          resultValue: pendingResults?.breakdown?.[1]?.value,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
