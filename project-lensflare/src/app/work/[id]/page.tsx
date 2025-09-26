import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, User, Tag, Clock } from 'lucide-react'
import { projects } from '@/data'
import VideoPlayer from '@/components/ui/VideoPlayer'

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Aadiz.FX`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.thumbnailUrl],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  
  if (!project) {
    notFound()
  }

  const relatedProjects = projects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Back Navigation */}
      <div className="container-padding max-w-7xl mx-auto pt-8">
        <Link
          href="/work"
          className="inline-flex items-center space-x-2 text-neutral-300 hover:text-accent-500 transition-colors duration-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work</span>
        </Link>
      </div>

      {/* Project Header */}
      <section className="container-padding max-w-7xl mx-auto pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <VideoPlayer
              src={project.videoUrl}
              poster={project.thumbnailUrl}
              autoPlay={false}
              muted={false}
              controls={true}
              className="w-full aspect-video rounded-xl overflow-hidden"
            />
          </div>

          {/* Project Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-accent-500/10 text-accent-500 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30">
                  {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                {project.duration && (
                  <span className="text-neutral-400 text-sm">{project.duration}</span>
                )}
              </div>
              
              <h1 className="heading-lg text-neutral-100 mb-4">{project.title}</h1>
              
              <p className="body-md text-neutral-300 leading-relaxed mb-6">
                {project.description}
              </p>
            </div>

            {/* Project Details */}
            <div className="space-y-4">
              {project.client && (
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-accent-500" />
                  <div>
                    <div className="body-sm text-neutral-400">Client</div>
                    <div className="body-md text-neutral-100">{project.client}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-accent-500" />
                <div>
                  <div className="body-sm text-neutral-400">Year</div>
                  <div className="body-md text-neutral-100">{project.year}</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <User className="w-5 h-5 text-accent-500 mt-1" />
                <div>
                  <div className="body-sm text-neutral-400 mb-1">Role</div>
                  <div className="space-y-1">
                    {project.role.map((role) => (
                      <div key={role} className="body-sm text-neutral-100">{role}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div>
              <div className="body-sm text-neutral-400 mb-3">Tags</div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary-800/50 text-neutral-300 px-3 py-1 rounded-full text-sm border border-primary-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External Link */}
            <div className="pt-4">
              <Link
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center space-x-2 w-full justify-center"
              >
                <span>Watch on Vimeo</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      {project.beforeAfter && (
        <section className="section-spacing bg-section-gradient">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-neutral-100 mb-6">
                Before & <span className="text-accent-gradient">After</span>
              </h2>
              <p className="body-lg text-neutral-300 max-w-2xl mx-auto">
                See the transformation brought by professional VFX and post-production work
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="group">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <Image
                    src={project.beforeAfter.before}
                    alt="Before VFX"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary-800/90 backdrop-blur-sm text-neutral-100 px-3 py-1 rounded-full text-sm font-medium">
                      Before
                    </span>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                  <Image
                    src={project.beforeAfter.after}
                    alt="After VFX"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-accent-500/90 backdrop-blur-sm text-primary-900 px-3 py-1 rounded-full text-sm font-medium">
                      After
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Behind the Scenes */}
      {project.images && project.images.length > 0 && (
        <section className="section-spacing bg-primary-900">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-neutral-100 mb-6">
                Behind the <span className="text-accent-gradient">Scenes</span>
              </h2>
              <p className="body-lg text-neutral-300 max-w-2xl mx-auto">
                A glimpse into the creative process and production moments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden hover-lift"
                >
                  <Image
                    src={image}
                    alt={`Behind the scenes ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="section-spacing bg-section-gradient">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-neutral-100 mb-6">
                Related <span className="text-accent-gradient">Projects</span>
              </h2>
              <p className="body-lg text-neutral-300 max-w-2xl mx-auto">
                More work in the same category you might find interesting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/work/${relatedProject.id}`}
                  className="group block hover-lift"
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                    <Image
                      src={relatedProject.thumbnailUrl}
                      alt={relatedProject.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-800/80 backdrop-blur-sm text-accent-500 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30">
                        {relatedProject.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="heading-xs text-neutral-100 mb-2 group-hover:text-accent-500 transition-colors duration-300">
                    {relatedProject.title}
                  </h3>
                  
                  {relatedProject.client && (
                    <p className="body-sm text-accent-500 mb-2">{relatedProject.client}</p>
                  )}
                  
                  <p className="body-sm text-neutral-300 line-clamp-2">
                    {relatedProject.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/work" className="btn-secondary">
                View All Projects
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-neutral-100 mb-6">
            Inspired by This <span className="text-accent-gradient">Project?</span>
          </h2>
          <p className="body-lg text-neutral-300 mb-8">
            Let's discuss how we can create something equally compelling for your brand or vision.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary flex items-center space-x-2">
              <span>Start Your Project</span>
              <span>→</span>
            </Link>
            <Link href="/services" className="btn-secondary flex items-center space-x-2">
              <span>View Services</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}