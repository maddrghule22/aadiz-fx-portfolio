'use client'

import { useState, useEffect } from 'react'

export default function DebugPage() {
  const [status, setStatus] = useState('Loading...')
  
  useEffect(() => {
    setStatus('Page loaded successfully')
  }, [])
  
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center">
      <div className="text-center p-8 bg-primary-800 rounded-xl">
        <h1 className="heading-xl text-neutral-100 mb-4">Debug Page</h1>
        <p className="body-lg text-neutral-300 mb-4">{status}</p>
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setStatus('Button clicked!')}
            className="btn-primary"
          >
            Test Button
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  )
}