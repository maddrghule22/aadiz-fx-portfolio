'use client'

import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'

export default function TestVideoPage() {
  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6">Video Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="heading-md text-neutral-100 mb-4">Ducati Desert X</h2>
            <SimpleVideoPlayer
              src="/videos/ducati-desert-x.mp4"
              className="w-full h-64"
            />
          </div>
          
          <div>
            <h2 className="heading-md text-neutral-100 mb-4">BMW M Series</h2>
            <SimpleVideoPlayer
              src="/videos/bmw-m-series.mp4"
              className="w-full h-64"
            />
          </div>
          
          <div>
            <h2 className="heading-md text-neutral-100 mb-4">Toyota Hybrid</h2>
            <SimpleVideoPlayer
              src="/videos/toyota-hybrid.mp4"
              className="w-full h-64"
            />
          </div>
          
          <div>
            <h2 className="heading-md text-neutral-100 mb-4">Audi e-tron</h2>
            <SimpleVideoPlayer
              src="/videos/audi-etron.mp4"
              className="w-full h-64"
            />
          </div>
        </div>
      </div>
    </div>
  )
}