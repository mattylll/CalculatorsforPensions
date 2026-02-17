import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="relative max-w-4xl mx-auto px-6 py-24">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Last updated: February 2026</p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 prose prose-gray dark:prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Who We Are</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Calculators for Pensions (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website
            calculatorsforpensions.com. This privacy policy explains how we collect, use,
            and protect your personal information when you use our pension calculator tools.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-4">
            <p><strong className="text-gray-900 dark:text-white">Information you provide:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email address (when you choose to save your results or create a dashboard)</li>
              <li>Pension calculation inputs (age, salary, contributions) — these are processed locally in your browser and not stored on our servers</li>
            </ul>
            <p><strong className="text-gray-900 dark:text-white">Information collected automatically:</strong></p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Anonymous usage analytics via Vercel Analytics (page views, calculator usage patterns)</li>
              <li>Browser type, device type, and general geographic region</li>
              <li>We do not use advertising cookies or third-party tracking pixels</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-2">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and improve our pension calculator services</li>
              <li>To save your calculation results when you create a dashboard (email required)</li>
              <li>To send service-related communications (only if you opt in)</li>
              <li>To understand how our tools are used so we can improve them</li>
            </ul>
            <p className="mt-4">
              We <strong className="text-gray-900 dark:text-white">never</strong> sell your personal data to third parties.
              We <strong className="text-gray-900 dark:text-white">never</strong> share your financial information with advertisers.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Storage & Security</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-4">
            <p>
              Pension calculation inputs are processed entirely in your browser using JavaScript.
              Your financial data is stored locally on your device using browser localStorage and
              is never transmitted to our servers unless you explicitly save your results.
            </p>
            <p>
              Our website is served over HTTPS with TLS encryption. We implement security
              headers including HSTS, X-Frame-Options, and Content-Type-Options to protect
              against common web vulnerabilities.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Your Rights (UK GDPR)</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-2">
            <p>Under the UK General Data Protection Regulation, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, contact us at the details below.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Cookies</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-4">
            <p>We use minimal cookies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-gray-900 dark:text-white">Essential cookies:</strong> Theme preference (light/dark mode)</li>
              <li><strong className="text-gray-900 dark:text-white">Analytics cookies:</strong> Vercel Analytics for anonymous usage data</li>
            </ul>
            <p>We do not use advertising, retargeting, or social media tracking cookies.</p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Third-Party Services</h2>
          <div className="text-gray-600 dark:text-gray-400 mb-8 space-y-2">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-gray-900 dark:text-white">Vercel:</strong> Website hosting and anonymous analytics</li>
            </ul>
            <p className="mt-4">
              We do not integrate with advertising networks, social media tracking, or
              data brokers.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            If you have questions about this privacy policy or wish to exercise your data rights,
            please contact us at{' '}
            <a href="mailto:privacy@calculatorsforpensions.com" className="text-gray-900 dark:text-white underline underline-offset-4">
              privacy@calculatorsforpensions.com
            </a>.
          </p>

          <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You also have the right to lodge a complaint with the{' '}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-white underline underline-offset-4"
              >
                Information Commissioner&apos;s Office (ICO)
              </a>
              , the UK supervisory authority for data protection issues.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
