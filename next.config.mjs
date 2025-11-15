/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 🚫 Disable Turbopack completely
  experimental: {
    turbo: false,
  },

  // ✅ Force Webpack for all builds
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
