'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16 section-spacing"
        >
          <motion.h1 
            variants={fadeInUp}
            className="heading-xl text-neutral-100 mb-6"
          >
            Privacy <span className="text-accent-gradient">Policy</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-2xl mx-auto"
          >
            Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="glass rounded-2xl p-6 md:p-8 mb-12"
        >
          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Information We Collect</h2>
            <p className="body-md text-neutral-200 mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc list-inside body-md text-neutral-200 space-y-2 ml-4">
              <li>Fill out forms on our website</li>
              <li>Send us emails or messages</li>
              <li>Participate in surveys or promotions</li>
              <li>Use our contact forms or communication tools</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">How We Use Your Information</h2>
            <p className="body-md text-neutral-200 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside body-md text-neutral-200 space-y-2 ml-4">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you administrative information</li>
              <li>Communicate with you about projects and updates</li>
              <li>Comply with legal obligations</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Information Sharing</h2>
            <p className="body-md text-neutral-200 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Data Security</h2>
            <p className="body-md text-neutral-200 mb-4">
              We implement appropriate security measures to protect your personal information from 
              unauthorized access, alteration, disclosure, or destruction.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Your Rights</h2>
            <p className="body-md text-neutral-200 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside body-md text-neutral-200 space-y-2 ml-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request restriction of processing</li>
              <li>Data portability</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="heading-sm text-neutral-100 mb-4">Contact Us</h2>
            <p className="body-md text-neutral-200 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="mailto:adityashinde6050@gmail.com" className="btn-primary">
                Email Us
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Form
              </Link>
            </div>
          </motion.section>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <Link href="/" className="inline-flex items-center text-accent-500 hover:text-accent-400 font-medium transition-colors duration-300">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}