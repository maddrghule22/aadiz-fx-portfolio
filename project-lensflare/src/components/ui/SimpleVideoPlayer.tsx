'use client'

import { useState, useRef, useEffect } from 'react'

interface SimpleVideoPlayerProps {
  src: string
  poster?: string
  className?: string
  lazy?: boolean
}

export default function SimpleVideoPlayer({
  src,
  poster,
  className = '',
  lazy = false // Changed default to false for autoplay
}: SimpleVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [showPoster, setShowPoster] = useState(true)

  // Set isClient to true on mount to avoid hydration issues
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle video events
  useEffect(() => {
    if (!isClient) return

    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => {
      console.log('Video loaded successfully:', src)
      setIsLoaded(true)
      
      // Automatically play the video when loaded
      if (videoRef.current) {
        videoRef.current.play().catch(error => {
          console.warn('Autoplay failed:', error)
        })
      }
    }
    
    const handlePlay = () => {
      setShowPoster(false)
    }
    
    const handlePause = () => {
      // Only show poster if video is at the beginning
      if (videoRef.current && videoRef.current.currentTime === 0) {
        setShowPoster(true)
      }
    }
    
    const handleError = (e: any) => {
      console.error('Video error:', e)
      
      // Safely access video error properties
      const videoElement = e.target || videoRef.current
      let errorMessage = 'Failed to load video'
      
      if (videoElement?.error) {
        const error = videoElement.error
        console.log('Video error details:', error)
        
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
      setError(errorMessage)
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

    // Add event listeners
    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('error', handleError)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Set the video source
    video.src = src

    // Try to load the video
    video.load()

    // Attempt autoplay
    if (videoRef.current) {
      videoRef.current.muted = true // Mute is often required for autoplay
      videoRef.current.autoplay = true
    }

    return () => {
      if (video) {
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('error', handleError)
        video.removeEventListener('stalled', handleStalled)
        video.removeEventListener('waiting', handleWaiting)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
      }
    }
  }, [src, isClient])

  // Don't render anything on the server
  if (!isClient) {
    return (
      <div className={`relative ${className}`} ref={containerRef}>
        <div className="w-full h-full bg-primary-800 flex items-center justify-center">
          <div className="text-neutral-500">Loading video...</div>
        </div>
      </div>
    )
  }

  // Add error boundary for the component
  if (error) {
    return (
      <div className={`relative flex items-center justify-center bg-primary-800 ${className}`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-neutral-300 mb-2">Video Error</p>
          <p className="text-sm text-neutral-400">{error}</p>
          <div className="mt-4 flex flex-col gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="btn-secondary text-sm"
              aria-label="Reload page"
            >
              Reload Page
            </button>
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
    <div className={`relative ${className}`} ref={containerRef}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true"></div>
            <p className="text-neutral-300">Loading video...</p>
            <p className="text-xs text-neutral-500 mt-2">Source: {src}</p>
          </div>
        </div>
      )}
      
      <div className="relative w-full h-full">
        {poster && showPoster && (
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center z-10"
            style={{ backgroundImage: `url(${poster})` }}
          >
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-16 h-16 bg-accent-500/80 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          muted // Muted is often required for autoplay
          autoPlay
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-label="Project video"
        >
          <source src={src} type="video/mp4" />
          <p>Your browser does not support the video tag. 
             Try updating your browser or using a different one.
          </p>
        </video>
      </div>
    </div>
  )
}