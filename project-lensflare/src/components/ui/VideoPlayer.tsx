'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  src: string | { src: string; type: string }[];
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
  playOnScroll?: boolean; // New prop for scroll-based play
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
  className = '',
  playOnScroll = false // New prop
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [showControls, setShowControls] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userInteracted, setUserInteracted] = useState(false) // Track user interaction

  // Log when component mounts
  useEffect(() => {
    console.log('VideoPlayer component mounted')
    return () => {
      console.log('VideoPlayer component unmounted')
    }
  }, [])

  useEffect(() => {
    // Check if video file exists
    if (typeof src === 'string') {
      console.log('Checking video file:', src)
      fetch(src, { method: 'HEAD' })
        .then(response => {
          console.log('Video file check response:', response.status, response.statusText)
          if (!response.ok) {
            throw new Error(`Video file not found: ${src} (Status: ${response.status})`)
          }
          console.log('Video file exists')
        })
        .catch(error => {
          console.error('Video file check failed:', error)
          setError(`Video file not accessible: ${error.message}`)
        })
    }

    const video = videoRef.current
    if (!video) {
      console.log('Video element not available yet')
      return
    }

    console.log('Setting up video element')

    const handleLoadedData = () => {
      console.log('Video loaded successfully')
      setIsLoaded(true)
    }
    
    const handlePlay = () => {
      console.log('Video play event')
      setIsPlaying(true)
    }
    
    const handlePause = () => {
      console.log('Video pause event')
      setIsPlaying(false)
    }
    
    const handleError = (e: any) => {
      console.error('Video error event:', e)
      const error = video?.error;
      let errorMessage = 'Failed to load video. Please check the console for details.'
      
      if (error) {
        console.error('Video error details:', error)
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMessage = 'Video download aborted by user.'
            break
          case error.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error while loading video.'
            break
          case error.MEDIA_ERR_DECODE:
            errorMessage = 'Video decode error. The video may be corrupted.'
            break
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Video format not supported by your browser.'
            break
          default:
            errorMessage = `Unknown video error: ${error.message || 'Unknown error'}`
        }
      }
      
      setError(errorMessage)
    }

    const handleLoadStart = () => {
      console.log('Video load start')
    }

    const handleCanPlay = () => {
      console.log('Video can play')
    }

    video.addEventListener('loadstart', handleLoadStart)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // Log video properties
    console.log('Video element properties:', {
      src: video.src,
      readyState: video.readyState,
      networkState: video.networkState,
      error: video.error
    })

    // If autoplay is enabled, start playing
    if (autoPlay) {
      console.log('Attempting to autoplay video')
      video.play().then(() => {
        console.log('Video autoplay successful')
      }).catch(error => {
        console.warn('Autoplay failed:', error)
        let errorMessage = 'Autoplay blocked by browser. Click play to start video.'
        
        // Check if it's a specific autoplay policy error
        if (error.name === 'NotAllowedError') {
          errorMessage = 'Autoplay prevented by browser policy. Click play to start video.'
        } else if (error.name === 'NotSupportedError') {
          errorMessage = 'Video format not supported. Please try a different browser.'
        }
        
        setError(errorMessage)
      })
    }

    return () => {
      if (video) {
        console.log('Cleaning up video event listeners')
        video.removeEventListener('loadstart', handleLoadStart)
        video.removeEventListener('canplay', handleCanPlay)
        video.removeEventListener('loadeddata', handleLoadedData)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
        video.removeEventListener('error', handleError)
      }
    }
  }, [autoPlay, src])

  // Scroll-based play/pause functionality
  useEffect(() => {
    if (!playOnScroll || userInteracted) return // Don't interfere if user has interacted

    const video = videoRef.current
    if (!video) return

    const handleScroll = () => {
      if (!video || userInteracted) return // Don't interfere if user has interacted

      const rect = video.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const isVisible = rect.top <= windowHeight && rect.bottom >= 0

      if (isVisible) {
        // Video is in view, play it
        video.play().catch(error => {
          console.warn('Play failed:', error)
          if (!error.message.includes('play() failed')) {
            setError('Failed to play video. Please check the console for details.')
          }
        })
      } else {
        // Video is out of view, pause it
        video.pause()
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    // Also check on load
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [playOnScroll, userInteracted])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    setUserInteracted(true) // Mark that user has interacted

    if (isPlaying) {
      video.pause()
    } else {
      video.play().catch(error => {
        console.warn('Play failed:', error)
        setError('Failed to play video. Please check the console for details.')
      })
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    setUserInteracted(true) // Mark that user has interacted

    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  // If there's an error, show error message instead of video
  if (error) {
    return (
      <div className={`relative flex items-center justify-center bg-primary-800 ${className}`}>
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="heading-sm text-neutral-100 mb-2">Video Error</h3>
          <p className="body-md text-neutral-300 mb-4">{error}</p>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => window.location.reload()}
              className="btn-secondary"
            >
              Reload Page
            </button>
            <button 
              onClick={() => {
                setError(null);
                setIsLoaded(false);
                setIsPlaying(autoPlay);
                setIsMuted(muted);
                setUserInteracted(false);
              }}
              className="btn-primary"
            >
              Retry Video
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative video-container ${className}`}
      onMouseEnter={() => controls && setShowControls(true)}
      onMouseLeave={() => controls && setShowControls(false)}
    >
      <video
        ref={videoRef}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        className="w-full h-full object-cover"
      >
        {typeof src === 'string' ? (
          <source src={src} type="video/mp4" />
        ) : (
          src.map((source, index) => (
            <source key={index} src={source.src} type={source.type} />
          ))
        )}
        <p>Your browser does not support the video tag.</p>
      </video>

      {/* Loading State */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-300">Loading video...</p>
          </div>
        </div>
      )}

      {/* Video Overlay */}
      <div className="video-overlay" />

      {/* Controls */}
      {controls && (
        <div
          className={`absolute bottom-6 left-6 right-6 flex items-center justify-between transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="w-12 h-12 bg-primary-800/80 backdrop-blur-sm border border-primary-700/50 rounded-full flex items-center justify-center text-neutral-100 hover:text-accent-500 hover:border-accent-500/50 transition-all duration-300"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 ml-0.5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="w-12 h-12 bg-primary-800/80 backdrop-blur-sm border border-primary-700/50 rounded-full flex items-center justify-center text-neutral-100 hover:text-accent-500 hover:border-accent-500/50 transition-all duration-300"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="text-neutral-300 body-sm bg-primary-800/80 backdrop-blur-sm px-3 py-1 rounded-full border border-primary-700/50">
            Showreel 2024
          </div>
        </div>
      )}
    </div>
  )
}
