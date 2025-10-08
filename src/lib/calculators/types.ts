import { z } from 'zod'

// Base types for all calculators
export interface CalculatorInputs {
  [key: string]: number | string | boolean | Date
}

export interface TimeSeriesData {
  year: number
  age?: number
  value: number
  contributions?: number
  growth?: number
  charges?: number
}

export interface Assumption {
  label: string
  value: string | number
  description?: string
}

export interface CalculationBreakdown {
  label: string
  value: number
  percentage?: number
  description?: string
}

export interface CalculatorResult {
  primaryValue: number
  breakdown: CalculationBreakdown[]
  projections?: TimeSeriesData[]
  warnings?: string[]
  assumptions: Assumption[]
  chartData?: any[]
}

export interface ValidationResult {
  isValid: boolean
  errors?: Record<string, string>
}

export interface CalculatorMetadata {
  id: string
  name: string
  description: string
  category: 'state' | 'workplace' | 'personal' | 'retirement' | 'tax' | 'planning'
  keywords: string[]
  lastUpdated: string
  accuracy: string
}

// Abstract base calculator class
export abstract class BaseCalculator<T extends z.ZodType> {
  abstract schema: T
  abstract metadata: CalculatorMetadata
  
  abstract calculate(inputs: z.infer<T>): CalculatorResult
  abstract getDefaults(): z.infer<T>
  
  validate(inputs: unknown): ValidationResult {
    const result = this.schema.safeParse(inputs)
    if (result.success) {
      return { isValid: true }
    } else {
      const errors: Record<string, string> = {}
      result.error.errors.forEach(error => {
        const path = error.path.join('.')
        errors[path] = error.message
      })
      return { isValid: false, errors }
    }
  }
}