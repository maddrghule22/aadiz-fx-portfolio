'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'
import { useState, useMemo, useEffect } from 'react'
import { fetchProjects } from '@/lib/api'
import Image from 'next/image'

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  year?: number;
  [key: string]: any; // Allow additional properties
}

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

  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('All Projects')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date') // New state for sorting
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc') // New state for sort order
  
  const categories = ['All Projects', 'Automotive', 'Motorcycle', 'Fashion', 'Commercial', 'Short Film', 'VFX Breakdown', 'Experimental']
  
  // Fetch projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true)
        const data = await fetchProjects()
        setProjects(data)
      } catch (err: any) {
        setError(err.message)
        // Fallback to static data if API fails
        const fallbackProjects: Project[] = [
          {
            id: 'bmw-x1-commercial',
            title: "BMW X1 Commercial",
            category: "Automotive",
            description: "High-end automotive commercial showcasing the BMW X1 with cinematic visuals and dynamic camera movements.",
            videoUrl: "/videos/bmw-m-series.mp4",
            thumbnailUrl: "/images/projects/bmw-x1-thumbnail.jpg",
            year: 2024
          },
          {
            id: 'ducati-xdiavel',
            title: "Ducati Xdiavel Showcase",
            category: "Motorcycle",
            description: "Powerful motorcycle showcase featuring the Ducati Xdiavel with dramatic lighting and precision shots.",
            videoUrl: "/videos/ducati-xdiavel.mp4",
            thumbnailUrl: "/images/projects/ducati-thumbnail.jpg",
            year: 2024
          },
          {
            id: 'fashion-editorial',
            title: "Fashion Editorial",
            category: "Fashion",
            description: "Stylish fashion video featuring contemporary fashion with artistic cinematography and advanced color grading.",
            videoUrl: "/videos/fashion-edit.mp4",
            thumbnailUrl: "/images/projects/fashion-thumbnail.jpg",
            year: 2024
          },
          {
            id: 'toyota-fortuner',
            title: "Toyota Fortuner Campaign",
            category: "Automotive",
            description: "Rugged SUV commercial highlighting the Toyota Fortuner's capabilities with adventure-focused storytelling.",
            videoUrl: "/videos/fortuner.mp4",
            thumbnailUrl: "/images/projects/fortuner-thumbnail.jpg",
            year: 2023
          },
          {
            id: 'ktm-performance',
            title: "KTM Performance Video",
            category: "Motorcycle",
            description: "High-energy motorcycle showcase featuring KTM bikes with fast-paced editing and dynamic angles.",
            videoUrl: "/videos/ktm-2.mp4",
            thumbnailUrl: "/images/projects/KTM.png",
            year: 2023
          },
          {
            id: 'yamaha-fz',
            title: "Yamaha FZ Promotional",
            category: "Motorcycle",
            description: "Sleek promotional video for Yamaha FZ featuring urban environments and modern cinematography.",
            videoUrl: "/videos/yamaha-fz.mp4",
            thumbnailUrl: "/images/projects/yamaha-thumbnail.jpg",
            year: 2024
          },
          {
            id: 'zen-creative',
            title: "Zen Creative Project",
            category: "Experimental",
            description: "Artistic and meditative video project exploring themes of balance and tranquility through visual storytelling.",
            videoUrl: "/videos/zen.mp4",
            thumbnailUrl: "/images/projects/zen-thumbnail.jpg",
            year: 2022
          }
        ]
        setProjects(fallbackProjects)
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])
  
  // Filter and search projects
  const filteredProjects = useMemo(() => {
    let result = [...projects] // Create a copy to avoid mutating original array
    
    // Apply category filter
    if (activeFilter !== 'All Projects') {
      result = result.filter(project => project.category === activeFilter)
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query)
      )
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title)
          break
        case 'category':
          comparison = a.category.localeCompare(b.category)
          break
        case 'date':
          // Assuming projects have a date property, otherwise sort by id or index
          if (a.year && b.year) {
            comparison = a.year - b.year
          } else {
            // Fallback to title comparison if no date
            comparison = a.title.localeCompare(b.title)
          }
          break
        default:
          // Default sorting by date (newest first)
          if (a.year && b.year) {
            comparison = a.year - b.year
          } else {
            comparison = 0
          }
      }
      
      // Apply sort order
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return result
  }, [projects, activeFilter, searchQuery, sortBy, sortOrder])

  // Scroll to top when filter changes
  useEffect(() => {
    // Scroll to the top of the project grid when filter changes
    const projectGrid = document.querySelector('.section-spacing');
    if (projectGrid) {
      projectGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeFilter, searchQuery, sortBy, sortOrder]);

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-neutral-200">Loading projects...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-red-500/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="heading-md text-neutral-100 mb-2">Error Loading Projects</h3>
          <p className="text-neutral-300 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-accent-500 text-primary-900 rounded-lg font-medium hover:bg-accent-400 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
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

        {/* Search and Filter Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12"
        >
          {/* Search Bar */}
          <motion.div
            variants={fadeInUp}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-primary-800/50 border border-primary-700/50 rounded-full focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {/* Filter Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap justify-center gap-3"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  variants={fadeInUp}
                  onClick={() => setActiveFilter(category)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    activeFilter === category
                      ? 'bg-accent-500 text-primary-900 shadow-lg shadow-accent-500/30'
                      : 'bg-primary-800 text-neutral-200 border border-primary-700 hover:bg-primary-700'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>

            {/* Sort Controls */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3"
            >
              <label htmlFor="sort-by" className="text-neutral-200 font-medium">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-primary-800/50 border border-primary-700/50 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="category">Category</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-primary-800/50 border border-primary-700/50 rounded-lg hover:bg-primary-700 transition-colors duration-300 flex items-center gap-1"
                aria-label={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
              >
                {sortOrder === 'asc' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
                  </svg>
                )}
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-16 section-spacing"
        >
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id || `project-${index}`}
                  variants={fadeInUp}
                  className="glass rounded-2xl overflow-hidden hover-lift transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-48 relative">
                    <SimpleVideoPlayer
                      src={project.videoUrl}
                      poster={project.thumbnailUrl}
                      className="w-full h-full"
                      lazy={true}
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm font-medium text-accent-500">
                      {project.category}
                    </span>
                    <h3 className="heading-xs text-neutral-100 my-2">
                      {project.title}
                    </h3>
                    <p className="body-sm text-neutral-300 line-clamp-2">
                      {project.description}
                    </p>
                    <button className="mt-4 text-accent-500 font-medium hover:underline">
                      View Project
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-primary-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="heading-md text-neutral-100 mb-2">No projects found</h3>
              <p className="body-md text-neutral-300 mb-4">
                {searchQuery 
                  ? `No projects match your search for "${searchQuery}" in the ${activeFilter} category.` 
                  : `There are no projects in the ${activeFilter} category yet.`}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button 
                  onClick={() => {
                    setActiveFilter('All Projects')
                    setSearchQuery('')
                  }}
                  className="px-6 py-2 bg-accent-500 text-primary-900 rounded-full font-medium hover:bg-accent-400 transition-colors duration-300"
                >
                  View All Projects
                </button>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-2 bg-primary-800 text-neutral-200 border border-primary-700 rounded-full font-medium hover:bg-primary-700 transition-colors duration-300"
                >
                  Clear Search
                </button>
              </div>
            </motion.div>
          )}
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
                <div className="text-4xl font-bold text-accent-500 mb-2">200+</div>
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