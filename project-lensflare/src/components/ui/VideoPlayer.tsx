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
}

export default function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  muted = true,
  loop = true,
  controls = true,
  className = ''
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [showControls, setShowControls] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleLoadedData = () => setIsLoaded(true)
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !video.muted
    setIsMuted(video.muted)
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