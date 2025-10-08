'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CleanHeroSection() {
  return (
    <section className="relative bg-white dark:bg-gray-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-32 sm:py-40">
        <div className="max-w-3xl">
          {/* Small badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-900 px-3 py-1 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-gray-700 dark:text-gray-300">Free pension calculators</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Plan your retirement with confidence
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
            Use our suite of free calculators to forecast your pension income, optimize tax relief,
            and make informed decisions about your financial future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/calculators/state-pension">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 dark:text-gray-900 text-white px-8 h-12 text-base font-medium"
              >
                Start calculating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/analysis">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-gray-300 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-900 px-8 h-12 text-base font-medium"
              >
                View full analysis
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 from 2,000+ users</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="hidden sm:flex items-center gap-2">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>FCA compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
