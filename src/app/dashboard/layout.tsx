import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Your Pension Dashboard',
  description: 'View your personalised pension dashboard with all calculator results in one place.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
