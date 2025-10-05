'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function WorkPage() {
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

  const projects = [
    {
      title: "BMW X1 Commercial",
      category: "Automotive",
      description: "High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "Ducati Xdiavel Showcase",
      category: "Motorcycle",
      description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "Fashion Editorial",
      category: "Fashion",
      description: "Stylish fashion video featuring contemporary fashion with artistic cinematography and advanced color grading.",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "Toyota Fortuner Campaign",
      category: "Automotive",
      description: "Rugged SUV commercial highlighting the Toyota Fortuner's capabilities with adventure-focused storytelling.",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "KTM Performance Video",
      category: "Motorcycle",
      description: "High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles.",
      image: "/images/placeholder-image.jpg"
    },
    {
      title: "Zen Creative Project",
      category: "Experimental",
      description: "Artistic and meditative video project exploring themes of balance and tranquility through visual storytelling.",
      image: "/images/placeholder-image.jpg"
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
            My <span className="text-accent-gradient">Work</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl mx-auto"
          >
            Explore my portfolio of successful projects that showcase my expertise across various industries 
            and visual storytelling techniques.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.button
            variants={fadeInUp}
            className="px-6 py-2 bg-accent-500 text-primary-900 rounded-full font-medium hover:bg-accent-400 transition-colors duration-300"
          >
            All Projects
          </motion.button>
          <motion.button
            variants={fadeInUp}
            className="px-6 py-2 bg-primary-800 text-neutral-200 rounded-full font-medium border border-primary-700 hover:bg-primary-700 transition-colors duration-300"
          >
            Automotive
          </motion.button>
          <motion.button
            variants={fadeInUp}
            className="px-6 py-2 bg-primary-800 text-neutral-200 rounded-full font-medium border border-primary-700 hover:bg-primary-700 transition-colors duration-300"
          >
            Motorcycle
          </motion.button>
          <motion.button
            variants={fadeInUp}
            className="px-6 py-2 bg-primary-800 text-neutral-200 rounded-full font-medium border border-primary-700 hover:bg-primary-700 transition-colors duration-300"
          >
            Fashion
          </motion.button>
        </motion.div>

        {/* Projects Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="glass rounded-2xl overflow-hidden hover-lift"
              >
                <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
                <div className="p-6">
                  <span className="text-sm font-medium text-accent-500">
                    {project.category}
                  </span>
                  <h3 className="heading-xs text-neutral-100 my-2">
                    {project.title}
                  </h3>
                  <p className="body-sm text-neutral-300">
                    {project.description}
                  </p>
                  <button className="mt-4 text-accent-500 font-medium hover:underline">
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          <motion.div 
            variants={fadeInUp}
            className="glass rounded-2xl p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">50+</div>
                <div className="body-md text-neutral-300">Projects Completed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">98%</div>
                <div className="body-md text-neutral-300">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">25+</div>
                <div className="body-md text-neutral-300">Happy Clients</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent-500 mb-2">5+</div>
                <div className="body-md text-neutral-300">Years Experience</div>
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
            Have a Project in <span className="text-accent-gradient">Mind</span>?
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 mb-8 max-w-2xl mx-auto"
          >
            Let's discuss how I can bring your vision to life with my expertise and creative solutions.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
          >
            <Link href="/contact" className="btn-primary">
              Start a Project
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}