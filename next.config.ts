import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: '*.cdn.bcebos.com'
      },
      {
        protocol: 'https',
        hostname: 'fyb-1.cdn.bcebos.com'
      },
      {
        protocol: 'https',
        hostname: 'fyb-2.cdn.bcebos.com'
      }
    ]
  }
};

export default nextConfig;
