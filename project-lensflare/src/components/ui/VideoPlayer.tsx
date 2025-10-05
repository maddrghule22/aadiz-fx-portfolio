'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  className?: string
  playOnScroll?: boolean // New prop for scroll-based play
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
  const [error, setError] = useState<string | null>(null) // Added error state

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoaded(true)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = (e: any) => { // Added error handler
      console.error('Video error:', e)
      setError('Failed to load video. Please check the console for details.')
    }

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError) // Added error listener

    // If autoplay is enabled, start playing
    if (autoPlay) {
      video.play().catch(error => {
        console.warn('Autoplay failed:', error)
        setError('Autoplay blocked by browser. Click play to start video.')
      })
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError) // Clean up error listener
    }
  }, [autoPlay])

  // Scroll-based play/pause functionality
  useEffect(() => {
    if (!playOnScroll) return

    const video = videoRef.current
    if (!video) return

    const handleScroll = () => {
      if (!video) return

      const rect = video.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const isVisible = rect.top <= windowHeight && rect.bottom >= 0

      if (isVisible) {
        // Video is in view, play it
        video.play().catch(error => {
          console.warn('Play failed:', error)
          if (!error.message.includes('play() failed')) { // Avoid duplicate errors
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
  }, [playOnScroll])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

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
          <button 
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Reload Page
          </button>
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
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-primary-800 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
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