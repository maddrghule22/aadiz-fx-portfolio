'use client'

import { projects } from '@/data'
import SimpleVideoPlayer from '@/components/ui/SimpleVideoPlayer'

export default function VideoDebugPage() {
  // Get featured projects
  const featuredProjects = projects.filter(project => project.featured)

  return (
    <div className="min-h-screen bg-primary-900 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-8 text-center">Video Debug Page</h1>
        <p className="text-neutral-300 text-center mb-8">Testing video playback for featured projects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredProjects.map((project) => (
            <div key={project.id} className="bg-primary-800 rounded-xl overflow-hidden">
              <h2 className="heading-sm text-neutral-100 p-4">{project.title}</h2>
              <div className="aspect-video">
                <SimpleVideoPlayer
                  src={project.videoUrl}
                  poster={project.thumbnailUrl}
                  className="w-full h-full"
                />
              </div>
              <div className="p-4">
                <p className="body-sm text-neutral-300 mb-2">Video URL: {project.videoUrl}</p>
                <p className="body-sm text-neutral-300 mb-2">Thumbnail URL: {project.thumbnailUrl}</p>
                <p className="body-sm text-neutral-300">{project.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-primary-700/50 text-neutral-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}