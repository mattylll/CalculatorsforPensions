import Script from 'next/script'
import Link from 'next/link'
import { Shield, Award, BookOpen, Users, CheckCircle, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const authorSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Calculators for Pensions',
    url: 'https://calculatorsforpensions.com',
    description:
      'UK pension calculator platform built by qualified pension specialists and financial analysts.',
    foundingDate: '2024',
    knowsAbout: [
      'UK State Pension',
      'Workplace Pensions',
      'Self-Invested Personal Pensions (SIPP)',
      'Pension Tax Relief',
      'Pension Drawdown',
      'Annuities',
      'UK Pension Legislation',
      'Retirement Planning',
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            About Calculators for Pensions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            We build transparent, accurate pension calculators used by thousands of UK
            residents to plan their retirement. Our tools are based on current HMRC rules,
            DWP guidelines, and UK pension legislation for the 2025/26 tax year.
          </p>
        </div>
      </section>

      {/* Mission & Methodology */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Mission
          </h2>
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Pension planning in the UK is unnecessarily complex. Between state pension rules,
              workplace auto-enrolment, tax relief bands, annual allowances, and drawdown options,
              most people struggle to understand what their retirement income will actually look like.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We created Calculators for Pensions to make this accessible. Every calculator on
              this site uses the same methodologies and legislative assumptions that qualified
              financial advisers use — made available for free to anyone planning their retirement.
            </p>
          </div>
        </div>
      </section>

      {/* Expertise & Credentials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Expertise
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <BookOpen className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <CardTitle className="text-lg">Legislative Accuracy</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All calculations reflect current UK pension legislation including the State
                  Pension Act 2014, Finance Act 2024/25, and HMRC pension tax relief rules.
                  We update our models within 48 hours of any legislative change.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Shield className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <CardTitle className="text-lg">Transparent Methodology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We publish the assumptions behind every calculation. Our state pension
                  forecast uses DWP rates (£230.25/week full rate for 2025/26), and our
                  growth projections clearly state assumed rates and fee structures.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Award className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <CardTitle className="text-lg">Professional Standards</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our calculation models are reviewed by qualified pension specialists.
                  We cross-reference results against published DWP pension forecast data
                  and HMRC tax relief examples to ensure accuracy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <Users className="h-5 w-5 text-gray-900 dark:text-white" />
                  </div>
                  <CardTitle className="text-lg">User-First Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We prioritise clarity over complexity. Every result includes context,
                  explanations, and next steps. We never present numbers without the
                  assumptions and limitations behind them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Our Data Sources
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Every calculation is grounded in official UK government data and current legislation:
          </p>
          <div className="space-y-4">
            {[
              {
                source: 'DWP (Department for Work and Pensions)',
                detail: 'State pension rates, qualifying year rules, pension age thresholds',
              },
              {
                source: 'HMRC',
                detail: 'Tax relief rates, annual allowance, tapered allowance, salary sacrifice rules',
              },
              {
                source: 'UK Finance Act 2024/25',
                detail: 'Income tax bands, National Insurance thresholds, pension contribution limits',
              },
              {
                source: 'The Pensions Regulator (TPR)',
                detail: 'Auto-enrolment minimum contributions, employer duty thresholds',
              },
              {
                source: 'ONS (Office for National Statistics)',
                detail: 'Life expectancy data, inflation assumptions for long-term projections',
              },
            ].map((item) => (
              <div
                key={item.source}
                className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <CheckCircle className="h-5 w-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{item.source}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{item.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Important Information
          </h2>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-white">Calculators for Pensions does not provide financial advice.</strong>{' '}
              Our tools are designed for guidance and educational purposes only. The results
              produced by our calculators are estimates based on the information you provide
              and current legislative rules.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Actual pension values may differ due to changes in legislation, fund performance,
              inflation, charges, and individual circumstances. For personalised pension advice,
              we recommend consulting a qualified financial adviser regulated by the Financial
              Conduct Authority (FCA).
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              You can find a regulated financial adviser through the{' '}
              <a
                href="https://www.moneyhelper.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                MoneyHelper service
              </a>{' '}
              or the{' '}
              <a
                href="https://www.unbiased.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                Unbiased
              </a>{' '}
              directory.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Planning Your Retirement
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Use our free calculators to understand your pension income and make informed decisions.
          </p>
          <Link href="/calculators/state-pension">
            <Button
              size="lg"
              className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-8"
            >
              Try the State Pension Calculator
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
