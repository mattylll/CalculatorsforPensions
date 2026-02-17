import Link from 'next/link'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            How Our Calculators Work
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Transparency is fundamental to trust. Here we explain exactly how each calculator
            produces its results, what assumptions we make, and the limitations you should be aware of.
          </p>
        </div>
      </section>

      {/* State Pension Methodology */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            State Pension Calculator
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How it calculates</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                The new State Pension (for those reaching pension age from 6 April 2016) requires
                a minimum of 10 qualifying years of National Insurance contributions to receive
                any payment, and 35 qualifying years for the full amount. We calculate your
                entitlement as a proportion:
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm">
                Weekly pension = (Qualifying years / 35) &times; £230.25
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key assumptions</h3>
              <ul className="space-y-2">
                {[
                  'Full new State Pension rate: £230.25/week (2025/26 tax year)',
                  'Annual equivalent: £11,973',
                  'Minimum qualifying years: 10',
                  'Full entitlement: 35 qualifying years',
                  'State pension age calculated per Pensions Act 2014 schedule',
                  'Voluntary NI contribution cost: Class 3 rate of £17.45/week (2025/26)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-5 w-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Limitations</h3>
              <ul className="space-y-2">
                {[
                  'Does not account for SERPS/S2P additional state pension for those with pre-2016 entitlements',
                  'Does not model the transitional protection calculation for those with NI records before April 2016',
                  'State pension age may change — we use current legislated ages',
                  'Triple lock uprating is not projected forward (we use current year rates)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Workplace Pension Methodology */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Workplace Pension Calculator
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How it calculates</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We project your pension pot using compound growth with monthly contributions.
                The formula combines the future value of your current pot with the future value
                of a regular monthly contribution stream:
              </p>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono text-sm space-y-2">
                <p>FV(current pot) = Current pot &times; (1 + annual rate)<sup>years</sup></p>
                <p>FV(contributions) = Monthly &times; ((1 + monthly rate)<sup>months</sup> - 1) / monthly rate</p>
                <p>Total = FV(current pot) + FV(contributions)</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Key assumptions</h3>
              <ul className="space-y-2">
                {[
                  'Growth rate is net of inflation by default (real return)',
                  'Contributions increase with salary growth if specified',
                  'Employer contributions follow auto-enrolment minimums: 3% employer, 5% employee (of qualifying earnings)',
                  'Annual management charges are deducted from growth rate',
                  'Tax relief at source is applied automatically to employee contributions',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-5 w-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Relief Methodology */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Tax Relief Calculator
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">How it calculates</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We calculate tax relief based on your marginal rate of income tax. Basic rate
                relief (20%) is added automatically by your pension provider. Higher (40%) and
                additional (45%) rate relief must be claimed via your tax return — we show the
                full breakdown including both automatic and claimable relief.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2025/26 tax bands used</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Band</th>
                      <th className="text-left py-3 pr-4 font-semibold text-gray-900 dark:text-white">Income range</th>
                      <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600 dark:text-gray-400">
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 pr-4">Personal Allowance</td>
                      <td className="py-3 pr-4">Up to £12,570</td>
                      <td className="py-3">0%</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 pr-4">Basic rate</td>
                      <td className="py-3 pr-4">£12,571 to £50,270</td>
                      <td className="py-3">20%</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="py-3 pr-4">Higher rate</td>
                      <td className="py-3 pr-4">£50,271 to £125,140</td>
                      <td className="py-3">40%</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Additional rate</td>
                      <td className="py-3 pr-4">Over £125,140</td>
                      <td className="py-3">45%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Annual allowance</h3>
              <ul className="space-y-2">
                {[
                  'Standard annual allowance: £60,000 (2025/26)',
                  'Tapered annual allowance applies when adjusted income exceeds £260,000',
                  'Minimum tapered allowance: £10,000',
                  'Salary sacrifice: We calculate combined NI savings (employee + employer)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-5 w-5 text-gray-900 dark:text-white mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Drawdown & SIPP */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Drawdown & SIPP Calculators
          </h2>
          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-400">
              Both calculators use the same compound growth model but with different focus areas:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">SIPP (Accumulation)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>Projects pot growth to retirement based on contributions, growth, and fees.</p>
                  <p>Tax-free lump sum: 25% of pot value.</p>
                  <p>Withdrawal estimate: 4% sustainable withdrawal rate (widely used benchmark).</p>
                </CardContent>
              </Card>

              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Drawdown (Decumulation)</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <p>Models how long your pot lasts under different withdrawal strategies.</p>
                  <p>Accounts for ongoing growth during drawdown.</p>
                  <p>Shows depletion timeline year by year.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* General Limitations */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            General Limitations
          </h2>
          <div className="p-6 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              All our calculators share common limitations you should be aware of:
            </p>
            <ul className="space-y-3">
              {[
                'Investment returns are not guaranteed — past performance does not predict future results',
                'Tax rules and pension legislation can change at any time',
                'Inflation erodes purchasing power — nominal figures may overstate real income',
                'Individual circumstances (health, debts, other income sources) are not fully captured',
                'Our calculators do not account for means-tested benefits (Pension Credit, Housing Benefit)',
                'Results should be considered alongside professional financial advice',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 text-center">
            <Link href="/calculators/state-pension">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-8"
              >
                Try the Calculators
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
