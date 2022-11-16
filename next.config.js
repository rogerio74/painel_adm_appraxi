/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: ''
  },

  devIndicators: {
    buildActivity: false
  }
}

module.exports = nextConfig
