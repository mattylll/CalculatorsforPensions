export interface TaxReliefInput {
  // Income details
  annualSalary: number
  bonusAmount: number
  otherIncome: number
  
  // Contribution details
  monthlyContribution: number
  employerContribution: number
  salarySacrifice: boolean
  
  // Tax details
  taxCode?: string
  scottishTaxpayer: boolean
  
  // Annual allowance
  previousYearContributions?: number[]
  carryForwardAvailable?: boolean
}

export interface TaxReliefResult {
  // Income breakdown
  totalIncome: number
  taxableIncome: number
  
  // Tax calculations
  taxBand: 'basic' | 'higher' | 'additional'
  marginalTaxRate: number
  effectiveTaxRate: number
  
  // Contribution analysis
  annualContribution: number
  totalWithEmployer: number
  taxReliefAmount: number
  netCostToYou: number
  effectiveContributionRate: number
  
  // Salary sacrifice benefits
  salarySacrificeNISaving?: number
  employerNISaving?: number
  totalSalarySacrificeBenefit?: number
  
  // Annual allowance
  annualAllowanceUsed: number
  annualAllowanceRemaining: number
  carryForwardAvailable: number
  taperApplied: boolean
  taperedAllowance?: number
  
  // Take-home pay impact
  currentTakeHome: number
  newTakeHome: number
  monthlyReduction: number
  
  // Lifetime benefits
  projectedTaxFreeLumpSum: number
  totalTaxSavings: number
  
  // Breakdown by tax band
  basicRateRelief: number
  higherRateRelief: number
  additionalRateRelief: number
}

export interface TaxBandBreakdown {
  band: string
  rate: number
  threshold: number
  taxable: number
  tax: number
}