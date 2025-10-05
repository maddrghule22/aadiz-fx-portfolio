'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function TermsOfServicePage() {
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
            Terms of <span className="text-accent-gradient">Service</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-2xl mx-auto"
          >
            These terms govern your use of our website and services. Please read them carefully.
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
            <h2 className="heading-sm text-neutral-100 mb-4">Acceptance of Terms</h2>
            <p className="body-md text-neutral-200 mb-4">
              By accessing or using our website and services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Services</h2>
            <p className="body-md text-neutral-200 mb-4">
              We provide professional videography, cinematography, and visual effects services. 
              Our services include but are not limited to:
            </p>
            <ul className="list-disc list-inside body-md text-neutral-200 space-y-2 ml-4">
              <li>Pre-production planning and concept development</li>
              <li>Production and cinematography services</li>
              <li>Post-production editing and color grading</li>
              <li>Visual effects and animation</li>
              <li>Project consultation and creative direction</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Intellectual Property</h2>
            <p className="body-md text-neutral-200 mb-4">
              All content, logos, and materials on this website are the property of Aditya Shinde 
              and are protected by intellectual property laws. You may not use our content without 
              explicit permission.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">User Responsibilities</h2>
            <p className="body-md text-neutral-200 mb-4">
              When using our website and services, you agree to:
            </p>
            <ul className="list-disc list-inside body-md text-neutral-200 space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Not use the website for any unlawful purposes</li>
              <li>Respect the intellectual property rights of others</li>
              <li>Not attempt to interfere with the website's functionality</li>
            </ul>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Limitation of Liability</h2>
            <p className="body-md text-neutral-200 mb-4">
              We strive to provide high-quality services, but we are not liable for any indirect, 
              incidental, or consequential damages arising from the use of our website or services.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-8">
            <h2 className="heading-sm text-neutral-100 mb-4">Changes to Terms</h2>
            <p className="body-md text-neutral-200 mb-4">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting to the website. Your continued use of the website after 
              changes constitutes acceptance of the modified terms.
            </p>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="heading-sm text-neutral-100 mb-4">Contact Information</h2>
            <p className="body-md text-neutral-200 mb-4">
              If you have any questions about these Terms of Service, please contact us:
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