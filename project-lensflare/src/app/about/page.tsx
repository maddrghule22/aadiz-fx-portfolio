'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function AboutPage() {
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
            About <span className="text-accent-gradient">Aadiz.FX</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl mx-auto"
          >
            Professional videographer and VFX artist from Pune, creating stunning visual stories 
            for automotive brands, fashion, and creative projects worldwide.
          </motion.p>
        </motion.div>

        {/* Brand Story Section */}
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
            My <span className="text-accent-gradient">Story</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8 mb-8"
          >
            <p className="body-md text-neutral-200 mb-4">
              Founded in 2020, Aadiz.FX began as a passion project between a creative visionary who believed that 
              visual storytelling should be more than just functional—it should be extraordinary.
            </p>
            <p className="body-md text-neutral-200 mb-4">
              What started as late-night experiments with camera equipment and editing software has evolved into 
              a full-service creative studio dedicated to pushing boundaries and redefining what's possible in 
              visual storytelling.
            </p>
            <p className="body-md text-neutral-200">
              Today, I'm a solo creative professional who brings together diverse skills in cinematography, 
              editing, and VFX to deliver exceptional results for clients. My goal is to create visual experiences 
              that not only meet business objectives but also inspire and delight audiences.
            </p>
          </motion.div>
        </motion.section>

        {/* Mission & Values Section */}
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
            My <span className="text-accent-gradient">Approach</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              variants={fadeInUp}
              className="glass rounded-2xl p-6"
            >
              <h3 className="heading-sm text-neutral-100 mb-4">Mission</h3>
              <p className="body-md text-neutral-200">
                To empower brands with transformative visual content that drives engagement, enhances brand 
                identity, and creates lasting competitive advantages through cinematic storytelling.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="glass rounded-2xl p-6"
            >
              <h3 className="heading-sm text-neutral-100 mb-4">Vision</h3>
              <p className="body-md text-neutral-200">
                To be the leading creative partner that shapes the future of visual storytelling 
                through innovation, technical excellence, and emotionally resonant cinematography.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            variants={fadeInUp}
            className="mt-8 glass rounded-2xl p-6"
          >
            <h3 className="heading-sm text-neutral-100 mb-6">Core Values</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <li className="flex items-start">
                <div className="bg-accent-500 rounded-full p-1 mt-1 mr-3">
                  <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="body-md text-neutral-200">Innovation: Constantly pushing boundaries and exploring new creative possibilities</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent-500 rounded-full p-1 mt-1 mr-3">
                  <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="body-md text-neutral-200">Quality: Delivering excellence in every frame and pixel</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent-500 rounded-full p-1 mt-1 mr-3">
                  <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="body-md text-neutral-200">Collaboration: Working hand-in-hand with clients as true creative partners</span>
              </li>
              <li className="flex items-start">
                <div className="bg-accent-500 rounded-full p-1 mt-1 mr-3">
                  <svg className="w-4 h-4 text-primary-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span className="body-md text-neutral-200">Integrity: Building trust through transparency and honesty</span>
              </li>
            </ul>
          </motion.div>
        </motion.section>

        {/* What I Do Section */}
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
            What I <span className="text-accent-gradient">Do</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <p className="body-md text-neutral-200 mb-8">
              At Aadiz.FX, I specialize in creating visual content that captivates audiences and drives results. 
              My multidisciplinary approach combines cinematography, editing, and VFX to deliver solutions that 
              exceed expectations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-3">Videography</h3>
                <p className="body-sm text-neutral-300">
                  Professional filming with cinematic techniques and high-end equipment for commercials, 
                  documentaries, and creative projects.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                  </svg>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-3">Post-Production</h3>
                <p className="body-sm text-neutral-300">
                  Expert editing, color grading, and audio mixing to polish projects to perfection with 
                  attention to detail.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-3">VFX & Animation</h3>
                <p className="body-sm text-neutral-300">
                  Cutting-edge visual effects and 3D animation to bring impossible visions to life and 
                  enhance storytelling.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Team Section */}
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
            About <span className="text-accent-gradient">Me</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <p className="body-md text-neutral-200 mb-8">
              My success is driven by passion for visual storytelling and technical expertise in cinematography, 
              editing, and VFX. I bring together diverse skills and creative vision to deliver exceptional 
              results for clients.
            </p>
            
            <div className="text-center max-w-3xl mx-auto">
              <img 
                src="/images/projects/Screenshot 2025-10-06 144559.png" 
                alt="Aditya Shinde, Founder & Creative Director" 
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
              />
              <h3 className="heading-sm text-neutral-100 mb-2">Aditya Shinde</h3>
              <p className="text-accent-500 body-md mb-4">Founder & Creative Director</p>
              <p className="body-md text-neutral-300">
                With over 5 years of experience in visual storytelling, I lead the creative vision at Aditya Shinde 
                and ensure every project reflects our commitment to excellence. My background in cinematography 
                and post-production allows me to bridge the gap between creative vision and technical execution.
              </p>
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
            Ready to Create Something <span className="text-accent-gradient">Amazing</span>?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how I can help you achieve your creative vision and create visual content that 
            resonates with your audience.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/work" className="btn-secondary">
              View My Work
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}