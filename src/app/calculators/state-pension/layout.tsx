import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'State Pension Calculator - Check Your UK State Pension Forecast',
  description:
    'Calculate your UK state pension forecast based on your National Insurance contributions. Check your state pension age, weekly and annual amounts, and how to fill NI gaps.',
  keywords:
    'state pension calculator, state pension forecast, UK state pension, national insurance years, state pension age, NI contributions',
  alternates: {
    canonical: '/calculators/state-pension',
  },
  openGraph: {
    title: 'State Pension Calculator - Check Your UK State Pension Forecast',
    description:
      'Calculate your UK state pension forecast based on your National Insurance contributions. Free tool with 2025/26 rates.',
    url: 'https://calculatorsforpensions.com/calculators/state-pension',
    type: 'website',
  },
}

export default function StatePensionLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
