import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Pension Analysis',
  description: 'Deep analysis of your pension situation across all calculator results.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AnalysisLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
