import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'How Our Pension Calculators Work - Methodology & Assumptions',
  description:
    'Understand the methodology behind our UK pension calculators. We explain our assumptions, data sources, formulas, and limitations transparently.',
  alternates: {
    canonical: '/how-it-works',
  },
}

export default function HowItWorksLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
