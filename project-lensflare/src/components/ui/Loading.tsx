'use client'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  className?: string
}

export default function Loading({ size = 'md', text, className = '' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-accent-500 border-t-transparent rounded-full animate-spin`} />
      {text && (
        <p className="body-sm text-neutral-400 animate-pulse">{text}</p>
      )}
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-accent-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <h2 className="heading-sm text-neutral-100 mb-4">Loading...</h2>
        <p className="body-md text-neutral-400">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-primary-800/30 border border-primary-700/50 rounded-xl overflow-hidden">
      <div className="skeleton aspect-video w-full" />
      <div className="p-6">
        <div className="skeleton-title" />
        <div className="skeleton-text" />
        <div className="skeleton-text w-2/3" />
        <div className="flex space-x-2 mt-4">
          <div className="skeleton h-6 w-16 rounded-full" />
          <div className="skeleton h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}