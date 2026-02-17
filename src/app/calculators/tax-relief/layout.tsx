import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Pension Tax Relief Calculator - Maximise Your Tax Savings',
  description:
    'Calculate your pension tax relief for 2025/26. See how much the government adds to your pension contributions at basic, higher, and additional rates. Includes salary sacrifice analysis.',
  keywords:
    'pension tax relief calculator, tax relief on pension, pension contributions tax, salary sacrifice pension, higher rate tax relief, pension annual allowance',
  alternates: {
    canonical: '/calculators/tax-relief',
  },
  openGraph: {
    title: 'Pension Tax Relief Calculator - Maximise Your Tax Savings',
    description:
      'Calculate your pension tax relief for 2025/26. See how much the government adds to your pension contributions.',
    url: 'https://calculatorsforpensions.com/calculators/tax-relief',
    type: 'website',
  },
}

export default function TaxReliefLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
