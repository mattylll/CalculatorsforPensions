import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Pension Drawdown Calculator - Plan Sustainable Retirement Income',
  description:
    'Calculate sustainable income from your pension pot with our drawdown calculator. Plan flexible withdrawals, see how long your savings will last, and visualise your retirement finances.',
  keywords:
    'pension drawdown calculator, flexi access drawdown, pension withdrawal, retirement income, sustainable withdrawal rate, pension pot depletion',
  alternates: {
    canonical: '/calculators/pension-drawdown',
  },
  openGraph: {
    title: 'Pension Drawdown Calculator - Plan Sustainable Retirement Income',
    description:
      'Plan sustainable retirement income from your pension pot. Visualise withdrawals and see how long your savings will last.',
    url: 'https://calculatorsforpensions.com/calculators/pension-drawdown',
    type: 'website',
  },
}

export default function PensionDrawdownLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
