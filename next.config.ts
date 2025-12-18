import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ['sanity', 'next-sanity'],
  async redirects() {
    return [
      {
        source: '/studio',
        destination: 'http://localhost:3333',
        permanent: false,
      },
      {
        source: '/studio/:path*',
        destination: 'http://localhost:3333/:path*',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
