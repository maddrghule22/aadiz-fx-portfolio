'use client'

import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function WorkItemPage() {
  const params = useParams()
  const { id } = params

  // In a real application, this data would come from an API or database
  const project = {
    title: "BMW X1 Commercial",
    category: "Automotive",
    year: "2024",
    client: "BMW",
    description: "High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.",
    challenge: "The client needed a high-end automotive commercial that would showcase the BMW X1 with cinematic visuals and dynamic camera movements. The challenge was to create a visually stunning piece that would capture the essence of the brand while highlighting the vehicle's features.",
    solution: "We conducted extensive pre-production planning, including storyboarding and location scouting. Our approach focused on creating dynamic camera movements and cinematic lighting to highlight the vehicle's design. We used a combination of drone footage and ground-level shots to capture the vehicle from multiple angles.",
    results: "The commercial was a huge success, receiving critical acclaim and winning the Best Automotive Commercial Award at the 2024 Global Cinematography Awards. The campaign resulted in a 45% increase in showroom visits and significantly boosted brand engagement.",
    images: [
      "/images/placeholder-image.jpg",
      "/images/placeholder-image.jpg",
      "/images/placeholder-image.jpg"
    ],
    testimonial: {
      name: "Rajesh Sharma",
      position: "Marketing Director",
      company: "BMW India",
      quote: "Working with Aadiz.FX was extraordinary. They brought our BMW X1 campaign to life with stunning visuals and impeccable attention to detail. The commercial exceeded all expectations and resulted in a 45% increase in showroom visits."
    }
  }

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
        {/* Back Button */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-8"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center text-accent-500 hover:text-accent-400 font-medium transition-colors duration-300"
          >
            <Link href="/work" className="inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to Projects
            </Link>
          </motion.div>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12 section-spacing"
        >
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-4 mb-4"
          >
            <span className="px-3 py-1 bg-accent-500/10 text-accent-500 rounded-full text-sm font-medium">
              {project.category}
            </span>
            <span className="text-neutral-300">
              {project.year}
            </span>
            <span className="text-neutral-300">
              for {project.client}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="heading-xl text-neutral-100 mb-6"
          >
            {project.title}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl"
          >
            {project.description}
          </motion.p>
        </motion.div>

        {/* Project Image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-96 md:h-[500px]"
          />
        </motion.div>

        {/* Project Details */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16"
        >
          <motion.div 
            variants={fadeInUp}
            className="lg:col-span-2"
          >
            <h2 className="heading-lg text-neutral-100 mb-6">The Challenge</h2>
            <p className="body-md text-neutral-200 mb-8">
              {project.challenge}
            </p>
            
            <h2 className="heading-lg text-neutral-100 mb-6">My Approach</h2>
            <p className="body-md text-neutral-200 mb-8">
              {project.solution}
            </p>
            
            <h2 className="heading-lg text-neutral-100 mb-6">The Results</h2>
            <p className="body-md text-neutral-200 mb-8">
              {project.results}
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8 h-fit"
          >
            <h3 className="heading-sm text-neutral-100 mb-6">Project Details</h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-primary-700/50 pb-4">
                <span className="text-neutral-300">Category</span>
                <span className="font-medium text-neutral-100">{project.category}</span>
              </li>
              <li className="flex justify-between border-b border-primary-700/50 pb-4">
                <span className="text-neutral-300">Year</span>
                <span className="font-medium text-neutral-100">{project.year}</span>
              </li>
              <li className="flex justify-between border-b border-primary-700/50 pb-4">
                <span className="text-neutral-300">Client</span>
                <span className="font-medium text-neutral-100">{project.client}</span>
              </li>
              <li className="flex justify-between border-b border-primary-700/50 pb-4">
                <span className="text-neutral-300">Services</span>
                <span className="font-medium text-neutral-100">Videography, Post-Production, VFX</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-300">Platform</span>
                <span className="font-medium text-neutral-100">Commercial</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Results Stats */}
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
            Measurable <span className="text-accent-gradient">Results</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-accent-500 mb-4">+45%</div>
              <h3 className="heading-xs text-neutral-100 mb-2">Showroom Visits</h3>
              <p className="body-sm text-neutral-300">Increase in customer visits</p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-accent-500 mb-4">95%</div>
              <h3 className="heading-xs text-neutral-100 mb-2">Client Satisfaction</h3>
              <p className="body-sm text-neutral-300">Positive feedback rating</p>
            </div>
            
            <div className="glass rounded-2xl p-8 text-center">
              <div className="text-5xl font-bold text-accent-500 mb-4">1</div>
              <h3 className="heading-xs text-neutral-100 mb-2">Industry Award</h3>
              <p className="body-sm text-neutral-300">Global Cinematography Award</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Testimonial */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-8 md:p-12 text-center"
          >
            <svg className="w-12 h-12 text-accent-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"></path>
            </svg>
            <blockquote className="text-xl md:text-2xl text-neutral-100 mb-6">
              "{project.testimonial.quote}"
            </blockquote>
            <div className="text-neutral-200">
              <div className="font-semibold text-lg">{project.testimonial.name}</div>
              <div>{project.testimonial.position}, {project.testimonial.company}</div>
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
            Let's discuss how I can create exceptional visual content for your brand.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
          >
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}