'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Filter, Grid, List, ExternalLink } from 'lucide-react'
import { projects } from '@/data'
import type { Project } from '@/types'

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'music-video', label: 'Music Videos' },
  { id: 'vfx-breakdown', label: 'VFX Breakdowns' },
  { id: 'short-film', label: 'Short Films' },
  { id: 'documentary', label: 'Documentary' },
]

const sortOptions = [
  { id: 'recent', label: 'Most Recent' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'title', label: 'Title A-Z' },
  { id: 'client', label: 'Client A-Z' },
]

export default function WorkPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    let filtered = projects

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(project => project.category === activeCategory)
    }

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.year - a.year
        case 'oldest':
          return a.year - b.year
        case 'title':
          return a.title.localeCompare(b.title)
        case 'client':
          return (a.client || '').localeCompare(b.client || '')
        default:
          return 0
      }
    })

    setFilteredProjects(filtered)
  }, [activeCategory, sortBy])

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId)
    setIsFilterOpen(false)
  }

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Page Header */}
      <section className="section-spacing bg-hero-gradient">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h1 className="heading-xl text-neutral-100 mb-6 animate-on-scroll">
            My <span className="text-accent-gradient">Work</span>
          </h1>
          <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
            Explore a comprehensive collection of my video projects, from commercial campaigns to artistic narratives, each crafted with precision and creative vision.
          </p>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-8 bg-primary-800/50 sticky top-20 z-30 backdrop-blur-md border-b border-primary-700/50">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-secondary flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              
              <div className={`${isFilterOpen ? 'flex' : 'hidden lg:flex'} flex-wrap gap-2`}>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? 'bg-accent-500 text-primary-900'
                        : 'bg-primary-700/50 text-neutral-300 hover:bg-primary-700 hover:text-neutral-100'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-primary-700/50 border border-primary-600/50 text-neutral-300 px-3 py-2 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-primary-700/50 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-accent-500 text-primary-900'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-accent-500 text-primary-900'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Results Count */}
              <span className="text-neutral-400 body-sm">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="section-spacing">
        <div className="container-padding max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="heading-sm text-neutral-300 mb-4">No projects found</h3>
              <p className="body-md text-neutral-400 mb-6">
                Try adjusting your filters to see more results.
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSortBy('recent')
                }}
                className="btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid-auto-fit' : 'space-y-6'}>
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  viewMode={viewMode}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

interface ProjectCardProps {
  project: Project
  viewMode: 'grid' | 'list'
  index: number
}

function ProjectCard({ project, viewMode, index }: ProjectCardProps) {
  if (viewMode === 'list') {
    return (
      <div
        className="group bg-primary-800/30 border border-primary-700/50 rounded-xl overflow-hidden hover:border-accent-500/50 transition-all duration-300 hover-lift animate-on-scroll"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex flex-col md:flex-row">
          {/* Thumbnail */}
          <div className="relative md:w-80 aspect-video md:aspect-auto overflow-hidden">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primary-900/40 group-hover:bg-primary-900/20 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-accent-500/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                <Play className="w-5 h-5 text-primary-900 ml-0.5" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="bg-accent-500/10 text-accent-500 px-2 py-1 rounded text-xs font-medium">
                    {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  {project.duration && (
                    <span className="text-neutral-400 text-xs">{project.duration}</span>
                  )}
                </div>
                <h3 className="heading-sm text-neutral-100 group-hover:text-accent-500 transition-colors duration-300 mb-2">
                  {project.title}
                </h3>
                {project.client && (
                  <p className="body-sm text-accent-500 font-medium mb-2">{project.client}</p>
                )}
              </div>
              <span className="text-neutral-400 body-sm">{project.year}</span>
            </div>

            <p className="body-sm text-neutral-300 mb-4 line-clamp-2">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-700/50 text-neutral-300 px-2 py-1 rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={`/work/${project.id}`}
              className="inline-flex items-center space-x-2 text-accent-500 hover:text-accent-400 transition-colors duration-300 body-sm font-medium"
            >
              <span>View Project</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-primary-800/30 border border-primary-700/50 hover:border-accent-500/50 hover-lift animate-on-scroll"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-accent-500/90 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-all duration-300 hover:bg-accent-400">
            <Play className="w-6 h-6 text-primary-900 ml-1" fill="currentColor" />
          </div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-primary-800/80 backdrop-blur-sm text-accent-500 px-3 py-1 rounded-full text-sm font-medium border border-accent-500/30">
            {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </span>
        </div>

        {project.duration && (
          <div className="absolute top-4 right-4">
            <span className="bg-primary-800/80 backdrop-blur-sm text-neutral-300 px-3 py-1 rounded-full text-sm font-medium">
              {project.duration}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
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

        {project.client && (
          <div className="mb-4">
            <span className="body-sm text-accent-500 font-medium">
              {project.client}
            </span>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-primary-700/50 text-neutral-300 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-neutral-400 text-xs self-center">
              +{project.tags.length - 3} more
            </span>
          )}
        </div>

        <Link
          href={`/work/${project.id}`}
          className="inline-flex items-center space-x-2 text-accent-500 hover:text-accent-400 transition-colors duration-300 body-sm font-medium"
        >
          <span>View Project</span>
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}