import { Decimal } from 'decimal.js'
import { TaxReliefInput, TaxReliefResult } from './types'
import { UK_PENSION_CONSTANTS } from '@/lib/constants/pension'

export class TaxReliefCalculator {
  private input: TaxReliefInput
  
  constructor(input: TaxReliefInput) {
    this.input = input
  }
  
  calculate(): TaxReliefResult {
    const totalIncome = this.input.annualSalary + this.input.bonusAmount + this.input.otherIncome
    const annualContribution = this.input.monthlyContribution * 12
    const annualEmployerContribution = this.input.employerContribution * 12
    
    // Calculate tax band and rates
    const { band, marginalRate, effectiveRate } = this.calculateTaxBand(totalIncome)
    
    // Calculate tax relief
    const taxRelief = this.calculateTaxRelief(annualContribution, marginalRate)
    const netCost = annualContribution - taxRelief
    
    // Calculate salary sacrifice benefits if applicable
    let salarySacrificeNISaving = 0
    let employerNISaving = 0
    let totalSalarySacrificeBenefit = 0
    
    if (this.input.salarySacrifice) {
      // Employee NI saving (12% up to upper limit, 2% above)
      const weeklyContribution = this.input.monthlyContribution * 12 / 52
      const upperLimit = UK_PENSION_CONSTANTS.nationalInsurance.upperEarningsLimit
      const primaryThreshold = UK_PENSION_CONSTANTS.nationalInsurance.primaryThreshold
      
      if (weeklyContribution <= upperLimit - primaryThreshold) {
        salarySacrificeNISaving = annualContribution * UK_PENSION_CONSTANTS.nationalInsurance.class1Employee
      } else {
        const belowUpperLimit = (upperLimit - primaryThreshold) * 52
        const aboveUpperLimit = annualContribution - belowUpperLimit
        salarySacrificeNISaving = 
          belowUpperLimit * UK_PENSION_CONSTANTS.nationalInsurance.class1Employee +
          aboveUpperLimit * UK_PENSION_CONSTANTS.nationalInsurance.class1EmployeeHigher
      }
      
      // Employer NI saving (13.8% on all contributions above threshold)
      employerNISaving = annualContribution * UK_PENSION_CONSTANTS.nationalInsurance.class1Employer
      
      totalSalarySacrificeBenefit = salarySacrificeNISaving + employerNISaving
    }
    
    // Annual allowance calculations
    const { annualAllowanceUsed, annualAllowanceRemaining, carryForwardAvailable, taperApplied, taperedAllowance } = 
      this.calculateAnnualAllowance(totalIncome, annualContribution + annualEmployerContribution)
    
    // Calculate take-home pay impact
    const currentTakeHome = this.calculateTakeHomePay(totalIncome, 0)
    const newTakeHome = this.calculateTakeHomePay(
      this.input.salarySacrifice ? totalIncome - annualContribution : totalIncome,
      this.input.salarySacrifice ? 0 : annualContribution
    )
    const monthlyReduction = (currentTakeHome - newTakeHome) / 12
    
    // Calculate effective contribution rate
    const effectiveContributionRate = (netCost - salarySacrificeNISaving) / totalIncome * 100
    
    // Projected benefits
    const projectedTaxFreeLumpSum = (annualContribution + annualEmployerContribution) * 30 * 0.25 // Rough 30-year projection
    const totalTaxSavings = taxRelief + salarySacrificeNISaving
    
    // Tax relief breakdown by band
    const { basicRateRelief, higherRateRelief, additionalRateRelief } = 
      this.calculateReliefBreakdown(annualContribution, totalIncome)
    
    return {
      totalIncome,
      taxableIncome: Math.max(0, totalIncome - UK_PENSION_CONSTANTS.tax.personalAllowance),
      taxBand: band,
      marginalTaxRate: marginalRate,
      effectiveTaxRate: effectiveRate,
      annualContribution,
      totalWithEmployer: annualContribution + annualEmployerContribution,
      taxReliefAmount: taxRelief,
      netCostToYou: netCost,
      effectiveContributionRate,
      salarySacrificeNISaving: this.input.salarySacrifice ? salarySacrificeNISaving : undefined,
      employerNISaving: this.input.salarySacrifice ? employerNISaving : undefined,
      totalSalarySacrificeBenefit: this.input.salarySacrifice ? totalSalarySacrificeBenefit : undefined,
      annualAllowanceUsed,
      annualAllowanceRemaining,
      carryForwardAvailable,
      taperApplied,
      taperedAllowance,
      currentTakeHome,
      newTakeHome,
      monthlyReduction,
      projectedTaxFreeLumpSum,
      totalTaxSavings,
      basicRateRelief,
      higherRateRelief,
      additionalRateRelief
    }
  }
  
  private calculateTaxBand(income: number): { band: 'basic' | 'higher' | 'additional', marginalRate: number, effectiveRate: number } {
    const taxableIncome = Math.max(0, income - UK_PENSION_CONSTANTS.tax.personalAllowance)
    
    let band: 'basic' | 'higher' | 'additional' = 'basic'
    let marginalRate = UK_PENSION_CONSTANTS.tax.basicRate
    let totalTax = 0
    
    if (this.input.scottishTaxpayer) {
      // Scottish tax calculation
      const scottishRates = UK_PENSION_CONSTANTS.tax.scottishRates
      
      if (taxableIncome > scottishRates.higherLimit) {
        band = 'additional'
        marginalRate = scottishRates.topRate
      } else if (taxableIncome > scottishRates.intermediateLimit) {
        band = 'higher'
        marginalRate = scottishRates.higherRate
      }
      
      // Calculate total tax for effective rate
      let remainingIncome = taxableIncome
      if (remainingIncome > scottishRates.higherLimit) {
        totalTax += (remainingIncome - scottishRates.higherLimit) * scottishRates.topRate
        remainingIncome = scottishRates.higherLimit
      }
      if (remainingIncome > scottishRates.intermediateLimit) {
        totalTax += (remainingIncome - scottishRates.intermediateLimit) * scottishRates.higherRate
        remainingIncome = scottishRates.intermediateLimit
      }
      if (remainingIncome > scottishRates.basicLimit) {
        totalTax += (remainingIncome - scottishRates.basicLimit) * scottishRates.intermediateRate
        remainingIncome = scottishRates.basicLimit
      }
      if (remainingIncome > scottishRates.starterLimit) {
        totalTax += (remainingIncome - scottishRates.starterLimit) * scottishRates.basicRate
        remainingIncome = scottishRates.starterLimit
      }
      if (remainingIncome > 0) {
        totalTax += remainingIncome * scottishRates.starterRate
      }
    } else {
      // Rest of UK tax calculation
      if (taxableIncome > UK_PENSION_CONSTANTS.tax.higherRateLimit) {
        band = 'additional'
        marginalRate = UK_PENSION_CONSTANTS.tax.additionalRate
      } else if (taxableIncome > UK_PENSION_CONSTANTS.tax.basicRateLimit) {
        band = 'higher'
        marginalRate = UK_PENSION_CONSTANTS.tax.higherRate
      }
      
      // Calculate total tax for effective rate
      let remainingIncome = taxableIncome
      if (remainingIncome > UK_PENSION_CONSTANTS.tax.higherRateLimit) {
        totalTax += (remainingIncome - UK_PENSION_CONSTANTS.tax.higherRateLimit) * UK_PENSION_CONSTANTS.tax.additionalRate
        remainingIncome = UK_PENSION_CONSTANTS.tax.higherRateLimit
      }
      if (remainingIncome > UK_PENSION_CONSTANTS.tax.basicRateLimit) {
        totalTax += (remainingIncome - UK_PENSION_CONSTANTS.tax.basicRateLimit) * UK_PENSION_CONSTANTS.tax.higherRate
        remainingIncome = UK_PENSION_CONSTANTS.tax.basicRateLimit
      }
      if (remainingIncome > 0) {
        totalTax += remainingIncome * UK_PENSION_CONSTANTS.tax.basicRate
      }
    }
    
    const effectiveRate = income > 0 ? totalTax / income : 0
    
    return { band, marginalRate, effectiveRate }
  }
  
  private calculateTaxRelief(contribution: number, marginalRate: number): number {
    // For relief at source, basic rate relief is given automatically
    // Higher/additional rate taxpayers can claim extra through self-assessment
    if (this.input.salarySacrifice) {
      // With salary sacrifice, full marginal rate relief is automatic
      return contribution * marginalRate
    } else {
      // Relief at source - automatic basic rate relief
      const basicRelief = contribution * UK_PENSION_CONSTANTS.tax.basicRate / (1 - UK_PENSION_CONSTANTS.tax.basicRate)
      
      // Additional relief for higher/additional rate taxpayers
      const additionalRelief = marginalRate > UK_PENSION_CONSTANTS.tax.basicRate
        ? contribution * (marginalRate - UK_PENSION_CONSTANTS.tax.basicRate)
        : 0
      
      return basicRelief + additionalRelief
    }
  }
  
  private calculateAnnualAllowance(income: number, totalContribution: number): {
    annualAllowanceUsed: number
    annualAllowanceRemaining: number
    carryForwardAvailable: number
    taperApplied: boolean
    taperedAllowance?: number
  } {
    let annualAllowance = UK_PENSION_CONSTANTS.allowances.annual
    let taperApplied = false
    let taperedAllowance: number | undefined
    
    // Check for taper
    const thresholdIncome = income - totalContribution
    const adjustedIncome = income
    
    if (thresholdIncome > UK_PENSION_CONSTANTS.allowances.taperThreshold && 
        adjustedIncome > UK_PENSION_CONSTANTS.allowances.taperThreshold) {
      const excess = Math.min(adjustedIncome - UK_PENSION_CONSTANTS.allowances.taperThreshold, 100000)
      const reduction = excess / 2
      taperedAllowance = Math.max(10000, annualAllowance - reduction)
      annualAllowance = taperedAllowance
      taperApplied = true
    }
    
    // Calculate carry forward (simplified - assumes max for previous 3 years)
    let carryForwardAvailable = 0
    if (this.input.carryForwardAvailable) {
      const previousYears = this.input.previousYearContributions || [0, 0, 0]
      for (let i = 0; i < Math.min(3, previousYears.length); i++) {
        const unusedAllowance = UK_PENSION_CONSTANTS.allowances.annual - (previousYears[i] || 0)
        if (unusedAllowance > 0) {
          carryForwardAvailable += unusedAllowance
        }
      }
    }
    
    const annualAllowanceUsed = Math.min(totalContribution, annualAllowance + carryForwardAvailable)
    const annualAllowanceRemaining = Math.max(0, annualAllowance - totalContribution)
    
    return {
      annualAllowanceUsed,
      annualAllowanceRemaining,
      carryForwardAvailable,
      taperApplied,
      taperedAllowance
    }
  }
  
  private calculateTakeHomePay(grossSalary: number, pensionContribution: number): number {
    const { marginalRate } = this.calculateTaxBand(grossSalary)
    const taxableIncome = Math.max(0, grossSalary - UK_PENSION_CONSTANTS.tax.personalAllowance)
    
    // Simplified tax calculation
    let tax = 0
    let remainingIncome = taxableIncome
    
    if (remainingIncome > UK_PENSION_CONSTANTS.tax.higherRateLimit) {
      tax += (remainingIncome - UK_PENSION_CONSTANTS.tax.higherRateLimit) * UK_PENSION_CONSTANTS.tax.additionalRate
      remainingIncome = UK_PENSION_CONSTANTS.tax.higherRateLimit
    }
    if (remainingIncome > UK_PENSION_CONSTANTS.tax.basicRateLimit) {
      tax += (remainingIncome - UK_PENSION_CONSTANTS.tax.basicRateLimit) * UK_PENSION_CONSTANTS.tax.higherRate
      remainingIncome = UK_PENSION_CONSTANTS.tax.basicRateLimit
    }
    if (remainingIncome > 0) {
      tax += remainingIncome * UK_PENSION_CONSTANTS.tax.basicRate
    }
    
    // NI calculation (simplified annual)
    const weeklyEarnings = grossSalary / 52
    const primaryThreshold = UK_PENSION_CONSTANTS.nationalInsurance.primaryThreshold
    const upperEarningsLimit = UK_PENSION_CONSTANTS.nationalInsurance.upperEarningsLimit
    let ni = 0
    
    if (weeklyEarnings > upperEarningsLimit) {
      ni = ((upperEarningsLimit - primaryThreshold) * UK_PENSION_CONSTANTS.nationalInsurance.class1Employee +
            (weeklyEarnings - upperEarningsLimit) * UK_PENSION_CONSTANTS.nationalInsurance.class1EmployeeHigher) * 52
    } else if (weeklyEarnings > primaryThreshold) {
      ni = (weeklyEarnings - primaryThreshold) * UK_PENSION_CONSTANTS.nationalInsurance.class1Employee * 52
    }
    
    return grossSalary - tax - ni - pensionContribution
  }
  
  private calculateReliefBreakdown(contribution: number, income: number): {
    basicRateRelief: number
    higherRateRelief: number
    additionalRateRelief: number
  } {
    const taxableIncome = Math.max(0, income - UK_PENSION_CONSTANTS.tax.personalAllowance)
    let remainingContribution = contribution
    let basicRateRelief = 0
    let higherRateRelief = 0
    let additionalRateRelief = 0
    
    // Additional rate relief
    if (taxableIncome > UK_PENSION_CONSTANTS.tax.higherRateLimit) {
      const additionalRatePortion = Math.min(remainingContribution, taxableIncome - UK_PENSION_CONSTANTS.tax.higherRateLimit)
      additionalRateRelief = additionalRatePortion * UK_PENSION_CONSTANTS.tax.additionalRate
      remainingContribution -= additionalRatePortion
    }
    
    // Higher rate relief
    if (taxableIncome > UK_PENSION_CONSTANTS.tax.basicRateLimit && remainingContribution > 0) {
      const higherRatePortion = Math.min(
        remainingContribution,
        Math.min(taxableIncome, UK_PENSION_CONSTANTS.tax.higherRateLimit) - UK_PENSION_CONSTANTS.tax.basicRateLimit
      )
      higherRateRelief = higherRatePortion * UK_PENSION_CONSTANTS.tax.higherRate
      remainingContribution -= higherRatePortion
    }
    
    // Basic rate relief
    if (remainingContribution > 0) {
      basicRateRelief = remainingContribution * UK_PENSION_CONSTANTS.tax.basicRate
    }
    
    return {
      basicRateRelief,
      higherRateRelief,
      additionalRateRelief
    }
  }
}