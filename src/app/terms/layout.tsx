import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of service for Calculators for Pensions. Understand the terms and conditions for using our UK pension calculator tools.',
  alternates: {
    canonical: '/terms',
  },
}

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
