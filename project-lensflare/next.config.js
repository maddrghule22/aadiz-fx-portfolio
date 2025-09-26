/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  // Fix workspace warning
  outputFileTracingRoot: __dirname,
  // Disable ESLint during build (temporary)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable compression
  compress: true,
  // Power by header
  poweredByHeader: false,
}

module.exports = withBundleAnalyzer(nextConfig)