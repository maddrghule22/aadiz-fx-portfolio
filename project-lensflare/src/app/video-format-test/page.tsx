'use client'

import { useState, useEffect } from 'react'
import { projects } from '@/data'

export default function VideoFormatTestPage() {
  const [testResults, setTestResults] = useState<{[key: string]: any}>({})
  const [loading, setLoading] = useState(true)
  
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured)

  useEffect(() => {
    // Test each video file
    const testVideos = async () => {
      const results: {[key: string]: any} = {}
      
      for (const project of featuredProjects) {
        try {
          // Test HEAD request
          const headResponse = await fetch(project.videoUrl, { method: 'HEAD' })
          
          // Test GET request for file info
          const getResponse = await fetch(project.videoUrl, { 
            method: 'GET',
            headers: {
              'Range': 'bytes=0-1000' // Just get first 1000 bytes to check
            }
          })
          
          const contentType = getResponse.headers.get('content-type')
          const contentLength = getResponse.headers.get('content-length')
          
          results[project.id] = {
            title: project.title,
            videoUrl: project.videoUrl,
            headStatus: headResponse.status,
            getStatus: getResponse.status,
            contentType: contentType,
            contentLength: contentLength,
            canRangeRequest: getResponse.headers.get('accept-ranges') === 'bytes'
          }
          
          // Close the response body to avoid memory leaks
          if (getResponse.body) {
            await getResponse.body.cancel()
          }
        } catch (error: unknown) {
          results[project.id] = {
            title: project.title,
            videoUrl: project.videoUrl,
            error: (error as Error).message || 'Unknown error'
          }
        }
      }
      
      setTestResults(results)
      setLoading(false)
    }
    
    testVideos()
  }, [])

  return (
    <div className="min-h-screen bg-primary-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-8 text-center">Video Format Test Page</h1>
        <p className="text-neutral-300 text-center mb-8">Testing video file accessibility and format compatibility</p>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-300">Testing videos...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {featuredProjects.map((project) => (
              <div key={project.id} className="bg-primary-800 rounded-xl overflow-hidden">
                <h2 className="heading-sm text-neutral-100 p-4">{project.title}</h2>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-neutral-200 font-medium mb-2">File Information</h3>
                      <div className="text-sm text-neutral-300 space-y-1">
                        <p><span className="font-medium">Video URL:</span> {project.videoUrl}</p>
                        <p><span className="font-medium">Thumbnail URL:</span> {project.thumbnailUrl}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-neutral-200 font-medium mb-2">Test Results</h3>
                      {testResults[project.id] ? (
                        <div className="text-sm text-neutral-300 space-y-1">
                          {testResults[project.id].error ? (
                            <p className="text-red-400">Error: {testResults[project.id].error}</p>
                          ) : (
                            <>
                              <p><span className="font-medium">HEAD Status:</span> {testResults[project.id].headStatus}</p>
                              <p><span className="font-medium">GET Status:</span> {testResults[project.id].getStatus}</p>
                              <p><span className="font-medium">Content Type:</span> {testResults[project.id].contentType}</p>
                              <p><span className="font-medium">Content Length:</span> {testResults[project.id].contentLength}</p>
                              <p><span className="font-medium">Range Requests:</span> {testResults[project.id].canRangeRequest ? 'Supported' : 'Not Supported'}</p>
                            </>
                          )}
                        </div>
                      ) : (
                        <p className="text-neutral-400">Testing...</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-primary-700">
                    <h3 className="text-neutral-200 font-medium mb-2">Direct Video Test</h3>
                    <video 
                      src={project.videoUrl} 
                      controls 
                      className="w-full max-w-md"
                      onError={(e) => console.error('Video element error:', e)}
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                      <p>Your browser does not support the video tag.</p>
                    </video>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}