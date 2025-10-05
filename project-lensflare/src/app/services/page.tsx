'use client'

import { motion } from 'framer-motion'

export default function ServicesPage() {
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

  const services = [
    {
      title: "Videography",
      description: "Professional filming with cinematic techniques and high-end equipment for commercials, documentaries, and creative projects.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      title: "Post-Production",
      description: "Expert editing, color grading, and audio mixing to polish projects to perfection with attention to detail.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
        </svg>
      )
    },
    {
      title: "VFX & Animation",
      description: "Cutting-edge visual effects and 3D animation to bring impossible visions to life and enhance storytelling.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      title: "Color Grading",
      description: "Professional color correction and grading to create consistent looks and enhance the emotional impact of your visuals.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
        </svg>
      )
    },
    {
      title: "Sound Design",
      description: "Professional audio recording, editing, and mixing to create immersive soundscapes that complement your visual content.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m1.414-4.242a5 5 0 010-7.07m-2.828 9.9a9 9 0 010-12.728"></path>
        </svg>
      )
    },
    {
      title: "Creative Consultation",
      description: "Strategic guidance on visual storytelling, concept development, and creative direction to maximize the impact of your projects.",
      icon: (
        <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
        </svg>
      )
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
            My <span className="text-accent-gradient">Services</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl mx-auto"
          >
            Professional videography and VFX services tailored to bring your creative vision to life 
            with cinematic quality and attention to detail.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl p-8 hover-lift"
              >
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="heading-sm text-neutral-100 mb-3">
                  {service.title}
                </h3>
                <p className="body-md text-neutral-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Process Section */}
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
            My <span className="text-accent-gradient">Process</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-500">1</span>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-2">Discover</h3>
                <p className="body-sm text-neutral-300">
                  We dive deep into your creative vision and project goals to understand your unique needs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-500">2</span>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-2">Create</h3>
                <p className="body-sm text-neutral-300">
                  I develop a creative roadmap and visual concepts tailored to your objectives and timeline.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-500">3</span>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-2">Execute</h3>
                <p className="body-sm text-neutral-300">
                  I bring your vision to life with precision, ensuring quality at every step of production.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent-500">4</span>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-2">Deliver</h3>
                <p className="body-sm text-neutral-300">
                  I deliver your final project and provide ongoing support to ensure continued success.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* CTA Section */}
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
            Ready to Bring Your <span className="text-accent-gradient">Vision</span> to Life?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how my services can help you achieve your creative goals and create lasting impact.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
          >
            <a href="/contact" className="btn-primary">
              Get in Touch
            </a>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}