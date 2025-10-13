'use client'

import { useEffect, useState } from 'react'

// Define types for our data
type Project = {
  id: string;
  title: string;
  featured: boolean;
}

export default function ApiTestPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects')
        const data = await response.json()
        setProjects(data.data)
      } catch (err) {
        // Type check the error before accessing its properties
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>API Test Page</h1>
      <p>Total projects: {projects.length}</p>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>Featured: {project.featured ? 'Yes' : 'No'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}