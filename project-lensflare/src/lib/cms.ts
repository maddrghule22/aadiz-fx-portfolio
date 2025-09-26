import { Project, Testimonial, Client, Service, Tool } from '@/types'

// Content Management System utilities for easy updates

export class ContentManager {
  // Project Management
  static async getAllProjects(): Promise<Project[]> {
    // In a real CMS, this would fetch from a database or headless CMS
    const { projects } = await import('@/data')
    return projects
  }

  static async getProjectById(id: string): Promise<Project | null> {
    const projects = await this.getAllProjects()
    return projects.find(project => project.id === id) || null
  }

  static async getProjectsByCategory(category: string): Promise<Project[]> {
    const projects = await this.getAllProjects()
    return projects.filter(project => project.category === category)
  }

  static async getFeaturedProjects(): Promise<Project[]> {
    const projects = await this.getAllProjects()
    return projects.filter(project => project.featured)
  }

  // Testimonial Management
  static async getAllTestimonials(): Promise<Testimonial[]> {
    const { testimonials } = await import('@/data')
    return testimonials
  }

  // Client Management
  static async getAllClients(): Promise<Client[]> {
    const { clients } = await import('@/data')
    return clients
  }

  // Service Management
  static async getAllServices(): Promise<Service[]> {
    const { services } = await import('@/data')
    return services
  }

  // Tool Management
  static async getAllTools(): Promise<Tool[]> {
    const { tools } = await import('@/data')
    return tools
  }

  static async getToolsByCategory(category: string): Promise<Tool[]> {
    const tools = await this.getAllTools()
    return tools.filter(tool => tool.category === category)
  }

  // Search and Filter
  static async searchProjects(query: string): Promise<Project[]> {
    const projects = await this.getAllProjects()
    const searchTerm = query.toLowerCase()
    
    return projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (project.client && project.client.toLowerCase().includes(searchTerm))
    )
  }

  // Content Statistics
  static async getContentStats() {
    const [projects, testimonials, clients, services] = await Promise.all([
      this.getAllProjects(),
      this.getAllTestimonials(),
      this.getAllClients(),
      this.getAllServices()
    ])

    return {
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.featured).length,
      totalClients: clients.length,
      totalTestimonials: testimonials.length,
      totalServices: services.length,
      projectsByCategory: {
        commercial: projects.filter(p => p.category === 'commercial').length,
        'music-video': projects.filter(p => p.category === 'music-video').length,
        'vfx-breakdown': projects.filter(p => p.category === 'vfx-breakdown').length,
        'short-film': projects.filter(p => p.category === 'short-film').length,
        documentary: projects.filter(p => p.category === 'documentary').length,
      }
    }
  }
}

// Helper functions for data validation
export const validateProject = (project: Partial<Project>): boolean => {
  return !!(
    project.id &&
    project.title &&
    project.description &&
    project.category &&
    project.videoUrl &&
    project.thumbnailUrl &&
    project.year &&
    project.role &&
    project.role.length > 0
  )
}

export const validateTestimonial = (testimonial: Partial<Testimonial>): boolean => {
  return !!(
    testimonial.id &&
    testimonial.name &&
    testimonial.company &&
    testimonial.role &&
    testimonial.content
  )
}

// Content formatting utilities
export const formatProjectDescription = (description: string, maxLength: number = 150): string => {
  if (description.length <= maxLength) return description
  return description.substring(0, maxLength).trim() + '...'
}

export const formatDuration = (duration: string): string => {
  // Convert various duration formats to consistent format
  const match = duration.match(/(\d+):(\d+)/)
  if (match) {
    const [, minutes, seconds] = match
    return `${minutes}:${seconds.padStart(2, '0')}`
  }
  return duration
}

export const generateProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// SEO utilities
export const generateProjectMeta = (project: Project) => {
  return {
    title: `${project.title} - Aadiz.FX`,
    description: formatProjectDescription(project.description, 160),
    keywords: [
      ...project.tags,
      project.category,
      'video production',
      'videographer',
      'VFX',
      'post-production'
    ].join(', '),
    openGraph: {
      title: project.title,
      description: formatProjectDescription(project.description, 160),
      images: [
        {
          url: project.thumbnailUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
      type: 'video.other',
    }
  }
}

// Content export utilities for easy backup/migration
export const exportContent = async () => {
  const [projects, testimonials, clients, services, tools] = await Promise.all([
    ContentManager.getAllProjects(),
    ContentManager.getAllTestimonials(),
    ContentManager.getAllClients(),
    ContentManager.getAllServices(),
    ContentManager.getAllTools()
  ])

  return {
    projects,
    testimonials,
    clients,
    services,
    tools,
    exportDate: new Date().toISOString(),
    version: '1.0.0'
  }
}