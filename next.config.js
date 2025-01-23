/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.expressshipping.mv',
          },
        ],
        destination: 'https://expressshipping.mv/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 