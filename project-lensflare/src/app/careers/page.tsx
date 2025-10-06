'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CareersPage() {
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

  const positions = [
    {
      title: "Junior Videographer",
      type: "Full-time",
      location: "Pune",
      description: "Assist in filming and editing projects under the guidance of senior team members."
    },
    {
      title: "Post-Production Editor",
      type: "Full-time",
      location: "Pune",
      description: "Edit and color grade video content using industry-standard software."
    },
    {
      title: "VFX Artist",
      type: "Freelance",
      location: "Remote",
      description: "Create visual effects and animations for commercial and creative projects."
    }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
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
            Join Our <span className="text-accent-gradient">Team</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl mx-auto"
          >
            We're always looking for talented individuals who share our passion for visual storytelling 
            and creative excellence. Explore our current opportunities and become part of our dynamic team.
          </motion.p>
        </motion.div>

        {/* Company Culture */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="glass rounded-2xl p-6 md:p-8 mb-12"
        >
          <motion.h2 
            variants={fadeInUp}
            className="heading-lg text-neutral-100 mb-6 text-center"
          >
            Why Work With <span className="text-accent-gradient">Us</span>?
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div 
              variants={fadeInUp}
              className="text-center"
            >
              <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <h3 className="heading-xs text-neutral-100 mb-3">Creative Freedom</h3>
              <p className="body-sm text-neutral-300">
                Work on diverse projects with creative freedom to express your artistic vision.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="text-center"
            >
              <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="heading-xs text-neutral-100 mb-3">Collaborative Team</h3>
              <p className="body-sm text-neutral-300">
                Join a supportive team of creative professionals who value collaboration.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="text-center"
            >
              <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="heading-xs text-neutral-100 mb-3">Competitive Benefits</h3>
              <p className="body-sm text-neutral-300">
                Enjoy competitive compensation and benefits in a growing creative business.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          <motion.h2 
            variants={fadeInUp}
            className="heading-lg text-neutral-100 mb-8 text-center"
          >
            Open <span className="text-accent-gradient">Positions</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl p-6 hover:border-accent-500/50 transition-all duration-300"
              >
                <h3 className="heading-sm text-neutral-100 mb-3">{position.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-primary-700/50 text-neutral-300 px-3 py-1 rounded-full text-xs">
                    {position.type}
                  </span>
                  <span className="bg-primary-700/50 text-neutral-300 px-3 py-1 rounded-full text-xs">
                    {position.location}
                  </span>
                </div>
                <p className="body-sm text-neutral-300 mb-6">
                  {position.description}
                </p>
                <button className="btn-secondary w-full">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center section-spacing"
        >
          <motion.h2 
            variants={fadeInUp}
            className="heading-lg text-neutral-100 mb-6"
          >
            Not Seeing the Right <span className="text-accent-gradient">Fit</span>?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 mb-8 max-w-2xl mx-auto"
          >
            We're always interested in hearing from talented professionals. Send us your resume 
            and we'll keep you in mind for future opportunities.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="mailto:adityashinde6050@gmail.com" className="btn-primary flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <span>Send Resume</span>
            </Link>
            <Link href="/contact" className="btn-secondary flex items-center space-x-2">
              <span>General Inquiry</span>
            </Link>
          </motion.div>
        </motion.section>

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