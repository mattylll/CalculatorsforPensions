import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for Calculators for Pensions. Learn how we collect, use, and protect your personal data when using our UK pension calculators.',
  alternates: {
    canonical: '/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
