/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/games',
        destination: 'http://localhost:5173/games/',
      },
      {
        source: '/games/:path*',
        destination: 'http://localhost:5173/games/:path*',
      },
      {
        source: '/api/game-results/:path*',
        destination: 'http://localhost:5000/api/game-results/:path*',
      },
      {
        source: '/api/game-stats/:path*',
        destination: 'http://localhost:5000/api/game-stats/:path*',
      },
      {
        source: '/api/healthz',
        destination: 'http://localhost:5000/api/healthz',
      },
    ]
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
      ],
    }]
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
