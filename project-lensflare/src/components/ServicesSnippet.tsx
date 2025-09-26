'use client'

import { Film, Camera, Edit, Zap } from 'lucide-react'

const coreServices = [
  {
    icon: Film,
    title: 'Directing',
    description: 'Creative vision and storytelling that brings concepts to life with cinematic excellence.',
  },
  {
    icon: Camera,
    title: 'Cinematography',
    description: 'Professional filming with cutting-edge equipment to capture stunning visuals.',
  },
  {
    icon: Edit,
    title: 'Post-Production',
    description: 'Expert editing, color grading, and audio mixing for polished final products.',
  },
  {
    icon: Zap,
    title: 'VFX',
    description: 'Advanced visual effects and 3D animation to create impossible realities.',
  },
]

export default function ServicesSnippet() {
  return (
    <section className="section-spacing bg-primary-900">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Core <span className="text-accent-gradient">Services</span>
          </h2>
          <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
            From concept to completion, I provide comprehensive video production services that transform ideas into powerful visual experiences.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreServices.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={service.title}
                className="group text-center p-8 rounded-xl bg-primary-800/50 border border-primary-700/50 hover:border-accent-500/50 transition-all duration-300 hover-lift animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-accent-500" />
                </div>

                {/* Title */}
                <h3 className="heading-xs text-neutral-100 mb-4 group-hover:text-accent-500 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="body-sm text-neutral-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 animate-on-scroll">
          <a
            href="/services"
            className="btn-ghost inline-flex items-center space-x-2 text-lg"
          >
            <span>Explore All Services</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}