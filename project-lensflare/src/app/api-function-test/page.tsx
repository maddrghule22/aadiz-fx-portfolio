'use client'

import { useState, useEffect } from 'react'
import { fetchFeaturedProjects, fetchServices, fetchTestimonials, fetchClients } from '@/lib/api'

export default function ApiFunctionTestPage() {
  const [results, setResults] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Testing API functions...')
        
        const featuredProjects = await fetchFeaturedProjects()
        console.log('Featured projects:', featuredProjects)
        
        const services = await fetchServices()
        console.log('Services:', services)
        
        const testimonials = await fetchTestimonials()
        console.log('Testimonials:', testimonials)
        
        const clients = await fetchClients()
        console.log('Clients:', clients)
        
        setResults({
          featuredProjects,
          services,
          testimonials,
          clients
        })
        
        setLoading(false)
      } catch (err) {
        console.error('Error in API functions:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-300">Testing API functions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center p-8 bg-primary-800 rounded-xl max-w-md">
          <h1 className="heading-lg text-neutral-100 mb-4">API Function Test Error</h1>
          <p className="body-md text-red-400 mb-6">{error}</p>
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
    <div className="min-h-screen bg-primary-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-8 text-center">API Function Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(results).map(([key, value]) => (
            <div key={key} className="bg-primary-800 rounded-xl p-6">
              <h2 className="heading-sm text-neutral-100 mb-4 capitalize">{key}</h2>
              <pre className="bg-primary-900 p-4 rounded-lg text-sm text-neutral-300 overflow-auto max-h-64">
                {JSON.stringify(value, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}