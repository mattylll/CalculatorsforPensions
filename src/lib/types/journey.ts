/**
 * User Journey & Lead Qualification Types
 * Comprehensive type definitions for the multi-tier lead qualification system
 */

// Calculator types
export type CalculatorType =
  | 'state-pension'
  | 'workplace-pension'
  | 'tax-relief'
  | 'pension-drawdown'
  | 'annuity'
  | 'sipp'
  | 'lump-sum-tax'
  | 'detailed-analysis'

// Lead qualification tiers
export type QualificationTier = 1 | 2 | 3 | 4

// Lead temperature for scoring
export type LeadTemperature = 'cold' | 'warm' | 'hot'

// User profile information
export interface UserProfile {
  email?: string
  name?: string
  age?: number
  dateOfBirth?: string
  income?: number
  incomeRange?: string // e.g., "50k-100k"
  employment?: 'employed' | 'self-employed' | 'director' | 'retired'
  phone?: string
  bestTimeToCall?: 'morning' | 'afternoon' | 'evening' | 'anytime'
  primaryConcern?: string
  currentProviders?: string[]
  urgency?: 'low' | 'medium' | 'high'
  consentMarketing?: boolean
  consentPartners?: boolean
}

// Calculator result data
export interface CalculatorResult {
  calculatorType: CalculatorType
  completed: boolean
  timestamp: Date
  inputs: Record<string, any>
  results: {
    primaryValue: number
    secondaryValues?: Record<string, number>
    breakdown?: Array<{
      label: string
      value: number
    }>
    insights?: string[]
  }
  sessionDuration?: number // seconds spent on calculator
}

// Financial analysis data
export interface FinancialSnapshot {
  statePensionAmount?: number
  workplacePensionValue?: number
  personalPensionValue?: number
  totalCurrentPot?: number
  projectedRetirementIncome?: number
  desiredRetirementIncome?: number
  retirementAge?: number
  yearsToRetirement?: number
  pensionGap?: number // desired - projected
  taxRelief?: number
  potentialSavings?: number
}

// Journey state
export interface UserJourneyState {
  userId: string
  createdAt: Date
  lastUpdated: Date

  // User data (progressively collected)
  profile: UserProfile

  // Calculator completion tracking
  calculators: {
    [K in CalculatorType]?: CalculatorResult
  }

  // Financial analysis
  financialSnapshot: FinancialSnapshot

  // Lead qualification
  qualificationTier: QualificationTier
  leadScore: number // 0-100
  temperature: LeadTemperature

  // Journey tracking
  journeyProgress: number // 0-100 percentage
  completedCalculators: number
  totalSessionTime: number // seconds
  pageviews: number

  // Recommended actions
  nextRecommendedCalculator?: CalculatorType
  nextRecommendedAction?: string

  // Conversion tracking
  hasDownloadedPDF?: boolean
  hasRequestedConsultation?: boolean
  hasCompletedFullJourney?: boolean

  // Metadata
  source?: string
  referrer?: string
  utmParams?: Record<string, string>
}

// Gate trigger reasons
export interface GateTrigger {
  tier: QualificationTier
  reason:
    | 'first_calculator_complete'
    | 'navigating_to_second'
    | 'pdf_download_requested'
    | 'third_calculator_access'
    | 'dashboard_access'
    | 'consultation_requested'
    | 'high_pension_gap'
    | 'high_pot_value'
    | 'extended_engagement'
    | 'explicit_request'
  context?: Record<string, any>
}

// Gate configuration
export interface GateConfig {
  tier: QualificationTier
  title: string
  subtitle: string
  benefits: string[]
  requiredFields: (keyof UserProfile)[]
  skippable: boolean
}

// Journey event for analytics
export interface JourneyEvent {
  eventType:
    | 'calculator_started'
    | 'calculator_completed'
    | 'gate_triggered'
    | 'gate_completed'
    | 'gate_skipped'
    | 'pdf_downloaded'
    | 'consultation_requested'
    | 'dashboard_viewed'
    | 'journey_completed'
  timestamp: Date
  data?: Record<string, any>
}

// Lead scoring weights
export interface ScoringWeights {
  email: number
  name: number
  phone: number
  age: number
  income: number
  calculatorsCompleted: number
  sessionTime: number
  pensionGap: number
  currentPot: number
  consultationRequested: number
  pdfDownloaded: number
}

// Recommended next action
export interface RecommendedAction {
  type: 'calculator' | 'consultation' | 'download' | 'dashboard'
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  cta: string
  link?: string
  reason: string
  estimatedValue?: number // potential benefit in £
}

// Journey analytics
export interface JourneyAnalytics {
  userId: string
  totalEvents: number
  conversionFunnel: {
    started: number
    tier1Complete: number
    tier2Complete: number
    tier3Complete: number
    tier4Complete: number
  }
  avgSessionTime: number
  calculatorCompletionRate: number
  leadQualityScore: number
}

// Storage keys
export const STORAGE_KEYS = {
  JOURNEY_STATE: 'pension_journey_state',
  USER_EMAIL: 'pension_user_email',
  LEAD_DATA: 'pension_leads',
  ANALYTICS: 'pension_analytics',
} as const
