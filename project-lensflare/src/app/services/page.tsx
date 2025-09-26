'use client'

import { useState } from 'react'
import { Film, Camera, Edit, Zap, CheckCircle, ArrowRight, Star } from 'lucide-react'
import { services, tools } from '@/data'

const pricingTiers = [
  {
    id: 'essential',
    name: 'Essential',
    price: '$2,500',
    duration: 'Starting from',
    description: 'Perfect for small businesses and startups looking for professional video content.',
    features: [
      'Up to 2 minutes final video',
      'Basic color grading',
      'Standard audio mixing',
      '2 rounds of revisions',
      'HD (1080p) delivery',
      '1-week turnaround'
    ],
    popular: false,
    cta: 'Get Started'
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$5,000',
    duration: 'Starting from',
    description: 'Comprehensive video production for established brands and marketing campaigns.',
    features: [
      'Up to 5 minutes final video',
      'Advanced color grading',
      'Professional audio mixing',
      'Motion graphics included',
      '4K delivery',
      '3 rounds of revisions',
      '2-week turnaround',
      'Social media cuts'
    ],
    popular: true,
    cta: 'Most Popular'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    duration: 'Quote',
    description: 'Full-scale video production with VFX for large campaigns and productions.',
    features: [
      'Unlimited video length',
      'Advanced VFX & animation',
      'Cinema-grade color grading',
      'Surround sound mixing',
      '8K/Cinema delivery',
      'Unlimited revisions',
      'Priority support',
      'Multi-format delivery',
      'Behind-the-scenes content'
    ],
    popular: false,
    cta: 'Get Quote'
  }
]

export default function ServicesPage() {
  const [activeService, setActiveService] = useState('pre-production')

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Page Header */}
      <section className="section-spacing bg-hero-gradient">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h1 className="heading-xl text-neutral-100 mb-6 animate-on-scroll">
            Professional <span className="text-accent-gradient">Services</span>
          </h1>
          <p className="body-lg text-neutral-300 max-w-3xl mx-auto animate-on-scroll">
            From concept to completion, I provide comprehensive video production services that transform your vision into compelling visual narratives that captivate audiences and drive results.
          </p>
        </div>
      </section>

      {/* Service Tiers */}
      <section id="service-tiers" className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Service <span className="text-accent-gradient">Tiers</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              Choose the perfect package for your project needs and budget
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, index) => {
              const IconComponent = service.icon === 'film' ? Film : 
                                   service.icon === 'camera' ? Camera :
                                   service.icon === 'edit' ? Edit : Zap
              return (
                <div
                  key={service.id}
                  className={`group p-8 rounded-xl border transition-all duration-300 cursor-pointer hover-lift animate-on-scroll ${
                    activeService === service.id
                      ? 'bg-accent-500/10 border-accent-500/50'
                      : 'bg-primary-800/30 border-primary-700/50 hover:border-accent-500/30'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setActiveService(service.id)}
                >
                  <div className="w-16 h-16 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-accent-500" />
                  </div>
                  <h3 className="heading-xs text-neutral-100 mb-4 text-center group-hover:text-accent-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="body-sm text-neutral-300 text-center leading-relaxed">
                    {service.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Service Details */}
          <div className="glass rounded-2xl p-8 md:p-12 animate-on-scroll">
            {services.map((service) => (
              <div
                key={service.id}
                className={`${activeService === service.id ? 'block' : 'hidden'}`}
              >
                <div className="text-center mb-8">
                  <h3 className="heading-md text-neutral-100 mb-4">{service.title}</h3>
                  <p className="body-lg text-neutral-300 max-w-2xl mx-auto">
                    {service.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {service.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                      <span className="body-md text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Transparent <span className="text-accent-gradient">Pricing</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              Choose the package that fits your project scope and budget
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <div
                key={tier.id}
                className={`relative group rounded-2xl border transition-all duration-300 hover-lift animate-on-scroll ${
                  tier.popular
                    ? 'bg-accent-500/5 border-accent-500/50 scale-105'
                    : 'bg-primary-800/30 border-primary-700/50 hover:border-accent-500/30'
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent-500 text-primary-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="heading-sm text-neutral-100 mb-2">{tier.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="heading-lg text-accent-500">{tier.price}</span>
                      {tier.duration && (
                        <span className="body-sm text-neutral-400 ml-2">/ {tier.duration}</span>
                      )}
                    </div>
                    <p className="body-sm text-neutral-300">{tier.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0" />
                        <span className="body-sm text-neutral-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      tier.popular
                        ? 'btn-primary'
                        : 'btn-secondary'
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-on-scroll">
            <p className="body-md text-neutral-300 mb-6">
              Need something custom? Let's discuss your specific requirements.
            </p>
            <a href="/contact" className="btn-ghost text-lg">
              Get Custom Quote →
            </a>
          </div>
        </div>
      </section>

      {/* Tools & Software */}
      <section className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              Professional <span className="text-accent-gradient">Tools</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              I use industry-leading software and cutting-edge technology to deliver exceptional results
            </p>
          </div>

          {/* Tools by Category */}
          <div className="space-y-12">
            {['editing', 'vfx', 'color', 'audio', 'motion'].map((category) => {
              const categoryTools = tools.filter(tool => tool.category === category)
              if (categoryTools.length === 0) return null

              return (
                <div key={category} className="animate-on-scroll">
                  <h3 className="heading-sm text-neutral-100 mb-6 capitalize">
                    {category === 'vfx' ? 'VFX & 3D' : category} Software
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categoryTools.map((tool, index) => (
                      <div
                        key={tool.id}
                        className="group bg-primary-800/30 border border-primary-700/50 rounded-xl p-6 text-center hover:border-accent-500/50 transition-all duration-300 hover-lift"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-12 h-12 bg-accent-500/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent-500/20 transition-colors duration-300">
                          <div className="w-6 h-6 bg-accent-500 rounded"></div>
                        </div>
                        <h4 className="body-sm font-medium text-neutral-100 mb-2">{tool.name}</h4>
                        <div className="flex justify-center">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full mx-0.5 ${
                                i < (tool.proficiency === 'expert' ? 4 : 
                                     tool.proficiency === 'advanced' ? 3 : 
                                     tool.proficiency === 'intermediate' ? 2 : 1)
                                  ? 'bg-accent-500'
                                  : 'bg-primary-700'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
              My <span className="text-accent-gradient">Process</span>
            </h2>
            <p className="body-lg text-neutral-300 max-w-2xl mx-auto animate-on-scroll">
              A proven workflow that ensures exceptional results every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Discovery',
                description: 'Understanding your vision, goals, and requirements through detailed consultation.'
              },
              {
                step: '02',
                title: 'Planning',
                description: 'Creating detailed storyboards, shot lists, and production timelines.'
              },
              {
                step: '03',
                title: 'Production',
                description: 'Professional filming with state-of-the-art equipment and experienced crew.'
              },
              {
                step: '04',
                title: 'Post-Production',
                description: 'Expert editing, color grading, VFX, and audio mixing for the final product.'
              }
            ].map((phase, index) => (
              <div
                key={phase.step}
                className="text-center group animate-on-scroll"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-20 h-20 bg-accent-500/10 border-2 border-accent-500/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 group-hover:border-accent-500/50 transition-all duration-300">
                  <span className="heading-xs text-accent-500 font-bold">{phase.step}</span>
                </div>
                <h3 className="heading-xs text-neutral-100 mb-4 group-hover:text-accent-500 transition-colors duration-300">
                  {phase.title}
                </h3>
                <p className="body-sm text-neutral-300 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing bg-section-gradient">
        <div className="container-padding max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-neutral-100 mb-6 animate-on-scroll">
            Ready to Create Something <span className="text-accent-gradient">Extraordinary?</span>
          </h2>
          <p className="body-lg text-neutral-300 mb-8 animate-on-scroll">
            Let's discuss your project and bring your vision to life with professional video production that exceeds expectations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-on-scroll">
            <a href="/contact" className="btn-primary flex items-center space-x-2">
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="/work" className="btn-secondary flex items-center space-x-2">
              <span>View Portfolio</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}