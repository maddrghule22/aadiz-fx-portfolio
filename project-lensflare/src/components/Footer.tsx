'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, User, Briefcase, Film, Zap } from 'lucide-react'
import { socialLinks } from '@/data'

const footerLinks = {
  work: [
    { label: 'Commercial Projects', href: '/work?category=commercial', icon: Film },
    { label: 'Music Videos', href: '/work?category=music-video', icon: Film },
    { label: 'VFX Breakdowns', href: '/work?category=vfx-breakdown', icon: Zap },
    { label: 'Short Films', href: '/work?category=short-film', icon: Film },
    { label: 'Case Studies', href: '/work#case-studies', icon: Briefcase },
  ],
  services: [
    { label: 'Pre-Production Planning', href: '/services#pre-production', icon: User },
    { label: 'Production & Cinematography', href: '/services#production', icon: Film },
    { label: 'Post-Production Editing', href: '/services#post-production', icon: Zap },
    { label: 'VFX & Animation', href: '/services#vfx', icon: Zap },
    { label: 'Color Grading', href: '/services#color-grading', icon: Zap },
  ],
  company: [
    { label: 'About Aditya Shinde', href: '/about', icon: User },
    { label: 'Contact Information', href: '/contact', icon: Mail },
    { label: 'Privacy Policy', href: '/privacy', icon: User },
    { label: 'Terms of Service', href: '/terms', icon: User },
    { label: 'Careers', href: '/careers', icon: Briefcase },
  ],
}

const contactInfo = [
  {
    icon: Mail,
    label: 'adityashinde6050@gmail.com',
    href: 'mailto:adityashinde6050@gmail.com',
    description: 'For project inquiries and collaborations'
  },
  {
    icon: Phone,
    label: '+91 81809 99435',
    href: 'tel:+918180999435',
    description: 'Call or WhatsApp for immediate assistance'
  },
  {
    icon: MapPin,
    label: 'Pirangut, Pune, Maharashtra',
    href: 'https://maps.google.com/?q=Pirangut,+Pune,+Maharashtra',
    description: 'Based in the heart of Pune, serving clients globally'
  },
  {
    icon: Clock,
    label: 'Monday - Friday: 10AM - 6PM',
    href: '#',
    description: 'Working hours (IST) - Available for calls and meetings'
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
                alt="Aditya Shinde Logo" 
                className="h-8 w-auto mr-2"
              />
              ADITYA SHINDE
            </Link>
            <p className="body-md text-neutral-300 mb-6 max-w-md">
              Professional videographer and VFX artist from Pirangut, Pune, creating stunning visual content 
              for automotive brands, fashion, and creative projects worldwide.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              {contactInfo.map((item) => {
                const IconComponent = item.icon
                return (
                  <div key={item.label} className="group">
                    <Link
                      href={item.href}
                      className="flex items-start space-x-3 text-neutral-300 hover:text-accent-500 transition-colors duration-300"
                    >
                      <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="body-sm font-medium">{item.label}</span>
                        <p className="text-xs text-neutral-400 mt-1">{item.description}</p>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Work Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4 flex items-center">
              <Film className="w-4 h-4 mr-2" />
              Work
            </h3>
            <ul className="space-y-3">
              {footerLinks.work.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300 flex items-center"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4 flex items-center">
              <Zap className="w-4 h-4 mr-2" />
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300 flex items-center"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="heading-xs text-neutral-100 mb-4 flex items-center">
              <User className="w-4 h-4 mr-2" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => {
                const IconComponent = link.icon
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="body-sm text-neutral-300 hover:text-accent-500 transition-colors duration-300 flex items-center"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-primary-700/50">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="body-sm text-neutral-400">
              © {currentYear} Aditya Shinde. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-accent-500 transition-colors duration-300 hover:scale-110 transform flex items-center"
                  aria-label={`Follow us on ${social.platform}`}
                >
                  <span className="body-sm">{social.platform}</span>
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-neutral-400 hover:text-accent-500 transition-colors duration-300 body-sm flex items-center"
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