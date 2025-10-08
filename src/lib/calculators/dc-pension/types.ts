export interface DCPensionInput {
  // Current situation
  currentAge: number
  retirementAge: number
  currentPotValue: number
  monthlyContribution: number
  employerContribution: number
  
  // Growth assumptions
  annualGrowthRate: number // Expected annual return (%)
  inflationRate: number // Expected inflation (%)
  annualCharges: number // Annual management charge (%)
  
  // Retirement options
  taxFreeLumpSum: number // Percentage to take as lump sum (0-25%)
  annuityRate?: number // Optional annuity rate for income calculation
  drawdownRate?: number // Optional drawdown rate (%)
}

export interface DCPensionResult {
  // Projection
  yearsToRetirement: number
  totalContributions: number
  employerContributions: number
  projectedPotValue: number
  realValueToday: number // Adjusted for inflation
  
  // Growth breakdown
  growthFromContributions: number
  growthFromReturns: number
  totalCharges: number
  
  // Tax relief
  taxReliefReceived: number
  effectiveContribution: number
  
  // Retirement income options
  taxFreeLumpSum: number
  remainingPot: number
  estimatedAnnualIncome?: number
  estimatedMonthlyIncome?: number
  
  // Projections by year
  yearByYearProjection: YearProjection[]
}

export interface YearProjection {
  year: number
  age: number
  openingBalance: number
  contributions: number
  employerContributions: number
  growth: number
  charges: number
  closingBalance: number
  realValue: number // Adjusted for inflation
}

export interface DCPensionAssumptions {
  basicRateTaxRelief: number
  higherRateTaxRelief: number
  maxTaxFreeLumpSum: number
  defaultAnnuityRate: number
  defaultDrawdownRate: number
  maxAnnualAllowance: number
  lifetimeAllowance: number // For reference only (abolished but relevant for protection)
}