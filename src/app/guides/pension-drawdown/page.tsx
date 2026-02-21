import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Pension Drawdown Guide: Rules, Tax, Rates & Strategies for 2025/26',
  description:
    'Complete UK pension drawdown guide covering flexi-access drawdown rules, sustainable withdrawal rates, tax on pension withdrawals, UFPLS vs drawdown, and strategies to make your pension last. Updated for 2025/26.',
  keywords: [
    'pension drawdown',
    'flexi-access drawdown',
    'pension withdrawal tax',
    'sustainable withdrawal rate',
    '4% rule pension',
    'UFPLS vs drawdown',
    'pension drawdown rules UK',
    'money purchase annual allowance',
    'MPAA',
    'pension drawdown calculator',
    'make pension last',
    'drawdown investment strategy',
    'pension income drawdown',
    'tax-free lump sum pension',
    'pension pot withdrawal',
  ],
  alternates: { canonical: 'https://calculatorsforpensions.com/guides/pension-drawdown' },
  openGraph: {
    title: 'Pension Drawdown Guide: Rules, Tax, Rates & Strategies for 2025/26',
    description:
      'Everything you need to know about pension drawdown in the UK. Expert guidance on withdrawal rates, tax rules, UFPLS comparisons, and making your pension last throughout retirement.',
    url: 'https://calculatorsforpensions.com/guides/pension-drawdown',
    type: 'article',
  },
}

export default function PensionDrawdownGuidePage() {
  const faqItems = [
    {
      question: 'What is flexi-access drawdown and when was it introduced?',
      answer:
        'Flexi-access drawdown was introduced in April 2015 as part of the pension freedom reforms. It replaced the old capped drawdown system and allows you to withdraw as much or as little as you want from your defined contribution pension pot at any time after age 55 (rising to 57 in 2028). There is no annual withdrawal limit, giving you complete flexibility over your retirement income.',
    },
    {
      question: 'Can I take my 25% tax-free lump sum in stages rather than all at once?',
      answer:
        'Yes. Under flexi-access drawdown, you can take your 25% tax-free entitlement as a single lump sum when you first enter drawdown, or you can take it in smaller amounts over time. Each withdrawal you make can consist of 25% tax-free and 75% taxable income. This phased approach can be more tax-efficient because it keeps your remaining pot invested and growing.',
    },
    {
      question: 'What is a sustainable withdrawal rate for pension drawdown?',
      answer:
        'The most widely cited benchmark is the 4% rule, which suggests withdrawing 4% of your pension pot in the first year of retirement and then adjusting that amount for inflation each subsequent year. Research suggests this approach gives a high probability of your money lasting at least 30 years. However, the 4% rule was based on US market data and a 30-year horizon, so UK retirees should consider adjusting for lower expected returns, longer life expectancy, and currency differences.',
    },
    {
      question: 'What is sequence of returns risk and why does it matter in drawdown?',
      answer:
        'Sequence of returns risk is the danger that poor investment returns early in your retirement can permanently damage your pension pot, even if average returns over the full period are acceptable. When you are withdrawing money from a falling portfolio, you are selling more units at lower prices, which means the pot has fewer units to benefit from any subsequent recovery. This is the single biggest risk facing drawdown investors and is why the order of returns matters just as much as the average return.',
    },
    {
      question: 'How are pension drawdown withdrawals taxed?',
      answer:
        'After taking your 25% tax-free entitlement, all further withdrawals from your drawdown pot are taxed as earned income at your marginal income tax rate. This means the first portion falls within your personal allowance (currently £12,570), then the basic rate band (20%), higher rate band (40%), and additional rate band (45%). Your pension provider will apply PAYE tax using a tax code issued by HMRC.',
    },
    {
      question: 'What is the Money Purchase Annual Allowance (MPAA) and when is it triggered?',
      answer:
        'The MPAA is a reduced annual allowance of £10,000 that limits how much you can contribute to money purchase (defined contribution) pensions and still receive tax relief. It is triggered as soon as you take any taxable income from a flexi-access drawdown plan. Simply designating funds for drawdown or taking your tax-free lump sum does not trigger it. Once triggered, the MPAA applies for the rest of your life and cannot be reversed.',
    },
    {
      question: 'What is UFPLS and how does it differ from drawdown?',
      answer:
        'UFPLS stands for Uncrystallised Funds Pension Lump Sum. It allows you to take lump sum withdrawals directly from your uncrystallised pension pot without first moving it into a drawdown arrangement. Each UFPLS payment is 25% tax-free and 75% taxable. The key difference from drawdown is that with UFPLS there is no separate designation step, your funds remain uncrystallised until withdrawn, and you cannot nominate a specific tax-free lump sum separately.',
    },
    {
      question: 'When is UFPLS better than drawdown?',
      answer:
        'UFPLS may be better if you want occasional lump sum withdrawals rather than a regular income, if you have a smaller pension pot and want to keep things simple, or if you want to avoid the charges that some providers apply for setting up a drawdown arrangement. However, drawdown is generally more flexible for regular income because it allows you to separate your tax-free cash from taxable withdrawals and gives you greater control over the tax treatment of each payment.',
    },
    {
      question: 'What is the bucket strategy for pension drawdown?',
      answer:
        'The bucket strategy divides your pension pot into three separate segments based on when you will need the money. Bucket one holds one to three years of income in cash or near-cash, providing security and preventing you from selling investments during a market downturn. Bucket two holds three to ten years of income in lower-risk assets such as bonds and multi-asset funds. Bucket three holds the remainder in growth-oriented assets such as equities, giving it time to grow over the long term. You periodically top up the shorter-term buckets from the longer-term ones.',
    },
    {
      question: 'How often should I review my pension drawdown plan?',
      answer:
        'You should review your drawdown plan at least once a year and after any significant life event such as a change in health, marital status, or other income sources. Your annual review should cover your current withdrawal rate relative to your remaining pot, investment performance against your assumptions, whether your asset allocation still matches your time horizon and risk tolerance, any changes to tax thresholds or pension legislation, and whether your spending needs have changed. A formal review with a financial adviser every three to five years is also advisable.',
    },
    {
      question: 'Why might I get an emergency tax code on my first drawdown withdrawal?',
      answer:
        'When you take your first drawdown withdrawal, your pension provider may not have a tax code from HMRC for you. In this case, they are required to apply an emergency tax code, which typically assumes your withdrawal is a regular monthly payment and taxes you as if you will receive that amount every month of the tax year. This often results in significantly more tax being deducted than is actually owed. You can reclaim the overpaid tax by contacting HMRC or waiting until the end of the tax year when it will be reconciled automatically.',
    },
    {
      question: 'What is the natural yield approach to pension drawdown?',
      answer:
        'The natural yield approach means you only withdraw the income naturally generated by your investments, such as dividends from shares and interest from bonds, without selling any of the underlying capital. This preserves your pension pot in full and can provide a sustainable long-term income, but the amount you receive will vary depending on market conditions and dividend payments. A typical diversified portfolio might yield between 3% and 4% per year. This approach suits retirees who want to preserve capital for inheritance or who have other income sources to supplement drawdown.',
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="pension-drawdown-guide-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <Script
        id="pension-drawdown-guide-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: 'Pension Drawdown',
                item: 'https://calculatorsforpensions.com/guides/pension-drawdown',
              },
            ],
          }),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
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
            <li className="text-gray-900 dark:text-white font-medium">Pension Drawdown</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Pension Drawdown Guide
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            Everything you need to know about flexi-access drawdown, sustainable withdrawal rates,
            tax rules, and strategies to make your pension last throughout retirement. Updated for the
            2025/26 tax year.
          </p>
          <div className="inline-flex">
            <Link
              href="/calculators/pension-drawdown"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try the Pension Drawdown Calculator
            </Link>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">In This Guide</h2>
          <ol className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-400">
            <li>
              <a href="#article-1" className="hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                What Is Pension Drawdown and How Does It Work?
              </a>
            </li>
            <li>
              <a href="#article-2" className="hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                Sustainable Drawdown Rates: How Much Can You Safely Withdraw?
              </a>
            </li>
            <li>
              <a href="#article-3" className="hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                Pension Drawdown Tax Rules Explained
              </a>
            </li>
            <li>
              <a href="#article-4" className="hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                UFPLS vs Drawdown: Comparing Your Options
              </a>
            </li>
            <li>
              <a href="#article-5" className="hover:text-gray-900 dark:hover:text-white underline underline-offset-4 transition-colors">
                How to Make Your Pension Last in Drawdown
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Article 1 */}
      <section id="article-1" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              What Is Pension Drawdown and How Does It Work?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Pension drawdown is a way of taking income from your defined contribution pension pot
              while leaving the remainder invested. Rather than using your entire pension fund to
              purchase a guaranteed income for life through an annuity, drawdown allows you to keep
              your money invested in the stock market and withdraw funds as and when you need them.
              This gives you far greater flexibility over how much income you take and when you take
              it, but it also means your money can run out if you withdraw too much or if your
              investments perform poorly.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Since the pension freedom reforms of April 2015, anyone aged 55 or over with a defined
              contribution pension can access their pot however they wish. The minimum access age is
              set to rise to 57 in 2028, aligned with the state pension age increase. Drawdown
              became the most popular method of accessing pension savings almost immediately after
              the reforms, overtaking annuity purchases within the first year.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Flexi-Access Drawdown vs Old Capped Drawdown
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Before April 2015, the main form of drawdown was capped drawdown, which imposed an
              annual limit on the amount you could withdraw. This cap was set by the Government
              Actuary&#39;s Department and was broadly equivalent to the income you would have
              received from an annuity purchased at the same age. You could withdraw up to 150% of
              this calculated amount each year, but no more. There was also flexible drawdown, but
              it required a minimum guaranteed income of at least £12,000 per year from other
              sources, making it inaccessible to most people.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Flexi-access drawdown, introduced in April 2015, swept away these restrictions
              entirely. There is no annual withdrawal limit. You can take as much or as little as
              you want in any given tax year. You can take your entire pension pot in a single
              withdrawal if you wish, although doing so would usually be extremely tax-inefficient.
              If you were already in capped drawdown before April 2015, you can choose to convert to
              flexi-access drawdown at any time, though doing so will trigger the Money Purchase
              Annual Allowance (MPAA) of £10,000 if you take taxable income.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              How to Set Up Pension Drawdown
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              To enter drawdown, you need a defined contribution pension pot, and you must be at
              least 55 years old. The process begins by choosing a drawdown provider. Many people
              stay with their existing pension provider if drawdown is offered, but you are free to
              transfer your pot to a different provider that may offer lower charges, a wider
              investment range, or a better drawdown platform. Once you have selected a provider, you
              designate some or all of your pension fund for drawdown. At this point, you can choose
              to take up to 25% of the designated amount as a tax-free lump sum. The remaining 75%
              stays invested and any income you subsequently draw will be taxed at your marginal
              income tax rate.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              You do not have to designate your entire pension for drawdown at once. Many people use
              a phased approach, moving portions of their pension into drawdown over time. This
              allows you to take your 25% tax-free entitlement in stages rather than as a single
              lump sum, which can be more tax-efficient. You can also keep some of your pension
              uncrystallised while drawing income from the crystallised portion, maintaining your
              full annual allowance on the uncrystallised funds.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Who Is Pension Drawdown Best Suited For?
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Drawdown tends to suit people who are comfortable with investment risk, who want
              flexibility in their income rather than a fixed guaranteed amount, and who have a
              pension pot large enough that it is unlikely to run out during their lifetime. It is
              particularly attractive to those who have other sources of guaranteed income, such as a
              state pension, a defined benefit pension, or rental income, because these provide a
              safety net if drawdown investments perform badly. Drawdown also offers inheritance
              advantages: if you die before age 75, your remaining drawdown fund can be passed to
              beneficiaries completely tax-free. After 75, beneficiaries pay income tax on
              withdrawals at their marginal rate.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Use our{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                pension drawdown calculator
              </Link>{' '}
              to model different withdrawal scenarios and see how long your pension pot could last
              under various assumptions about growth rates, inflation, and withdrawal amounts.
            </p>

            {/* Article 1 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[0].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[0].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[1].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[1].answer}
                  </div>
                </details>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Article 2 */}
      <section id="article-2" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Sustainable Drawdown Rates: How Much Can You Safely Withdraw?
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              One of the most important decisions you will make in retirement is how much to
              withdraw from your pension each year. Take too much and you risk running out of money.
              Take too little and you may unnecessarily restrict your quality of life during the
              years when you are healthy enough to enjoy it. Finding the right balance between these
              two extremes is the central challenge of pension drawdown, and it is a question that
              financial researchers have studied extensively for decades.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The sustainable withdrawal rate is the percentage of your pension pot you can withdraw
              in the first year of retirement, adjusting for inflation each year thereafter, with a
              high probability that your money will last for the duration of your retirement. Getting
              this rate right is crucial because once you begin drawing down, the combination of
              withdrawals and market fluctuations creates a dynamic that can either sustain your
              income for decades or lead to premature depletion of your savings.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              The 4% Rule Explained
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The most widely cited benchmark for sustainable withdrawal rates is the 4% rule,
              developed by financial planner William Bengen in 1994. Bengen analysed US stock and
              bond market data going back to 1926 and found that a retiree who withdrew 4% of their
              portfolio in the first year of retirement and then adjusted that amount for inflation
              each subsequent year would not have run out of money over any 30-year period in the
              historical record. This meant that even a retiree who had the misfortune of retiring
              at the worst possible time, such as just before a major market crash, would still have
              had enough money to last three decades.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The 4% rule has become the default benchmark for retirement planning discussions, but
              it comes with important caveats for UK retirees. Bengen&#39;s research was based on US
              market data, and the US stock market has historically delivered higher returns than
              most other developed markets, including the UK. Research by Wade Pfau and others has
              shown that the safe withdrawal rate for international investors may be closer to 3.5%
              or even 3% when using non-US data. Additionally, the 4% rule assumes a 30-year time
              horizon, but someone retiring at 55 may need their money to last 35 to 40 years or
              more, which further reduces the sustainable rate.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Sequence of Returns Risk
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The single biggest threat to your drawdown plan is sequence of returns risk. This
              refers to the danger that poor investment returns in the early years of your retirement
              can permanently damage your pension pot, even if average returns over the full period
              are perfectly acceptable. The reason is straightforward: when you are withdrawing money
              from a portfolio that is simultaneously falling in value, you are forced to sell more
              units of your investments at lower prices. This means there are fewer units remaining
              to participate in any subsequent recovery. Two retirees with identical average returns
              over 25 years can end up with vastly different outcomes depending on whether the good
              years came first or last.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Consider a simple example. A retiree with a £500,000 pension pot who withdraws
              £20,000 per year (4%) and experiences a 30% market decline in year one would see their
              pot fall to around £330,000 after the withdrawal. Even if markets subsequently deliver
              strong returns, the pot has lost so much ground that it may never fully recover while
              withdrawals continue. Conversely, if the 30% decline occurred in year fifteen, the pot
              would by then have grown significantly, and the impact would be far less severe. This
              asymmetry is why the early years of retirement are often called the &#34;danger
              zone&#34; for drawdown investors.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Adjusting for Market Conditions and Longevity
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Rather than sticking rigidly to a fixed withdrawal rate, many financial planners
              recommend a flexible approach that adjusts withdrawals based on portfolio performance.
              One popular method is the guardrails approach, where you set upper and lower bounds
              around your target withdrawal rate. If your portfolio grows significantly, you give
              yourself a raise. If it falls substantially, you cut your spending. This dynamic
              approach can increase the sustainable withdrawal rate to 5% or more because it
              automatically responds to market conditions.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Longevity risk is another critical factor. Life expectancy data shows that a healthy
              65-year-old man in the UK has roughly a 50% chance of living to 87 and a 25% chance of
              reaching 92. For women, the figures are even higher. Planning for an &#34;average&#34;
              life expectancy means accepting a roughly 50% chance of outliving your money. Most
              financial planners recommend planning to age 95 or even 100 to provide a reasonable
              margin of safety. You can model these scenarios using our{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                pension drawdown calculator
              </Link>
              , which lets you adjust life expectancy, growth rates, and withdrawal amounts to see
              how different assumptions affect the sustainability of your plan.
            </p>

            {/* Article 2 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[2].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[2].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[3].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[3].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[4].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[4].answer}
                  </div>
                </details>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Article 3 */}
      <section id="article-3" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Pension Drawdown Tax Rules Explained
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Understanding how pension drawdown withdrawals are taxed is essential for effective
              retirement planning. The tax treatment of drawdown is more nuanced than many people
              realise, and getting it wrong can cost you thousands of pounds in unnecessary tax or
              lead to unwelcome surprises when HMRC sends its assessment. The fundamental principle
              is straightforward: 25% of your pension pot can be taken tax-free, and the remaining
              75% is taxed as earned income at your marginal rate. But the detail matters
              enormously, particularly when it comes to timing your withdrawals, managing your tax
              code, and understanding the knock-on effects on your future pension contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              How Drawdown Withdrawals Are Taxed
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              When you enter flexi-access drawdown, you are entitled to take 25% of the designated
              funds as a tax-free pension commencement lump sum (PCLS). This can be taken as a
              single lump sum at the point of designation or, alternatively, you can take it in
              stages by having each subsequent withdrawal consist of 25% tax-free and 75% taxable
              income. The tax-free portion is not counted as income for tax purposes, which means it
              does not affect your personal allowance, your eligibility for means-tested benefits,
              or your tax band.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              After your tax-free entitlement has been used, every pound you withdraw from your
              drawdown pot is treated as earned income and taxed through PAYE at your marginal rate.
              For the 2025/26 tax year, the key income tax thresholds are: a personal allowance of
              £12,570 (reduced by £1 for every £2 of income above £100,000), a basic rate of 20% on
              income between £12,571 and £50,270, a higher rate of 40% on income between £50,271 and
              £125,140, and an additional rate of 45% on income above £125,140. Your drawdown income
              is added on top of any other income you receive, including employment income, state
              pension, rental income, and interest.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              The Personal Allowance and Tax-Efficient Withdrawal Strategies
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              One of the most effective tax planning strategies for drawdown is to keep your total
              annual income within the basic rate band. If your only income is your state pension
              (approximately £11,502 per year for the full new state pension in 2025/26), you have
              scope to withdraw approximately £38,768 from drawdown before crossing into the higher
              rate band. This level of control over your income is one of the key advantages of
              drawdown over an annuity, which pays a fixed amount regardless of your other income
              or tax position. By spreading your withdrawals strategically across tax years, you
              can significantly reduce the total tax you pay over the course of your retirement.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Be aware of the personal allowance taper for high earners. If your total income
              exceeds £100,000, including drawdown withdrawals, your personal allowance is reduced
              by £1 for every £2 above this threshold. This creates an effective marginal tax rate
              of 60% on income between £100,000 and £125,140, which makes large one-off drawdown
              withdrawals in this band extremely costly from a tax perspective.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              The Money Purchase Annual Allowance (MPAA)
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Once you take any taxable income from your flexi-access drawdown plan, the Money
              Purchase Annual Allowance is triggered. The MPAA reduces the maximum amount you can
              contribute to money purchase (defined contribution) pensions and still receive tax
              relief from the standard annual allowance of £60,000 to just £10,000 per year. This is
              a permanent, irreversible change that lasts for the rest of your life. It is designed
              to prevent people from recycling pension withdrawals by taking money out of their
              pension, claiming tax relief when they put it back in, and then withdrawing it again.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Crucially, the MPAA is only triggered by taking taxable income. It is not triggered by
              simply designating funds for drawdown, taking your 25% tax-free lump sum, or
              purchasing an annuity with your drawdown funds. This means you can enter drawdown and
              take your tax-free cash without affecting your annual allowance, provided you do not
              take any taxable income. This is an important planning consideration for people who
              are still working and want to access their tax-free lump sum while continuing to
              build their pension through employer contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Emergency Tax on First Withdrawals
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              A common and frustrating issue with pension drawdown is emergency tax on your first
              withdrawal. When your pension provider processes your first taxable drawdown payment,
              they may not yet have received a tax code for you from HMRC. In this case, the
              provider is legally required to apply an emergency tax code. This code typically
              treats the payment as if you will receive the same amount every month for the rest of
              the tax year, which can result in a dramatically higher tax deduction than is actually
              owed. For example, a one-off withdrawal of £10,000 would be taxed as if you were
              earning £120,000 per year, pushing a significant portion into the higher rate band.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              You can reclaim overpaid emergency tax by completing one of HMRC&#39;s repayment
              forms (P55, P53, or P50Z depending on your circumstances) or by waiting until the
              end of the tax year when HMRC will reconcile your actual income against the tax
              deducted and issue a refund. To avoid the problem entirely, you can contact HMRC
              before your first withdrawal and ask them to issue a tax code to your pension
              provider. This typically takes a few weeks but ensures the correct amount of tax is
              deducted from the outset.
            </p>

            {/* Article 3 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[5].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[5].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[10].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[10].answer}
                  </div>
                </details>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Article 4 */}
      <section id="article-4" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              UFPLS vs Drawdown: Comparing Your Options
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              When it comes to accessing your defined contribution pension, flexi-access drawdown is
              not your only option. Uncrystallised Funds Pension Lump Sums, known as UFPLS, offer an
              alternative route that may be simpler and more appropriate depending on your
              circumstances. Both methods were introduced or significantly reformed as part of the
              April 2015 pension freedoms, and both allow you to access your pension savings
              flexibly from age 55. However, they work in fundamentally different ways and have
              different implications for tax efficiency, ongoing investment management, and the
              administration of your pension.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Understanding the differences between UFPLS and drawdown is crucial because choosing
              the wrong option could cost you money in unnecessary tax, reduce your flexibility for
              future planning, or create administrative complexity that you do not need. The right
              choice depends on the size of your pension pot, how regularly you need income, whether
              you want ongoing control over your investments, and how you feel about the
              administrative requirements of each approach.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              How UFPLS Works
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              UFPLS allows you to take lump sum withdrawals directly from your pension pot without
              first designating it for drawdown. The key word is &#34;uncrystallised&#34; because
              the funds have not been through the crystallisation process that drawdown requires.
              Each UFPLS payment consists of 25% tax-free and 75% taxable income, and the taxable
              portion is taxed at your marginal income tax rate through PAYE, just like drawdown
              withdrawals. The crucial difference is that with UFPLS, you cannot separate the
              tax-free element from the taxable element. Every withdrawal automatically includes
              both components in the 25/75 split.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              To take UFPLS, your pension provider must offer this facility, and not all do. You
              simply request a lump sum withdrawal from your uncrystallised pension pot, specifying
              the gross amount you want. The provider calculates the tax-free and taxable portions,
              deducts the appropriate PAYE tax from the taxable element, and pays the net amount to
              you. Your remaining pension pot stays invested in its existing funds, completely
              uncrystallised, ready for future withdrawals.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Key Differences in Tax Treatment
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The tax treatment of UFPLS and drawdown is identical in principle: 25% is tax-free
              and 75% is taxable at your marginal rate. However, the mechanics differ in ways that
              can affect your overall tax bill. With drawdown, you have the option to take your
              entire 25% tax-free lump sum upfront and then draw only taxable income from the
              remaining pot. This means you can take a large tax-free sum for a specific purpose,
              such as paying off a mortgage, without incurring any tax liability. With UFPLS, every
              withdrawal includes a taxable element, so you cannot take a large lump sum without
              also triggering a significant tax charge.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Both UFPLS and drawdown trigger the Money Purchase Annual Allowance (MPAA) of £10,000
              once you take a taxable payment. The timing of this trigger can be important if you
              are still working and contributing to a pension. With drawdown, you can enter drawdown
              and take your tax-free lump sum without triggering the MPAA, provided you do not take
              any taxable income. With UFPLS, because every payment includes a taxable element, the
              MPAA is triggered with your very first withdrawal.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              When Each Option Is Better
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Drawdown is generally the better choice if you want regular, ongoing income from your
              pension, if you want to take your tax-free lump sum separately, if you want full
              control over your investment strategy during retirement, or if you have a large pension
              pot that will need active management over many years. Drawdown gives you the most
              flexibility and control, which is why it is the preferred choice for the majority of
              pension savers accessing their benefits.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              UFPLS may be the better option if you want to take occasional, ad hoc lump sums rather
              than a regular income, if you have a smaller pension pot and want the simplest possible
              administration, if your provider does not offer drawdown or charges more for it, or if
              you want to keep your pension as simple as possible without the need for ongoing
              investment management decisions. Some people also use UFPLS as a temporary measure
              before setting up a more formal drawdown arrangement, for example, to access some
              immediate cash while they research drawdown providers. Use our{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                pension drawdown calculator
              </Link>{' '}
              to model how different withdrawal strategies would affect your pension pot over time.
            </p>

            {/* Article 4 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[6].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[6].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[7].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[7].answer}
                  </div>
                </details>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Article 5 */}
      <section id="article-5" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <article className="prose-custom">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How to Make Your Pension Last in Drawdown
            </h2>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The greatest fear for anyone entering pension drawdown is running out of money. Unlike
              an annuity, which guarantees income for life regardless of how long you live or how
              markets perform, drawdown places the responsibility squarely on your shoulders.
              Your pension pot must sustain you for what could be 30 years or more, through market
              booms and crashes, periods of high inflation, and the inevitable increase in spending
              that comes with age-related care needs. Making your pension last requires a
              combination of sensible investment strategy, disciplined withdrawal management, and
              regular reviews to ensure your plan remains on track.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The good news is that with careful planning, drawdown can provide a sustainable income
              that matches or exceeds what you would have received from an annuity, while preserving
              capital for your beneficiaries and giving you the flexibility to adapt your income to
              your changing needs. The strategies outlined below have been proven effective by
              decades of academic research and practical experience from financial advisers who
              specialise in retirement income planning.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Investment Strategy During Drawdown
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The investment strategy you adopt during drawdown is fundamentally different from the
              strategy you used during the accumulation phase. When you were building your pension
              pot, temporary market falls were merely opportunities to buy at lower prices. In
              drawdown, market falls are a genuine threat because you are simultaneously selling
              investments to fund your withdrawals. Your investment strategy must therefore balance
              the need for long-term growth to sustain your income over decades against the need to
              protect your pot from catastrophic short-term losses during the critical early years.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Most financial planners recommend that drawdown investors maintain a diversified
              portfolio that includes a significant allocation to growth assets such as global
              equities, a defensive allocation to bonds and other fixed-income investments, and a
              cash buffer to cover short-term income needs. The exact proportions depend on your age,
              risk tolerance, other income sources, and the size of your pot relative to your income
              needs. A common starting point for a retiree in their mid-sixties might be 60%
              equities, 30% bonds, and 10% cash, but this should be tailored to individual
              circumstances and adjusted over time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              The Natural Yield Approach
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The natural yield approach is one of the simplest and most sustainable withdrawal
              strategies available. Instead of selling investments to generate income, you simply
              withdraw the income that your investments naturally produce: dividends from shares,
              interest from bonds, and rental income from property funds. Because you never sell
              any of the underlying capital, your pension pot is preserved in full, and your income
              rises and falls in line with the dividends and interest payments your investments
              generate.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              A well-diversified portfolio of global equities and bonds might typically yield
              between 3% and 4% per year. For someone with a £400,000 drawdown pot, this would
              produce between £12,000 and £16,000 per year in natural income without touching the
              capital. The advantage of this approach is its simplicity and sustainability. The
              disadvantage is that income will fluctuate, companies can cut dividends during
              recessions, and the yield may not be sufficient to meet your income needs, especially
              if you have a smaller pot. The natural yield approach works best for people who have
              other income sources, such as a state pension or defined benefit pension, and who
              view their drawdown pot primarily as a supplement rather than their main income.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              The Bucket Strategy
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The bucket strategy is a popular approach that divides your pension pot into three
              separate segments, or &#34;buckets,&#34; based on when you will need the money. The
              first bucket holds one to three years of income needs in cash or near-cash
              investments such as money market funds. This provides immediate security and means you
              never have to sell equity investments during a market downturn to fund your living
              expenses. The second bucket holds three to ten years of income needs in lower-risk
              assets such as short-dated bonds, investment-grade corporate bonds, and multi-asset
              income funds. This provides a medium-term buffer and generates modest returns while
              protecting against significant capital loss. The third bucket holds the remainder of
              your pot in growth-oriented assets such as global equity funds, with the aim of
              generating long-term returns that keep pace with or exceed inflation.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              The beauty of the bucket strategy is psychological as much as financial. Knowing that
              you have several years of income set aside in cash and low-risk assets makes it much
              easier to stay calm during stock market volatility, which reduces the temptation to
              panic-sell at the worst possible time. Periodically, you refill the shorter-term
              buckets from the longer-term ones, ideally when markets are performing well. This
              systematic approach ensures that you are always selling from the growth bucket at
              favourable times rather than being forced to sell during a downturn.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-10 mb-4">
              Reviewing Your Plan Annually
            </h3>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              No drawdown plan should be set and forgotten. Your circumstances, the markets, tax
              rules, and your health will all change over time, and your plan needs to adapt
              accordingly. An annual review should cover several key areas. First, check your
              current withdrawal rate as a percentage of your remaining pot. If it has crept above
              4% to 5% due to poor market performance, you may need to reduce your withdrawals or
              your pot could deplete faster than planned. Second, review your investment performance
              against the assumptions you used when you set up the plan. If returns have been
              significantly lower than expected, your long-term projections need updating.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Third, review your asset allocation. As you age, your time horizon shortens, and it
              may be appropriate to gradually reduce your equity exposure and increase your
              allocation to bonds and cash. Fourth, check whether any tax thresholds or pension
              rules have changed that might affect your withdrawal strategy. Fifth, consider whether
              your income needs have changed. Many retirees find that their spending follows a
              &#34;smile&#34; pattern: higher in the early active years, lower in the quieter middle
              years, and higher again in later years when care costs may arise. Adjusting your
              withdrawals to match this pattern can significantly extend the life of your pot.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Use our{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                pension drawdown calculator
              </Link>{' '}
              as part of your annual review to re-run your projections with updated figures. By
              entering your current pot value, revised growth assumptions, and updated withdrawal
              amounts, you can quickly see whether your plan is still on track or whether
              adjustments are needed.
            </p>

            {/* Article 5 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>

              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[8].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[8].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[9].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[9].answer}
                  </div>
                </details>

                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-gray-900 dark:text-white font-medium">
                    {faqItems[11].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9662;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqItems[11].answer}
                  </div>
                </details>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Model Your Drawdown Plan
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our free pension drawdown calculator to see how long your pension pot could last
            under different withdrawal rates, growth assumptions, and retirement ages.
          </p>
          <Link
            href="/calculators/pension-drawdown"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-white px-6 py-3 text-base font-medium text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the Drawdown Calculator
          </Link>
        </div>
      </section>
    </div>
  )
}
