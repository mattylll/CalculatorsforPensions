import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Workplace Pension Calculator - Project Your Retirement Savings',
  description:
    'Calculate your workplace pension growth with employer contributions and tax relief. See how your pension pot could grow by retirement with our free UK pension calculator.',
  keywords:
    'workplace pension calculator, employer pension, pension contributions, pension growth, auto enrolment pension, defined contribution pension',
  alternates: {
    canonical: '/calculators/workplace-pension',
  },
  openGraph: {
    title: 'Workplace Pension Calculator - Project Your Retirement Savings',
    description:
      'Project your workplace pension growth with employer contributions and tax relief. Free UK pension calculator.',
    url: 'https://calculatorsforpensions.com/calculators/workplace-pension',
    type: 'website',
  },
}

export default function WorkplacePensionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
