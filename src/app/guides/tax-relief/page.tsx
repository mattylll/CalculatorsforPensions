import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Pension Tax Relief Guide 2025/26 - How It Works, Claims & Allowances',
  description:
    'Complete guide to UK pension tax relief for 2025/26. Learn how tax relief works, claim higher rate relief, understand annual allowance, carry forward rules, and net pay vs relief at source schemes.',
  keywords:
    'pension tax relief, higher rate tax relief, pension annual allowance 2025/26, carry forward pension allowance, net pay vs relief at source, UK pension tax relief guide, pension tax relief calculator, HMRC pension tax relief',
  alternates: {
    canonical: '/guides/tax-relief',
  },
  openGraph: {
    title: 'Pension Tax Relief Guide 2025/26 - How It Works, Claims & Allowances',
    description:
      'Everything you need to know about UK pension tax relief. Five in-depth articles covering relief at source, higher rate claims, annual allowance, carry forward, and scheme types.',
    url: 'https://calculatorsforpensions.com/guides/tax-relief',
    siteName: 'Calculators for Pensions',
    locale: 'en_GB',
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    // Article 1 FAQs
    {
      '@type': 'Question',
      name: 'How much pension tax relief can I get in 2025/26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In 2025/26, you receive tax relief at your marginal rate of income tax on pension contributions up to your annual allowance of £60,000 or 100% of your earnings, whichever is lower. Basic rate taxpayers get 20% relief, higher rate taxpayers get 40% relief, and additional rate taxpayers get 45% relief. For a relief at source scheme, the provider claims 20% automatically and you must claim the rest via self-assessment or by contacting HMRC.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I get pension tax relief if I am not working?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, even if you have no earnings you can contribute up to £3,600 gross per year into a pension and receive basic rate tax relief. You would pay £2,880 and your pension provider would claim £720 from HMRC, giving you a total contribution of £3,600. This applies to non-earners, children, and stay-at-home parents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is pension tax relief the same as getting free money from the government?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pension tax relief is effectively the government returning the income tax you would have paid on the money you contribute to your pension. For a basic rate taxpayer contributing £100, they pay £80 and the government adds £20. It is not technically free money but rather a deferral of taxation, because you will pay income tax on pension withdrawals in retirement. However, many people pay less tax in retirement than during their working years, making it genuinely advantageous.',
      },
    },
    // Article 2 FAQs
    {
      '@type': 'Question',
      name: 'How do I claim higher rate pension tax relief?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you are in a relief at source pension scheme, your provider claims 20% basic rate relief automatically, but you must claim the additional 20% (or 25% for additional rate taxpayers) yourself. You can do this through your self-assessment tax return by entering your total gross pension contributions, or by contacting HMRC to have your tax code adjusted. If you are in a net pay scheme, tax relief at your full marginal rate is applied automatically through your payroll.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I forget to claim higher rate pension tax relief?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you forget to claim higher rate tax relief, you can backdate your claim for up to four tax years. You will need to contact HMRC or file amended self-assessment returns for the relevant years. It is estimated that thousands of higher rate taxpayers fail to claim the extra relief they are entitled to each year, missing out on significant sums. For example, a higher rate taxpayer contributing £10,000 per year who fails to claim would miss out on £2,000 of additional relief annually.',
      },
    },
    // Article 3 FAQs
    {
      '@type': 'Question',
      name: 'What is the pension annual allowance for 2025/26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The standard pension annual allowance for 2025/26 is £60,000. This is the maximum amount of pension savings you can make in a tax year before incurring a tax charge. The allowance covers all your pension contributions including employer contributions, employee contributions, and tax relief. If your adjusted income exceeds £260,000, your annual allowance is tapered down by £1 for every £2 of income above that threshold, to a minimum of £10,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I exceed the pension annual allowance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your total pension contributions exceed the annual allowance (after using any available carry forward), you will face an annual allowance charge. The excess amount is added to your taxable income and taxed at your marginal rate. For example, if you are a higher rate taxpayer and exceed the allowance by £10,000, you would owe an additional £4,000 in tax. You must report this on your self-assessment tax return. If the charge exceeds £2,000, you may be able to ask your pension scheme to pay it from your pension pot using Scheme Pays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does my employer contribution count towards the annual allowance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, employer contributions count towards your annual allowance. The annual allowance covers all pension inputs including your own contributions, employer contributions, and tax relief added by HMRC. For example, if your employer contributes £30,000 and you contribute £20,000 gross, your total pension input is £50,000 against the £60,000 annual allowance. However, employer contributions are not limited by the 100% of earnings rule that applies to personal contributions for tax relief purposes.',
      },
    },
    // Article 4 FAQs
    {
      '@type': 'Question',
      name: 'How does pension carry forward work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Carry forward allows you to use any unused annual allowance from the previous three tax years, in addition to your current year allowance. You must use the current year allowance first, then carry forward unused allowance from the earliest available year. To use carry forward, you must have been a member of a registered pension scheme in the years you want to carry forward from, and your contributions cannot exceed 100% of your earnings in the current tax year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use carry forward if I was not earning in a previous tax year?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can carry forward unused allowance from a previous year even if you had no earnings in that year, as long as you were a member of a registered pension scheme during that year. However, there is an important limitation: the total amount you contribute in the current tax year cannot exceed 100% of your current year relevant UK earnings (or £3,600 if greater). So while the carry forward allowance itself is available, your ability to use it is limited by what you actually earn in the year you make the contributions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What years can I carry forward unused pension allowance from in 2025/26?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the 2025/26 tax year, you can carry forward unused annual allowance from the three preceding tax years: 2022/23, 2023/24, and 2024/25. For 2022/23 the standard annual allowance was £40,000, while for 2023/24 and 2024/25 it was £60,000 following the increase at the April 2023 budget. You must use the earliest year first, and you need to have been a member of a registered pension scheme in each year you wish to carry forward from.',
      },
    },
    // Article 5 FAQs
    {
      '@type': 'Question',
      name: 'What is the net pay anomaly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The net pay anomaly affects low earners in net pay arrangement pension schemes. In a net pay scheme, contributions are deducted before tax is calculated. If you earn below the personal allowance of £12,570, you do not pay income tax, so there is no tax to be relieved. This means you effectively contribute the full gross amount without receiving any tax benefit. In contrast, someone earning the same amount in a relief at source scheme would pay only £80 for every £100 contributed because the scheme claims 20% basic rate relief from HMRC regardless of whether the member actually pays tax. The government has announced plans to address this anomaly from 2025/26.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which is better: net pay or relief at source pension?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For basic rate taxpayers, there is no practical difference as both methods deliver 20% tax relief. For higher and additional rate taxpayers, net pay is simpler because full relief is applied automatically through payroll without needing to file a self-assessment claim. For non-taxpayers and those earning below the personal allowance, relief at source is better because the scheme claims 20% from HMRC even though the member pays no income tax, effectively giving them a bonus. The choice of scheme type is usually made by your employer rather than by you individually.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://calculatorsforpensions.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Guides',
      item: 'https://calculatorsforpensions.com/guides',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Tax Relief',
      item: 'https://calculatorsforpensions.com/guides/tax-relief',
    },
  ],
}

export default function TaxReliefGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="tax-relief-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="tax-relief-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/guides" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-900 dark:text-white font-medium">Tax Relief</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Pension Tax Relief Guide 2025/26
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Everything you need to know about pension tax relief in the UK. Five comprehensive articles
            covering how relief works, claiming higher rate relief, the annual allowance, carry forward
            rules, and different scheme types.
          </p>
          <div className="mt-8">
            <Link
              href="/calculators/tax-relief"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try the Tax Relief Calculator
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Table of Contents */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">In this guide</h2>
          <ol className="space-y-2">
            <li>
              <a
                href="#article-1"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                1. How Pension Tax Relief Works in the UK
              </a>
            </li>
            <li>
              <a
                href="#article-2"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                2. Higher Rate Pension Tax Relief: How to Claim
              </a>
            </li>
            <li>
              <a
                href="#article-3"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                3. Pension Annual Allowance Explained for 2025/26
              </a>
            </li>
            <li>
              <a
                href="#article-4"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                4. Carry Forward Pension Allowance: A Complete Guide
              </a>
            </li>
            <li>
              <a
                href="#article-5"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                5. Net Pay vs Relief at Source Pension Schemes
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Article 1 */}
      <section id="article-1" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            How Pension Tax Relief Works in the UK
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Pension tax relief is one of the most valuable financial incentives available to UK taxpayers. When
              you contribute money to a registered pension scheme, the government effectively refunds the income
              tax you would have paid on that money, allowing more of your earnings to go towards your retirement
              savings. Understanding how this relief works is essential for anyone looking to build a meaningful
              pension pot and take full advantage of the tax benefits on offer.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              What Is Pension Tax Relief?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Pension tax relief means that some or all of your pension contributions are free from income tax. In
              the 2025/26 tax year, the UK income tax bands are structured as follows: the personal allowance is
              £12,570, the basic rate of 20% applies to income between £12,571 and £50,270, the higher rate of 40%
              applies to income between £50,271 and £125,140, and the additional rate of 45% applies to income
              above £125,140. When you contribute to a pension, you receive relief at your highest marginal rate of
              tax. This means a basic rate taxpayer effectively pays just £80 for every £100 that goes into their
              pension, while a higher rate taxpayer effectively pays only £60, and an additional rate taxpayer pays
              just £55.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Relief at Source: How It Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Relief at source is the method used by most personal pensions, SIPPs, and stakeholder pensions. Under
              this system, you contribute to your pension from your post-tax (net) income. Your pension provider
              then claims back the basic rate tax (20%) from HMRC and adds it to your pension pot on your behalf.
              For example, if you want to make a gross contribution of £1,000, you would pay £800 out of your own
              pocket and your provider would claim £200 from HMRC. This happens automatically, and you do not need
              to do anything to receive the basic rate relief. However, if you are a higher rate or additional rate
              taxpayer, you will need to claim the additional relief yourself, either through your self-assessment
              tax return or by asking HMRC to adjust your tax code. The relief at source method is straightforward
              for basic rate taxpayers but requires additional action from those on higher rates.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Net Pay Arrangements
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Net pay arrangements are commonly used by workplace pension schemes, particularly those run by larger
              employers. Under this method, your pension contribution is taken from your gross salary before income
              tax is calculated. This means you automatically receive tax relief at your full marginal rate without
              needing to make any further claims. If you earn £50,000 and contribute £5,000 to your pension, your
              taxable income is reduced to £45,000, and your tax bill is calculated on this lower amount. The
              advantage of net pay is its simplicity for higher and additional rate taxpayers, as they do not need
              to file a claim. However, there is a significant disadvantage for low earners who do not pay income
              tax, known as the net pay anomaly, which is discussed in detail in article five of this guide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Who Gets Pension Tax Relief?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Any UK resident under the age of 75 can receive pension tax relief on contributions up to 100% of
              their relevant UK earnings or the annual allowance of £60,000, whichever is lower. Even individuals
              with no earnings can contribute up to £3,600 gross per year (paying £2,880 with £720 added by HMRC
              through basic rate relief). This makes pension contributions accessible to non-earners, stay-at-home
              parents, and even children. Employer contributions also receive tax relief in a different way: they
              are deductible as a business expense and do not count towards the employee&apos;s 100% earnings limit,
              though they do count towards the annual allowance.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To see exactly how much tax relief you could receive based on your salary and contribution level,
              use our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline">
                pension tax relief calculator
              </Link>
              . It provides a personalised breakdown of your relief at basic, higher, and additional rates.
            </p>

            {/* Article 1 FAQs */}
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    How much pension tax relief can I get in 2025/26?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      In 2025/26, you receive tax relief at your marginal rate of income tax on pension
                      contributions up to your annual allowance of £60,000 or 100% of your earnings, whichever
                      is lower. Basic rate taxpayers get 20% relief, higher rate taxpayers get 40% relief, and
                      additional rate taxpayers get 45% relief. For a relief at source scheme, the provider
                      claims 20% automatically and you must claim the rest via self-assessment or by contacting
                      HMRC.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    Do I get pension tax relief if I am not working?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Yes, even if you have no earnings you can contribute up to £3,600 gross per year into a
                      pension and receive basic rate tax relief. You would pay £2,880 and your pension provider
                      would claim £720 from HMRC, giving you a total contribution of £3,600. This applies to
                      non-earners, children, and stay-at-home parents.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    Is pension tax relief the same as getting free money from the government?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Pension tax relief is effectively the government returning the income tax you would have
                      paid on the money you contribute to your pension. For a basic rate taxpayer contributing
                      £100, they pay £80 and the government adds £20. It is not technically free money but
                      rather a deferral of taxation, because you will pay income tax on pension withdrawals in
                      retirement. However, many people pay less tax in retirement than during their working
                      years, making it genuinely advantageous.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 2 */}
      <section id="article-2" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Higher Rate Pension Tax Relief: How to Claim
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              If you pay income tax at the higher rate (40%) or additional rate (45%), you are entitled to
              pension tax relief beyond the basic 20% that is claimed automatically through relief at source
              schemes. However, this extra relief is not applied automatically in all cases, and thousands of
              higher rate taxpayers miss out on hundreds or even thousands of pounds each year simply because
              they do not make the claim. Understanding how to claim and avoiding common pitfalls can make a
              significant difference to your overall tax position.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Why You Need to Claim Extra Relief
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you contribute to a relief at source pension scheme, your provider claims 20% basic rate tax
              relief from HMRC automatically. But if you pay tax at 40% or 45%, you are entitled to relief at
              your full marginal rate. The difference between basic rate relief and your actual rate must be
              claimed by you. For a higher rate taxpayer contributing £10,000 gross per year, the provider claims
              £2,000 in basic rate relief, but an additional £2,000 in higher rate relief remains unclaimed unless
              you take action. Over a working lifetime, failing to claim this relief could cost tens of thousands
              of pounds. The extra relief is paid to you as a tax rebate or a reduction in your tax bill, not
              added to your pension pot directly. This is an important distinction, as it means the money comes
              back to you personally and you can choose to reinvest it into your pension or use it elsewhere.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Claiming Through Self-Assessment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The most common method for claiming higher rate pension tax relief is through your self-assessment
              tax return. On the tax return, there is a section specifically for pension contributions where you
              enter the total gross amount you paid into your pension during the tax year. HMRC then calculates
              the additional relief due and either reduces your tax bill or issues a refund. You must report the
              gross contribution amount (the amount including the basic rate relief already claimed by your
              provider), not the net amount you actually paid from your bank account. For example, if you paid
              £8,000 from your bank account and your provider claimed £2,000 from HMRC, you would enter £10,000
              as your gross contribution. It is crucial to get this figure right, as entering the net amount would
              result in you receiving less relief than you are entitled to.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Claiming Through PAYE Tax Code Adjustment
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you do not file a self-assessment tax return, you can still claim higher rate relief by
              contacting HMRC and asking them to adjust your PAYE tax code. This method is particularly useful
              for higher rate taxpayers who are employed and make regular pension contributions. HMRC will
              increase your personal allowance through your tax code so that you pay less tax each month through
              your payroll. The advantage of this method is that you receive the benefit spread throughout the
              year rather than as a lump sum after filing your tax return. You can contact HMRC by phone or
              write to them, providing details of your pension contributions and the pension scheme you are
              contributing to. You should provide evidence of your contributions, such as statements from your
              pension provider.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Common Mistakes to Avoid
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Several common mistakes can result in higher rate taxpayers losing out on pension tax relief or
              creating problems with HMRC. The most frequent error is simply forgetting to claim at all. Many
              people assume that all pension tax relief is applied automatically, which is only true for net pay
              arrangements. Another common mistake is entering the net contribution amount on the tax return
              instead of the gross amount, which understates the relief due. Some taxpayers also fail to account
              for employer contributions correctly, which do not qualify for personal tax relief but do count
              towards the annual allowance. Additionally, if your income fluctuates and you move between tax
              bands, you need to ensure you are claiming the correct rate of relief for each tax year. If you
              are unsure whether you have claimed all the relief you are entitled to, you can check previous
              years&apos; tax returns or contact HMRC. Relief can be backdated for up to four tax years, so if
              you discover you have missed claims in previous years, it is worth submitting them promptly.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Use our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline">
                tax relief calculator
              </Link>{' '}
              to work out exactly how much additional relief you can claim based on your income and contribution
              levels.
            </p>

            {/* Article 2 FAQs */}
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    How do I claim higher rate pension tax relief?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      If you are in a relief at source pension scheme, your provider claims 20% basic rate
                      relief automatically, but you must claim the additional 20% (or 25% for additional rate
                      taxpayers) yourself. You can do this through your self-assessment tax return by entering
                      your total gross pension contributions, or by contacting HMRC to have your tax code
                      adjusted. If you are in a net pay scheme, tax relief at your full marginal rate is
                      applied automatically through your payroll.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    What happens if I forget to claim higher rate pension tax relief?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      If you forget to claim higher rate tax relief, you can backdate your claim for up to
                      four tax years. You will need to contact HMRC or file amended self-assessment returns
                      for the relevant years. It is estimated that thousands of higher rate taxpayers fail to
                      claim the extra relief they are entitled to each year, missing out on significant sums.
                      For example, a higher rate taxpayer contributing £10,000 per year who fails to claim
                      would miss out on £2,000 of additional relief annually.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 3 */}
      <section id="article-3" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Pension Annual Allowance Explained for 2025/26
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              The pension annual allowance is the maximum amount you can save into your pension each tax year
              while still receiving tax relief. For the 2025/26 tax year, the standard annual allowance is
              £60,000. Exceeding this limit can result in a tax charge that effectively claws back the tax
              relief you received, so understanding the annual allowance and how it applies to your situation
              is critical for effective pension planning.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Standard Annual Allowance
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The standard annual allowance for 2025/26 is £60,000. This is the total amount that can be
              contributed to all your pension schemes in a tax year, combining your personal contributions,
              employer contributions, and any tax relief added by HMRC. The £60,000 limit was introduced from
              April 2023, a significant increase from the previous limit of £40,000 that had been in place for
              several years. However, tax relief on your own contributions is also limited to 100% of your
              relevant UK earnings. This means that if you earn £45,000, the maximum personal contribution on
              which you can receive tax relief is £45,000, even though the annual allowance is £60,000. Employer
              contributions are not subject to the 100% earnings limit but do count towards the annual allowance.
              For most people with a single pension scheme, tracking the annual allowance is straightforward.
              However, if you have multiple pension arrangements, such as a workplace pension and a SIPP, you
              must aggregate the contributions across all schemes.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              What Counts Towards the Annual Allowance?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              For defined contribution (money purchase) pension schemes, the pension input amount is the total
              contributions paid in during the pension input period, which aligns with the tax year (6 April to
              5 April). This includes everything: your personal contributions, employer contributions, and the
              basic rate tax relief claimed by your provider. For defined benefit (final salary or career average)
              pension schemes, the calculation is more complex. The pension input amount is based on the increase
              in the value of your benefits over the pension input period, calculated using a factor of 16 times
              the increase in annual pension plus any increase in lump sum entitlement. This can sometimes produce
              surprisingly high figures, particularly if you receive a significant pay rise or promotion. It is
              also worth noting that contributions to overseas pension schemes recognised by HMRC count towards
              the annual allowance, as do transfers between schemes that include additional contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Tapered Annual Allowance
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              High earners may face a reduced annual allowance through the taper mechanism. For 2025/26, if your
              adjusted income exceeds £260,000, your annual allowance is reduced by £1 for every £2 of income
              above this threshold, down to a minimum annual allowance of £10,000. Adjusted income includes your
              total taxable income plus any employer pension contributions. The threshold income, which is your
              net income before pension contributions, must also exceed £200,000 for the taper to apply. This
              two-threshold test means that even someone with high adjusted income will not be affected by the
              taper if their threshold income is £200,000 or below. For example, an individual with adjusted
              income of £300,000 would have their annual allowance reduced by £20,000 (half of the £40,000
              excess over £260,000), giving them a tapered annual allowance of £40,000.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Exceeding the Annual Allowance and the Tax Charge
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If your total pension inputs exceed the annual allowance (after accounting for any carry forward
              from previous years), you will face an annual allowance charge. The excess amount is added to your
              taxable income and taxed at your marginal rate. For a higher rate taxpayer, exceeding the allowance
              by £10,000 would result in a tax charge of £4,000. The charge must be reported on your
              self-assessment tax return. If the charge is more than £2,000 and your pension scheme offers it,
              you may be able to use the Scheme Pays mechanism, which allows the tax charge to be paid directly
              from your pension pot rather than from your personal funds. You must notify your scheme by 31 July
              following the end of the tax year if you wish to use mandatory Scheme Pays. Some schemes offer
              voluntary Scheme Pays for charges below £2,000, but this is at their discretion. Careful planning
              and monitoring of your pension inputs throughout the tax year can help you avoid unexpected annual
              allowance charges.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline">
                pension tax relief calculator
              </Link>{' '}
              can help you check whether your planned contributions will keep you within the annual allowance for
              the 2025/26 tax year.
            </p>

            {/* Article 3 FAQs */}
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    What is the pension annual allowance for 2025/26?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      The standard pension annual allowance for 2025/26 is £60,000. This is the maximum amount
                      of pension savings you can make in a tax year before incurring a tax charge. The allowance
                      covers all your pension contributions including employer contributions, employee
                      contributions, and tax relief. If your adjusted income exceeds £260,000, your annual
                      allowance is tapered down by £1 for every £2 of income above that threshold, to a minimum
                      of £10,000.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    What happens if I exceed the pension annual allowance?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      If your total pension contributions exceed the annual allowance (after using any available
                      carry forward), you will face an annual allowance charge. The excess amount is added to
                      your taxable income and taxed at your marginal rate. For example, if you are a higher
                      rate taxpayer and exceed the allowance by £10,000, you would owe an additional £4,000 in
                      tax. You must report this on your self-assessment tax return. If the charge exceeds
                      £2,000, you may be able to ask your pension scheme to pay it from your pension pot using
                      Scheme Pays.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    Does my employer contribution count towards the annual allowance?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Yes, employer contributions count towards your annual allowance. The annual allowance
                      covers all pension inputs including your own contributions, employer contributions, and
                      tax relief added by HMRC. For example, if your employer contributes £30,000 and you
                      contribute £20,000 gross, your total pension input is £50,000 against the £60,000 annual
                      allowance. However, employer contributions are not limited by the 100% of earnings rule
                      that applies to personal contributions for tax relief purposes.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 4 */}
      <section id="article-4" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Carry Forward Pension Allowance: A Complete Guide
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Carry forward is a powerful pension planning tool that allows you to make use of any unused annual
              allowance from the previous three tax years. This can be particularly valuable if you receive a
              bonus, sell a business, inherit money, or simply want to accelerate your pension savings in a
              particular year. For the 2025/26 tax year, you can potentially carry forward unused allowance from
              2022/23, 2023/24, and 2024/25, meaning your total available allowance could be significantly more
              than the standard £60,000.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Three-Year Carry Forward Rule
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The carry forward rule allows you to look back over the three tax years immediately preceding the
              current tax year and use any unused annual allowance from those years. In 2025/26, the three
              preceding years are 2022/23 (annual allowance: £40,000), 2023/24 (annual allowance: £60,000), and
              2024/25 (annual allowance: £60,000). You must use the current year&apos;s allowance first, then
              carry forward unused allowance starting from the earliest available year. This ordering is
              important because it determines how much you can carry forward. For instance, if you used your full
              allowance in 2022/23 but only used £30,000 of your £60,000 allowance in 2023/24 and £40,000 in
              2024/25, you would have £50,000 of carry forward available (£30,000 from 2023/24 plus £20,000
              from 2024/25), in addition to your current year allowance of £60,000, giving you a total available
              allowance of £110,000 for 2025/26.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Conditions for Using Carry Forward
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              There are several important conditions that must be met to use carry forward. First, you must have
              been a member of a registered pension scheme in each of the years from which you wish to carry
              forward unused allowance. Simply having a dormant pension from a previous employer is sufficient;
              you do not need to have been actively contributing. Second, your total contributions in the current
              tax year cannot exceed 100% of your relevant UK earnings. This is a crucial constraint, because
              even if you have £200,000 of available carry forward plus current year allowance, you can only
              contribute up to the amount you actually earn in the current tax year (or £3,600, if greater).
              Third, if you are subject to the tapered annual allowance, the taper applies to both your current
              year allowance and can affect the amount of carry forward available. You should also be aware that
              the money purchase annual allowance (MPAA) of £10,000, which is triggered if you have flexibly
              accessed your pension benefits, completely prevents you from using carry forward for defined
              contribution pension savings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              How to Calculate Your Available Carry Forward
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To work out your available carry forward, follow these steps. First, determine the annual allowance
              for each of the three preceding tax years. For 2025/26, these are £40,000 (2022/23), £60,000
              (2023/24), and £60,000 (2024/25). If you were subject to the tapered annual allowance in any of
              those years, use your tapered figure instead. Next, calculate your total pension input for each of
              those years by adding together all contributions (personal, employer, and tax relief) across all
              your pension schemes. Subtract your pension inputs from the annual allowance for each year to find
              the unused amount. Finally, add up the unused amounts from all three years and add them to your
              current year allowance to find your total available allowance. Remember that you must use the
              earliest unused allowance first, and your actual contribution cannot exceed your current year
              earnings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Practical Examples of Carry Forward
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Consider Sarah, who earns £120,000 per year and has been a member of her workplace pension
              throughout. In 2022/23, she and her employer contributed a total of £25,000 (unused: £15,000
              from the £40,000 allowance). In 2023/24, total contributions were £35,000 (unused: £25,000). In
              2024/25, total contributions were £45,000 (unused: £15,000). In 2025/26, Sarah has carry forward
              of £55,000 (£15,000 + £25,000 + £15,000) plus her current year allowance of £60,000, giving her
              a total available allowance of £115,000. Since her earnings exceed this amount, she could
              contribute the full £115,000 if she wished. Now consider James, who earns £35,000 in 2025/26 but
              has the same carry forward. Although his total available allowance would also be £115,000, he can
              only contribute up to £35,000 (100% of his earnings) and receive tax relief. This earnings cap is
              the key limitation for many people looking to use carry forward.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To estimate your available carry forward and plan your contributions effectively, try our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline">
                pension tax relief calculator
              </Link>
              .
            </p>

            {/* Article 4 FAQs */}
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    How does pension carry forward work?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      Carry forward allows you to use any unused annual allowance from the previous three tax
                      years, in addition to your current year allowance. You must use the current year allowance
                      first, then carry forward unused allowance from the earliest available year. To use carry
                      forward, you must have been a member of a registered pension scheme in the years you want
                      to carry forward from, and your contributions cannot exceed 100% of your earnings in the
                      current tax year.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    Can I use carry forward if I was not earning in a previous tax year?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      You can carry forward unused allowance from a previous year even if you had no earnings
                      in that year, as long as you were a member of a registered pension scheme during that
                      year. However, there is an important limitation: the total amount you contribute in the
                      current tax year cannot exceed 100% of your current year relevant UK earnings (or £3,600
                      if greater). So while the carry forward allowance itself is available, your ability to
                      use it is limited by what you actually earn in the year you make the contributions.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    What years can I carry forward unused pension allowance from in 2025/26?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      In the 2025/26 tax year, you can carry forward unused annual allowance from the three
                      preceding tax years: 2022/23, 2023/24, and 2024/25. For 2022/23 the standard annual
                      allowance was £40,000, while for 2023/24 and 2024/25 it was £60,000 following the
                      increase at the April 2023 budget. You must use the earliest year first, and you need to
                      have been a member of a registered pension scheme in each year you wish to carry forward
                      from.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 5 */}
      <section id="article-5" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Net Pay vs Relief at Source Pension Schemes
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              There are two main methods by which pension schemes administer tax relief in the UK: net pay
              arrangements and relief at source. While both are designed to deliver the same end result of
              tax-relieved pension savings, they work in fundamentally different ways and can produce different
              outcomes for certain groups of people. Understanding the distinction is important because the
              method used by your pension scheme affects how much you actually pay, how tax relief reaches your
              pension pot, and whether you need to take any additional action.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              How Relief at Source Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In a relief at source scheme, your pension contribution is taken from your net (after-tax) pay.
              You pay the contribution from money that has already had income tax deducted. Your pension provider
              then claims basic rate tax relief (20%) from HMRC and adds it to your pension pot. This means that
              for every £80 you contribute from your bank account, your provider adds £20, resulting in a total
              gross contribution of £100 in your pension. The process is automatic for the basic rate element,
              and you do not need to do anything to receive it. However, if you are a higher rate (40%) or
              additional rate (45%) taxpayer, you must claim the additional relief yourself, either through your
              self-assessment tax return or by contacting HMRC to adjust your tax code. Most personal pensions,
              SIPPs, and stakeholder pension schemes operate on a relief at source basis. The key advantage of
              this method is that even non-taxpayers and those earning below the personal allowance of £12,570
              still receive the 20% basic rate top-up from HMRC, making it beneficial for low earners.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              How Net Pay Arrangements Work
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In a net pay arrangement, your pension contribution is deducted from your gross salary before
              income tax is calculated. This means you receive tax relief at your full marginal rate
              automatically, without needing to make any claims. If you are a basic rate taxpayer, your
              taxable income is reduced by the full amount of your contribution, saving you 20% in tax. If
              you are a higher rate taxpayer, you automatically save 40%, and additional rate taxpayers save
              45%. The contribution is taken directly from your payroll, so the amount that appears on your
              payslip as taxable pay is already reduced by your pension contribution. Most occupational pension
              schemes and many auto-enrolment workplace pensions use net pay arrangements. The main advantage
              for higher and additional rate taxpayers is that all tax relief is applied immediately and
              automatically without the need for self-assessment claims or tax code adjustments.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Net Pay Anomaly Explained
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The net pay anomaly is a well-documented issue that disadvantages low earners in net pay pension
              schemes. Because contributions in a net pay scheme are deducted before tax is calculated, someone
              earning below the personal allowance of £12,570 does not pay any income tax in the first place.
              This means there is no tax to be relieved, so they effectively contribute from their gross pay
              without receiving any tax benefit at all. In contrast, a person earning the same amount in a
              relief at source scheme would pay only £80 for every £100 contributed, because the provider claims
              20% from HMRC regardless of whether the contributor actually pays tax. This anomaly means that
              two people earning exactly the same amount and contributing the same percentage to their pension
              can end up with different amounts in their pension pots depending purely on which type of scheme
              their employer has chosen. The difference can amount to hundreds of pounds per year. The
              government has acknowledged this unfairness, and legislation has been introduced to provide a
              top-up payment to affected low earners from 2025/26 onwards, effectively giving net pay scheme
              members the same 20% uplift that relief at source members receive automatically. However, the
              practical implementation of this remedy is still being finalised, and affected individuals should
              check with HMRC to ensure they receive any top-up payments they are entitled to.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Which Is Better for You?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The answer depends on your circumstances. For basic rate taxpayers earning above the personal
              allowance, there is no practical difference between the two methods in terms of the total tax
              relief received. Both deliver 20% relief, although the mechanism is different. For higher and
              additional rate taxpayers, net pay is generally simpler and more convenient because the full
              relief is applied automatically through payroll. With relief at source, higher rate taxpayers
              must remember to claim the additional relief, and many fail to do so, leaving money on the table.
              For non-taxpayers and low earners below the personal allowance, relief at source is clearly
              superior because it provides the 20% HMRC top-up regardless of tax status. In practice, you
              rarely get to choose which method your pension uses. Your employer selects the scheme, and the
              scheme determines the method. However, if you have a personal pension or SIPP alongside your
              workplace scheme, you can direct additional contributions to a relief at source arrangement if
              that better suits your situation. If you are a higher rate taxpayer in a relief at source scheme,
              make sure you are claiming your additional relief each year.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Not sure how much tax relief your contributions are generating? Use our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline">
                pension tax relief calculator
              </Link>{' '}
              to get a personalised breakdown based on your income, contribution amount, and scheme type.
            </p>

            {/* Article 5 FAQs */}
            <div className="mt-12 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    What is the net pay anomaly?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      The net pay anomaly affects low earners in net pay arrangement pension schemes. In a net
                      pay scheme, contributions are deducted before tax is calculated. If you earn below the
                      personal allowance of £12,570, you do not pay income tax, so there is no tax to be
                      relieved. This means you effectively contribute the full gross amount without receiving
                      any tax benefit. In contrast, someone earning the same amount in a relief at source
                      scheme would pay only £80 for every £100 contributed because the scheme claims 20% basic
                      rate relief from HMRC regardless of whether the member actually pays tax. The government
                      has announced plans to address this anomaly from 2025/26.
                    </p>
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    Which is better: net pay or relief at source pension?
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                    <p>
                      For basic rate taxpayers, there is no practical difference as both methods deliver 20%
                      tax relief. For higher and additional rate taxpayers, net pay is simpler because full
                      relief is applied automatically through payroll without needing to file a self-assessment
                      claim. For non-taxpayers and those earning below the personal allowance, relief at source
                      is better because the scheme claims 20% from HMRC even though the member pays no income
                      tax, effectively giving them a bonus. The choice of scheme type is usually made by your
                      employer rather than by you individually.
                    </p>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your Pension Tax Relief
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our free calculator to see exactly how much tax relief you could receive on your pension
            contributions, based on your income and tax band for the 2025/26 tax year.
          </p>
          <Link
            href="/calculators/tax-relief"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open Tax Relief Calculator
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Guides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/guides/workplace-pension"
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Workplace Pension Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Auto-enrolment, employer contributions, and salary sacrifice explained.
              </p>
            </Link>
            <Link
              href="/guides/sipp"
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">SIPP Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Self-invested personal pensions, investment options, and tax relief.
              </p>
            </Link>
            <Link
              href="/guides/state-pension"
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">State Pension Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                State pension entitlement, NI gaps, and deferral options.
              </p>
            </Link>
            <Link
              href="/guides/pension-drawdown"
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Pension Drawdown Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Flexi-access drawdown, withdrawal rates, and tax on withdrawals.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
