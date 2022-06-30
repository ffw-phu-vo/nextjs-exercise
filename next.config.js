/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 60,
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    }
  }
}
