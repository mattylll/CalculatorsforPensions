import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'UK Pension Guides - Expert Retirement Planning Articles',
  description:
    'Free UK pension guides covering state pension, workplace pensions, SIPP, tax relief, annuities, and pension drawdown. Expert advice updated for 2025/26.',
  alternates: { canonical: '/guides' },
  openGraph: {
    title: 'UK Pension Guides - Expert Retirement Planning Articles',
    description: 'Comprehensive pension guides for every stage of retirement planning.',
  },
}

const guideCategories = [
  {
    title: 'State Pension',
    href: '/guides/state-pension',
    description: 'Understand your state pension entitlement, how to check your forecast, fill NI gaps, and maximise your payments.',
    articles: [
      'Check your state pension age',
      'Fill NI gaps to boost payments',
      'State pension for married couples',
      'Deferring your state pension',
      'New vs basic state pension explained',
    ],
  },
  {
    title: 'Workplace Pension',
    href: '/guides/workplace-pension',
    description: 'Auto-enrolment, employer contributions, salary sacrifice, and how to check if your workplace pension is on track.',
    articles: [
      'Auto-enrolment explained',
      'Employer contributions guide',
      'Salary sacrifice pension benefits',
      'Is your pension on track?',
      'Workplace pension vs SIPP',
    ],
  },
  {
    title: 'SIPP',
    href: '/guides/sipp',
    description: 'Self-invested personal pensions — how they work, investment options, fees, tax relief, and transfers.',
    articles: [
      'What is a SIPP?',
      'SIPP investment strategies',
      'Understanding SIPP fees',
      'SIPP tax relief guide',
      'How to transfer pensions to a SIPP',
    ],
  },
  {
    title: 'Tax Relief',
    href: '/guides/tax-relief',
    description: 'How pension tax relief works, higher rate claims, annual allowance, carry forward, and salary sacrifice.',
    articles: [
      'How pension tax relief works',
      'Higher rate tax relief claims',
      'Annual allowance explained',
      'Carry forward allowance',
      'Net pay vs relief at source',
    ],
  },
  {
    title: 'Annuity',
    href: '/guides/annuity',
    description: 'Annuity types, rates, enhanced annuities, and how to decide between annuity and drawdown.',
    articles: [
      'What is a pension annuity?',
      'Types of annuity compared',
      'Enhanced annuity eligibility',
      'Annuity vs drawdown',
      'When to buy an annuity',
    ],
  },
  {
    title: 'Pension Drawdown',
    href: '/guides/pension-drawdown',
    description: 'Flexi-access drawdown, sustainable withdrawal rates, tax on withdrawals, and making your pension last.',
    articles: [
      'What is pension drawdown?',
      'Sustainable withdrawal rates',
      'Drawdown tax rules',
      'UFPLS vs drawdown',
      'Making your pension last',
    ],
  },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="guides-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorsforpensions.com' },
              { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://calculatorsforpensions.com/guides' },
            ],
          }),
        }}
      />

      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            UK Pension Guides
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Expert guides covering every aspect of UK pensions. Updated for the 2025/26 tax year
            with current legislation, rates, and practical advice.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 space-y-12">
          {guideCategories.map((category) => (
            <div key={category.title}>
              <Link href={category.href}>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:underline underline-offset-4">
                  {category.title} Guides
                </h2>
              </Link>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {category.articles.map((article, i) => (
                  <Link
                    key={i}
                    href={`${category.href}#article-${i + 1}`}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-900 dark:text-white">{article}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
