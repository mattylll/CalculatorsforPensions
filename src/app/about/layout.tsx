import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'About Us - Our Team & Methodology',
  description:
    'Learn about the team behind Calculators for Pensions. Our qualified pension specialists and financial analysts build transparent, accurate UK pension calculators.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
