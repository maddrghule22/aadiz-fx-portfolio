'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, ExternalLink } from 'lucide-react'

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  client: string;
  thumbnailUrl: string;
  year: number;
  duration: string;
  tags: string[];
  featured: boolean;
}

interface FeaturedWorkProps {
  projects?: Project[];
}

export default function FeaturedWork({ projects = [] }: FeaturedWorkProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  
  // Get featured projects or use provided projects
  const featuredProjects = projects.length > 0 
    ? projects 
    : [
        {
          id: '1',
          title: 'BMW M Series Commercial',
          description: 'High-octane commercial showcasing the power and precision of BMW\'s M Series lineup.',
          category: 'commercial',
          client: 'BMW',
          thumbnailUrl: '/images/projects/bmw-m-series.jpg',
          year: 2023,
          duration: '2:45',
          tags: ['Automotive', 'CGI', 'Motion Graphics'],
          featured: true
        },
        {
          id: '2',
          title: 'Ducati Desert X Launch',
          description: 'Cinematic launch video highlighting the adventurous spirit of the new Ducati Desert X.',
          category: 'commercial',
          client: 'Ducati',
          thumbnailUrl: '/images/projects/ducati-desert-x.jpg',
          year: 2023,
          duration: '1:30',
          tags: ['Motorcycle', 'Adventure', 'VFX'],
          featured: true
        },
        {
          id: '3',
          title: 'Toyota Hybrid Technology',
          description: 'Innovative explainer video demonstrating Toyota\'s cutting-edge hybrid technology.',
          category: 'vfx-breakdown',
          client: 'Toyota',
          thumbnailUrl: '/images/projects/toyota-hybrid.jpg',
          year: 2023,
          duration: '3:15',
          tags: ['Automotive', 'Technology', 'Animation'],
          featured: true
        },
        {
          id: '4',
          title: 'Audi e-tron GT Reveal',
          description: 'Futuristic reveal of Audi\'s all-electric performance sedan with stunning VFX.',
          category: 'commercial',
          client: 'Audi',
          thumbnailUrl: '/images/projects/audi-etron.jpg',
          year: 2023,
          duration: '2:10',
          tags: ['Electric', 'Luxury', 'CGI'],
          featured: true
        }
      ];

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-advance if no project is being hovered
      if (hoveredProject === null) {
        setActiveProjectIndex((prevIndex) => 
          prevIndex === featuredProjects.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, 3000); // Change project every 3 seconds

    return () => clearInterval(interval);
  }, [hoveredProject, featuredProjects.length]);

  // Update active project when hovered
  const handleProjectHover = (projectId: string, index: number) => {
    setHoveredProject(projectId);
    setActiveProjectIndex(index);
  };

  // Reset to auto when mouse leaves
  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  return (
    <section id="featured-work" className="section-spacing bg-section-gradient">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Featured <span className="text-accent-gradient">Work</span>
          </h2>
          <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
            Showcasing my latest client work including automotive commercials, fashion editorials, 
            and creative projects for leading brands.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-xl bg-primary-800 hover-lift animate-on-scroll ${
                activeProjectIndex === index ? 'ring-2 ring-accent-500' : ''
              }`}
              onMouseEnter={() => handleProjectHover(project.id, index)}
              onMouseLeave={handleMouseLeave}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Project Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.thumbnailUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-accent-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-accent-400">
                    <Play className="w-6 h-6 text-primary-900 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-800/80 backdrop-blur-sm text-accent-500 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30">
                    {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>

                {/* Duration */}
                {project.duration && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary-800/80 backdrop-blur-sm text-neutral-300 px-3 py-1 rounded-full text-sm font-medium">
                      {project.duration}
                    </span>
                  </div>
                )}

                {/* Autoplay Indicator */}
                {activeProjectIndex === index && (
                  <div className="absolute bottom-4 right-4">
                    <div className="flex space-x-1">
                      {featuredProjects.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full ${
                            i === activeProjectIndex
                              ? 'bg-accent-500'
                              : 'bg-neutral-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="heading-xs text-neutral-100 group-hover:text-accent-500 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <span className="text-neutral-400 body-sm">{project.year}</span>
                </div>
                
                <p className="body-sm text-neutral-300 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Client */}
                {project.client && (
                  <div className="mb-4">
                    <span className="body-sm text-accent-500 font-medium">
                      {project.client}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags && project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary-700/50 text-neutral-300 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 3 && (
                    <span className="text-neutral-400 text-xs self-center">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Project Link */}
                <Link
                  href={`/work/${project.id}`}
                  className="inline-flex items-center space-x-2 text-accent-500 hover:text-accent-400 transition-colors duration-300 body-sm font-medium"
                >
                  <span>View Project</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Work CTA */}
        <div className="text-center animate-on-scroll">
          <Link
            href="/work"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <span>View All Work</span>
            <ExternalLink className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}