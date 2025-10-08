import { z } from 'zod'
import { BaseCalculator, CalculatorResult, CalculatorMetadata } from '../types'
import { UK_PENSION_CONSTANTS as PENSION_CONSTANTS } from '@/lib/constants/pension'
import Decimal from 'decimal.js'

// Input schema for state pension calculator
export const statePensionSchema = z.object({
  dateOfBirth: z.string().refine((date) => {
    const d = new Date(date)
    return d instanceof Date && !isNaN(d.getTime())
  }, 'Invalid date'),
  gender: z.enum(['male', 'female']),
  currentAge: z.number().min(16).max(100),
  niYears: z.number().min(0).max(50),
  niGaps: z.number().min(0).max(50),
  plannedContributions: z.number().min(0).max(50),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed']),
  overseasYears: z.number().min(0).max(50).default(0),
})

export type StatePensionInputs = z.infer<typeof statePensionSchema>

export class StatePensionCalculator extends BaseCalculator<typeof statePensionSchema> {
  schema = statePensionSchema
  
  metadata: CalculatorMetadata = {
    id: 'state-pension',
    name: 'State Pension Forecast Calculator',
    description: 'Calculate your UK state pension forecast based on National Insurance contributions',
    category: 'state',
    keywords: ['state pension', 'pension age', 'NI contributions', 'retirement age'],
    lastUpdated: '2025-01-19',
    accuracy: 'Based on 2025/26 tax year rates and triple lock projections',
  }

  getDefaults(): StatePensionInputs {
    return {
      dateOfBirth: '1975-01-01',
      gender: 'male',
      currentAge: 50,
      niYears: 25,
      niGaps: 2,
      plannedContributions: 10,
      maritalStatus: 'single',
      overseasYears: 0,
    }
  }

  calculate(inputs: StatePensionInputs): CalculatorResult {
    const { niYears, niGaps, plannedContributions, dateOfBirth, gender } = inputs
    
    // Calculate state pension age
    const pensionAge = this.calculatePensionAge(new Date(dateOfBirth), gender)
    const yearsToRetirement = pensionAge - inputs.currentAge
    
    // Calculate total qualifying years
    const totalQualifyingYears = niYears + plannedContributions
    const requiredYears = PENSION_CONSTANTS.statePension.qualifyingYears
    
    // Calculate pension amount
    const fullAmount = new Decimal(PENSION_CONSTANTS.statePension.fullNewAmount)
    const weeklyPension = totalQualifyingYears >= requiredYears 
      ? fullAmount
      : fullAmount.mul(totalQualifyingYears).div(requiredYears)
    
    const annualPension = weeklyPension.mul(52)
    
    // Calculate cost to fill gaps
    const gapCost = new Decimal(niGaps).mul(PENSION_CONSTANTS.nationalInsurance.voluntaryClass3Weekly).mul(52)
    
    // Calculate benefit of filling gaps
    const pensionWithGapsFilled = Math.min(totalQualifyingYears + niGaps, requiredYears)
    const weeklyPensionWithGaps = pensionWithGapsFilled >= requiredYears
      ? fullAmount
      : fullAmount.mul(pensionWithGapsFilled).div(requiredYears)
    
    const annualBenefit = weeklyPensionWithGaps.sub(weeklyPension).mul(52)
    const lifetimeBenefit = annualBenefit.mul(20) // Assume 20 years retirement
    
    // Triple lock projections
    const projections = this.calculateTripleLockProjections(
      weeklyPension.toNumber(),
      yearsToRetirement
    )
    
    return {
      primaryValue: annualPension.toNumber(),
      breakdown: [
        {
          label: 'Weekly State Pension',
          value: weeklyPension.toNumber(),
          description: `Based on ${totalQualifyingYears} qualifying years`,
        },
        {
          label: 'Annual State Pension',
          value: annualPension.toNumber(),
          description: 'Current value before triple lock increases',
        },
        {
          label: 'State Pension Age',
          value: pensionAge,
          description: `You can claim from age ${pensionAge}`,
        },
        {
          label: 'Years to State Pension',
          value: yearsToRetirement,
          description: `${yearsToRetirement} years until you can claim`,
        },
        {
          label: 'Cost to Fill NI Gaps',
          value: gapCost.toNumber(),
          description: `Cost to buy ${niGaps} years of contributions`,
        },
        {
          label: 'Annual Benefit of Filling Gaps',
          value: annualBenefit.toNumber(),
          description: 'Additional pension per year if gaps filled',
        },
        {
          label: 'Lifetime Benefit of Filling Gaps',
          value: lifetimeBenefit.toNumber(),
          description: 'Total benefit over 20 years retirement',
        },
      ],
      projections,
      warnings: this.generateWarnings(inputs, totalQualifyingYears),
      assumptions: [
        {
          label: 'Triple Lock',
          value: '2.5% minimum',
          description: 'Pension increases by highest of: earnings, inflation, or 2.5%',
        },
        {
          label: 'Full State Pension',
          value: `£${PENSION_CONSTANTS.statePension.fullNewAmount}/week`,
          description: '2025/26 rate after 4.1% increase',
        },
        {
          label: 'Qualifying Years Required',
          value: requiredYears,
          description: 'Years of NI contributions needed for full pension',
        },
      ],
    }
  }

  private calculatePensionAge(dateOfBirth: Date, gender: string): number {
    const birthYear = dateOfBirth.getFullYear()
    
    // UK State Pension Age (as of 2025)
    if (birthYear <= 1960) {
      return gender === 'female' ? 66 : 66
    } else if (birthYear <= 1977) {
      return 67
    } else {
      return 68 // For those born after 1977
    }
  }

  private calculateTripleLockProjections(
    weeklyAmount: number,
    yearsToRetirement: number
  ): any[] {
    const projections = []
    let currentAmount = weeklyAmount
    
    for (let year = 0; year <= Math.min(yearsToRetirement + 20, 40); year++) {
      // Apply triple lock (assume 3% average increase)
      if (year > 0) {
        currentAmount *= 1.03
      }
      
      projections.push({
        year: new Date().getFullYear() + year,
        age: year < yearsToRetirement ? null : 68 + (year - yearsToRetirement),
        value: currentAmount * 52, // Annual amount
        weekly: currentAmount,
      })
    }
    
    return projections
  }

  private generateWarnings(inputs: StatePensionInputs, totalYears: number): string[] {
    const warnings = []
    
    if (totalYears < 10) {
      warnings.push('You need at least 10 qualifying years to receive any State Pension')
    }
    
    if (totalYears < 35) {
      warnings.push(`You need ${35 - totalYears} more years for the full State Pension`)
    }
    
    if (inputs.niGaps > 6) {
      warnings.push('You can only pay for gaps in the last 6 tax years')
    }
    
    if (inputs.currentAge > 60) {
      warnings.push('Check if you can claim Pension Credit for additional support')
    }
    
    if (inputs.overseasYears > 0) {
      warnings.push('Overseas years may affect your State Pension - check if you can use them')
    }
    
    return warnings
  }
}