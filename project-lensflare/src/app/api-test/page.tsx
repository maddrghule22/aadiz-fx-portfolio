'use client'

import { useEffect, useState } from 'react'

export default function ApiTestPage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects')
        const data = await response.json()
        setProjects(data.data)
      } catch (err) {
        setError(err.message)
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
