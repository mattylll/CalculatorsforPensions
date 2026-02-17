import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Annuity Calculator - Estimate Your Guaranteed Retirement Income',
  description:
    'Calculate your annuity income from your pension pot. Compare single life, joint life, level and escalating annuity options. See how much guaranteed income you could receive for life.',
  keywords:
    'annuity calculator, pension annuity, guaranteed income, retirement income, annuity rates, joint life annuity, enhanced annuity',
  alternates: {
    canonical: '/calculators/annuity',
  },
  openGraph: {
    title: 'Annuity Calculator - Estimate Your Guaranteed Retirement Income',
    description:
      'Calculate your guaranteed retirement income from an annuity. Compare options and see current rates.',
    url: 'https://calculatorsforpensions.com/calculators/annuity',
    type: 'website',
  },
}

export default function AnnuityLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
