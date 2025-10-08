// UK Pension Constants for 2025/26
export const UK_PENSION_CONSTANTS = {
  // 2025 State Pension (4.1% increase)
  statePension: {
    fullNewAmount: 221.20, // £/week (4.1% increase from 2024)
    fullOldAmount: 169.50,
    qualifyingYears: 35,
    minQualifyingYears: 10,
    pensionAge: {
      born1960: 66,
      born1961to1977: 67,
      born1978onwards: 68,
    },
  },

  // Tax bands 2025/26
  tax: {
    personalAllowance: 12570,
    basicRate: 0.20,
    basicRateLimit: 50270,
    higherRate: 0.40,
    higherRateLimit: 125140,
    additionalRate: 0.45,
    scottishRates: {
      starterRate: 0.19,
      starterLimit: 14876,
      basicRate: 0.20,
      basicLimit: 26561,
      intermediateRate: 0.21,
      intermediateLimit: 43662,
      higherRate: 0.42,
      higherLimit: 125140,
      topRate: 0.47,
    },
  },

  // Pension allowances 2025/26
  allowances: {
    annual: 60000,
    moneyPurchaseAnnual: 10000,
    lifetimeAllowance: 1073100, // Abolished but relevant for protection
    taperThreshold: 260000,
    adjustedIncome: 360000,
  },

  // National Insurance 2025/26
  nationalInsurance: {
    class1Employee: 0.12, // 12% on earnings between £242-£967/week
    class1EmployeeHigher: 0.02, // 2% on earnings above £967/week
    class1Employer: 0.138, // 13.8% on earnings above £175/week
    class2: 3.45, // £/week for self-employed
    class3Voluntary: 17.45, // £/week for voluntary contributions
    voluntaryClass3Weekly: 17.45, // £/week - cost to buy back missing years
    lowerEarningsLimit: 123, // £/week
    primaryThreshold: 242, // £/week
    upperEarningsLimit: 967, // £/week
  },

  // Auto-enrolment 2025
  autoEnrolment: {
    minEmployer: 0.03,
    minEmployee: 0.05,
    totalMin: 0.08,
    earningsThreshold: 6240,
    earningsUpper: 50270,
    ageMin: 22,
    ageMax: 65, // State Pension Age
  },

  // Growth rate assumptions
  growth: {
    conservative: 0.03,
    moderate: 0.05,
    optimistic: 0.07,
  },

  // Typical charges
  charges: {
    defaultAnnualCharge: 0.0075, // 0.75%
    stakeholderMax: 0.015, // 1.5%
    sippTypical: 0.0045, // 0.45%
  },

  // Inflation assumptions
  inflation: {
    cpi: 0.025, // 2.5%
    rpi: 0.035, // 3.5%
    earnings: 0.03, // 3%
  },
} as const