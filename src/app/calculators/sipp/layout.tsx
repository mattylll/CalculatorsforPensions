import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'SIPP Calculator - Self-Invested Personal Pension Projection',
  description:
    'Calculate your SIPP growth projection with full investment control. Estimate your self-invested personal pension pot at retirement including tax relief and fees impact.',
  keywords:
    'SIPP calculator, self invested personal pension, SIPP projection, pension investment, SIPP tax relief, pension pot calculator',
  alternates: {
    canonical: '/calculators/sipp',
  },
  openGraph: {
    title: 'SIPP Calculator - Self-Invested Personal Pension Projection',
    description:
      'Project your SIPP growth with full investment control. Free UK pension calculator with tax relief and fees analysis.',
    url: 'https://calculatorsforpensions.com/calculators/sipp',
    type: 'website',
  },
}

export default function SIPPLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
