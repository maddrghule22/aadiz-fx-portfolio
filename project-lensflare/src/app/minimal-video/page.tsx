'use client'

import MinimalVideoPlayer from '@/components/MinimalVideoPlayer'

export default function MinimalVideoTestPage() {
  return (
    <div className="min-h-screen bg-primary-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-8 text-center">Minimal Video Test</h1>
        
        <div className="bg-primary-800 rounded-xl p-6">
          <h2 className="heading-sm text-neutral-100 mb-4">BMW X1 Commercial</h2>
          <div className="aspect-video">
            <MinimalVideoPlayer 
              src="/videos/bmw-x1.mp4" 
              poster="/images/projects/bmw-x1-thumbnail.jpg" 
            />
          </div>
        </div>
      </div>
    </div>
  )
}