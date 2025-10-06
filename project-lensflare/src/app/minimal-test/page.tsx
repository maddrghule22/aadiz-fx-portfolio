'use client'

export default function MinimalTestPage() {
  return (
    <div className="min-h-screen bg-primary-900 flex items-center justify-center">
      <div className="text-center p-8 bg-primary-800 rounded-xl">
        <h1 className="heading-xl text-neutral-100 mb-4">Minimal Test</h1>
        <p className="body-lg text-neutral-300">If you can see this, the page is working.</p>
      </div>
    </div>
  )
}