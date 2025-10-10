'use client'

import { useState, useEffect } from 'react'

export default function ImageTestPage() {
  const [imageStatus, setImageStatus] = useState<Record<string, string>>({})

  // List of images we want to test
  const testImages = [
    '/images/projects/ducati-desert-x.jpg',
    '/images/projects/toyota-hybrid.jpg',
    '/images/projects/audi-etron.jpg',
    '/images/projects/bmw-m-series.jpg',
    '/images/projects/ducati-1.jpg',
    '/images/projects/ducati-2.jpg',
    '/images/projects/toyota-1.jpg',
    '/images/projects/toyota-2.jpg',
    '/images/projects/audi-1.jpg',
    '/images/projects/audi-2.jpg',
    '/images/projects/bmw-1.jpg',
    '/images/projects/bmw-2.jpg',
    '/images/projects/toyota-before.jpg',
    '/images/projects/toyota-after.jpg',
    '/images/projects/bmw-before.jpg',
    '/images/projects/bmw-after.jpg',
    '/images/clients/bmw.svg',
    '/images/clients/ducati.svg',
    '/images/clients/toyota.svg',
    '/images/clients/audi.svg',
    '/images/clients/mercedes.svg',
    '/images/clients/lamborghini.svg'
  ]

  useEffect(() => {
    const checkImageStatus = async () => {
      const status: Record<string, string> = {}
      for (const imageUrl of testImages) {
        try {
          const response = await fetch(imageUrl, { method: 'HEAD' })
          status[imageUrl] = response.ok ? 'Found' : 'Not Found'
        } catch (error: any) {
          status[imageUrl] = `Error: ${error.message || 'Unknown error'}`
        }
      }
      setImageStatus(status)
    }

    checkImageStatus()
  }, [])

  return (
    <div className="min-h-screen bg-hero-gradient py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="heading-xl text-neutral-100 mb-6">Image Test Page</h1>
        <p className="text-neutral-300 mb-8">Testing image availability</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testImages.map((imageUrl, index) => (
            <div key={index} className="bg-primary-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-neutral-100 font-medium truncate">{imageUrl}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  imageStatus[imageUrl] === 'Found' ? 'bg-green-500/20 text-green-500' : 
                  imageStatus[imageUrl] === 'Not Found' ? 'bg-red-500/20 text-red-500' : 
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  {imageStatus[imageUrl] || 'Checking...'}
                </span>
              </div>
              <div className="mt-2">
                {imageStatus[imageUrl] === 'Found' ? (
                  <img 
                    src={imageUrl} 
                    alt="Test" 
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded flex items-center justify-center">
                    <span className="text-gray-500 text-xs">No Image</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}