/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 768, 1024, 1280, 1536],
  },
  compress: true,
  poweredByHeader: false,
}

export default nextConfig
