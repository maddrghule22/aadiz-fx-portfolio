'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowDown, ChevronRight } from 'lucide-react'
import VideoPlayer from '@/components/ui/VideoPlayer'

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const scrollToNext = () => {
    const nextSection = document.getElementById('featured-work')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer
          src="/videos/bmw-x1.mp4"
          poster="/images/hero-poster.jpg"
          autoPlay
          muted
          loop
          controls={false}
          className="w-full h-full"
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-primary-900/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center container-padding max-w-5xl mx-auto">
        {/* Main Title */}
        <h1 className="heading-xl text-neutral-100 mb-6 animate-on-scroll">
          CRAFTING VISUAL
          <br />
          <span className="text-accent-gradient">NARRATIVES</span>
        </h1>

        {/* Subtitle */}
        <p className="body-lg text-neutral-200 mb-8 max-w-2xl mx-auto animate-on-scroll">
          Professional videographer and VFX artist from Pirangut, Pune, creating stunning visual stories 
          for automotive brands, fashion, and creative projects worldwide.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-on-scroll">
          <Link
            href="/work"
            className="btn-primary flex items-center space-x-2 group"
          >
            <span>Explore My Work</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          
          <Link
            href="/contact"
            className="btn-secondary flex items-center space-x-2"
          >
            <span>Start a Project</span>
          </Link>
        </div>

        {/* Featured Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 animate-on-scroll">
          <div className="text-center">
            <div className="heading-md text-accent-500 mb-2">50+</div>
            <div className="body-md text-neutral-300">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="heading-md text-accent-500 mb-2">25+</div>
            <div className="body-md text-neutral-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="heading-md text-accent-500 mb-2">5+</div>
            <div className="body-md text-neutral-300">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 text-neutral-300 hover:text-accent-500 transition-all duration-300 hover:scale-110 animate-bounce"
        aria-label="Scroll to next section"
      >
        <ArrowDown className="w-6 h-6" />
      </button>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-1 h-20 bg-accent-500 opacity-30 z-20 hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-1 h-20 bg-accent-500 opacity-30 z-20 hidden lg:block" />
      
      {/* Film Grain Effect */}
      <div 
        className="absolute inset-0 z-15 opacity-10 pointer-events-none mix-blend-overlay"
        style={{
          background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </section>
  )
}