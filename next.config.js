/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // Base query redirects
      {
        source: '/query',
        destination: '/services/inquiry',
        permanent: true,
      },
      {
        source: '/query/:path*',
        destination: '/services/inquiry',
        permanent: true,
      },
      
      // Service-specific redirects
      {
        source: '/query/:path*',
        has: [
          {
            type: 'query',
            key: 'service',
            value: 'sea-to-air-freight-forwarding',
          },
        ],
        destination: '/services/sea-to-air-freight-forwarding',
        permanent: true,
      },
      // ... other service redirects
    ]
  },
}

module.exports = nextConfig 