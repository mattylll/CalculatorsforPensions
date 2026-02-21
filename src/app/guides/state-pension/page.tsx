import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'State Pension Guide 2025/26 - Ages, NI Gaps, Deferral & More',
  description:
    'Complete UK State Pension guide for 2025/26. Learn about pension age, filling NI gaps, married couple rules, deferral rates, and new vs basic state pension. Full rate £230.25/week.',
  keywords: [
    'state pension',
    'UK state pension 2025',
    'state pension age',
    'NI gaps',
    'voluntary NI contributions',
    'state pension deferral',
    'new state pension',
    'basic state pension',
    'state pension married couples',
    'state pension forecast',
    'qualifying years',
    'Class 3 NI contributions',
  ],
  alternates: {
    canonical: 'https://calculatorsforpensions.com/guides/state-pension',
  },
  openGraph: {
    title: 'State Pension Guide 2025/26 - Ages, NI Gaps, Deferral & More',
    description:
      'Complete UK State Pension guide for 2025/26. Pension age schedule, NI gap filling, married couple rules, deferral, and new vs basic state pension explained.',
    url: 'https://calculatorsforpensions.com/guides/state-pension',
    type: 'article',
  },
}

const faqData = [
  {
    question: 'What is the current UK State Pension age in 2025?',
    answer:
      'The State Pension age is currently 66 for both men and women. It is scheduled to rise to 67 between May 2026 and March 2028, and then to 68 between 2044 and 2046 under current legislation. You can check your exact State Pension age on gov.uk using your date of birth.',
  },
  {
    question: 'How do I check my State Pension age?',
    answer:
      'You can check your State Pension age using the gov.uk State Pension age calculator at gov.uk/state-pension-age. You simply enter your date of birth and gender, and it tells you your exact State Pension age and the earliest date you can claim. You can also use our free State Pension calculator at calculatorsforpensions.com for a full pension forecast.',
  },
  {
    question: 'Will the State Pension age rise above 68?',
    answer:
      'The government periodically reviews State Pension age based on life expectancy data. Under current legislation, the rise to 68 is scheduled for 2044-2046. However, future reviews may accelerate or delay this timeline. The 2023 review confirmed the rise to 67 on schedule but deferred the decision on the rise to 68 for further review within the next parliament.',
  },
  {
    question: 'How much does it cost to buy voluntary NI contributions?',
    answer:
      'Class 3 voluntary National Insurance contributions cost £17.45 per week for the 2025/26 tax year. That works out to approximately £907.40 for a full qualifying year. Each additional qualifying year added can increase your State Pension by up to £6.85 per week (£356.20 per year), meaning you typically recoup the cost within around 2.5 years of receiving pension payments.',
  },
  {
    question: 'Is it worth filling NI gaps for State Pension?',
    answer:
      'In most cases, yes. Paying approximately £907.40 for a qualifying year can add up to £356.20 per year to your State Pension for life. You would recoup the cost in roughly 2.5 years, and the average person claims State Pension for around 20 years. However, it is not worth it if you already have 35 qualifying years, or if the gap relates to a year that would not increase your pension under the new State Pension calculation rules. Always check your State Pension forecast on gov.uk first.',
  },
  {
    question: 'What is the deadline for filling NI gaps?',
    answer:
      'You can normally fill NI gaps from the past 6 tax years. However, a special extended deadline has allowed people to fill gaps going back to April 2006. This extended deadline has been set at 5 April 2025, so it is critical to act quickly if you have older gaps to fill. After this date, you will only be able to fill gaps from the previous 6 tax years under normal rules.',
  },
  {
    question: 'Does my spouse get State Pension based on my record?',
    answer:
      'Under the new State Pension (for those reaching State Pension age from 6 April 2016 onwards), each person builds up their own pension entitlement independently. You cannot inherit or derive State Pension based on your spouse\'s record while they are alive. However, if your spouse passes away, you may be able to inherit a portion of their additional State Pension or protected payment. Under the old basic State Pension rules, a married person could claim up to 60% of their spouse\'s basic State Pension if they had an insufficient record of their own.',
  },
  {
    question: 'What happens to State Pension when a spouse dies?',
    answer:
      'Under the new State Pension system, you may inherit a share of your deceased spouse\'s or civil partner\'s additional State Pension or protected payment, which sits on top of the standard new State Pension amount. The exact amount depends on their National Insurance record and when they reached State Pension age. Under the old system, you could inherit up to 50% of the additional State Pension (SERPS/S2P). You should contact the Pension Service to find out exactly what you are entitled to.',
  },
  {
    question: 'How does divorce affect State Pension?',
    answer:
      'Upon divorce, the court can issue a pension sharing order that splits State Pension entitlement. Under the old system, a divorced person could substitute their ex-spouse\'s National Insurance record to calculate their basic State Pension if it gave a higher amount. Under the new State Pension, derived entitlement from an ex-spouse is more limited, but a pension sharing order from the court can still redirect a portion of the additional State Pension or protected payment. It is important to address pension rights during divorce proceedings.',
  },
  {
    question: 'How much extra do you get for deferring the State Pension?',
    answer:
      'Under the new State Pension rules, your pension increases by 1% for every 9 weeks you defer, which works out to approximately 5.8% per year. On the full new State Pension of £230.25 per week, deferring for one year would add roughly £13.35 per week (about £694 per year) to your pension for life. There is no lump sum option under the new State Pension system.',
  },
  {
    question: 'Is it worth deferring the State Pension?',
    answer:
      'It depends on your health, other income, and tax position. You would need to live approximately 17 years after your deferred start date to receive more in total than if you had claimed on time. If you are in good health and have other income to live on, deferral can be worthwhile. However, if you need the income or have health concerns, claiming immediately is usually better. You should also consider the tax implications, as the extra pension income may push you into a higher tax bracket.',
  },
  {
    question: 'Can I still get a State Pension lump sum for deferral?',
    answer:
      'The lump sum option was only available under the old basic State Pension rules for those who reached State Pension age before 6 April 2016. Under the new State Pension, there is no lump sum option. If you defer, you receive a higher weekly pension instead. The lump sum under the old system was paid as a taxable one-off payment calculated with interest.',
  },
  {
    question: 'What is the difference between the new State Pension and basic State Pension?',
    answer:
      'The new State Pension replaced the basic State Pension on 6 April 2016. If you reached State Pension age on or after that date, you are on the new system. The new State Pension is a single-tier flat-rate payment of £230.25 per week (2025/26), requiring 35 qualifying years for the full amount and a minimum of 10 years to get anything. The old system had a two-tier structure: a basic State Pension (up to £169.50/week in its final year) plus an additional State Pension (SERPS/S2P) based on earnings.',
  },
  {
    question: 'Which State Pension system applies to me?',
    answer:
      'If you reached State Pension age on or after 6 April 2016, the new State Pension applies to you. If you reached State Pension age before 6 April 2016, you are on the old basic State Pension plus additional State Pension system. For men, the dividing line is those born on or after 6 April 1951. For women, it is those born on or after 6 April 1953. You can check which system applies to you by looking up your State Pension age on gov.uk.',
  },
  {
    question: 'What is transitional protection for the new State Pension?',
    answer:
      'Transitional protection ensures that people who built up entitlement under the old system are not disadvantaged by the switch to the new State Pension. When the new system started on 6 April 2016, a "starting amount" was calculated for everyone by comparing what they would have received under the old rules versus the new rules, and the higher amount was used. If your starting amount was above the full new State Pension rate, the excess is paid as a "protected payment" on top of the standard amount. This means some people receive more than £230.25 per week.',
  },
]

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
      name: 'State Pension',
      item: 'https://calculatorsforpensions.com/guides/state-pension',
    },
  ],
}

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

export default function StatePensionGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Script
        id="state-pension-guide-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="state-pension-guide-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Guides
            </Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">State Pension</span>
          </nav>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            UK State Pension Guide 2025/26
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Everything you need to know about the UK State Pension, from checking your pension age
            and filling NI gaps to understanding deferral rules and married couple entitlements.
            Updated with 2025/26 rates and current DWP legislation.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            In this guide
          </h2>
          <nav className="grid sm:grid-cols-2 gap-3">
            <a
              href="#article-1"
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                1
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                How to Check Your State Pension Age in 2025
              </span>
            </a>
            <a
              href="#article-2"
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                2
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                How to Fill NI Gaps and Boost Your State Pension
              </span>
            </a>
            <a
              href="#article-3"
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                3
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                State Pension for Married Couples Explained
              </span>
            </a>
            <a
              href="#article-4"
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                4
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                How to Defer Your State Pension for Higher Payments
              </span>
            </a>
            <a
              href="#article-5"
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-medium text-gray-900 dark:text-white">
                5
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                New State Pension vs Basic State Pension Explained
              </span>
            </a>
          </nav>
        </div>
      </section>

      {/* Article 1 */}
      <section id="article-1" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            How to Check Your State Pension Age in 2025
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Your State Pension age determines the earliest date you can start claiming the UK
              State Pension. Getting this right is essential for retirement planning, since it
              affects how long you need to work, when you can access your pension income, and
              how your other retirement savings need to bridge any gap. As of 2025, the State
              Pension age is <strong className="text-gray-900 dark:text-white">66 for both men and women</strong>,
              but this is set to change in the coming years.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Current State Pension Age Schedule
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The UK State Pension age has undergone significant changes over the past decade.
              Historically, women could claim at 60 and men at 65. The Pensions Act 2011 and
              Pensions Act 2014 introduced a series of increases to equalise and then raise the
              age for everyone. Here is the current legislated schedule:
            </p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border border-gray-200 dark:border-gray-800 rounded-lg">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
                      Period
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
                      State Pension Age
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-800">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      Up to October 2020
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      65 (men) / rising to 65 (women)
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      Completed
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      October 2020 to present
                    </td>
                    <td className="p-3 text-gray-900 dark:text-white font-medium border-b border-gray-200 dark:border-gray-800">
                      66
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      Current
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      May 2026 to March 2028
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      Rising from 66 to 67
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800">
                      Legislated
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900">
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      2044 to 2046
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      Rising from 67 to 68
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">
                      Legislated (under review)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              How to Look Up Your Exact State Pension Age
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The simplest way to check your State Pension age is to use the official gov.uk
              State Pension age tool. You enter your date of birth and it calculates your exact
              pension age, including the specific date you become eligible. This is particularly
              important if your birthday falls within a transitional period, because the age
              increases are phased in gradually rather than all at once.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You should also request a State Pension forecast, which shows not just your
              pension age but your estimated weekly pension amount based on your current
              National Insurance record. You can get this online through your Government
              Gateway account, or by requesting form BR19 by post. Our{' '}
              <Link
                href="/calculators/state-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                State Pension calculator
              </Link>{' '}
              can also estimate your pension based on your NI years and planned future
              contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Recent Changes and Future Reviews
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The biggest recent change was the equalisation of the State Pension age between
              men and women, completed by November 2018, followed by the increase to 66 for
              everyone by October 2020. The WASPI (Women Against State Pension Inequality)
              campaign highlighted the impact on women born in the 1950s who had limited notice
              of these changes. The Parliamentary and Health Service Ombudsman found
              maladministration in how these changes were communicated, and compensation
              arrangements have been a significant political issue.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Looking ahead, the rise to 67 between May 2026 and March 2028 is confirmed in
              legislation and will proceed as planned. The subsequent rise to 68 was originally
              planned for 2037-2039 but was pushed back to 2044-2046 following the 2023
              government review of State Pension age. This review, required by law at least
              every 6 years, considers life expectancy projections and affordability. If life
              expectancy trends change, the timetable could be revised again. For anyone under
              50 today, it is reasonable to plan on the assumption that your State Pension age
              could be 68 or potentially higher.
            </p>

            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 my-8">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key takeaway
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Do not rely on assumptions about your State Pension age. Check it directly using
                the gov.uk tool or our{' '}
                <Link
                  href="/calculators/state-pension"
                  className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
                >
                  State Pension calculator
                </Link>
                , and revisit it regularly as legislation can change. Build a retirement plan
                that accounts for the possibility of your pension age increasing further.
              </p>
            </div>

            {/* Article 1 FAQs */}
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {faqData.slice(0, 3).map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-900 dark:text-white font-medium">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article 2 */}
      <section id="article-2" className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            How to Fill NI Gaps and Boost Your State Pension
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              Gaps in your National Insurance record can significantly reduce your State Pension.
              The full new State Pension of{' '}
              <strong className="text-gray-900 dark:text-white">£230.25 per week (£11,973 per year)</strong>{' '}
              requires 35 qualifying years of NI contributions, while a minimum of 10 qualifying
              years is needed to receive any State Pension at all. If you have fewer than 35
              qualifying years, filling gaps through voluntary NI contributions is one of the
              most cost-effective financial decisions you can make.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Understanding NI Gaps
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              A qualifying year is a tax year in which you have paid or been credited with
              enough National Insurance contributions. You build up qualifying years through
              employment (Class 1 NI contributions), self-employment (Class 2 contributions),
              or through NI credits received for activities like caring for a child under 12,
              claiming certain benefits, or being a registered carer. Gaps typically arise when
              you were not working, were working abroad, were self-employed with low earnings,
              or were earning below the lower earnings limit.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You can check your NI record online through your Personal Tax Account on gov.uk.
              It shows you each tax year, whether it is a qualifying year, and if not, why
              there is a gap. This is the essential first step before deciding whether to make
              voluntary contributions.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Class 3 Voluntary Contributions: Costs and Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Class 3 voluntary NI contributions cost{' '}
              <strong className="text-gray-900 dark:text-white">£17.45 per week</strong> for the
              2025/26 tax year, which works out to approximately £907.40 for a full year. You
              can pay for previous years at the rate that applied in that year, which may be
              lower. Each additional qualifying year you add can increase your State Pension by
              up to £6.85 per week, or approximately £356.20 per year.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The arithmetic is compelling: an investment of around £907 yields a return of
              approximately £356 every year for the rest of your life once you start claiming.
              That means you recoup the cost in roughly 2.5 years. Given that the average
              person claims State Pension for around 20 years, the total return on that single
              year&apos;s payment could exceed £7,000. This is why financial advisers almost
              universally recommend filling NI gaps as a priority.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Important Deadlines
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Under normal rules, you can fill NI gaps from the past 6 tax years only. However,
              a special temporary extension has allowed people to fill gaps going all the way
              back to April 2006. This extended deadline was originally set for April 2023 but
              has been extended to{' '}
              <strong className="text-gray-900 dark:text-white">5 April 2025</strong>. If you
              have gaps from before 2018/19, you need to act before this deadline passes, as
              after that point those older years will be permanently lost.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To fill gaps, you can pay online through your Government Gateway account or by
              calling the Future Pension Centre on 0800 731 0175. For older tax years, you
              should call HMRC&apos;s National Insurance helpline on 0300 200 3500 to confirm the
              exact cost and ensure the payment will actually increase your pension. In some
              cases, a year may already count due to NI credits you are unaware of, or the gap
              may relate to a contracted-out period that would not increase your new State
              Pension.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              When It Is Not Worth Filling Gaps
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Filling NI gaps is not always beneficial. You should not pay voluntary
              contributions if you already have 35 qualifying years (or will reach 35 through
              future employment before you retire). You should also be cautious if the gaps
              relate to years when you were contracted out of the additional State Pension, as
              these may not increase your pension under the new system&apos;s calculation.
              Always get a State Pension forecast first, and if in doubt, speak to the Future
              Pension Centre before making any payments.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Use our{' '}
              <Link
                href="/calculators/state-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                State Pension calculator
              </Link>{' '}
              to see how filling gaps could affect your estimated pension amount. You can
              adjust the number of qualifying years and NI gaps to compare different scenarios.
            </p>

            <div className="p-6 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 my-8">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key takeaway
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                At £17.45 per week for a qualifying year that adds up to £356 per year to your
                pension for life, voluntary NI contributions offer an exceptional return. But
                check your forecast first and be aware of the 5 April 2025 deadline for filling
                older gaps.
              </p>
            </div>

            {/* Article 2 FAQs */}
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {faqData.slice(3, 6).map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-900 dark:text-white font-medium">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article 3 */}
      <section id="article-3" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            State Pension for Married Couples Explained
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              One of the most common misconceptions about the UK State Pension is that married
              couples automatically share a pension or that one spouse can claim based on the
              other&apos;s record. The reality is more nuanced and depends heavily on whether you
              fall under the new State Pension system (from 6 April 2016) or the old basic State
              Pension system. Understanding the rules is essential for couples planning their
              retirement income together, particularly if one partner has a limited NI record.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              New State Pension: Individual Entitlement
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Under the new State Pension, which applies to anyone who reached State Pension age
              on or after 6 April 2016, each person builds up their pension entitlement entirely
              on their own National Insurance record. There is no mechanism for one spouse to
              claim based on the other&apos;s contributions while both are alive. The full new
              State Pension is{' '}
              <strong className="text-gray-900 dark:text-white">£230.25 per week (£11,973 per year)</strong>{' '}
              in 2025/26, requiring 35 qualifying years.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This means that if one partner was a stay-at-home parent or carer and has fewer
              than 10 qualifying years, they will not receive any State Pension at all, regardless
              of their spouse&apos;s record. However, it is worth checking whether they qualify
              for NI credits. Parents and carers who receive Child Benefit for a child under 12,
              or who are registered carers, receive NI credits that count towards their State
              Pension. Additionally, a working grandparent can transfer their NI credits from
              Child Benefit to a grandparent who provides childcare, through the Specified Adult
              Childcare Credits scheme.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Old Basic State Pension: Derived Entitlement
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Under the old system (for those who reached State Pension age before 6 April
              2016), a married person could claim a pension based on their spouse&apos;s NI
              record. Specifically, a married person with an insufficient record of their own
              could receive up to 60% of their spouse&apos;s basic State Pension. This was known
              as a &quot;Category B&quot; pension. This option is not available under the new
              system, though people who were already receiving it continue to do so.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Inherited State Pension on Death of a Spouse
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If your spouse or civil partner passes away, you may be able to inherit some of
              their State Pension entitlement. Under the new State Pension, you can inherit a
              portion of their &quot;protected payment&quot; (the amount above the standard full
              new State Pension that they had built up under the old additional State Pension
              rules before 2016). You cannot inherit any of the standard new State Pension
              amount itself.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Under the old system, the surviving spouse could inherit up to 50% of the
              deceased&apos;s additional State Pension (SERPS or State Second Pension). The exact
              percentage depends on when the deceased reached or would have reached State
              Pension age, with the percentage reducing from 100% for those reaching pension age
              before October 2002 down to 50% for those reaching pension age from October 2010
              onwards. You should contact the Pension Service on 0800 731 0469 to understand
              your specific entitlement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Impact of Divorce on State Pension
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Divorce can significantly affect State Pension entitlement. During divorce
              proceedings, the court can issue a pension sharing order that substitutes or
              splits NI contributions between the parties. Under the old system, a divorced
              person could use their ex-spouse&apos;s NI record to calculate their basic State
              Pension up to the date of divorce (known as &quot;substitution&quot;). Under the
              new system, the calculation is more complex, but a pension sharing order can still
              direct a portion of additional State Pension or protected payment from one
              ex-spouse to another.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              It is critically important to address State Pension rights as part of any divorce
              settlement. Many people overlook this, focusing only on private and workplace
              pensions. A family law solicitor or financial adviser specialising in divorce can
              help ensure that State Pension entitlement is properly accounted for.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Couples approaching retirement should both check their individual State Pension
              forecasts. Use our{' '}
              <Link
                href="/calculators/state-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                State Pension calculator
              </Link>{' '}
              to estimate each person&apos;s entitlement, and consider whether filling NI gaps
              for the lower-earning partner would be a good investment. For broader retirement
              planning, our{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                pension drawdown calculator
              </Link>{' '}
              can help model your combined retirement income.
            </p>

            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 my-8">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key takeaway
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Under the new State Pension, each person earns their own pension independently.
                There is no spousal entitlement while both partners are alive. Ensure both
                partners build up their own NI record, claim NI credits where eligible, and
                address pension rights explicitly during any divorce proceedings.
              </p>
            </div>

            {/* Article 3 FAQs */}
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {faqData.slice(6, 9).map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-900 dark:text-white font-medium">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article 4 */}
      <section id="article-4" className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            How to Defer Your State Pension for Higher Payments
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              You do not have to claim your State Pension as soon as you reach State Pension age.
              Deferring your pension means you delay claiming it, and in return you receive a
              higher weekly amount when you do eventually start. Under the new State Pension rules,
              your pension increases by{' '}
              <strong className="text-gray-900 dark:text-white">1% for every 9 weeks you defer</strong>,
              which works out to approximately 5.8% per year. On the full new State Pension of
              £230.25 per week, that equates to roughly £13.35 extra per week (about £694 per
              year) for each year of deferral.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              How Deferral Works in Practice
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Deferral happens automatically if you simply do not claim your State Pension. You
              do not need to apply to defer or tell anyone &mdash; just do not make a claim when
              you reach State Pension age. When you later decide to claim, the DWP will
              calculate your increased pension based on the total number of weeks you deferred.
              The increase is paid on top of your standard pension for the rest of your life.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You need to defer for a minimum of 9 weeks to get any increase. There is no
              maximum deferral period, so in theory you could defer for several years. However,
              the longer you defer, the longer it takes to break even on the income you missed
              while not claiming. This is the central trade-off of deferral.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Break-Even Calculation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The key question is: how long do you need to live after starting your deferred
              pension to end up better off than if you had claimed on time? For each year you
              defer, you miss out on £11,973 (the full annual State Pension for 2025/26) but
              gain approximately £694 per year for life once you start claiming. Dividing the
              missed income by the annual gain gives a break-even period of roughly 17 years.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This means if you defer for one year at age 66, you need to live to approximately
              age 84 to break even (66 + 1 year deferral + 17 years). According to ONS life
              expectancy data, a 66-year-old man in the UK has a life expectancy of around
              84.5 years, and a 66-year-old woman around 87 years. So for someone in average
              health, deferral for one year is roughly break-even for men and modestly
              profitable for women. If you have above-average health or longevity in your
              family, deferral becomes more attractive.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              When Deferral Makes Sense
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Deferral is most beneficial if you are still working and do not need the pension
              income, particularly if claiming would push you into a higher income tax bracket.
              If you are a higher-rate taxpayer at 66 but expect to drop to basic rate at 68
              or 70, deferring until your income falls can save you tax. The State Pension is
              taxable income, so timing your claim to coincide with lower overall income is a
              legitimate tax planning strategy.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Deferral may also make sense if you have other retirement income sources that
              cover your expenses, such as{' '}
              <Link
                href="/calculators/workplace-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                workplace pensions
              </Link>
              ,{' '}
              <Link
                href="/calculators/sipp"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                SIPP drawdown
              </Link>
              , or other savings. In this case, deferral effectively acts as an inflation-linked
              annuity purchase at a favourable rate.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Lump Sum Option: Removed Under New Rules
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Under the old basic State Pension rules (for those who reached State Pension age
              before 6 April 2016), you could choose between a higher weekly pension or a
              taxable lump sum payment for the period you deferred. The lump sum was calculated
              based on the deferred pension plus interest at a rate of at least 2% above the
              Bank of England base rate.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              This lump sum option has been{' '}
              <strong className="text-gray-900 dark:text-white">completely removed</strong> under
              the new State Pension. If you reach State Pension age on or after 6 April 2016,
              your only option when deferring is a higher weekly pension. There is no lump sum
              alternative. Additionally, the old system offered a more generous deferral rate of
              approximately 10.4% per year, compared to 5.8% under the new system. This
              significant reduction means deferral is less attractive than it was under the old
              rules.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Impact on Other Benefits
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you receive means-tested benefits such as Pension Credit, Housing Benefit, or
              Council Tax Reduction, deferring your State Pension may not be worthwhile. The
              deferred pension may be treated as &quot;notional income&quot; for benefit
              calculations, meaning your benefits could be reduced even though you are not
              actually receiving the pension. Similarly, if you are on a low income and would
              qualify for Pension Credit, claiming your State Pension immediately is almost
              always the better option.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              To model the impact of deferral on your retirement income, try our{' '}
              <Link
                href="/calculators/state-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                State Pension calculator
              </Link>{' '}
              and{' '}
              <Link
                href="/calculators/tax-relief"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                tax relief calculator
              </Link>{' '}
              to understand the tax implications.
            </p>

            <div className="p-6 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 my-8">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key takeaway
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deferral increases your State Pension by about 5.8% per year, but you need to
                live roughly 17 years after starting your deferred pension to break even. It
                works best for people who are still earning, have other income, and are in good
                health. There is no lump sum option under the new State Pension.
              </p>
            </div>

            {/* Article 4 FAQs */}
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {faqData.slice(9, 12).map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-900 dark:text-white font-medium">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article 5 */}
      <section id="article-5" className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            New State Pension vs Basic State Pension Explained
          </h2>

          <div className="prose prose-gray dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The UK State Pension underwent its biggest structural change in decades on 6 April
              2016, when the new State Pension replaced the old two-tier system of basic State
              Pension plus additional State Pension (SERPS/S2P). Understanding which system
              applies to you, how the transition works, and what it means for your retirement
              income is crucial. The system you fall under depends entirely on when you reach
              State Pension age, not when you start paying National Insurance.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Old System: Basic State Pension + Additional State Pension
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The old system had two components. The basic State Pension was a flat-rate payment
              based on your NI record, requiring 30 qualifying years for the full amount (which
              was £134.25 per week in its final year of 2015/16). On top of this, you could
              build up an additional State Pension based on your earnings and employment
              history.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The additional State Pension went through several iterations: the State Earnings
              Related Pension Scheme (SERPS) from 1978 to 2002, then the State Second Pension
              (S2P) from 2002 to 2016. Your additional State Pension was determined by your
              earnings above the lower earnings limit, and higher earners built up more. Many
              employers chose to &quot;contract out&quot; of the additional State Pension,
              meaning employees paid lower NI contributions but did not build up additional
              State Pension &mdash; instead receiving a private pension that was supposed to
              replace it.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The New State Pension: A Simpler Single Tier
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The new State Pension, introduced by the Pensions Act 2014, is a single-tier
              flat-rate pension. The full amount for 2025/26 is{' '}
              <strong className="text-gray-900 dark:text-white">£230.25 per week (£11,973 per year)</strong>.
              You need{' '}
              <strong className="text-gray-900 dark:text-white">35 qualifying years</strong> of
              NI contributions to receive the full amount, and a minimum of{' '}
              <strong className="text-gray-900 dark:text-white">10 qualifying years</strong> to
              receive anything at all. If you have between 10 and 35 years, your pension is
              calculated proportionally.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The new system is deliberately simpler: there is no additional State Pension, no
              contracting out (which was abolished), and the calculation is straightforward.
              Each qualifying year adds 1/35th of the full rate to your pension. However, for
              people who had already built up entitlement under the old system before April
              2016, the transition is more complex.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Transitional Protection: How the Switchover Works
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              When the new State Pension started on 6 April 2016, the DWP calculated a
              &quot;starting amount&quot; for everyone who had already been paying NI. This
              starting amount was the higher of two calculations: what you would have received
              under the old rules (basic State Pension plus additional State Pension) versus
              what you would receive under the new rules (based on qualifying years at the
              new rate).
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If your starting amount was <em>lower</em> than the full new State Pension, you
              can build it up to the full amount by adding more qualifying years after April
              2016. If your starting amount was <em>higher</em> than the full new State Pension
              (typically because you had built up significant additional State Pension under the
              old system), the excess is preserved as a &quot;protected payment.&quot; This
              protected payment sits on top of the full new State Pension rate, meaning you can
              receive more than £230.25 per week. The protected payment is increased each year
              by the Consumer Prices Index (CPI), while the main new State Pension is
              increased by the triple lock (the highest of earnings growth, CPI, or 2.5%).
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Contracted-Out Deduction
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you were ever &quot;contracted out&quot; of the additional State Pension
              (common for many public sector workers and employees of large companies with
              defined benefit schemes), your starting amount under the new State Pension will
              include a deduction. This Contracted Out Pension Equivalent (COPE) reflects the
              additional State Pension you gave up by being contracted out. It does not mean
              you have lost out overall &mdash; you should be receiving a corresponding benefit
              from the private or occupational pension that contracted you out. However, it can
              mean your new State Pension is lower than the headline £230.25 per week, which
              surprises many people.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              Which System Applies to You?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The determining factor is when you reach State Pension age, not when you were
              born or when you started working:
            </p>
            <ul className="space-y-2 my-4">
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-white font-medium mt-0.5">&bull;</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">Old system:</strong> You
                  reached State Pension age before 6 April 2016. For men, this means born
                  before 6 April 1951. For women, born before 6 April 1953.
                </span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                <span className="text-gray-900 dark:text-white font-medium mt-0.5">&bull;</span>
                <span>
                  <strong className="text-gray-900 dark:text-white">New system:</strong> You
                  reach State Pension age on or after 6 April 2016. For men, born on or after
                  6 April 1951. For women, born on or after 6 April 1953.
                </span>
              </li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              If you are unsure, the easiest approach is to check your State Pension forecast on
              gov.uk, which will tell you exactly what you are expected to receive and under
              which system. Our{' '}
              <Link
                href="/calculators/state-pension"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                State Pension calculator
              </Link>{' '}
              also factors in whether you are on the new or old system based on your date of
              birth.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
              The Triple Lock and Annual Increases
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Both the new State Pension and the basic State Pension (for those already claiming
              under the old system) are protected by the &quot;triple lock.&quot; This means
              the pension increases each year by the highest of average earnings growth, CPI
              inflation, or 2.5%. The triple lock has been politically contentious but remains
              government policy. It ensures that the State Pension maintains its purchasing
              power over time and grows at least in line with wages. The protected payment
              element of the new State Pension, however, only increases by CPI, not the triple
              lock.
            </p>

            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Whether you are on the old or new system, the State Pension forms the foundation
              of most people&apos;s retirement income. To understand how it fits with your other
              retirement savings, explore our{' '}
              <Link
                href="/calculators/annuity"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                annuity calculator
              </Link>{' '}
              and{' '}
              <Link
                href="/calculators/pension-drawdown"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                pension drawdown calculator
              </Link>{' '}
              to model your total retirement income.
            </p>

            <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 my-8">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key takeaway
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                The new State Pension is simpler but can be affected by contracting out and
                transitional calculations. Always check your personal forecast on gov.uk to see
                your actual figure. The full new State Pension of £230.25/week requires 35
                qualifying years, with a minimum of 10 years needed for any entitlement.
              </p>
            </div>

            {/* Article 5 FAQs */}
            <div className="mt-10 space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h3>
              {faqData.slice(12, 15).map((faq, index) => (
                <details
                  key={index}
                  className="group border border-gray-200 dark:border-gray-800 rounded-lg"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 text-gray-900 dark:text-white font-medium">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform">
                      &#9662;
                    </span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Calculate Your State Pension
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Use our free calculator to estimate your State Pension based on your NI record,
            planned contributions, and personal circumstances. Updated for 2025/26 rates.
          </p>
          <Link
            href="/calculators/state-pension"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium transition-colors"
          >
            Open State Pension Calculator
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              <strong className="text-gray-900 dark:text-white">Disclaimer:</strong> This guide
              is for informational purposes only and does not constitute financial advice. State
              Pension rules and rates are set by the UK government and can change. The figures
              quoted (£230.25/week full new State Pension, £17.45/week Class 3 NI contributions)
              are for the 2025/26 tax year. Always verify your personal entitlement through your{' '}
              <a
                href="https://www.gov.uk/check-state-pension"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline underline-offset-4 hover:no-underline"
              >
                gov.uk State Pension forecast
              </a>
              . For personalised advice, consult a qualified financial adviser regulated by the
              Financial Conduct Authority. Content last reviewed February 2025.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
