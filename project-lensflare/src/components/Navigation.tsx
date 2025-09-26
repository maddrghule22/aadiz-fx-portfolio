'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-primary-900/95 backdrop-blur-md border-b border-primary-700/50'
            : 'bg-transparent'
        }`}
      >
        <nav className="container-padding max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl font-headline font-bold text-gradient hover:scale-105 transition-transform duration-300"
            >
              AADIZ.FX
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 hover:text-accent-500 ${
                    pathname === item.href
                      ? 'text-accent-500'
                      : 'text-neutral-100'
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent-500 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link
                href="/contact"
                className="btn-primary text-sm"
              >
                Start Project
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-neutral-100 hover:text-accent-500 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-primary-900/95 backdrop-blur-md"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Mobile Menu Content */}
        <div className="relative z-50 pt-24 container-padding">
          <div className="flex flex-col space-y-8">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-2xl font-headline font-medium transition-all duration-300 hover:text-accent-500 hover:translate-x-2 ${
                  pathname === item.href
                    ? 'text-accent-500'
                    : 'text-neutral-100'
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-8">
              <Link
                href="/contact"
                className="btn-primary inline-block text-center"
              >
                Start Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20" />
    </>
  )
}