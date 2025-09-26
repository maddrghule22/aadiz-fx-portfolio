'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { socialLinks } from '@/data'
import FAQ from '@/components/FAQ'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'adityashinde6050@gmail.com',
    link: 'mailto:adityashinde6050@gmail.com',
    description: 'Drop me a line anytime'
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 81809 99435',
    link: 'tel:+918180999435',
    description: 'Mon-Fri from 9am to 6pm'
  },
  {
    icon: MapPin,
    title: 'Location',
    value: 'Pirangut, Pune',
    link: '#',
    description: 'Available for global projects'
  },
  {
    icon: Clock,
    title: 'Response Time',
    value: '24 Hours',
    link: '#',
    description: 'Usually much faster'
  }
]

const projectTypes = [
  'Commercial/Advertisement',
  'Music Video',
  'Corporate Video',
  'Documentary',
  'Short Film',
  'Social Media Content',
  'VFX/Animation',
  'Live Event Coverage',
  'Product Demo',
  'Other'
]

const budgetRanges = [
  'Under $5,000',
  '$5,000 - $10,000',
  '$10,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000+',
  'Let\'s Discuss'
]

const timelines = [
  'ASAP',
  'Within 2 weeks',
  'Within 1 month',
  'Within 3 months',
  '3+ months',
  'Flexible'
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-primary-900">
      {/* Page Header */}
      <section className="section-spacing bg-hero-gradient">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h1 className="heading-xl text-neutral-100 mb-6 animate-on-scroll">
            Let's Create Something <span className="text-accent-gradient">Extraordinary</span>
          </h1>
          <p className="body-lg text-neutral-300 max-w-3xl mx-auto animate-on-scroll">
            Ready to bring your vision to life? I'm here to help you create compelling video content that captivates your audience and achieves your goals. Let's start the conversation.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-section-gradient">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div
                  key={info.title}
                  className="text-center group animate-on-scroll"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-accent-500/10 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-500/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-accent-500" />
                  </div>
                  <h3 className="heading-xs text-neutral-100 mb-2 group-hover:text-accent-500 transition-colors duration-300">
                    {info.title}
                  </h3>
                  <a
                    href={info.link}
                    className="body-md text-accent-500 hover:text-accent-400 transition-colors duration-300 block mb-2"
                  >
                    {info.value}
                  </a>
                  <p className="body-sm text-neutral-400">{info.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-spacing bg-primary-900">
        <div className="container-padding max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="animate-on-scroll">
              <h2 className="heading-lg text-neutral-100 mb-8">
                Tell Me About Your <span className="text-accent-gradient">Project</span>
              </h2>
              
              {isSubmitted ? (
                <div className="glass rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-accent-500 mx-auto mb-6" />
                  <h3 className="heading-sm text-neutral-100 mb-4">Message Sent Successfully!</h3>
                  <p className="body-md text-neutral-300">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block body-sm font-medium text-neutral-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block body-sm font-medium text-neutral-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block body-sm font-medium text-neutral-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="projectType" className="block body-sm font-medium text-neutral-300 mb-2">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                      >
                        <option value="">Select type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="budget" className="block body-sm font-medium text-neutral-300 mb-2">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block body-sm font-medium text-neutral-300 mb-2">
                        Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block body-sm font-medium text-neutral-300 mb-2">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full bg-primary-800/50 border border-primary-700/50 text-neutral-100 px-4 py-3 rounded-lg focus:outline-none focus:border-accent-500/50 focus:ring-1 focus:ring-accent-500/25 transition-all duration-300 resize-vertical"
                      placeholder="Please describe your project, goals, target audience, and any specific requirements or creative direction you have in mind..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-900 border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-8 animate-on-scroll">
              {/* FAQ */}
              <div className="glass rounded-2xl p-8">
                <h3 className="heading-sm text-neutral-100 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="body-md font-medium text-neutral-100 mb-2">What's your typical turnaround time?</h4>
                    <p className="body-sm text-neutral-300">
                      Most projects are completed within 2-4 weeks, depending on complexity. Rush jobs are available for an additional fee.
                    </p>
                  </div>
                  <div>
                    <h4 className="body-md font-medium text-neutral-100 mb-2">Do you handle filming or just post-production?</h4>
                    <p className="body-sm text-neutral-300">
                      I offer full-service video production from pre-production planning to final delivery, including filming, editing, and VFX.
                    </p>
                  </div>
                  <div>
                    <h4 className="body-md font-medium text-neutral-100 mb-2">What file formats do you deliver?</h4>
                    <p className="body-sm text-neutral-300">
                      I deliver in any format you need: MP4, MOV, ProRes, or custom specifications for your platform requirements.
                    </p>
                  </div>
                  <div>
                    <h4 className="body-md font-medium text-neutral-100 mb-2">Do you work with international clients?</h4>
                    <p className="body-sm text-neutral-300">
                      Absolutely! I work with clients worldwide and can accommodate different time zones for communication.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-2xl p-8">
                <h3 className="heading-sm text-neutral-100 mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-primary-700/30 hover:bg-primary-700/50 border border-primary-600/30 hover:border-accent-500/30 rounded-lg transition-all duration-300 hover-lift"
                    >
                      <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent-500 rounded"></div>
                      </div>
                      <span className="body-sm text-neutral-300">{social.platform}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="glass rounded-2xl p-8 text-center">
                <h3 className="heading-sm text-neutral-100 mb-4">Prefer to Schedule a Call?</h3>
                <p className="body-sm text-neutral-300 mb-6">
                  Sometimes it's easier to discuss your project over the phone. I'm happy to schedule a free consultation call.
                </p>
                <a
                  href="mailto:adityashinde6050@gmail.com?subject=Schedule a Call"
                  className="btn-secondary inline-flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Schedule Call</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  )
}