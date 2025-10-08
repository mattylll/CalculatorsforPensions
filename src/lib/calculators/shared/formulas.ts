import Decimal from 'decimal.js'

// Configure Decimal for financial precision
Decimal.set({ precision: 10, rounding: Decimal.ROUND_HALF_UP })

/**
 * Calculate compound growth with regular contributions
 */
export function calculateCompoundGrowth(
  initialAmount: number,
  monthlyContribution: number,
  annualGrowthRate: number,
  years: number,
  annualCharges: number = 0
): Decimal {
  const principal = new Decimal(initialAmount)
  const monthlyPayment = new Decimal(monthlyContribution)
  const monthlyRate = new Decimal(annualGrowthRate).div(12)
  const monthlyChargeRate = new Decimal(annualCharges).div(12)
  const months = years * 12
  
  let total = principal
  
  for (let month = 1; month <= months; month++) {
    // Add monthly contribution
    total = total.plus(monthlyPayment)
    
    // Apply growth
    total = total.mul(new Decimal(1).plus(monthlyRate))
    
    // Deduct charges
    total = total.mul(new Decimal(1).minus(monthlyChargeRate))
  }
  
  return total
}

/**
 * Calculate tax on pension withdrawals
 */
export function calculatePensionTax(
  withdrawalAmount: number,
  otherIncome: number = 0,
  isScottish: boolean = false
): { tax: number; netAmount: number; marginalRate: number } {
  const totalIncome = withdrawalAmount + otherIncome
  const personalAllowance = 12570
  
  let tax = 0
  let marginalRate = 0
  
  if (isScottish) {
    // Scottish tax bands
    const bands = [
      { limit: 14876, rate: 0.19 },
      { limit: 26561, rate: 0.20 },
      { limit: 43662, rate: 0.21 },
      { limit: 125140, rate: 0.42 },
      { limit: Infinity, rate: 0.47 }
    ]
    
    let taxableIncome = Math.max(0, totalIncome - personalAllowance)
    let previousLimit = 0
    
    for (const band of bands) {
      if (taxableIncome > 0) {
        const taxableInBand = Math.min(taxableIncome, band.limit - previousLimit)
        tax += taxableInBand * band.rate
        taxableIncome -= taxableInBand
        if (taxableIncome > 0 || totalIncome > band.limit + personalAllowance) {
          marginalRate = band.rate
        }
        previousLimit = band.limit
      }
    }
  } else {
    // Rest of UK tax bands
    const taxableIncome = Math.max(0, totalIncome - personalAllowance)
    
    if (taxableIncome > 0) {
      // Basic rate
      const basicRateTax = Math.min(taxableIncome, 37700) * 0.20
      tax += basicRateTax
      marginalRate = 0.20
      
      // Higher rate
      if (taxableIncome > 37700) {
        const higherRateTax = Math.min(taxableIncome - 37700, 87440) * 0.40
        tax += higherRateTax
        marginalRate = 0.40
      }
      
      // Additional rate
      if (taxableIncome > 125140) {
        const additionalRateTax = (taxableIncome - 125140) * 0.45
        tax += additionalRateTax
        marginalRate = 0.45
      }
    }
  }
  
  return {
    tax: Math.round(tax),
    netAmount: withdrawalAmount - Math.round(tax),
    marginalRate
  }
}

/**
 * Calculate state pension amount based on qualifying years
 */
export function calculateStatePension(
  qualifyingYears: number,
  isNewStatePension: boolean = true
): { weeklyAmount: number; annualAmount: number; percentage: number } {
  const fullNewAmount = 221.20 // £/week for 2025
  const fullOldAmount = 169.50
  const requiredYears = 35
  const minYears = 10
  
  if (qualifyingYears < minYears) {
    return { weeklyAmount: 0, annualAmount: 0, percentage: 0 }
  }
  
  const fullAmount = isNewStatePension ? fullNewAmount : fullOldAmount
  const percentage = Math.min(100, (qualifyingYears / requiredYears) * 100)
  const weeklyAmount = (fullAmount * percentage) / 100
  const annualAmount = weeklyAmount * 52
  
  return {
    weeklyAmount: Math.round(weeklyAmount * 100) / 100,
    annualAmount: Math.round(annualAmount),
    percentage: Math.round(percentage)
  }
}

/**
 * Calculate employer pension contributions with salary sacrifice
 */
export function calculateEmployerContribution(
  salary: number,
  employeeRate: number,
  employerRate: number,
  salarySacrifice: boolean = false
): {
  employeeContribution: number
  employerContribution: number
  totalContribution: number
  taxSaving: number
  niSaving: number
} {
  const pensionableEarnings = Math.min(salary, 50270) // Auto-enrolment upper limit
  const employeeContribution = (pensionableEarnings * employeeRate) / 100
  let employerContribution = (pensionableEarnings * employerRate) / 100
  let taxSaving = 0
  let niSaving = 0
  
  if (salarySacrifice) {
    // Employee contribution becomes employer contribution
    employerContribution += employeeContribution
    
    // Calculate tax and NI savings
    const taxBand = salary <= 50270 ? 0.20 : salary <= 125140 ? 0.40 : 0.45
    taxSaving = employeeContribution * taxBand
    
    // NI saving (12% up to £50,270, 2% above)
    const niOnContribution = salary <= 50270 
      ? employeeContribution * 0.12 
      : employeeContribution * 0.02
    niSaving = niOnContribution
    
    return {
      employeeContribution: 0,
      employerContribution,
      totalContribution: employerContribution,
      taxSaving,
      niSaving
    }
  }
  
  return {
    employeeContribution,
    employerContribution,
    totalContribution: employeeContribution + employerContribution,
    taxSaving: employeeContribution * 0.20, // Basic rate relief
    niSaving: 0
  }
}

/**
 * Calculate sustainable withdrawal rate for drawdown
 */
export function calculateSustainableWithdrawal(
  potValue: number,
  yearsInRetirement: number,
  expectedReturn: number = 0.05,
  inflationRate: number = 0.025
): {
  sustainableAmount: number
  realReturn: number
  depletionAge?: number
} {
  const realReturn = (1 + expectedReturn) / (1 + inflationRate) - 1
  
  if (realReturn <= 0) {
    // Simple division if no real return
    return {
      sustainableAmount: potValue / yearsInRetirement,
      realReturn: 0
    }
  }
  
  // Calculate using present value of annuity formula
  const monthlyRealReturn = realReturn / 12
  const months = yearsInRetirement * 12
  
  const sustainableMonthly = potValue * monthlyRealReturn / 
    (1 - Math.pow(1 + monthlyRealReturn, -months))
  
  return {
    sustainableAmount: Math.round(sustainableMonthly * 12),
    realReturn
  }
}

/**
 * Calculate annuity income estimate
 */
export function estimateAnnuityIncome(
  potValue: number,
  age: number,
  jointLife: boolean = false,
  escalation: 'level' | 'rpi' | 'fixed3' = 'level',
  guaranteePeriod: number = 0
): number {
  // Base rates (simplified - real rates would come from provider API)
  let baseRate = 0.055 // 5.5% for 65-year-old
  
  // Age adjustment
  if (age < 60) baseRate *= 0.8
  else if (age < 65) baseRate *= 0.9
  else if (age > 70) baseRate *= 1.1
  else if (age > 75) baseRate *= 1.25
  
  // Joint life reduction
  if (jointLife) baseRate *= 0.85
  
  // Escalation reduction
  if (escalation === 'rpi') baseRate *= 0.7
  else if (escalation === 'fixed3') baseRate *= 0.8
  
  // Guarantee period reduction
  if (guaranteePeriod === 5) baseRate *= 0.98
  else if (guaranteePeriod === 10) baseRate *= 0.95
  
  return Math.round(potValue * baseRate)
}