'use client'

import Link from 'next/link'
import {
  Shield, Building2, Wallet, Receipt, Briefcase, CircleDollarSign,
  ArrowRight
} from 'lucide-react'

const calculators = [
  {
    id: 'state-pension',
    icon: Shield,
    title: 'State Pension',
    description: 'Check your state pension age and forecast',
    href: '/calculators/state-pension',
  },
  {
    id: 'workplace-pension',
    icon: Building2,
    title: 'Workplace Pension',
    description: 'Calculate growth with employer contributions',
    href: '/calculators/workplace-pension',
  },
  {
    id: 'tax-relief',
    icon: Receipt,
    title: 'Tax Relief',
    description: 'Optimize your pension tax savings',
    href: '/calculators/tax-relief',
  },
  {
    id: 'drawdown',
    icon: Wallet,
    title: 'Pension Drawdown',
    description: 'Plan sustainable retirement income',
    href: '/calculators/pension-drawdown',
  },
  {
    id: 'sipp',
    icon: Briefcase,
    title: 'SIPP Calculator',
    description: 'Self-invested pension planning',
    href: '/calculators/sipp',
  },
  {
    id: 'annuity',
    icon: CircleDollarSign,
    title: 'Annuity Income',
    description: 'Convert pot to lifetime income',
    href: '/calculators/annuity',
  },
]

export default function SimpleCalculatorCards() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Choose your calculator
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Free, accurate tools to plan every aspect of your retirement.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => {
            const Icon = calculator.icon
            return (
              <Link key={calculator.id} href={calculator.href}>
                <div className="group relative bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-8 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg transition-all duration-200">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-200">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {calculator.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                    {calculator.description}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <span className="mr-2">Calculate</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/analysis"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Or get a complete analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
