'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Calculator, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

const calculators = [
  { title: 'State Pension Forecast', href: '/calculators/state-pension', description: 'Check your state pension age and forecast' },
  { title: 'Workplace Pension', href: '/calculators/workplace-pension', description: 'Calculate your workplace pension growth' },
  { title: 'Pension Drawdown', href: '/calculators/pension-drawdown', description: 'Plan your retirement income' },
  { title: 'Tax Relief', href: '/calculators/tax-relief', description: 'Calculate tax savings on contributions' },
  { title: 'SIPP Calculator', href: '/calculators/sipp', description: 'Self-invested pension planning' },
  { title: 'Annuity Income', href: '/calculators/annuity', description: 'Estimate guaranteed income' },
]

const resources = [
  { title: 'Pension Guides', href: '/guides', description: 'Comprehensive pension guides' },
  { title: 'Tax & Legislation', href: '/guides/tax', description: '2025 tax rules and changes' },
  { title: 'Retirement Planning', href: '/guides/retirement', description: 'Plan your retirement strategy' },
  { title: 'FAQ', href: '/faq', description: 'Common pension questions' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      'fixed top-0 z-50 w-full transition-all duration-300',
      isScrolled
        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800'
        : 'bg-white/60 dark:bg-gray-950/60 backdrop-blur-md'
    )}>
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Pension Calculators
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Calculators
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] gap-3 p-4 md:grid-cols-2">
                      {calculators.map((calc) => (
                        <li key={calc.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={calc.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900 dark:text-white">{calc.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
                                {calc.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {resources.map((resource) => (
                        <li key={resource.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={resource.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-900"
                            >
                              <div className="text-sm font-medium leading-none text-gray-900 dark:text-white">{resource.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-gray-600 dark:text-gray-400">
                                {resource.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/dashboard"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      Dashboard
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 px-2 mb-2">Calculators</h3>
                <div className="space-y-1">
                  {calculators.map((calc) => (
                    <Link
                      key={calc.title}
                      href={calc.href}
                      className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md text-gray-900 dark:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {calc.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-gray-600 dark:text-gray-400 px-2 mb-2">Resources</h3>
                <div className="space-y-1">
                  {resources.map((resource) => (
                    <Link
                      key={resource.title}
                      href={resource.href}
                      className="block px-2 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md text-gray-900 dark:text-white"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {resource.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}