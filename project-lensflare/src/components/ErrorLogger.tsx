'use client'

import { useEffect } from 'react'

export default function ErrorLogger() {
  useEffect(() => {
    console.log('ErrorLogger component mounted')
    
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error)
    }
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
    }
    
    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    
    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])
  
  return null
}