'use client'

import Link from 'next/link'
import { Mail, Phone, ArrowRight } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="section-spacing bg-gradient-to-br from-primary-800 to-primary-900 border-t border-primary-700/50">
      <div className="container-padding max-w-4xl mx-auto text-center">
        <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
          Ready to Create Something <span className="text-accent-gradient">Amazing?</span>
        </h2>
        <p className="body-lg text-neutral-300 mb-8 animate-on-scroll">
          Let&apos;s discuss your next project and bring your vision to life with stunning visuals and compelling storytelling.
        </p>
        
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Email */}
          <Link
            href="mailto:adityashinde6050@gmail.com"
            className="group bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 hover:border-accent-500/30 rounded-xl p-6 transition-all duration-300 hover-lift animate-on-scroll"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center group-hover:bg-accent-500/30 transition-colors duration-300">
                <Mail className="w-6 h-6 text-accent-500" />
              </div>
            </div>
            <h3 className="heading-xs text-neutral-100 mb-2 group-hover:text-accent-500 transition-colors duration-300">
              Send an Email
            </h3>
            <p className="body-sm text-neutral-400 mb-3">
              adityashinde6050@gmail.com
            </p>
            <p className="body-xs text-neutral-500">
              Get a detailed response within 24 hours
            </p>
          </Link>

          {/* Phone */}
          <Link
            href="tel:+918180999435"
            className="group bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 hover:border-accent-500/30 rounded-xl p-6 transition-all duration-300 hover-lift animate-on-scroll"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-accent-500/20 rounded-lg flex items-center justify-center group-hover:bg-accent-500/30 transition-colors duration-300">
                <Phone className="w-6 h-6 text-accent-500" />
              </div>
            </div>
            <h3 className="heading-xs text-neutral-100 mb-2 group-hover:text-accent-500 transition-colors duration-300">
              Call or WhatsApp
            </h3>
            <p className="body-sm text-neutral-400 mb-3">
              +91 81809 99435
            </p>
            <p className="body-xs text-neutral-500">
              Available for calls and WhatsApp messages
            </p>
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll">
          <Link
            href="/contact"
            className="btn-primary flex items-center space-x-2 group"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link
            href="/work"
            className="btn-secondary flex items-center space-x-2"
          >
            <span>View Portfolio</span>
          </Link>
        </div>

        {/* Location */}
        <div className="mt-8 pt-8 border-t border-primary-700/50 animate-on-scroll">
          <p className="body-sm text-neutral-400">
            📍 Based in Pune • Available for projects worldwide
          </p>
        </div>
      </div>
    </section>
  )
}