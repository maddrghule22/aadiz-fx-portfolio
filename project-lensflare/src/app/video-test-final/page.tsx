'use client'

import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'

export default function VideoTestFinalPage() {
  const testVideos = [
    {
      title: "BMW M Series",
      src: "/videos/bmw-m-series.mp4",
      poster: "/images/projects/bmw-x1-thumbnail.jpg"
    },
    {
      title: "Ducati Desert X",
      src: "/videos/ducati-desert-x.mp4",
      poster: "/images/projects/ducati-desert-x.jpg"
    },
    {
      title: "Toyota Hybrid",
      src: "/videos/toyota-hybrid.mp4",
      poster: "/images/projects/toyota-hybrid.jpg"
    },
    {
      title: "Audi e-tron",
      src: "/videos/audi-etron.mp4",
      poster: "/images/projects/audi-etron.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6">Final Video Test</h1>
        <p className="text-neutral-300 mb-8">Testing all featured project videos</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testVideos.map((video, index) => (
            <div key={index} className="bg-primary-800 rounded-xl overflow-hidden">
              <h2 className="heading-sm text-neutral-100 p-4">{video.title}</h2>
              <div className="aspect-video">
                <SimpleVideoPlayer
                  src={video.src}
                  poster={video.poster}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}