/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Configure any environment variables that need to be available at build time
  env: {
    // You can add environment variables here if needed
  },
  // Add any other Next.js configuration options as needed
  images: {
    domains: ['placehold.co'],
  },
}

module.exports = nextConfig
