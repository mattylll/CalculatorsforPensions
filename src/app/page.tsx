'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import CleanHeroSection from '@/components/home/CleanHeroSection'
import SimpleCalculatorCards from '@/components/home/SimpleCalculatorCards'
import SimpleTestimonials from '@/components/home/SimpleTestimonials'
import { useJourneyState } from '@/hooks/useJourneyState'

const faqs = [
  {
    question: 'What is the best pension calculator to use?',
    answer: 'Our tool includes state, workplace, and personal pension features, giving you a comprehensive retirement income forecast—helping you decide how much to save.',
  },
  {
    question: 'Is £28,000 a good pension for a single person?',
    answer: 'A £28,000 pension could meet many people\'s retirement needs, but it depends on your lifestyle. Use our calculator to estimate if your pension savings are on track.',
  },
  {
    question: 'How accurate are pension calculators?',
    answer: 'We use the latest legislative assumptions, tax rates, and real contribution models, but actual results may depend on fund performance, charges, and inflation.',
  },
  {
    question: 'How can I check my state pension age?',
    answer: 'Input your National Insurance details to check your state pension age and expected income.',
  },
  {
    question: 'Should I combine my pensions?',
    answer: 'Combining pension pots can reduce charges and simplify tracking income. Use our tool to estimate the benefits.',
  },
  {
    question: 'Do I need a financial adviser to use this tool?',
    answer: 'No—our tool is designed for anyone, but for complex pension needs, consult a qualified financial adviser.',
  },
]

export default function Home() {
  const { completedCalculators, journeyProgress, userEmail } = useJourneyState()

  return (
    <>
      {/* Clean Hero Section */}
      <CleanHeroSection />

      {/* Journey Progress Banner - Show if user has started */}
      {userEmail && completedCalculators > 0 && (
        <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-900 dark:bg-white">
                  <BarChart3 className="h-5 w-5 text-white dark:text-gray-900" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Welcome back!
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {completedCalculators} calculator{completedCalculators !== 1 ? 's' : ''} completed • {journeyProgress}% done
                  </div>
                </div>
              </div>
              <Link href="/dashboard">
                <Button size="sm" className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Calculator Cards */}
      <SimpleCalculatorCards />

      {/* Testimonials */}
      <SimpleTestimonials />

      {/* FAQ Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-12">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 dark:border-gray-800 rounded-lg px-6 bg-white dark:bg-gray-950"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4 text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </>
  )
}
