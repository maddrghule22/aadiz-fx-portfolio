'use client'

import { useEffect } from 'react'
import { useScrollAnimation, useParallax, useSmoothScroll } from '@/lib/animations'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useScrollAnimation()
  useParallax()
  useSmoothScroll()

  useEffect(() => {
    // Add cursor trail effect
    const cursor = document.createElement('div')
    cursor.className = 'cursor-trail'
    cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: rgba(0, 191, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      mix-blend-mode: difference;
      transition: transform 0.1s ease;
    `
    document.body.appendChild(cursor)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX - 10 + 'px'
      cursor.style.top = e.clientY - 10 + 'px'
    }

    const handleMouseEnter = () => {
      cursor.style.transform = 'scale(1.5)'
    }

    const handleMouseLeave = () => {
      cursor.style.transform = 'scale(1)'
    }

    document.addEventListener('mousemove', handleMouseMove)
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hover-target')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      if (cursor.parentNode) {
        cursor.parentNode.removeChild(cursor)
      }
    }
  }, [])

  return <>{children}</>
}