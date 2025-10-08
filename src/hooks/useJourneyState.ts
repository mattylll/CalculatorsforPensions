/**
 * useJourneyState Hook
 * React hook for managing user journey state throughout the application
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  UserJourneyState,
  CalculatorType,
  UserProfile,
  JourneyEvent,
  CalculatorResult,
} from '@/lib/types/journey'
import {
  getOrCreateJourneyState,
  saveJourneyState,
  updateProfile,
  recordCalculatorCompletion,
  trackJourneyEvent,
  recalculateJourneyMetrics,
  getJourneySummary,
} from '@/lib/services/journey-orchestrator'
import {
  shouldShowGate,
  getRecommendedNextAction,
  getPersonalizedMessage,
} from '@/lib/services/lead-scoring'

export function useJourneyState() {
  const [journeyState, setJourneyState] = useState<UserJourneyState | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const sessionStartTime = useRef<number>(Date.now())

  // Initialize journey state on mount
  useEffect(() => {
    const state = getOrCreateJourneyState()
    setJourneyState(state)
    setIsInitialized(true)

    // Track session time
    const interval = setInterval(() => {
      const sessionTime = Math.floor((Date.now() - sessionStartTime.current) / 1000)
      setJourneyState((prev) => {
        if (!prev) return prev
        const updated = { ...prev, totalSessionTime: sessionTime }
        saveJourneyState(updated)
        return updated
      })
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (journeyState && isInitialized) {
      saveJourneyState(journeyState)
    }
  }, [journeyState, isInitialized])

  /**
   * Update user profile information
   */
  const updateUserProfile = useCallback((profileUpdates: Partial<UserProfile>) => {
    setJourneyState((prev) => {
      if (!prev) return prev
      return updateProfile(prev, profileUpdates)
    })
  }, [])

  /**
   * Record calculator completion
   */
  const completeCalculator = useCallback(
    (
      calculator: CalculatorType,
      inputs: Record<string, any>,
      results: CalculatorResult['results'],
      sessionDuration?: number
    ) => {
      setJourneyState((prev) => {
        if (!prev) return prev
        const updated = recordCalculatorCompletion(prev, calculator, inputs, results, sessionDuration)

        // Track event
        return trackJourneyEvent(updated, 'calculator_completed', {
          calculator,
          primaryValue: results.primaryValue,
        })
      })
    },
    []
  )

  /**
   * Track an event
   */
  const trackEvent = useCallback((eventType: JourneyEvent['eventType'], data?: Record<string, any>) => {
    setJourneyState((prev) => {
      if (!prev) return prev
      return trackJourneyEvent(prev, eventType, data)
    })
  }, [])

  /**
   * Check if gate should be shown
   */
  const checkGate = useCallback(() => {
    if (!journeyState) return null
    return shouldShowGate(journeyState)
  }, [journeyState])

  /**
   * Get recommended next action
   */
  const getNextAction = useCallback(() => {
    if (!journeyState) return null
    return getRecommendedNextAction(journeyState)
  }, [journeyState])

  /**
   * Get personalized message
   */
  const getPersonalizedMsg = useCallback(() => {
    if (!journeyState) return null
    return getPersonalizedMessage(journeyState)
  }, [journeyState])

  /**
   * Get journey summary
   */
  const getSummary = useCallback(() => {
    if (!journeyState) return null
    return getJourneySummary(journeyState)
  }, [journeyState])

  /**
   * Check if user has completed a specific calculator
   */
  const hasCompletedCalculator = useCallback(
    (calculator: CalculatorType) => {
      if (!journeyState) return false
      return !!journeyState.calculators[calculator]?.completed
    },
    [journeyState]
  )

  /**
   * Get calculator results
   */
  const getCalculatorResults = useCallback(
    (calculator: CalculatorType) => {
      if (!journeyState) return null
      return journeyState.calculators[calculator] || null
    },
    [journeyState]
  )

  /**
   * Check qualification tier
   */
  const hasQualificationTier = useCallback(
    (tier: number) => {
      if (!journeyState) return false
      return journeyState.qualificationTier >= tier
    },
    [journeyState]
  )

  /**
   * Update financial goals
   */
  const updateFinancialGoals = useCallback(
    (desiredIncome?: number, retirementAge?: number) => {
      setJourneyState((prev) => {
        if (!prev) return prev
        const updated = {
          ...prev,
          financialSnapshot: {
            ...prev.financialSnapshot,
            ...(desiredIncome && { desiredRetirementIncome: desiredIncome }),
            ...(retirementAge && { retirementAge }),
          },
        }
        return recalculateJourneyMetrics(updated)
      })
    },
    []
  )

  /**
   * Mark PDF as downloaded
   */
  const markPDFDownloaded = useCallback(() => {
    trackEvent('pdf_downloaded')
  }, [trackEvent])

  /**
   * Mark consultation as requested
   */
  const markConsultationRequested = useCallback(() => {
    trackEvent('consultation_requested')
  }, [trackEvent])

  /**
   * Mark journey as completed
   */
  const markJourneyCompleted = useCallback(() => {
    trackEvent('journey_completed')
  }, [trackEvent])

  return {
    // State
    journeyState,
    isInitialized,

    // Profile actions
    updateUserProfile,
    updateFinancialGoals,

    // Calculator actions
    completeCalculator,
    hasCompletedCalculator,
    getCalculatorResults,

    // Gate/qualification
    checkGate,
    hasQualificationTier,

    // Recommendations
    getNextAction,
    getPersonalizedMsg,
    getSummary,

    // Events
    trackEvent,
    markPDFDownloaded,
    markConsultationRequested,
    markJourneyCompleted,

    // Computed values
    leadScore: journeyState?.leadScore || 0,
    temperature: journeyState?.temperature || 'cold',
    qualificationTier: journeyState?.qualificationTier || 1,
    journeyProgress: journeyState?.journeyProgress || 0,
    completedCalculators: journeyState?.completedCalculators || 0,
    userEmail: journeyState?.profile.email,
    userName: journeyState?.profile.name,
    userPhone: journeyState?.profile.phone,
  }
}
