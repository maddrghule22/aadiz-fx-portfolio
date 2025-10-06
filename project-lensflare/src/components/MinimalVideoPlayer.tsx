'use client'

import { useState, useRef, useEffect } from 'react'

export default function MinimalVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleError = () => {
      setError('Failed to load video')
    }

    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('error', handleError)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      video.play().catch(err => {
        setError('Failed to play video: ' + err.message)
      })
      setIsPlaying(true)
    }
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-center">
        <p className="text-red-400">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg"
      >
        <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center">
          {isPlaying ? '❚❚' : '▶'}
        </div>
      </button>
    </div>
  )
}