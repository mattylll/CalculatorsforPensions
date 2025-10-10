'use client'

import { useState, useEffect, useMemo } from 'react'
import { Wallet, Check, ArrowRight, AlertCircle, TrendingDown, Calendar } from 'lucide-react'
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
    currentAge: 55,
    retirementAge: 67,
    lifeExpectancy: 90,
    monthlyContribution: 500,
    annualPensionRequirement: 15000,
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

  // Calculate results in real-time as inputs change
  const liveResults = useMemo(() => {
    const yearlyProjection = []
    let currentPot = inputs.pensionPot
    const netGrowthRate = (inputs.annualGrowthRate - inputs.inflationRate) / 100
    const yearsToRetirement = Math.max(0, inputs.retirementAge - inputs.currentAge)
    const yearsInRetirement = inputs.lifeExpectancy - inputs.retirementAge
    const totalYears = inputs.lifeExpectancy - inputs.currentAge

    // Add initial starting point (current state)
    yearlyProjection.push({
      year: -1,
      age: inputs.currentAge,
      startBalance: inputs.pensionPot,
      contribution: 0,
      withdrawal: 0,
      growth: 0,
      endBalance: inputs.pensionPot,
      phase: 'current'
    })

    // Phase 1: Accumulation (before retirement)
    for (let year = 0; year < yearsToRetirement; year++) {
      const age = inputs.currentAge + year
      const annualContribution = inputs.monthlyContribution * 12
      const growthAmount = currentPot * netGrowthRate
      const endBalance = currentPot + growthAmount + annualContribution

      yearlyProjection.push({
        year: year,
        age: age,
        startBalance: currentPot,
        contribution: annualContribution,
        withdrawal: 0,
        growth: growthAmount,
        endBalance: endBalance,
        phase: 'accumulation'
      })

      currentPot = endBalance
    }

    // Pot at retirement (after tax-free lump sum)
    const potAtRetirement = currentPot
    const taxFreeLumpSumAmount = potAtRetirement * (inputs.taxFreeLumpSum / 100)
    const remainingPotAfterLumpSum = potAtRetirement - taxFreeLumpSumAmount
    currentPot = remainingPotAfterLumpSum

    // Phase 2: Drawdown (retirement onwards)
    for (let year = 0; year <= yearsInRetirement; year++) {
      const age = inputs.retirementAge + year
      const withdrawal = year === 0 ? 0 : inputs.annualPensionRequirement
      const growthAmount = currentPot * netGrowthRate
      const endBalance = Math.max(0, currentPot + growthAmount - withdrawal)

      yearlyProjection.push({
        year: yearsToRetirement + year,
        age: age,
        startBalance: currentPot,
        contribution: 0,
        withdrawal: withdrawal,
        growth: growthAmount,
        endBalance: endBalance,
        phase: year === 0 ? 'retirement_start' : 'drawdown'
      })

      currentPot = endBalance
      if (currentPot <= 0) break
    }

    const potDepletionYear = yearlyProjection.findIndex(y => y.phase === 'drawdown' && y.endBalance <= 0)
    const yearsUntilDepletion = potDepletionYear === -1 ? totalYears : potDepletionYear
    const withdrawalRate = remainingPotAfterLumpSum > 0 ? (inputs.annualPensionRequirement / remainingPotAfterLumpSum) * 100 : 0

    return {
      taxFreeLumpSum: taxFreeLumpSumAmount,
      potAtRetirement,
      remainingPot: remainingPotAfterLumpSum,
      annualIncome: inputs.annualPensionRequirement,
      monthlyIncome: inputs.annualPensionRequirement / 12,
      yearsOfIncome: totalYears,
      yearsUntilDepletion,
      withdrawalRate,
      yearsToRetirement,
      sustainabilityRating: yearsUntilDepletion >= totalYears ? 'Sustainable' : 'At Risk',
      yearlyProjection
    }
  }, [inputs])

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
        const gateDecision = checkGate()

        if (gateDecision && gateDecision.shouldShowGate && !userEmail) {
          setPendingResults(liveResults)
          setShowSmartGate(true)
          setIsCalculating(false)
        } else {
          completeCalculator(
            'pension-drawdown',
            inputs,
            {
              primaryValue: liveResults.annualIncome,
              secondaryValues: {
                monthlyIncome: liveResults.monthlyIncome,
                taxFreeLumpSum: liveResults.taxFreeLumpSum,
              }
            },
            60
          )

          setResults(liveResults)
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Get max value for chart scaling
  const maxPotValue = Math.max(inputs.pensionPot, ...liveResults.yearlyProjection.map(y => y.endBalance))

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
                    Enter your pension pot and income requirements
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

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Current Age</Label>
                      <Input
                        type="number"
                        value={inputs.currentAge}
                        onChange={(e) => setInputs({ ...inputs, currentAge: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                        min="18"
                        max="75"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Retirement Age</Label>
                      <Input
                        type="number"
                        value={inputs.retirementAge}
                        onChange={(e) => setInputs({ ...inputs, retirementAge: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                        min="55"
                        max="75"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Life Expectancy</Label>
                      <Input
                        type="number"
                        value={inputs.lifeExpectancy}
                        onChange={(e) => setInputs({ ...inputs, lifeExpectancy: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                        min="60"
                        max="100"
                      />
                    </div>
                  </div>

                  {inputs.currentAge < inputs.retirementAge && (
                    <div className="space-y-2">
                      <Label>Monthly Contribution (until retirement)</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 dark:text-gray-400">£</span>
                        <Input
                          type="number"
                          value={inputs.monthlyContribution}
                          onChange={(e) => setInputs({ ...inputs, monthlyContribution: Number(e.target.value) })}
                          className="border-gray-200 dark:border-gray-800"
                          step="50"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">per month</span>
                      </div>
                      <Slider
                        value={[inputs.monthlyContribution]}
                        onValueChange={([value]) => setInputs({ ...inputs, monthlyContribution: value })}
                        min={0}
                        max={3000}
                        step={50}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>£0</span>
                        <span>Current: {formatCurrency(inputs.monthlyContribution)}/month</span>
                        <span>£3,000</span>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Annual Pension Requirement</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 dark:text-gray-400">£</span>
                      <Input
                        type="number"
                        value={inputs.annualPensionRequirement}
                        onChange={(e) => setInputs({ ...inputs, annualPensionRequirement: Number(e.target.value) })}
                        className="border-gray-200 dark:border-gray-800"
                        step="1000"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">per year</span>
                    </div>
                    <Slider
                      value={[inputs.annualPensionRequirement]}
                      onValueChange={([value]) => setInputs({ ...inputs, annualPensionRequirement: value })}
                      min={5000}
                      max={50000}
                      step={1000}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                      <span>£5,000</span>
                      <span>Current: {formatCurrency(inputs.annualPensionRequirement)}</span>
                      <span>£50,000</span>
                    </div>
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

                  <div className="space-y-2">
                    <Label>Expected Inflation Rate (%)</Label>
                    <div className="flex items-center gap-4 mb-2">
                      <Input
                        type="number"
                        value={inputs.inflationRate}
                        onChange={(e) => setInputs({ ...inputs, inflationRate: Number(e.target.value) })}
                        className="w-24 border-gray-200 dark:border-gray-800"
                        step="0.5"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">% per year</span>
                    </div>
                    <Slider
                      value={[inputs.inflationRate]}
                      onValueChange={([value]) => setInputs({ ...inputs, inflationRate: value })}
                      min={0}
                      max={10}
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

            {/* Live Results & Visualization */}
            <div id="results">
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-2xl">Your Drawdown Plan</CardTitle>
                  <CardDescription>Live projection based on your inputs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Withdrawal Rate</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {liveResults.withdrawalRate.toFixed(1)}%
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {liveResults.withdrawalRate <= 4 ? 'Safe' : liveResults.withdrawalRate <= 6 ? 'Moderate' : 'High risk'}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Years Until Depletion</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {liveResults.yearsUntilDepletion === liveResults.yearsOfIncome ? `${liveResults.yearsUntilDepletion}+` : liveResults.yearsUntilDepletion}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Age {inputs.currentAge + liveResults.yearsUntilDepletion}
                      </p>
                    </div>
                  </div>

                  {/* Tax-Free Lump Sum */}
                  {inputs.taxFreeLumpSum > 0 && (
                    <div className="p-6 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900">
                      <p className="text-sm text-green-800 dark:text-green-300 mb-2">Tax-Free Lump Sum</p>
                      <p className="text-4xl font-bold text-green-900 dark:text-green-100">
                        {formatCurrency(liveResults.taxFreeLumpSum)}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-2">
                        {inputs.currentAge >= inputs.retirementAge
                          ? 'Available immediately, no tax to pay'
                          : `Available at retirement (age ${inputs.retirementAge}), no tax to pay`
                        }
                      </p>
                    </div>
                  )}

                  {/* Annual/Monthly Income */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Annual Income</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(liveResults.annualIncome)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly Income</p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {formatCurrency(liveResults.monthlyIncome)}
                      </p>
                    </div>
                  </div>

                  {/* Pot Depletion Chart */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Pension Pot Over Time</h3>
                      <TrendingDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </div>

                    <div className="relative h-80 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4">
                      {/* Y-axis labels */}
                      <div className="absolute left-2 top-8 bottom-12 flex flex-col justify-between text-xs text-gray-600 dark:text-gray-400 w-16 text-right pr-2">
                        <span>{formatCurrency(maxPotValue)}</span>
                        <span>{formatCurrency(maxPotValue * 0.75)}</span>
                        <span>{formatCurrency(maxPotValue * 0.5)}</span>
                        <span>{formatCurrency(maxPotValue * 0.25)}</span>
                        <span>£0</span>
                      </div>

                      {/* Chart area with SVG line */}
                      <div className="ml-20 mr-4 h-[calc(100%-3rem)] relative">
                        <svg className="w-full h-full" preserveAspectRatio="none">
                          {/* Grid lines */}
                          <line x1="0" y1="0%" x2="100%" y2="0%" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />
                          <line x1="0" y1="25%" x2="100%" y2="25%" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />
                          <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />
                          <line x1="0" y1="75%" x2="100%" y2="75%" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" strokeDasharray="4 4" />
                          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-gray-300 dark:text-gray-700" />

                          {/* Area fill under the line */}
                          <defs>
                            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                            </linearGradient>
                          </defs>

                          {(() => {
                            const dataPoints = liveResults.yearlyProjection.slice(0, 31) // Include initial point + 30 years
                            const totalPoints = dataPoints.length

                            // Build path from all data points
                            const pathCommands = dataPoints.map((year, index) => {
                              const x = (index / (totalPoints - 1)) * 100
                              const y = 100 - ((year.endBalance / maxPotValue) * 100)
                              return index === 0 ? `M ${x},${y}` : `L ${x},${y}`
                            }).join(' ')

                            return (
                              <>
                                {/* Area fill under the line */}
                                <path
                                  d={`${pathCommands} L 100,100 L 0,100 Z`}
                                  fill="url(#areaGradient)"
                                  className="transition-all duration-300"
                                />

                                {/* Main line */}
                                <path
                                  d={pathCommands}
                                  fill="none"
                                  stroke="rgb(59, 130, 246)"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="transition-all duration-300"
                                />
                              </>
                            )
                          })()}

                          {/* Data points with hover zones */}
                          {liveResults.yearlyProjection.slice(0, 31).map((year, index) => {
                            const totalPoints = liveResults.yearlyProjection.slice(0, 31).length
                            const x = (index / (totalPoints - 1)) * 100
                            const y = 100 - ((year.endBalance / maxPotValue) * 100)
                            const isWarning = year.endBalance < liveResults.remainingPot * 0.25 && year.endBalance > 0
                            const isDepleted = year.endBalance <= 0

                            return (
                              <g key={index} className="group">
                                {/* Invisible hover zone */}
                                <circle
                                  cx={`${x}%`}
                                  cy={`${y}%`}
                                  r="8"
                                  fill="transparent"
                                  className="cursor-pointer"
                                />
                                {/* Visible dot */}
                                <circle
                                  cx={`${x}%`}
                                  cy={`${y}%`}
                                  r="4"
                                  fill={isDepleted ? 'rgb(239, 68, 68)' : isWarning ? 'rgb(249, 115, 22)' : 'rgb(59, 130, 246)'}
                                  className="transition-all group-hover:r-6"
                                  style={{ transformOrigin: `${x}% ${y}%` }}
                                />
                                {/* Tooltip - positioned in HTML coordinates */}
                                <foreignObject
                                  x={`${Math.max(5, Math.min(x - 10, 80))}%`}
                                  y={`${Math.max(2, y - 25)}%`}
                                  width="20%"
                                  height="20%"
                                  className="overflow-visible pointer-events-none"
                                >
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="px-3 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded shadow-lg whitespace-nowrap">
                                      <div className="font-semibold">Age {year.age}</div>
                                      <div>Balance: {formatCurrency(year.endBalance)}</div>
                                      <div>Withdrawal: {formatCurrency(year.withdrawal)}</div>
                                    </div>
                                  </div>
                                </foreignObject>
                              </g>
                            )
                          })}
                        </svg>
                      </div>

                      {/* X-axis labels */}
                      <div className="ml-20 mr-4 mt-2 flex justify-between text-xs text-gray-600 dark:text-gray-400">
                        <span>Age {inputs.currentAge}</span>
                        <span>Age {inputs.currentAge + 15}</span>
                        <span>Age {Math.min(inputs.currentAge + 30, inputs.lifeExpectancy)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sustainability Warning */}
                  {liveResults.sustainabilityRating === 'At Risk' && (
                    <Alert className="border-orange-200 bg-orange-50 dark:border-orange-900 dark:bg-orange-950">
                      <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                      <AlertDescription className="text-orange-600 dark:text-orange-400">
                        Your pension pot may run out before age {inputs.lifeExpectancy}. Consider reducing your annual withdrawal or increasing expected growth.
                      </AlertDescription>
                    </Alert>
                  )}

                  {liveResults.withdrawalRate > 6 && (
                    <Alert className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertDescription className="text-red-600 dark:text-red-400">
                        Warning: Withdrawal rate of {liveResults.withdrawalRate.toFixed(1)}% is considered high risk. The safe withdrawal rate is typically 3-4% per year.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      {isInitialized && userEmail && completedCount > 0 && journeyState && (
        <section className="py-8 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <ProgressTracker
              completedCalculators={Object.keys(journeyState.calculators) as any}
              journeyProgress={journeyProgress}
              leadScore={leadScore}
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
        triggerReason="high_value_calculator"
        context={{
          calculatorName: 'Pension Drawdown',
          resultValue: pendingResults?.annualIncome,
        }}
        existingProfile={journeyState?.profile}
      />
    </div>
  )
}
