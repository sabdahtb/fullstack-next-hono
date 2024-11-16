import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coral-delicate-crow-602.mypinata.cloud',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
