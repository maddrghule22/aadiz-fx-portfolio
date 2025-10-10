'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection'
import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'
import ServicesSnippet from '@/components/ServicesSnippet'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactCTA from '@/components/ContactCTA'
import { fetchFeaturedProjects, fetchServices, fetchTestimonials } from '@/lib/api'

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...')
        const [projectsData, servicesData, testimonialsData] = await Promise.all([
          fetchFeaturedProjects(),
          fetchServices(),
          fetchTestimonials()
        ])
        
        console.log('Data fetched successfully')
        setFeaturedProjects(projectsData)
        setServices(servicesData)
        setTestimonials(testimonialsData)
        setLoading(false)
      } catch (error: unknown) {
        console.error('Error fetching data:', error)
        setError(error instanceof Error ? error : new Error('An unknown error occurred'))
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-900">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-300">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary-900">
        <div className="text-center p-8 bg-primary-800 rounded-xl max-w-md">
          <h2 className="heading-lg text-neutral-100 mb-4">Something went wrong</h2>
          <p className="body-md text-neutral-300 mb-6">We're having trouble loading the page content.</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection />
      {/* Featured Work Section from featured work page */}
      <section id="featured-projects" className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-6xl mx-auto">
          <h1 className="heading-xl text-neutral-100 mb-8 text-center">Featured Work</h1>
          <p className="text-neutral-300 text-center mb-8">Showcasing my latest client work including automotive commercials, fashion editorials, and creative projects for leading brands.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project: any) => (
              <div key={project.id} className="bg-primary-800 rounded-xl overflow-hidden">
                <h2 className="heading-sm text-neutral-100 p-4">{project.title}</h2>
                <div className="aspect-video">
                  <SimpleVideoPlayer
                    src={project.videoUrl}
                    poster={project.thumbnailUrl}
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="body-sm text-neutral-300 line-clamp-2">{project.description}</p>
                  {project.tags && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span key={tag} className="bg-primary-700/50 text-neutral-300 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* Add hyperlink to work page using Next.js Link for better performance */}
          <div className="text-center mt-8">
            <Link href="/work" className="inline-block bg-accent-500 hover:bg-accent-600 text-primary-900 font-medium py-3 px-6 rounded-lg transition-colors duration-300">
              View All Work
            </Link>
          </div>
        </div>
      </section>
      <ServicesSnippet services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTA />
    </>
  )
}