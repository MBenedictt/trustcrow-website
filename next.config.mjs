/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  // 🔥 FIX: Tell Turbopack to ignore test files inside node_modules
  experimental: {
    turbo: {
      loaders: {
        "*.test.js": false,
        "*.test.ts": false,
        "*.test.mjs": false,
        "*.md": false,
        "*.zip": false,
        "LICENSE": false,
      },
    },
  },
};

export default nextConfig;
