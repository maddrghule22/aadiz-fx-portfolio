'use client'

import { useState, useEffect } from 'react'

// Define types for our video test results
interface VideoTest {
  name: string;
  url: string;
}

interface VideoLoadSuccess {
  url: string;
  success: true;
  videoWidth: number;
  videoHeight: number;
}

interface VideoLoadError {
  url: string;
  success: false;
  error: string | Event;
}

type VideoLoadResult = VideoLoadSuccess | VideoLoadError;

export default function VideoTestPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  
  const testVideos: VideoTest[] = [
    { name: 'BMW X1', url: '/videos/bmw-x1.mp4' },
    { name: 'Ducati Xdiavel', url: '/videos/ducati-xdiavel.mp4' },
    { name: 'Fashion Edit', url: '/videos/fashion-edit.mp4' },
    { name: 'Fortuner', url: '/videos/fortuner.mp4' },
    { name: 'KTM', url: '/videos/ktm-2.mp4' },
    { name: 'Yamaha FZ', url: '/videos/yamaha-fz.mp4' },
    { name: 'Zen', url: '/videos/zen.mp4' }
  ]

  const testVideoLoad = (url: string): Promise<VideoLoadResult> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video')
      video.src = url
      
      video.addEventListener('loadeddata', () => {
        resolve({ url, success: true, videoWidth: video.videoWidth, videoHeight: video.videoHeight })
      })
      
      video.addEventListener('error', (e) => {
        reject({ url, success: false, error: e })
      })
      
      // Set a timeout in case the video never loads
      setTimeout(() => {
        reject({ url, success: false, error: 'Timeout' })
      }, 5000)
    })
  }

  const runTests = async () => {
    setError(null)
    setIsLoaded(false)
    
    const results: Array<VideoTest & VideoLoadResult & { status: string }> = []
    for (const video of testVideos) {
      try {
        const result = await testVideoLoad(video.url)
        results.push({ ...video, ...result, status: 'success' })
      } catch (err: any) {
        // Ensure we're spreading an object
        const errorObj = err instanceof Object ? err : { error: err }
        results.push({ ...video, ...errorObj, status: 'error' })
      }
    }
    
    console.log('Video test results:', results)
    setIsLoaded(true)
  }

  useEffect(() => {
    runTests()
  }, [])

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6 text-center">Video Format Test</h1>
        
        <div className="glass rounded-2xl p-6 mb-8">
          <h2 className="heading-md text-neutral-100 mb-4">Video Files Test</h2>
          <p className="text-neutral-300 mb-4">
            This page tests all video files to identify any format issues.
          </p>
          
          <button 
            onClick={runTests}
            className="px-4 py-2 bg-accent-500 text-primary-900 rounded-lg font-medium hover:bg-accent-400 transition-colors duration-300 mb-6"
          >
            Run Tests Again
          </button>
          
          {!isLoaded ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto"></div>
              <span className="ml-3 text-neutral-200">Testing videos...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testVideos.map((video, index) => (
                <div key={index} className="glass rounded-xl p-4">
                  <h3 className="font-medium text-neutral-100 mb-2">{video.name}</h3>
                  <p className="text-sm text-neutral-300 mb-2">URL: {video.url}</p>
                  
                  <div className="mt-3">
                    <video 
                      src={video.url} 
                      controls 
                      className="w-full h-32 object-cover rounded-lg"
                      onError={(e) => {
                        console.error(`Error loading video ${video.name}:`, e)
                      }}
                    />
                  </div>
                  
                  <div className="mt-3">
                    <button 
                      onClick={() => {
                        const videoElement = document.createElement('video')
                        videoElement.src = video.url
                        videoElement.addEventListener('loadeddata', () => {
                          alert(`Video loaded successfully!\nDimensions: ${videoElement.videoWidth}x${videoElement.videoHeight}`)
                        })
                        videoElement.addEventListener('error', (e) => {
                          alert(`Error loading video: ${e}`)
                        })
                        videoElement.load()
                      }}
                      className="text-xs px-3 py-1 bg-primary-700 text-neutral-200 rounded hover:bg-primary-600 transition-colors"
                    >
                      Test Load
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="glass rounded-2xl p-6">
          <h2 className="heading-md text-neutral-100 mb-4">Troubleshooting Steps</h2>
          <ul className="list-disc pl-5 text-neutral-300 space-y-2">
            <li>Ensure all video files are in MP4 format with H.264 codec</li>
            <li>Check that video files are not corrupted</li>
            <li>Verify that the video files are properly encoded for web playback</li>
            <li>Try converting videos to a more web-friendly format if issues persist</li>
            <li>Check browser console for specific error messages</li>
          </ul>
        </div>
      </div>
    </div>
  )
}