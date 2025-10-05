'use client'

import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection'
import FeaturedWork from '@/components/FeaturedWork'
import ServicesSnippet from '@/components/ServicesSnippet'
import TestimonialsSection from '@/components/TestimonialsSection'
import ClientsSection from '@/components/ClientsSection'
import ContactCTA from '@/components/ContactCTA'
import { fetchFeaturedProjects, fetchServices, fetchTestimonials, fetchClients } from '@/lib/api'

export default function HomePage() {
  const [featuredProjects, setFeaturedProjects] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, servicesData, testimonialsData, clientsData] = await Promise.all([
          fetchFeaturedProjects(),
          fetchServices(),
          fetchTestimonials(),
          fetchClients()
        ])
        
        setFeaturedProjects(projectsData)
        setServices(servicesData)
        setTestimonials(testimonialsData)
        setClients(clientsData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <HeroSection />
      <FeaturedWork projects={featuredProjects} />
      <ServicesSnippet services={services} />
      <TestimonialsSection testimonials={testimonials} />
      <ClientsSection clients={clients} />
      <ContactCTA />
    </>
  )
}