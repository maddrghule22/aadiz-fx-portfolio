'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { socialLinks } from '@/data'

const footerLinks = {
  work: [
    { label: 'Commercial', href: '/work?category=commercial' },
    { label: 'Music Videos', href: '/work?category=music-video' },
    { label: 'VFX Breakdowns', href: '/work?category=vfx-breakdown' },
    { label: 'Short Films', href: '/work?category=short-film' },
  ],
  services: [
    { label: 'Pre-Production', href: '/services#pre-production' },
    { label: 'Production', href: '/services#production' },
    { label: 'Post-Production', href: '/services#post-production' },
    { label: 'VFX & Animation', href: '/services#vfx' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
}

const contactInfo = [
  {
    icon: Mail,
    label: 'adityashinde6050@gmail.com',
    href: 'mailto:adityashinde6050@gmail.com',
  },
  {
    icon: Phone,
    label: '+91 81809 99435',
    href: 'tel:+918180999435',
  },
  {
    icon: MapPin,
    label: 'Pirangut, Pune',
    href: '#',
  },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary-800 border-t border-primary-700/50">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-headline font-bold text-gradient mb-4 inline-flex items-center"
            >
              <img 
                src="/images/logo.svg" 
                alt="Aadiz.FX Logo" 
                className="h-8 w-auto mr-2"
              />
              AADIZ.FX
            </Link>
            <p className="body-md text-neutral-300 mb-6 max-w-md">
              Crafting visual narratives that captivate audiences and elevate brands through the art of cinematography and visual effects.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center space-x-3 text-neutral-300 hover:text-accent-500 transition-colors duration-300"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="body-sm">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Work Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4">Work</h3>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-primary-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="body-sm text-neutral-400">
              © {currentYear} Aadiz.FX. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-accent-500 transition-colors duration-300 hover:scale-110 transform"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  <span className="body-sm">{social.platform}</span>
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-neutral-400 hover:text-accent-500 transition-colors duration-300 body-sm"
              aria-label="Back to top"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}