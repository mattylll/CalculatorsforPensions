/**
 * Journey Orchestration Service
 * Central service for managing user journey state, persistence, and coordination
 */

import {
  UserJourneyState,
  CalculatorResult,
  CalculatorType,
  UserProfile,
  JourneyEvent,
  FinancialSnapshot,
  STORAGE_KEYS,
} from '../types/journey'
import {
  calculateLeadScore,
  calculateLeadTemperature,
  calculateQualificationTier,
  calculateJourneyProgress,
  getRecommendedNextAction,
} from './lead-scoring'

/**
 * Generate a unique user ID
 */
function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Initialize a new journey state
 */
export function createNewJourneyState(source?: string, utmParams?: Record<string, string>): UserJourneyState {
  const now = new Date()
  const userId = generateUserId()

  return {
    userId,
    createdAt: now,
    lastUpdated: now,
    profile: {},
    calculators: {},
    financialSnapshot: {},
    qualificationTier: 1,
    leadScore: 0,
    temperature: 'cold',
    journeyProgress: 0,
    completedCalculators: 0,
    totalSessionTime: 0,
    pageviews: 0,
    source,
    utmParams,
  }
}

/**
 * Load journey state from storage
 */
export function loadJourneyState(): UserJourneyState | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(STORAGE_KEYS.JOURNEY_STATE)
    if (!stored) return null

    const parsed = JSON.parse(stored)

    // Convert date strings back to Date objects
    parsed.createdAt = new Date(parsed.createdAt)
    parsed.lastUpdated = new Date(parsed.lastUpdated)

    // Convert calculator timestamps
    Object.keys(parsed.calculators || {}).forEach((key) => {
      if (parsed.calculators[key]?.timestamp) {
        parsed.calculators[key].timestamp = new Date(parsed.calculators[key].timestamp)
      }
    })

    return parsed as UserJourneyState
  } catch (error) {
    console.error('Error loading journey state:', error)
    return null
  }
}

/**
 * Save journey state to storage
 */
export function saveJourneyState(state: UserJourneyState): void {
  if (typeof window === 'undefined') return

  try {
    state.lastUpdated = new Date()
    localStorage.setItem(STORAGE_KEYS.JOURNEY_STATE, JSON.stringify(state))
  } catch (error) {
    console.error('Error saving journey state:', error)
  }
}

/**
 * Get or create journey state
 */
export function getOrCreateJourneyState(): UserJourneyState {
  let state = loadJourneyState()

  if (!state) {
    // Try to migrate legacy email data
    const legacyEmail = typeof window !== 'undefined'
      ? sessionStorage.getItem('pensionCalculatorEmail')
      : null

    state = createNewJourneyState()

    if (legacyEmail) {
      state.profile.email = legacyEmail
      state = recalculateJourneyMetrics(state)
    }

    saveJourneyState(state)
  }

  return state
}

/**
 * Update profile information
 */
export function updateProfile(
  state: UserJourneyState,
  profileUpdates: Partial<UserProfile>
): UserJourneyState {
  const newState = {
    ...state,
    profile: {
      ...state.profile,
      ...profileUpdates,
    },
  }

  // Recalculate metrics
  return recalculateJourneyMetrics(newState)
}

/**
 * Record calculator completion
 */
export function recordCalculatorCompletion(
  state: UserJourneyState,
  calculator: CalculatorType,
  inputs: Record<string, any>,
  results: CalculatorResult['results'],
  sessionDuration?: number
): UserJourneyState {
  const calculatorResult: CalculatorResult = {
    calculatorType: calculator,
    completed: true,
    timestamp: new Date(),
    inputs,
    results,
    sessionDuration,
  }

  const newState = {
    ...state,
    calculators: {
      ...state.calculators,
      [calculator]: calculatorResult,
    },
    totalSessionTime: state.totalSessionTime + (sessionDuration || 0),
  }

  // Update financial snapshot based on calculator type
  newState.financialSnapshot = updateFinancialSnapshot(newState)

  // Recalculate metrics
  return recalculateJourneyMetrics(newState)
}

/**
 * Update financial snapshot from calculator results
 */
function updateFinancialSnapshot(state: UserJourneyState): FinancialSnapshot {
  const snapshot: FinancialSnapshot = { ...state.financialSnapshot }

  // State pension
  if (state.calculators['state-pension']?.results) {
    snapshot.statePensionAmount = state.calculators['state-pension'].results.primaryValue
  }

  // Workplace pension
  if (state.calculators['workplace-pension']?.results) {
    snapshot.workplacePensionValue = state.calculators['workplace-pension'].results.primaryValue
  }

  // Tax relief
  if (state.calculators['tax-relief']?.results) {
    snapshot.taxRelief = state.calculators['tax-relief'].results.primaryValue
  }

  // Calculate totals
  snapshot.totalCurrentPot =
    (snapshot.workplacePensionValue || 0) + (snapshot.personalPensionValue || 0)

  // Extract retirement age from inputs
  const retirementAge =
    state.calculators['state-pension']?.inputs.currentAge ||
    state.calculators['workplace-pension']?.inputs.retirementAge ||
    state.profile.age

  if (retirementAge) {
    snapshot.retirementAge = Number(retirementAge)
  }

  // Calculate years to retirement
  if (snapshot.retirementAge && state.profile.age) {
    snapshot.yearsToRetirement = snapshot.retirementAge - state.profile.age
  }

  // Calculate pension gap if we have both values
  if (snapshot.desiredRetirementIncome && snapshot.projectedRetirementIncome) {
    snapshot.pensionGap = snapshot.desiredRetirementIncome - snapshot.projectedRetirementIncome
  }

  return snapshot
}

/**
 * Recalculate all journey metrics
 */
export function recalculateJourneyMetrics(state: UserJourneyState): UserJourneyState {
  // Count completed calculators
  const completedCalculators = Object.values(state.calculators).filter(
    (calc) => calc?.completed
  ).length

  // Calculate lead score
  const leadScore = calculateLeadScore(state)

  // Determine temperature
  const temperature = calculateLeadTemperature(state, leadScore)

  // Determine qualification tier
  const qualificationTier = calculateQualificationTier(state)

  // Calculate journey progress
  const journeyProgress = calculateJourneyProgress(state)

  // Get next recommended action
  const nextAction = getRecommendedNextAction(state)

  return {
    ...state,
    completedCalculators,
    leadScore,
    temperature,
    qualificationTier,
    journeyProgress,
    nextRecommendedCalculator: nextAction.type === 'calculator' ? nextAction.link?.split('/').pop() as CalculatorType : undefined,
    nextRecommendedAction: nextAction.title,
  }
}

/**
 * Track journey event
 */
export function trackJourneyEvent(
  state: UserJourneyState,
  eventType: JourneyEvent['eventType'],
  data?: Record<string, any>
): UserJourneyState {
  // Update pageviews for certain events
  if (eventType === 'calculator_started' || eventType === 'dashboard_viewed') {
    state.pageviews += 1
  }

  // Update flags for specific events
  if (eventType === 'pdf_downloaded') {
    state.hasDownloadedPDF = true
  }

  if (eventType === 'consultation_requested') {
    state.hasRequestedConsultation = true
  }

  if (eventType === 'journey_completed') {
    state.hasCompletedFullJourney = true
  }

  // Log event to analytics storage
  logAnalyticsEvent({
    eventType,
    timestamp: new Date(),
    data,
  })

  return recalculateJourneyMetrics(state)
}

/**
 * Log analytics event
 */
function logAnalyticsEvent(event: JourneyEvent): void {
  if (typeof window === 'undefined') return

  try {
    const events = JSON.parse(localStorage.getItem(STORAGE_KEYS.ANALYTICS) || '[]')
    events.push(event)

    // Keep only last 100 events
    if (events.length > 100) {
      events.shift()
    }

    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(events))
  } catch (error) {
    console.error('Error logging analytics event:', error)
  }
}

/**
 * Check if user should see a specific calculator's results
 * Based on whether they have the required qualification tier
 */
export function canViewCalculatorResults(
  state: UserJourneyState,
  calculator: CalculatorType
): boolean {
  // State pension requires email (Tier 1)
  if (calculator === 'state-pension') {
    return !!state.profile.email
  }

  // Most calculators require email
  return !!state.profile.email
}

/**
 * Get calculator results if user has permission
 */
export function getCalculatorResults(
  state: UserJourneyState,
  calculator: CalculatorType
): CalculatorResult | null {
  if (!canViewCalculatorResults(state, calculator)) {
    return null
  }

  return state.calculators[calculator] || null
}

/**
 * Reset journey (for testing or user request)
 */
export function resetJourney(): UserJourneyState {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEYS.JOURNEY_STATE)
    sessionStorage.removeItem('pensionCalculatorEmail')
  }

  return createNewJourneyState()
}

/**
 * Export journey data for download/API
 */
export function exportJourneyData(state: UserJourneyState): string {
  const exportData = {
    userId: state.userId,
    profile: state.profile,
    calculators: Object.entries(state.calculators).map(([type, data]) => ({
      type,
      ...data,
    })),
    financialSnapshot: state.financialSnapshot,
    metrics: {
      leadScore: state.leadScore,
      temperature: state.temperature,
      qualificationTier: state.qualificationTier,
      journeyProgress: state.journeyProgress,
      completedCalculators: state.completedCalculators,
      totalSessionTime: state.totalSessionTime,
    },
    timestamps: {
      createdAt: state.createdAt,
      lastUpdated: state.lastUpdated,
    },
  }

  return JSON.stringify(exportData, null, 2)
}

/**
 * Get summary statistics for the journey
 */
export function getJourneySummary(state: UserJourneyState): {
  totalPensionIncome: number
  pensionGap: number
  completionPercentage: number
  nextSteps: string[]
  urgencyLevel: 'low' | 'medium' | 'high'
} {
  const totalIncome =
    (state.financialSnapshot.statePensionAmount || 0) +
    (state.financialSnapshot.workplacePensionValue || 0) / 20 + // Rough annual conversion
    (state.financialSnapshot.personalPensionValue || 0) / 20

  const gap = state.financialSnapshot.pensionGap || 0

  const nextSteps: string[] = []
  if (!state.calculators['state-pension']) {
    nextSteps.push('Calculate your State Pension forecast')
  }
  if (!state.calculators['workplace-pension']) {
    nextSteps.push('Project your Workplace Pension growth')
  }
  if (!state.calculators['tax-relief']) {
    nextSteps.push('Optimize your tax relief')
  }
  if (gap > 10000 && !state.hasRequestedConsultation) {
    nextSteps.push('Speak to a pension specialist')
  }

  let urgencyLevel: 'low' | 'medium' | 'high' = 'low'
  if (gap > 50000 || (state.financialSnapshot.yearsToRetirement || 100) < 5) {
    urgencyLevel = 'high'
  } else if (gap > 20000 || (state.financialSnapshot.yearsToRetirement || 100) < 15) {
    urgencyLevel = 'medium'
  }

  return {
    totalPensionIncome: Math.round(totalIncome),
    pensionGap: Math.round(gap),
    completionPercentage: state.journeyProgress,
    nextSteps,
    urgencyLevel,
  }
}
