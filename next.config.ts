import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // optional
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  images: {
    // Optional: allow remote images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
