/**
 * Lead Scoring & Qualification Service
 * Intelligent algorithm for scoring and qualifying leads based on behavior and data
 */

import {
  UserJourneyState,
  QualificationTier,
  LeadTemperature,
  ScoringWeights,
  RecommendedAction,
  CalculatorType,
} from '../types/journey'

// Scoring weights configuration
const DEFAULT_WEIGHTS: ScoringWeights = {
  email: 20,
  name: 10,
  phone: 20,
  age: 5,
  income: 10,
  calculatorsCompleted: 15,
  sessionTime: 5,
  pensionGap: 15,
  currentPot: 15,
  consultationRequested: 30,
  pdfDownloaded: 10,
}

/**
 * Calculate comprehensive lead score (0-100)
 */
export function calculateLeadScore(
  journeyState: UserJourneyState,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): number {
  let score = 0

  // Contact information
  if (journeyState.profile.email) score += weights.email
  if (journeyState.profile.name) score += weights.name
  if (journeyState.profile.phone) score += weights.phone

  // Demographic data
  if (journeyState.profile.age) score += weights.age
  if (journeyState.profile.income) score += weights.income

  // Engagement metrics
  const calculatorScore = Math.min(
    weights.calculatorsCompleted,
    journeyState.completedCalculators * 3
  )
  score += calculatorScore

  // Session time (bonus for >5 minutes)
  if (journeyState.totalSessionTime > 300) {
    score += weights.sessionTime
  }

  // Financial indicators
  const pensionGap = journeyState.financialSnapshot.pensionGap || 0
  if (pensionGap > 10000) {
    score += weights.pensionGap * 0.5
  }
  if (pensionGap > 50000) {
    score += weights.pensionGap * 0.5 // Additional bonus
  }

  const totalPot = journeyState.financialSnapshot.totalCurrentPot || 0
  if (totalPot > 50000) {
    score += weights.currentPot * 0.5
  }
  if (totalPot > 200000) {
    score += weights.currentPot * 0.5 // Additional bonus
  }

  // High-intent actions
  if (journeyState.hasRequestedConsultation) {
    score += weights.consultationRequested
  }
  if (journeyState.hasDownloadedPDF) {
    score += weights.pdfDownloaded
  }

  return Math.min(100, Math.round(score))
}

/**
 * Determine lead temperature based on score and behavior
 */
export function calculateLeadTemperature(
  journeyState: UserJourneyState,
  leadScore: number
): LeadTemperature {
  // Hot leads: High score OR specific indicators
  if (
    leadScore > 70 ||
    journeyState.hasRequestedConsultation ||
    (journeyState.financialSnapshot.pensionGap || 0) > 50000 ||
    (journeyState.financialSnapshot.totalCurrentPot || 0) > 200000 ||
    journeyState.profile.urgency === 'high'
  ) {
    return 'hot'
  }

  // Warm leads: Medium score
  if (
    leadScore > 40 ||
    journeyState.completedCalculators >= 3 ||
    journeyState.hasDownloadedPDF
  ) {
    return 'warm'
  }

  // Cold leads: Low engagement
  return 'cold'
}

/**
 * Determine qualification tier based on collected data
 */
export function calculateQualificationTier(
  journeyState: UserJourneyState
): QualificationTier {
  const { profile, financialSnapshot, hasRequestedConsultation } = journeyState

  // Tier 4: Hot lead with full contact info
  if (
    profile.phone &&
    profile.email &&
    profile.name &&
    (hasRequestedConsultation ||
      (financialSnapshot.pensionGap || 0) > 50000 ||
      (financialSnapshot.totalCurrentPot || 0) > 100000)
  ) {
    return 4
  }

  // Tier 3: Has phone number
  if (profile.phone && profile.email && profile.name) {
    return 3
  }

  // Tier 2: Has profile data
  if (
    profile.email &&
    (profile.name || profile.age || profile.income || profile.incomeRange)
  ) {
    return 2
  }

  // Tier 1: Email only
  if (profile.email) {
    return 1
  }

  // Tier 0: No data collected (not a real tier, just for logic)
  return 1
}

/**
 * Calculate journey progress percentage
 */
export function calculateJourneyProgress(journeyState: UserJourneyState): number {
  let progress = 0

  // Email = 20%
  if (journeyState.profile.email) progress += 20

  // Each calculator = 15% (up to 6 calculators = 90%)
  progress += Math.min(60, journeyState.completedCalculators * 15)

  // Profile data = 10%
  if (journeyState.profile.name && journeyState.profile.age) progress += 10

  // Phone = 10%
  if (journeyState.profile.phone) progress += 10

  return Math.min(100, progress)
}

/**
 * Get recommended next action based on journey state
 */
export function getRecommendedNextAction(
  journeyState: UserJourneyState
): RecommendedAction {
  const { calculators, financialSnapshot, profile, completedCalculators } = journeyState

  // Priority 1: High pension gap → Consultation
  if (
    (financialSnapshot.pensionGap || 0) > 30000 &&
    profile.email &&
    !journeyState.hasRequestedConsultation
  ) {
    return {
      type: 'consultation',
      priority: 'high',
      title: 'Speak to a Pension Specialist',
      description: `With a £${financialSnapshot.pensionGap?.toLocaleString()} pension gap, professional advice could save you thousands.`,
      cta: 'Book Free Consultation',
      reason: 'high_pension_gap',
      estimatedValue: Math.round((financialSnapshot.pensionGap || 0) * 0.15), // 15% potential savings
    }
  }

  // Priority 2: Completed 1-2 calculators → Continue journey
  if (completedCalculators < 3) {
    const nextCalculator = getNextCalculatorRecommendation(journeyState)
    if (nextCalculator) {
      return {
        type: 'calculator',
        priority: 'high',
        title: `Calculate Your ${getCalculatorDisplayName(nextCalculator)}`,
        description: 'Complete your pension picture for better planning',
        cta: `Calculate ${getCalculatorDisplayName(nextCalculator)}`,
        link: `/calculators/${nextCalculator}`,
        reason: 'journey_completion',
      }
    }
  }

  // Priority 3: Completed 3+ calculators → View dashboard
  if (completedCalculators >= 3 && !journeyState.hasCompletedFullJourney) {
    return {
      type: 'dashboard',
      priority: 'high',
      title: 'See Your Complete Pension Picture',
      description: 'View all your results in one comprehensive dashboard',
      cta: 'View Dashboard',
      link: '/dashboard',
      reason: 'journey_completion',
    }
  }

  // Priority 4: Has results but no PDF → Download
  if (completedCalculators >= 1 && !journeyState.hasDownloadedPDF) {
    return {
      type: 'download',
      priority: 'medium',
      title: 'Download Your Pension Report',
      description: 'Get a detailed PDF with all your calculations and recommendations',
      cta: 'Download Report',
      reason: 'value_add',
    }
  }

  // Default: Start first calculator
  return {
    type: 'calculator',
    priority: 'high',
    title: 'Start with Your State Pension',
    description: 'Check your state pension forecast in under 2 minutes',
    cta: 'Calculate State Pension',
    link: '/calculators/state-pension',
    reason: 'journey_start',
  }
}

/**
 * Recommend next calculator based on what's completed
 */
export function getNextCalculatorRecommendation(
  journeyState: UserJourneyState
): CalculatorType | null {
  const completed = Object.keys(journeyState.calculators) as CalculatorType[]

  // Recommended sequence based on value and logical flow
  const recommendedSequence: CalculatorType[] = [
    'state-pension',
    'workplace-pension',
    'tax-relief',
    'pension-drawdown',
    'lump-sum-tax',
    'sipp',
  ]

  // Find first calculator not completed
  for (const calculator of recommendedSequence) {
    if (!completed.includes(calculator)) {
      return calculator
    }
  }

  return null
}

/**
 * Get display-friendly calculator name
 */
function getCalculatorDisplayName(calculator: CalculatorType): string {
  const names: Record<CalculatorType, string> = {
    'state-pension': 'State Pension',
    'workplace-pension': 'Workplace Pension',
    'tax-relief': 'Tax Relief',
    'pension-drawdown': 'Pension Drawdown',
    'annuity': 'Annuity Income',
    'sipp': 'SIPP',
    'lump-sum-tax': 'Lump Sum Tax',
    'detailed-analysis': 'Full Analysis',
  }
  return names[calculator] || calculator
}

/**
 * Determine if user should see a gate (lead capture)
 */
export interface GateDecision {
  shouldShowGate: boolean
  tier: QualificationTier
  reason: string
  context?: Record<string, any>
}

export function shouldShowGate(journeyState: UserJourneyState): GateDecision {
  const { profile, completedCalculators, hasRequestedConsultation, financialSnapshot } =
    journeyState

  // Tier 4: Hot lead indicators
  if (
    profile.phone &&
    (hasRequestedConsultation ||
      (financialSnapshot.pensionGap || 0) > 50000 ||
      (financialSnapshot.totalCurrentPot || 0) > 100000)
  ) {
    return {
      shouldShowGate: !profile.urgency, // Need urgency level
      tier: 4,
      reason: 'high_value_lead',
      context: { pensionGap: financialSnapshot.pensionGap, totalPot: financialSnapshot.totalCurrentPot },
    }
  }

  // Tier 3: Requesting consultation or completed many calculators
  if (
    profile.email &&
    profile.name &&
    (hasRequestedConsultation || completedCalculators >= 4 || (financialSnapshot.pensionGap || 0) > 10000)
  ) {
    return {
      shouldShowGate: !profile.phone,
      tier: 3,
      reason: 'consultation_or_high_engagement',
      context: { completedCalculators },
    }
  }

  // Tier 2: Downloaded PDF or accessing 3rd calculator
  if (profile.email && (completedCalculators >= 3 || journeyState.hasDownloadedPDF)) {
    return {
      shouldShowGate: !profile.name || !profile.age,
      tier: 2,
      reason: 'enhanced_engagement',
      context: { completedCalculators },
    }
  }

  // Tier 1: Completed first calculator or navigating to second
  if (completedCalculators >= 1) {
    return {
      shouldShowGate: !profile.email,
      tier: 1,
      reason: 'first_calculation_complete',
      context: { completedCalculators },
    }
  }

  return {
    shouldShowGate: false,
    tier: 1,
    reason: 'no_trigger',
  }
}

/**
 * Get personalized messaging based on results
 */
export function getPersonalizedMessage(journeyState: UserJourneyState): {
  type: 'warning' | 'success' | 'info'
  title: string
  message: string
  cta?: string
} {
  const gap = journeyState.financialSnapshot.pensionGap || 0
  const pot = journeyState.financialSnapshot.totalCurrentPot || 0

  // High pension gap
  if (gap > 30000) {
    return {
      type: 'warning',
      title: `You Have a £${gap.toLocaleString()} Pension Gap`,
      message: `Based on your calculations, you're £${gap.toLocaleString()} short of your retirement income goal. This could cost you £${(gap * 20).toLocaleString()} over 20 years.`,
      cta: 'Speak to a Specialist',
    }
  }

  // Large pension pot
  if (pot > 200000) {
    return {
      type: 'success',
      title: `Great Progress! £${pot.toLocaleString()} Saved`,
      message: `With £${pot.toLocaleString()} already saved, you might benefit from fee optimization, better investment options, and tax-efficient withdrawal planning.`,
      cta: 'Get Portfolio Review',
    }
  }

  // High tax relief opportunity
  const income = journeyState.profile.income || 0
  if (income > 50270) {
    return {
      type: 'info',
      title: 'You Could Save £12,000+ This Year',
      message: `As a 40% taxpayer, every £100 you contribute gets £67 tax relief, plus potential employer matching.`,
      cta: 'Optimize Tax Relief',
    }
  }

  // Default positive message
  return {
    type: 'info',
    title: 'You\'re Building Your Pension Picture',
    message: `Complete more calculators to get personalized recommendations and optimize your retirement plan.`,
  }
}
