import { Decimal } from 'decimal.js'
import { DCPensionInput, DCPensionResult, YearProjection } from './types'
import { UK_PENSION_CONSTANTS } from '@/lib/constants/pension'

export class DCPensionCalculator {
  private input: DCPensionInput
  
  constructor(input: DCPensionInput) {
    this.input = input
  }
  
  calculate(): DCPensionResult {
    const yearsToRetirement = this.input.retirementAge - this.input.currentAge
    
    if (yearsToRetirement <= 0) {
      throw new Error('Retirement age must be greater than current age')
    }
    
    // Calculate annual contributions
    const annualPersonalContribution = new Decimal(this.input.monthlyContribution).mul(12)
    const annualEmployerContribution = new Decimal(this.input.employerContribution).mul(12)
    const totalAnnualContribution = annualPersonalContribution.plus(annualEmployerContribution)
    
    // Calculate tax relief (assuming basic rate for simplicity, can be enhanced)
    const taxReliefRate = UK_PENSION_CONSTANTS.tax.basicRate
    const annualTaxRelief = annualPersonalContribution.mul(taxReliefRate).div(1 - taxReliefRate)
    const effectiveAnnualContribution = annualPersonalContribution.plus(annualTaxRelief)
    
    // Generate year-by-year projection
    const yearByYearProjection = this.generateProjection(
      yearsToRetirement,
      totalAnnualContribution.plus(annualTaxRelief)
    )
    
    const finalProjection = yearByYearProjection[yearByYearProjection.length - 1]
    const projectedPotValue = finalProjection.closingBalance
    
    // Calculate totals
    const totalPersonalContributions = annualPersonalContribution.mul(yearsToRetirement).toNumber()
    const totalEmployerContributions = annualEmployerContribution.mul(yearsToRetirement).toNumber()
    const totalTaxRelief = annualTaxRelief.mul(yearsToRetirement).toNumber()
    const totalContributions = totalPersonalContributions + totalEmployerContributions + totalTaxRelief
    
    // Calculate charges
    const totalCharges = yearByYearProjection.reduce(
      (sum, year) => sum + year.charges,
      0
    )
    
    // Growth breakdown
    const growthFromReturns = projectedPotValue - this.input.currentPotValue - totalContributions + totalCharges
    
    // Tax-free lump sum calculation
    const maxTaxFreeLumpSum = projectedPotValue * 0.25
    const requestedLumpSum = (projectedPotValue * this.input.taxFreeLumpSum) / 100
    const actualLumpSum = Math.min(requestedLumpSum, maxTaxFreeLumpSum)
    const remainingPot = projectedPotValue - actualLumpSum
    
    // Income calculations
    let estimatedAnnualIncome: number | undefined
    let estimatedMonthlyIncome: number | undefined
    
    if (this.input.annuityRate) {
      estimatedAnnualIncome = remainingPot * (this.input.annuityRate / 100)
      estimatedMonthlyIncome = estimatedAnnualIncome / 12
    } else if (this.input.drawdownRate) {
      estimatedAnnualIncome = remainingPot * (this.input.drawdownRate / 100)
      estimatedMonthlyIncome = estimatedAnnualIncome / 12
    } else {
      // Default 4% drawdown rate
      estimatedAnnualIncome = remainingPot * 0.04
      estimatedMonthlyIncome = estimatedAnnualIncome / 12
    }
    
    // Real value calculation (adjusted for inflation)
    const realValueToday = this.calculateRealValue(
      projectedPotValue,
      this.input.inflationRate,
      yearsToRetirement
    )
    
    return {
      yearsToRetirement,
      totalContributions: totalPersonalContributions,
      employerContributions: totalEmployerContributions,
      projectedPotValue,
      realValueToday,
      growthFromContributions: totalContributions - totalPersonalContributions,
      growthFromReturns,
      totalCharges,
      taxReliefReceived: totalTaxRelief,
      effectiveContribution: totalPersonalContributions + totalTaxRelief,
      taxFreeLumpSum: actualLumpSum,
      remainingPot,
      estimatedAnnualIncome,
      estimatedMonthlyIncome,
      yearByYearProjection
    }
  }
  
  private generateProjection(years: number, annualContribution: Decimal): YearProjection[] {
    const projections: YearProjection[] = []
    let currentBalance = new Decimal(this.input.currentPotValue)
    
    const growthRate = this.input.annualGrowthRate / 100
    const chargeRate = this.input.annualCharges / 100
    const inflationRate = this.input.inflationRate / 100
    
    for (let i = 1; i <= years; i++) {
      const openingBalance = currentBalance.toNumber()
      const contributions = annualContribution.toNumber()
      
      // Calculate growth on opening balance and half of contributions (assuming monthly contributions)
      const averageBalance = currentBalance.plus(annualContribution.div(2))
      const grossGrowth = averageBalance.mul(growthRate)
      const charges = averageBalance.mul(chargeRate)
      const netGrowth = grossGrowth.minus(charges)
      
      // Update balance
      currentBalance = currentBalance.plus(annualContribution).plus(netGrowth)
      
      // Calculate real value
      const realValue = this.calculateRealValue(
        currentBalance.toNumber(),
        this.input.inflationRate,
        i
      )
      
      projections.push({
        year: new Date().getFullYear() + i,
        age: this.input.currentAge + i,
        openingBalance,
        contributions,
        employerContributions: new Decimal(this.input.employerContribution).mul(12).toNumber(),
        growth: grossGrowth.toNumber(),
        charges: charges.toNumber(),
        closingBalance: currentBalance.toNumber(),
        realValue
      })
    }
    
    return projections
  }
  
  private calculateRealValue(futureValue: number, inflationRate: number, years: number): number {
    const rate = inflationRate / 100
    return futureValue / Math.pow(1 + rate, years)
  }
  
  // Helper method to calculate required contributions for target pot
  static calculateRequiredContribution(
    targetPot: number,
    currentAge: number,
    retirementAge: number,
    currentPotValue: number,
    expectedReturn: number,
    employerContribution: number = 0
  ): number {
    const years = retirementAge - currentAge
    const monthlyReturn = expectedReturn / 100 / 12
    const months = years * 12
    
    // Future value of current pot
    const futureCurrentPot = currentPotValue * Math.pow(1 + monthlyReturn, months)
    
    // Required additional accumulation
    const requiredAccumulation = targetPot - futureCurrentPot
    
    // Calculate required monthly contribution using future value of annuity formula
    const factor = (Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn
    const totalMonthlyContribution = requiredAccumulation / factor
    
    // Subtract employer contribution
    const personalContribution = Math.max(0, totalMonthlyContribution - employerContribution)
    
    // Account for tax relief (basic rate)
    const taxRelief = UK_PENSION_CONSTANTS.tax.basicRate
    const contributionAfterTaxRelief = personalContribution * (1 - taxRelief)
    
    return Math.round(contributionAfterTaxRelief)
  }
}