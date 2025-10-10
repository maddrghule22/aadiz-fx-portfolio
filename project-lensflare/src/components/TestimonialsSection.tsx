'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials = [
  {
    id: '1',
    name: 'Michael Rodriguez',
    company: 'BMW',
    role: 'Marketing Director',
    content: 'Working with this videographer was a game-changer for our brand. The commercial they created for our M Series launch exceeded all expectations and drove a 40% increase in showroom visits.',
    avatar: '/images/testimonials/bmw-director.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    company: 'Ducati',
    role: 'Brand Manager',
    content: 'The Desert X launch video captured the essence of our brand perfectly. The cinematography and storytelling were exceptional, resulting in record-breaking social media engagement.',
    avatar: '/images/testimonials/ducati-manager.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'David Chen',
    company: 'Toyota',
    role: 'Product Manager',
    content: 'The VFX breakdown for our hybrid technology showcase was incredibly detailed and visually stunning. It helped our customers understand complex technology in an engaging way.',
    avatar: '/images/testimonials/toyota-manager.jpg',
    rating: 5
  }
]

export default function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  const testimonialsData = testimonials.length > 0 ? testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonialsData.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonialsData.length])

  const goToNext = () => {
    if (testimonialsData.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
    setIsAutoPlaying(false)
  }

  const goToPrev = () => {
    if (testimonialsData.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    if (testimonialsData.length <= 1) return;
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonialsData[currentIndex]

  return (
    <section className="section-spacing bg-section-gradient">
      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Client <span className="text-accent-gradient">Testimonials</span>
          </h2>
          <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
            Hear what clients say about working with me and the impact of our collaborative projects.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 animate-on-scroll">
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-accent-500/10 rounded-full flex items-center justify-center">
                <Quote className="w-8 h-8 text-accent-500" />
              </div>
            </div>

            {/* Testimonial Content */}
            <div className="text-center mb-8">
              <blockquote className="body-lg text-neutral-100 leading-relaxed mb-6 italic">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Rating */}
              {currentTestimonial.rating && (
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating!
                          ? 'text-accent-500 fill-current'
                          : 'text-neutral-400'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                {currentTestimonial.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.company}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-left">
                  <div className="heading-xs text-neutral-100">
                    {currentTestimonial.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            {testimonialsData.length > 1 && (
              <div className="flex items-center justify-between">
                {/* Previous Button */}
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 bg-primary-700/50 hover:bg-accent-500/20 border border-primary-600/50 hover:border-accent-500/50 rounded-full flex items-center justify-center text-neutral-300 hover:text-accent-500 transition-all duration-300"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots Indicator */}
                <div className="flex space-x-2">
                  {testimonialsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-accent-500'
                          : 'bg-neutral-400 hover:bg-neutral-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  className="w-12 h-12 bg-primary-700/50 hover:bg-accent-500/20 border border-primary-600/50 hover:border-accent-500/50 rounded-full flex items-center justify-center text-neutral-300 hover:text-accent-500 transition-all duration-300"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}