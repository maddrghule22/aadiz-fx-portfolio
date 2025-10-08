'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { submitContactForm } from '@/lib/api'
import type React from 'react'

// Define types for our state
interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

interface SubmitStatus {
  type: 'success' | 'error'
  message: string
}

export default function ContactPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      await submitContactForm(formData)
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! I will get back to you soon.' })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: ''
      })
    } catch (error: any) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Failed to send message. Please try again later.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16 section-spacing"
        >
          <motion.h1 
            variants={fadeInUp}
            className="heading-xl text-neutral-100 mb-6"
          >
            Get in <span className="text-accent-gradient">Touch</span>
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="body-lg text-neutral-200 max-w-3xl mx-auto"
          >
            Have a project in mind or want to learn more about my services? Reach out to me and 
            let's start a conversation.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="heading-sm text-neutral-100 mb-6"
            >
              Contact Information
            </motion.h2>
            
            <motion.div 
              variants={fadeInUp}
              className="space-y-8"
            >
              <div className="flex items-start">
                <div className="bg-accent-500/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="heading-xs text-neutral-100 mb-1">Phone</h3>
                  <p className="body-md text-neutral-300">+91 81809 99435</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent-500/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="heading-xs text-neutral-100 mb-1">Email</h3>
                  <p className="body-md text-neutral-300">adityashinde6050@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent-500/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="heading-xs text-neutral-100 mb-1">Location</h3>
                  <p className="body-md text-neutral-300">Pune<br />Maharashtra, India</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-accent-500/10 w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="heading-xs text-neutral-100 mb-1">Working Hours</h3>
                  <p className="body-md text-neutral-300">Monday - Friday: 10AM - 6PM<br />Saturday: 12PM - 4PM</p>
                </div>
              </div>
            </motion.div>
            
            {/* Social Media Links */}
            <motion.div
              variants={fadeInUp}
              className="mt-12"
            >
              <h3 className="heading-xs text-neutral-100 mb-4">Follow Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/aadiz.fx/" className="bg-accent-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-colors duration-300" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.058 4.849-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06h-.63c-2.43 0-2.784-.012-3.808-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                  </svg>
                </a>
                <a href="https://linkedin.com/in/adityashinde" className="bg-accent-500/10 w-10 h-10 rounded-full flex items-center justify-center hover:bg-accent-500 hover:text-primary-900 transition-colors duration-300" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.645-1.44 1.441-1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeInUp}
              className="heading-sm text-neutral-100 mb-6"
            >
              Send Me a Message
            </motion.h2>
            
            {submitStatus && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-500/10 border border-green-500/30' 
                  : 'bg-red-500/10 border border-red-500/30'
              }`}>
                <p className={`${
                  submitStatus.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {submitStatus.message}
                </p>
              </div>
            )}
            
            <motion.form 
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 md:p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-neutral-200 font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full px-4 py-3 bg-primary-800/50 border ${
                      errors.name ? 'border-red-500' : 'border-primary-700/50'
                    } rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="name-error" className="mt-1 text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-neutral-200 font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={`w-full px-4 py-3 bg-primary-800/50 border ${
                      errors.email ? 'border-red-500' : 'border-primary-700/50'
                    } rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1 text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="company" className="block text-neutral-200 font-medium mb-2">
                    Company (Optional)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="projectType" className="block text-neutral-200 font-medium mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
                  >
                    <option value="">Select project type</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Short Film">Short Film</option>
                    <option value="VFX Project">VFX Project</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="budget" className="block text-neutral-200 font-medium mb-2">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="Under ₹1 Lakh">Under ₹1 Lakh</option>
                    <option value="₹1-5 Lakhs">₹1-5 Lakhs</option>
                    <option value="₹5-10 Lakhs">₹5-10 Lakhs</option>
                    <option value="₹10+ Lakhs">₹10+ Lakhs</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className="block text-neutral-200 font-medium mb-2">
                    Timeline
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-800/50 border border-primary-700/50 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300"
                  >
                    <option value="">Select timeline</option>
                    <option value="1-2 Weeks">1-2 Weeks</option>
                    <option value="1 Month">1 Month</option>
                    <option value="2-3 Months">2-3 Months</option>
                    <option value="3+ Months">3+ Months</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-neutral-200 font-medium mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`w-full px-4 py-3 bg-primary-800/50 border ${
                    errors.message ? 'border-red-500' : 'border-primary-700/50'
                  } rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-accent-500 transition-colors duration-300`}
                  placeholder="Tell me about your project or ask me a question..."
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </motion.form>
          </motion.section>
        </div>
      </div>
    </div>
  )
}