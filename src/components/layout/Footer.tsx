import Link from 'next/link'
import { Calculator, Shield, Award, Lock, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerLinks = {
  calculators: [
    { label: 'State Pension Forecast', href: '/calculators/state-pension' },
    { label: 'Workplace Pension', href: '/calculators/workplace-pension' },
    { label: 'Pension Drawdown', href: '/calculators/pension-drawdown' },
    { label: 'Tax Relief Calculator', href: '/calculators/tax-relief' },
    { label: 'SIPP Calculator', href: '/calculators/sipp' },
    { label: 'Annuity Calculator', href: '/calculators/annuity' },
  ],
  resources: [
    { label: 'Pension Guides', href: '/guides' },
    { label: 'Tax & Legislation', href: '/guides/tax' },
    { label: '2025 Updates', href: '/guides/2025-updates' },
    { label: 'Retirement Planning', href: '/guides/retirement' },
    { label: 'Pension Glossary', href: '/glossary' },
    { label: 'FAQ', href: '/faq' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Contact', href: '/contact' },
  ],
  popular: [
    { label: 'Check State Pension', href: '/calculators/state-pension' },
    { label: 'Pension Tax Relief', href: '/guides/tax-relief' },
    { label: 'Retirement Age', href: '/guides/retirement-age' },
    { label: 'Pension Consolidation', href: '/calculators/consolidation' },
    { label: 'Annual Allowance', href: '/guides/annual-allowance' },
    { label: 'Lifetime Allowance', href: '/guides/lifetime-allowance' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Calculators */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Calculators</h4>
            <ul className="space-y-3">
              {footerLinks.calculators.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © 2025 Pension Calculators. All rights reserved.
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 text-center md:text-right max-w-2xl">
              Our calculators provide guidance only and do not constitute financial advice. Consult a qualified financial adviser for personal recommendations.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}