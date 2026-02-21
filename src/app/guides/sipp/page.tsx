import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'SIPP Guide: Self-Invested Personal Pensions Explained (2025/26)',
  description:
    'Complete UK SIPP guide covering how SIPPs work, investment strategies, fees, tax relief, annual allowance, and pension transfers. Updated for the 2025/26 tax year with current allowances and rates.',
  keywords:
    'SIPP, self-invested personal pension, SIPP guide, SIPP fees, SIPP tax relief, SIPP investment, pension transfer, SIPP annual allowance, SIPP calculator, UK pension',
  alternates: { canonical: '/guides/sipp' },
  openGraph: {
    title: 'SIPP Guide: Self-Invested Personal Pensions Explained (2025/26)',
    description:
      'Everything you need to know about SIPPs in one comprehensive guide. Investment strategies, fees, tax relief, annual allowance, and how to transfer your pension.',
    url: 'https://calculatorsforpensions.com/guides/sipp',
    type: 'article',
  },
}

const faqData = [
  {
    question: 'What is the difference between a SIPP and a standard personal pension?',
    answer:
      'A SIPP (Self-Invested Personal Pension) gives you full control over your investment choices, allowing you to select from a wide range of assets including individual shares, investment trusts, ETFs, commercial property, and thousands of funds. A standard personal pension typically limits you to a small selection of funds chosen by the provider. SIPPs are best suited for people who want hands-on control over their retirement investments, while standard personal pensions suit those who prefer a simpler, more managed approach.',
  },
  {
    question: 'Can I have a SIPP and a workplace pension at the same time?',
    answer:
      'Yes, you can absolutely hold both a SIPP and a workplace pension simultaneously. Many people use a workplace pension to capture their employer contributions and then use a SIPP for additional personal contributions or to consolidate old pensions. Your combined contributions across all pension schemes count towards your annual allowance of £60,000 for the 2025/26 tax year. Having both can be a smart strategy to maximise employer matching while retaining investment flexibility through your SIPP.',
  },
  {
    question: 'Who should consider opening a SIPP?',
    answer:
      'SIPPs are particularly suitable for self-employed individuals who have no employer pension, higher earners who want to maximise tax-efficient investing, experienced investors who want control over asset allocation, and anyone who wants to consolidate multiple old pension pots into one account. If you are comfortable making your own investment decisions and want access to a broader range of investments than a standard pension offers, a SIPP could be a good fit.',
  },
  {
    question: 'What investments can I hold in a SIPP for beginners?',
    answer:
      'Beginners can start with low-cost index funds or exchange-traded funds (ETFs) that track broad market indices such as the FTSE All-World or S&P 500. A simple portfolio might consist of a global equity index fund combined with a bond fund. Many SIPP providers also offer ready-made portfolios or multi-asset funds that automatically diversify across asset classes and rebalance over time, making them an excellent starting point for new investors.',
  },
  {
    question: 'Should I choose index funds or actively managed funds in my SIPP?',
    answer:
      'For most investors, low-cost index funds are the better choice. Research consistently shows that the majority of actively managed funds underperform their benchmark index over the long term, particularly after fees are deducted. Index funds typically charge 0.05% to 0.25% per year, compared to 0.75% to 1.5% for active funds. Over a 30-year investment period, this fee difference can reduce your final pension pot by tens of thousands of pounds. However, some investors may choose a blend of both approaches.',
  },
  {
    question: 'How do I know if my SIPP fees are too high?',
    answer:
      'A competitive SIPP platform fee in 2025 is between 0.15% and 0.35% of your portfolio value per year, though some providers charge a flat annual fee instead. Your total annual cost, including platform fee and fund charges, should ideally be below 0.50% for a passive index fund portfolio. If your total expense ratio exceeds 1.0%, you are likely paying more than necessary. Use our SIPP calculator to model how different fee levels affect your pension pot over time.',
  },
  {
    question: 'What is the total expense ratio (TER) of a SIPP?',
    answer:
      'The total expense ratio (TER) combines all the ongoing costs of holding investments within your SIPP. It includes the platform fee charged by your SIPP provider, the ongoing charges figure (OCF) of each fund you hold, and any additional costs such as transaction charges within funds. For example, if your platform charges 0.25% and your average fund OCF is 0.15%, your TER would be approximately 0.40%. The TER does not include one-off dealing charges for buying and selling individual shares or ETFs.',
  },
  {
    question: 'How does pension tax relief work with a SIPP?',
    answer:
      'When you contribute to a SIPP, the government adds basic-rate tax relief of 20% automatically. This means a £100 contribution only costs you £80, with £20 added by HMRC. If you are a higher-rate taxpayer at 40%, you can claim an additional 20% back through your self-assessment tax return, making the true cost just £60. Additional-rate taxpayers at 45% can claim 25% extra, reducing the cost to £55. The annual allowance for tax-relievable contributions is £60,000 for the 2025/26 tax year.',
  },
  {
    question: 'What is the tapered annual allowance and does it affect my SIPP?',
    answer:
      'The tapered annual allowance reduces the standard £60,000 annual allowance for individuals with an adjusted income above £260,000. For every £2 of adjusted income above this threshold, the annual allowance is reduced by £1, down to a minimum of £10,000. This means anyone with an adjusted income of £360,000 or more has an annual allowance of just £10,000. The taper applies to total pension contributions across all schemes, including your SIPP, workplace pension, and any employer contributions.',
  },
  {
    question: 'Can I carry forward unused pension annual allowance to my SIPP?',
    answer:
      'Yes, the carry forward rule allows you to use any unused annual allowance from the previous three tax years in addition to the current year allowance. To use carry forward, you must have been a member of a registered pension scheme in the years you want to carry forward from. For example, in 2025/26, you could potentially contribute up to £240,000 if you had unused allowance from 2022/23, 2023/24, and 2024/25. Carry forward is especially useful for people with fluctuating income, such as the self-employed or those receiving bonuses.',
  },
  {
    question: 'When should I transfer my pension to a SIPP?',
    answer:
      'Transferring to a SIPP can be worthwhile if you want access to a wider range of investments, your current pension charges high fees, you want to consolidate multiple old pots into one place, or you want greater control over your retirement savings. However, you should be cautious about transferring if your current scheme offers valuable guarantees such as a guaranteed annuity rate, if exit penalties apply, or if you have a defined benefit (final salary) pension worth more than £30,000, in which case you must take regulated financial advice before transferring.',
  },
  {
    question: 'Is it safe to transfer a defined benefit pension to a SIPP?',
    answer:
      'Transferring a defined benefit (DB) pension to a SIPP is one of the most significant financial decisions you can make and is rarely advisable. DB pensions provide a guaranteed income for life, linked to your salary, which is extremely valuable. If your DB pension has a transfer value exceeding £30,000, you are legally required to take advice from an FCA-regulated financial adviser before transferring. In most cases, the guaranteed income from a DB scheme outweighs the flexibility of a SIPP. Only in specific circumstances, such as serious ill health or very particular financial planning needs, might a transfer be appropriate.',
  },
  {
    question: 'How long does a pension transfer to a SIPP take?',
    answer:
      'A pension transfer to a SIPP typically takes between four and eight weeks, although it can sometimes take longer depending on the complexity of the transfer and the responsiveness of your existing provider. Cash transfers, where your old pension is sold to cash before transferring, tend to be quicker than in-specie transfers where the actual investments are moved across. During the transfer period, your money may be out of the market, which is known as being "out of market" risk. Some SIPP providers offer to manage the transfer process on your behalf to minimise delays.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://calculatorsforpensions.com' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://calculatorsforpensions.com/guides' },
    { '@type': 'ListItem', position: 3, name: 'SIPP', item: 'https://calculatorsforpensions.com/guides/sipp' },
  ],
}

export default function SIPPGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="sipp-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="sipp-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-gray-200 dark:border-gray-800">
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
            <li className="text-gray-900 dark:text-white font-medium">SIPP</li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            SIPP Guide: Self-Invested Personal Pensions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Everything you need to know about SIPPs in one place. From how they work and what you
            can invest in, through to fees, tax relief, and pension transfers. Updated for the
            2025/26 tax year.
          </p>
          <div className="mt-8">
            <Link
              href="/calculators/sipp"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Try the SIPP Calculator
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">In This Guide</h2>
          <ol className="space-y-2 list-decimal list-inside">
            <li>
              <a href="#article-1" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                What Is a SIPP and How Does It Work?
              </a>
            </li>
            <li>
              <a href="#article-2" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                SIPP Investment Strategies for Beginners
              </a>
            </li>
            <li>
              <a href="#article-3" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                SIPP Fees Explained: What You're Really Paying
              </a>
            </li>
            <li>
              <a href="#article-4" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                SIPP Annual Allowance and Tax Relief Guide
              </a>
            </li>
            <li>
              <a href="#article-5" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                How to Transfer Your Pension to a SIPP
              </a>
            </li>
          </ol>
        </div>
      </nav>

      {/* Article 1 */}
      <section id="article-1" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            What Is a SIPP and How Does It Work?
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              A Self-Invested Personal Pension (SIPP) is a type of UK pension that gives you full
              control over how your retirement savings are invested. Unlike a standard personal
              pension where the provider selects a limited range of funds for you, a SIPP allows you
              to choose from a vast array of investment options including individual company shares,
              government and corporate bonds, exchange-traded funds (ETFs), investment trusts,
              commercial property, and thousands of unit trusts and open-ended investment companies
              (OEICs). SIPPs were introduced in 1989 and have grown significantly in popularity as
              more people seek greater flexibility and transparency in their pension investments.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              How a SIPP Differs from a Workplace Pension
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The most important distinction between a SIPP and a workplace pension is investment
              choice. A workplace pension, set up by your employer under auto-enrolment rules,
              typically offers a default fund and perhaps a dozen alternative options. Your employer
              contributes alongside you, with a minimum combined contribution of 8% of qualifying
              earnings under current auto-enrolment rules. A SIPP, by contrast, does not come with
              employer contributions unless your employer specifically agrees to pay into it. However,
              it compensates with dramatically wider investment choice, often providing access to
              tens of thousands of funds, individual equities across global stock exchanges, and
              alternative assets. Many savvy savers use both: they contribute enough to their
              workplace pension to capture the full employer match, then direct additional savings
              into a SIPP for greater investment flexibility and control.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Who Is a SIPP Best Suited For?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              SIPPs are particularly well-suited for self-employed individuals who have no access to
              a workplace pension, higher earners looking to maximise their pension tax relief up to
              the £60,000 annual allowance, experienced investors who want direct control over their
              asset allocation and stock selection, and anyone who wants to consolidate multiple old
              pension pots from previous employers into a single, manageable account. They are also
              popular with people approaching retirement who want to use flexi-access drawdown to
              take income from their pension rather than purchasing an annuity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Key Benefits of a SIPP
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The primary benefits of opening a SIPP include tax relief on contributions at your
              marginal rate (20%, 40%, or 45%), a 25% tax-free lump sum when you access your pension
              from age 55 (rising to 57 in 2028), full control over your investment choices and
              strategy, the ability to pass on your pension tax-efficiently to beneficiaries outside
              your estate for inheritance tax purposes, and flexible access options at retirement
              including drawdown and lump sum withdrawals. SIPPs also offer transparency, as you can
              see exactly what you are invested in and what fees you are paying at all times. For
              those who want to take an active role in their retirement planning, a SIPP provides
              the tools and flexibility to build a truly personalised pension portfolio. Use our{' '}
              <Link href="/calculators/sipp" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                SIPP calculator
              </Link>{' '}
              to see how your contributions could grow over time.
            </p>

            {/* Article 1 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[0].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[0].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[1].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[1].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[2].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[2].answer}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 2 */}
      <section id="article-2" className="py-16 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            SIPP Investment Strategies for Beginners
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Opening a SIPP is the easy part. The real challenge for many new investors is deciding
              what to actually invest in. With thousands of funds, shares, and other assets available,
              it can feel overwhelming. The good news is that building a solid SIPP investment
              strategy does not require expert knowledge or constant attention. By understanding a
              few core principles, diversification, asset allocation, cost management, and
              time-appropriate risk, you can construct a portfolio that has the potential to grow
              steadily over decades while weathering the inevitable ups and downs of financial
              markets.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              The Importance of Diversification
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Diversification is the practice of spreading your investments across different asset
              classes, geographies, and sectors to reduce the impact of any single investment
              performing poorly. Rather than putting all your pension savings into a handful of UK
              company shares, a diversified SIPP portfolio might include global equities across
              developed and emerging markets, UK and international government bonds, corporate bonds
              of varying credit quality, and perhaps a small allocation to property or commodities.
              When one part of your portfolio falls in value, other parts may hold steady or rise,
              smoothing your overall returns. A globally diversified equity fund, such as one
              tracking the FTSE All-World Index, provides exposure to over 4,000 companies across
              nearly 50 countries in a single holding, making diversification remarkably simple for
              beginners.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Asset Allocation by Age
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your asset allocation, the mix between equities (shares), bonds, and other assets,
              should generally reflect your time horizon and risk tolerance. A common rule of thumb
              is to subtract your age from 100 to determine your equity allocation. So a 30-year-old
              might hold 70% in equities and 30% in bonds, while a 60-year-old might hold 40% in
              equities and 60% in bonds. This approach gradually reduces risk as you approach
              retirement and have less time to recover from market downturns. However, this is only
              a starting point. If you are comfortable with volatility and have a longer time
              horizon, you might hold a higher equity allocation. Multi-asset funds or target-date
              retirement funds automatically adjust this balance over time, which can be ideal for
              those who prefer a hands-off approach to managing their SIPP investments.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Index Funds vs Actively Managed Funds
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              One of the most important decisions for SIPP investors is whether to use index
              (passive) funds or actively managed funds. Index funds aim to replicate the performance
              of a market index, such as the FTSE 100 or S&P 500, at the lowest possible cost.
              Their ongoing charges are typically between 0.05% and 0.25% per year. Actively managed
              funds employ professional fund managers who select individual investments with the goal
              of beating the market, charging fees typically between 0.75% and 1.50% per year.
              Academic research and real-world data consistently demonstrate that the vast majority
              of active funds fail to outperform their benchmark index over periods of ten years or
              more, once fees are accounted for. Over a 30-year pension saving period, the
              difference between paying 0.15% and 1.00% in annual fund charges on a £200,000
              portfolio can amount to more than £100,000 in lost growth. For most SIPP investors,
              particularly beginners, a portfolio of low-cost index funds offers the best
              combination of simplicity, diversification, and cost-effectiveness.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Managing Risk Over Time
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Risk management in a SIPP is not about avoiding risk entirely but about taking the
              right amount of risk for your circumstances. When you are decades away from retirement,
              you can afford to ride out short-term market falls because history shows that equity
              markets have always recovered and delivered strong long-term returns over periods of 20
              years or more. As you move closer to retirement, gradually shifting a portion of your
              portfolio from equities to bonds and cash reduces the chance of a sharp market fall
              depleting your pension just as you need to access it. This process is known as
              lifestyling or de-risking. Many SIPP providers offer model portfolios designed for
              different risk levels and life stages. Calculate how your chosen strategy could perform
              with our{' '}
              <Link href="/calculators/sipp" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                SIPP pension calculator
              </Link>
              .
            </p>

            {/* Article 2 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[3].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[3].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[4].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[4].answer}
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            SIPP Fees Explained: What You're Really Paying
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Fees are one of the most significant factors determining your final pension pot size,
              yet they are often overlooked or poorly understood. A seemingly small difference in
              annual charges can compound over decades to create a gap of tens of thousands of
              pounds. Understanding exactly what you are paying and why is essential for making
              informed decisions about where to hold your SIPP. The fee structures used by SIPP
              providers vary considerably, and what appears cheap at first glance may not be the
              most cost-effective option for your specific portfolio size and trading habits.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Platform Fees
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The platform fee, sometimes called the administration fee or custody fee, is the
              charge levied by your SIPP provider for holding your investments and providing the
              online platform you use to manage them. This fee is typically expressed as a percentage
              of your total portfolio value, commonly ranging from 0.15% to 0.45% per year. Some
              providers use a tiered structure where the percentage decreases as your portfolio
              grows. For example, a provider might charge 0.25% on the first £250,000, then 0.10%
              on the value above that threshold. Other providers, particularly those aimed at larger
              portfolios, charge a flat annual fee instead, such as £100 to £200 per year regardless
              of portfolio size. For smaller pension pots under £50,000, a percentage-based fee is
              usually cheaper. For larger pots above £100,000 to £200,000, a flat-fee provider
              often works out significantly cheaper. It is worth recalculating which structure suits
              you best as your pension pot grows over time.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Fund Charges and the Ongoing Charges Figure (OCF)
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              In addition to the platform fee, each fund you invest in carries its own ongoing
              charges figure (OCF), which covers the fund manager's costs of running the fund. For
              passive index tracker funds, the OCF is typically between 0.05% and 0.25% per year.
              For actively managed funds, the OCF is generally between 0.50% and 1.50% per year.
              The OCF is deducted from the fund's value automatically, which means you do not see
              it as a separate charge on your statement, but it does reduce your investment returns.
              It is important to check the OCF of every fund you hold, as these charges add directly
              to your platform fee to form your total annual cost. A portfolio of low-cost index
              funds with an average OCF of 0.12% combined with a platform fee of 0.25% gives a
              total annual cost of just 0.37%, which is competitive by industry standards.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Trading Fees and Dealing Costs
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you buy and sell individual shares, investment trusts, or ETFs within your SIPP,
              most providers charge a dealing fee for each transaction. This fee typically ranges
              from £5 to £12 per trade, although some providers offer a number of free trades per
              month or reduced rates for regular monthly investments. Regular investing, where you
              set up a standing order to buy a fixed pound amount of funds or shares each month,
              often comes with reduced or zero dealing charges and has the added benefit of
              pound-cost averaging, which smooths out the price you pay over time. If you invest
              primarily in unit trusts and OEICs (the most common type of fund), there is usually
              no dealing charge at all with most SIPP providers. The dealing cost is more relevant
              for investors who actively trade individual shares or ETFs. Frequent trading not only
              incurs higher dealing fees but also stamp duty of 0.5% on UK share purchases and
              potential foreign exchange charges of 0.5% to 1.5% on overseas share transactions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Understanding Total Expense Ratios
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Your total annual cost of investing through a SIPP is the sum of the platform fee,
              the average OCF of your funds, and any dealing charges spread across the year. This
              combined figure is sometimes referred to as the total expense ratio or total cost of
              ownership. For a well-constructed portfolio of index funds, your total annual cost
              should be achievable at between 0.20% and 0.50%. At the other end, a portfolio of
              actively managed funds on a percentage-fee platform can easily cost 1.50% to 2.00%
              per year or more. To illustrate the impact, consider two investors both starting with
              £50,000 and contributing £500 per month for 25 years at a gross return of 7% per year.
              The investor paying 0.35% in total fees would end up with approximately £545,000.
              The investor paying 1.50% in total fees would end up with approximately £450,000.
              That is a difference of nearly £95,000, purely from fees. Use our{' '}
              <Link href="/calculators/sipp" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                SIPP calculator
              </Link>{' '}
              to model how fees affect your projected pension pot.
            </p>

            {/* Article 3 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[5].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[5].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[6].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[6].answer}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article 4 */}
      <section id="article-4" className="py-16 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            SIPP Annual Allowance and Tax Relief Guide
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              One of the most compelling reasons to save into a SIPP is the generous tax relief
              offered by the UK government on pension contributions. Tax relief effectively means
              that the government tops up your pension contributions by returning the income tax you
              would have otherwise paid on that money. For higher-rate and additional-rate taxpayers,
              this makes a SIPP one of the most tax-efficient ways to save for retirement. However,
              there are annual limits on how much you can contribute while still receiving tax
              relief, and exceeding these limits can result in a tax charge. Understanding how the
              annual allowance works, including carry forward provisions and the tapered annual
              allowance for high earners, is essential for maximising your pension benefits.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              How Pension Tax Relief Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When you make a personal contribution to your SIPP, you contribute from your
              after-tax income. Your SIPP provider then claims basic-rate tax relief of 20% from
              HMRC and adds it to your pension pot. This means that for every £80 you contribute,
              HMRC adds £20, giving your pension a total contribution of £100. This process happens
              automatically and is known as relief at source. If you are a basic-rate taxpayer at
              20%, this is the full extent of your tax relief, and no further action is needed. The
              net cost to you of adding £100 to your pension is £80, representing an immediate 25%
              return on your money before any investment growth occurs. This fundamental advantage
              makes pension saving through a SIPP significantly more attractive than saving into a
              standard investment account or ISA, where no tax relief is available on contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Claiming Higher-Rate and Additional-Rate Tax Relief
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you pay income tax at the higher rate of 40% or the additional rate of 45%, you
              are entitled to extra tax relief beyond the 20% that is automatically added to your
              SIPP. However, this additional relief is not added to your pension pot. Instead, you
              must claim it through your annual self-assessment tax return, or by contacting HMRC
              to have your tax code adjusted. For a higher-rate taxpayer contributing a gross amount
              of £10,000 to their SIPP, the process works as follows: you pay £8,000, HMRC adds
              £2,000 in basic-rate relief to your SIPP, and you then claim a further £2,000 back
              through your tax return, either as a tax refund or a reduction in your tax bill. Your
              true net cost is therefore £6,000 for a £10,000 pension contribution. For an
              additional-rate taxpayer at 45%, the true cost is just £5,500. Many higher-rate
              taxpayers fail to claim this additional relief, effectively leaving money on the table.
              Check your eligibility using our{' '}
              <Link href="/calculators/tax-relief" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                pension tax relief calculator
              </Link>
              .
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              The Annual Allowance for 2025/26
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The annual allowance is the maximum total amount of pension contributions that can
              receive tax relief in a single tax year. For the 2025/26 tax year, the standard
              annual allowance is £60,000. This limit applies to the gross contribution (including
              the basic-rate tax relief added by HMRC) and covers all pension contributions you
              make across all schemes, including your SIPP, workplace pension, and any employer
              contributions. If you exceed the annual allowance, you will face an annual allowance
              charge at your marginal rate of income tax on the excess amount. For example, if you
              are a higher-rate taxpayer and you contribute £70,000 in gross pension contributions,
              you would face a 40% tax charge on the £10,000 excess, resulting in a £4,000 tax
              bill. Your annual allowance is also limited to 100% of your UK relevant earnings for
              the tax year. Non-earners can still contribute up to £3,600 gross per year (£2,880
              net) and receive basic-rate tax relief.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Carry Forward: Using Unused Allowance from Previous Years
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The carry forward rule is a valuable provision that allows you to make use of any
              unused annual allowance from the three previous tax years, in addition to your current
              year's allowance. To utilise carry forward, you must have been a member of a
              registered pension scheme during each of the years from which you wish to carry
              forward unused allowance. The current year's allowance is always used first, and then
              unused allowance is used from the earliest available year. For the 2025/26 tax year,
              you could potentially carry forward unused allowance from 2022/23, 2023/24, and
              2024/25. If, for instance, you contributed only £20,000 in each of those three years
              against annual allowances of £40,000 (2022/23) and £60,000 (2023/24 and 2024/25), you
              would have £120,000 of unused allowance available to carry forward, in addition to
              your current £60,000 allowance, giving a total potential contribution of £180,000. This
              is particularly useful for the self-employed with variable income or employees
              receiving large bonuses.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              The Tapered Annual Allowance for High Earners
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              High earners face an additional restriction on their annual allowance known as the
              tapered annual allowance. This applies to individuals whose adjusted income (broadly,
              total taxable income plus employer pension contributions) exceeds £260,000 per year.
              For every £2 of adjusted income above £260,000, the annual allowance is reduced by £1,
              down to a minimum annual allowance of £10,000. This means anyone with an adjusted
              income of £360,000 or more has an annual allowance capped at £10,000. The threshold
              income (broadly, total taxable income excluding pension contributions) must also exceed
              £200,000 for the taper to apply. If your threshold income is below £200,000, the taper
              does not affect you regardless of your adjusted income. The taper calculation can be
              complex, particularly if you receive employer pension contributions, bonuses, or
              benefits in kind, so high earners may benefit from professional financial advice to
              optimise their SIPP contributions.
            </p>

            {/* Article 4 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[7].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[7].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[8].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[8].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[9].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[9].answer}
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            How to Transfer Your Pension to a SIPP
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
              Consolidating old workplace pensions and personal pensions into a single SIPP is one
              of the most common reasons people open a self-invested personal pension. Over a
              working lifetime, it is easy to accumulate multiple pension pots from different
              employers, each with its own provider, fee structure, and investment options. Bringing
              these together into one SIPP can simplify your retirement planning, reduce your
              overall costs, give you better investment choices, and make it much easier to track
              your total pension wealth. However, pension transfers are not always straightforward,
              and there are important considerations to be aware of before you move your money.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              When Transferring to a SIPP Makes Sense
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A pension transfer to a SIPP is generally worthwhile in several scenarios. If you have
              multiple small pension pots scattered across different providers, consolidating them
              into one SIPP gives you a single view of your retirement savings, making it far easier
              to manage your asset allocation and track your progress towards your retirement goals.
              If your existing pension charges high fees, particularly if it is an older-style
              personal pension or stakeholder pension with annual management charges of 1% or more,
              transferring to a low-cost SIPP could save you thousands of pounds over the remaining
              years to retirement. If you want access to a broader range of investments than your
              current pension offers, a SIPP typically provides access to thousands more funds,
              individual shares, ETFs, and investment trusts. Finally, if you are approaching
              retirement and want to use flexi-access drawdown, a SIPP gives you the flexibility
              to take your 25% tax-free lump sum and draw income at a pace that suits you, rather
              than being forced to purchase an annuity.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Exit Penalties and Transfer Charges
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Before initiating a transfer, check whether your existing pension provider applies any
              exit penalties or transfer charges. Older-style pensions, particularly those set up
              before 2017, may have significant exit charges, sometimes as high as 5% to 10% of
              your fund value. Since April 2017, exit charges on pension plans have been capped at
              1% for pots that have not yet been accessed, and at zero for pots where benefits are
              already being taken. However, some plans may also have market value reductions (MVRs)
              on with-profits funds, which can reduce the transfer value when markets are falling.
              You may also lose valuable benefits by transferring, such as guaranteed annuity rates
              (GARs), which promise a fixed annuity rate that may be significantly higher than
              current market rates. Always request a full transfer value quotation from your existing
              provider, and check specifically whether any guarantees or protected benefits would be
              lost by transferring. The potential fee savings of a SIPP need to outweigh any exit
              penalties or lost guarantees.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              Defined Benefit Pension Transfers: A Critical Warning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you have a defined benefit (DB) pension, also known as a final salary pension, you
              should approach any transfer with extreme caution. A DB pension provides a guaranteed
              income for life based on your salary and years of service, increasing each year with
              inflation. This is an exceptionally valuable benefit that is almost impossible to
              replicate through a defined contribution arrangement like a SIPP. If your DB pension
              has a cash equivalent transfer value (CETV) exceeding £30,000, UK regulations require
              you to take advice from an FCA-regulated financial adviser before you can transfer.
              This requirement exists because the vast majority of DB pension holders are better
              off keeping their guaranteed income rather than transferring to a SIPP. The Financial
              Conduct Authority has found that a significant proportion of past DB transfers were
              unsuitable, meaning the individuals would have been better served by remaining in
              their DB scheme. Only in limited circumstances, such as serious ill health with
              reduced life expectancy, very specific estate planning needs, or where the sponsoring
              employer is at significant risk of insolvency, might a DB transfer be appropriate.
              Never transfer a DB pension without professional advice.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8">
              The Transfer Process: Step by Step
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The practical process of transferring a pension to a SIPP involves several steps.
              First, open your SIPP account with your chosen provider if you do not already have
              one. Second, complete a transfer request form through your new SIPP provider, providing
              details of the pension you wish to transfer including the scheme name, policy number,
              and approximate value. Third, your SIPP provider will contact your existing pension
              provider to request the transfer on your behalf. Fourth, your existing provider will
              send the transfer value, either as a cash amount or as an in-specie transfer where
              the actual investments are moved across without being sold first. Fifth, once the
              funds arrive in your SIPP, you can invest them according to your chosen strategy. The
              entire process typically takes between four and eight weeks, although complex transfers
              or those involving older pension schemes can take longer. During this period, your
              money may be uninvested, so it is worth being aware of the potential impact of being
              out of the market. Some providers offer to manage the entire process on your behalf
              and will keep you updated on progress. Once your transfer is complete, use our{' '}
              <Link href="/calculators/sipp" className="text-gray-900 dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">
                SIPP calculator
              </Link>{' '}
              to project how your consolidated pension could grow over time.
            </p>

            {/* Article 5 FAQs */}
            <div className="mt-10 space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[10].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[10].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[11].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[11].answer}
                  </div>
                </details>
                <details className="group border border-gray-200 dark:border-gray-800 rounded-lg">
                  <summary className="flex items-center justify-between p-4 cursor-pointer text-gray-900 dark:text-white font-medium">
                    {faqData[12].question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faqData[12].answer}
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Plan Your SIPP?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our free SIPP calculator to project your pension pot growth, model different
            contribution levels, and see the impact of fees on your retirement savings.
          </p>
          <Link
            href="/calculators/sipp"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            Open the SIPP Calculator
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
              href="/guides"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">All Pension Guides</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Browse our complete library of UK pension guides and articles.
              </p>
            </Link>
            <Link
              href="/calculators/tax-relief"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tax Relief Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Calculate how much pension tax relief you can claim at your income level.
              </p>
            </Link>
            <Link
              href="/calculators/pension-drawdown"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Drawdown Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Model your retirement income with flexi-access pension drawdown.
              </p>
            </Link>
            <Link
              href="/calculators/workplace-pension"
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Workplace Pension Calculator</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                See how your workplace pension compares and whether a SIPP could complement it.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
