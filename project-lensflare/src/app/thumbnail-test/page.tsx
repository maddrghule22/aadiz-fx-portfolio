'use client'

import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'

export default function ThumbnailTestPage() {
  const testProjects = [
    {
      id: 'bmw-x1-commercial',
      title: 'BMW X1 Commercial',
      videoUrl: '/videos/bmw-x1.mp4',
      thumbnailUrl: '/images/projects/bmw-x1-thumbnail.jpg'
    },
    {
      id: 'ducati-xdiavel',
      title: 'Ducati Xdiavel Showcase',
      videoUrl: '/videos/ducati-xdiavel.mp4',
      thumbnailUrl: '/images/projects/ducati-thumbnail.jpg'
    },
    {
      id: 'fashion-edit',
      title: 'Fashion Editorial',
      videoUrl: '/videos/fashion-edit.mp4',
      thumbnailUrl: '/images/projects/fashion-thumbnail.jpg'
    }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6 text-center">Thumbnail Test</h1>
        <p className="text-neutral-300 mb-12 text-center max-w-2xl mx-auto">
          This page tests that video thumbnails are properly displayed before the video loads.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testProjects.map((project) => (
            <div key={project.id} className="glass rounded-2xl overflow-hidden">
              <div className="w-full h-48 relative">
                <SimpleVideoPlayer
                  src={project.videoUrl}
                  poster={project.thumbnailUrl}
                  className="w-full h-full"
                  lazy={false}
                />
              </div>
              <div className="p-6">
                <h3 className="heading-xs text-neutral-100 my-2">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400">
                  Thumbnail: {project.thumbnailUrl}
                </p>
                <p className="text-sm text-neutral-400">
                  Video: {project.videoUrl}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="glass rounded-2xl p-6 mt-12">
          <h2 className="heading-md text-neutral-100 mb-4">How Thumbnails Work</h2>
          <ul className="list-disc pl-5 text-neutral-300 space-y-2">
            <li>Each video player uses the <code className="bg-primary-700 px-1 rounded">poster</code> attribute to display a thumbnail</li>
            <li>Thumbnails are loaded from the <code className="bg-primary-700 px-1 rounded">/images/projects/</code> directory</li>
            <li>The thumbnail is displayed until the video is played</li>
            <li>Thumbnails are optimized for web performance (1200x675 resolution)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}