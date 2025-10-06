'use client'

import { useState, useEffect } from 'react'

export default function ApiTestPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from API...')
        const response = await fetch('http://localhost:5000/api/projects/featured')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        console.log('Data fetched successfully:', result)
        setData(result)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching data:', err)
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
          <p className="text-neutral-300">Loading API data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-primary-900 flex items-center justify-center">
        <div className="text-center p-8 bg-primary-800 rounded-xl max-w-md">
          <h1 className="heading-lg text-neutral-100 mb-4">API Test Error</h1>
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
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-8 text-center">API Test Page</h1>
        
        <div className="bg-primary-800 rounded-xl p-6">
          <h2 className="heading-sm text-neutral-100 mb-4">Featured Projects Data</h2>
          <pre className="bg-primary-900 p-4 rounded-lg text-sm text-neutral-300 overflow-auto max-h-96">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}