'use client'

import { useEffect } from 'react'

export default function ErrorLogger() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        promise: event.promise
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    console.log('Error logger initialized')

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return null
}