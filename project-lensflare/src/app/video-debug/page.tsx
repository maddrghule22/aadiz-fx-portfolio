'use client'

import { useState, useEffect } from 'react'
import { fetchProjects, fetchFeaturedProjects } from '@/lib/api'
import { Project } from '@/types'

export default function VideoDebugPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsData, featuredData] = await Promise.all([
          fetchProjects(),
          fetchFeaturedProjects()
        ])
        setProjects(projectsData)
        setFeaturedProjects(featuredData)
        setLoading(false)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-xl text-neutral-100 mb-6">Video Debug Page</h1>
          <p className="text-neutral-300">Loading data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="heading-xl text-neutral-100 mb-6">Video Debug Page</h1>
          <div className="bg-red-500/10 p-6 rounded-lg">
            <h2 className="heading-md text-red-500 mb-2">Error</h2>
            <p className="text-neutral-300">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6">Video Debug Page</h1>
        
        <div className="mb-12">
          <h2 className="heading-lg text-neutral-100 mb-4">All Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-primary-800 p-6 rounded-lg">
                <h3 className="heading-sm text-neutral-100 mb-2">{project.title}</h3>
                <p className="text-neutral-300 mb-2">Video URL: {project.videoUrl}</p>
                <p className="text-neutral-300 mb-2">Thumbnail URL: {project.thumbnailUrl}</p>
                <div className="mt-4">
                  <h4 className="text-neutral-100 mb-2">File Check:</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch(project.videoUrl, { method: 'HEAD' })
                          alert(`Video exists: ${response.ok}`)
                        } catch (err: unknown) {
                          alert(`Error checking video: ${err instanceof Error ? err.message : 'Unknown error'}`)
                        }
                      }}
                      className="btn-secondary text-sm"
                    >
                      Check Video
                    </button>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch(project.thumbnailUrl, { method: 'HEAD' })
                          alert(`Thumbnail exists: ${response.ok}`)
                        } catch (err: unknown) {
                          alert(`Error checking thumbnail: ${err instanceof Error ? err.message : 'Unknown error'}`)
                        }
                      }}
                      className="btn-secondary text-sm"
                    >
                      Check Thumbnail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="heading-lg text-neutral-100 mb-4">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-primary-800 p-6 rounded-lg">
                <h3 className="heading-sm text-neutral-100 mb-2">{project.title}</h3>
                <p className="text-neutral-300 mb-2">Video URL: {project.videoUrl}</p>
                <p className="text-neutral-300 mb-2">Thumbnail URL: {project.thumbnailUrl}</p>
                <div className="mt-4">
                  <h4 className="text-neutral-100 mb-2">File Check:</h4>
                  <div className="flex gap-2">
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch(project.videoUrl, { method: 'HEAD' })
                          alert(`Video exists: ${response.ok}`)
                        } catch (err: unknown) {
                          alert(`Error checking video: ${err instanceof Error ? err.message : 'Unknown error'}`)
                        }
                      }}
                      className="btn-secondary text-sm"
                    >
                      Check Video
                    </button>
                    <button 
                      onClick={async () => {
                        try {
                          const response = await fetch(project.thumbnailUrl, { method: 'HEAD' })
                          alert(`Thumbnail exists: ${response.ok}`)
                        } catch (err: unknown) {
                          alert(`Error checking thumbnail: ${err instanceof Error ? err.message : 'Unknown error'}`)
                        }
                      }}
                      className="btn-secondary text-sm"
                    >
                      Check Thumbnail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}