'use client'

import { useEffect, useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

export function useParallax() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll('.parallax')
      
      parallaxElements.forEach((element) => {
        const speed = element.getAttribute('data-speed') || '0.5'
        const yPos = -(scrolled * parseFloat(speed))
        ;(element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
}

export function useSmoothScroll() {
  useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement
      const href = target.getAttribute('href')
      
      if (href && href.startsWith('#')) {
        e.preventDefault()
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }

    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach(link => link.addEventListener('click', handleClick))

    return () => {
      links.forEach(link => link.removeEventListener('click', handleClick))
    }
  }, [])
}