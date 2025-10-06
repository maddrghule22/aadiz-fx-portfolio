'use client'

import { useState, useRef, useEffect } from 'react'

interface SimpleVideoPlayerProps {
  src: string
  poster?: string
  className?: string
}

export default function SimpleVideoPlayer({
  src,
  poster,
  className = ''
}: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    // Instead of failing on HEAD request, let's just log and proceed
    fetch(src, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          console.warn(`Video file HEAD request failed: ${src}`, response.status);
          // We'll still try to load the video even if HEAD fails
        } else {
          console.log('Video file exists:', src)
        }
      })
      .catch(error => {
        console.warn('Video file check failed (this is okay, will still try to load):', error);
        // We'll still try to load the video even if HEAD fails
      })

    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      console.log('Video loaded successfully:', src)
      setIsLoaded(true)
    }
    
    const handleError = (e: any) => {
      console.error('Video error:', e)
      
      // Safely access video error properties
      const videoElement = e.target || videoRef.current;
      let errorMessage = 'Failed to load video'
      
      if (videoElement?.error) {
        const error = videoElement.error;
        console.log('Video error details:', error);
        
        // Check if error object has the expected properties
        if (typeof error === 'object' && error !== null) {
          if ('code' in error) {
            switch (error.code) {
              case 1: // MEDIA_ERR_ABORTED
                errorMessage = 'Video download aborted'
                break
              case 2: // MEDIA_ERR_NETWORK
                errorMessage = 'Network error while loading video'
                break
              case 3: // MEDIA_ERR_DECODE
                errorMessage = 'Video decode error - the video may be corrupted or use an unsupported codec'
                break
              case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
                errorMessage = 'Video format not supported - the browser cannot play this video format'
                break
              default:
                errorMessage = `Video error: ${error.message || 'Unknown error'}`
            }
          } else if ('message' in error) {
            errorMessage = error.message
          }
        }
      } else if (e?.type === 'error') {
        errorMessage = 'Failed to load video file - check if the file exists and is accessible'
      }
      
      console.error('Video error message:', errorMessage)
      
      // If it's a format error and we haven't retried yet, try with a fallback approach
      if (errorMessage.includes('format not supported') && retryCount < 2) {
        console.log('Attempting to reload video due to format error...')
        setRetryCount(prev => prev + 1)
        setTimeout(() => {
          if (videoRef.current) {
            videoRef.current.load()
          }
        }, 500)
      } else {
        setError(errorMessage)
      }
    }

    const handleLoadStart = () => {
      console.log('Video load start:', src)
    }

    const handleCanPlay = () => {
      console.log('Video can play:', src)
    }

    const handleStalled = () => {
      console.log('Video stalled:', src)
    }

    const handleWaiting = () => {
      console.log('Video waiting for data:', src)
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('waiting', handleWaiting)

    // Try to load the video
    video.load()

    return () => {
      if (video) {
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('stalled', handleStalled)
        video.removeEventListener('waiting', handleWaiting)
      }
    }
  }, [src, retryCount])

  // Add error boundary for the component
  if (error) {
    return (
      <div className={`relative flex items-center justify-center bg-primary-800 ${className}`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-neutral-300 mb-2">Video Error</p>
          <p className="text-sm text-neutral-400">{error}</p>
          <div className="mt-4 flex flex-col gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="btn-secondary text-sm"
            >
              Reload Page
            </button>
            {retryCount < 2 && (
              <button 
                onClick={() => {
                  setError(null)
                  setRetryCount(prev => prev + 1)
                }}
                className="btn-primary text-sm"
              >
                Retry Video
              </button>
            )}
          </div>
          <div className="mt-4 text-xs text-neutral-500">
            <p>Video Source: {src}</p>
            {poster && <p>Poster: {poster}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-300">Loading video...</p>
            <p className="text-xs text-neutral-500 mt-2">Source: {src}</p>
          </div>
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        className="w-full h-full object-cover"
      >
        <source src={src} type="video/mp4" />
        <p>Your browser does not support the video tag. 
           Try updating your browser or using a different one.
        </p>
      </video>
    </div>
  )
}