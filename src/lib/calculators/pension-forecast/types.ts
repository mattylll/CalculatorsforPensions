export interface PensionForecastInput {
  // Personal Details
  currentAge: number
  retirementAge: number
  lifeExpectancy: number
  
  // Current Pension Pots
  statePensionAmount: number // Annual amount
  workplacePensionPot: number
  personalPensionPot: number
  sippValue: number
  
  // Monthly Contributions
  employeeContribution: number
  employerContribution: number
  personalContribution: number
  
  // Lifestyle Requirements
  essentialSpending: number // Monthly amount needed for essentials
  desiredSpending: number // Monthly amount desired for comfortable retirement
  luxurySpending: number // Monthly amount for luxury retirement
  
  // Assumptions
  inflationRate: number
  investmentGrowth: number
  annualCharges: number
  taxFreePercentage: number // Typically 25%
  
  // Other Income
  propertyIncome: number // Monthly rental income
  otherIncome: number // Other monthly income
  expectedInheritance: number
  inheritanceAge: number
}

export interface PensionForecastResult {
  totalPotAtRetirement: number
  monthlyIncomeOptions: {
    annuity: number
    drawdown3Percent: number
    drawdown4Percent: number
    drawdown5Percent: number
  }
  taxFreeLumpSum: number
  statePensionMonthly: number
  totalMonthlyIncome: {
    withAnnuity: number
    withDrawdown4Percent: number
  }
  lifestyleMatch: {
    essential: 'met' | 'shortfall'
    desired: 'met' | 'shortfall'
    luxury: 'met' | 'shortfall'
    essentialShortfall?: number
    desiredShortfall?: number
    luxuryShortfall?: number
  }
  yearByYearProjection: Array<{
    age: number
    year: number
    potValue: number
    contributions: number
    growth: number
  }>
  recommendations: string[]
  inflationAdjusted: {
    essentialAt65: number
    desiredAt65: number
    luxuryAt65: number
  }
}

export interface LifestyleCategory {
  name: string
  monthlyAmount: number
  description: string
  examples: string[]
}