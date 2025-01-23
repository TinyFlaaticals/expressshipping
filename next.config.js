/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: 'www.expressshipping.mv',
          },
        ],
        destination: 'https://expressshipping.mv',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 