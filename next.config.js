/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// ✅ FICHIER : next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          bufferutil: false,
          'utf-8-validate': false,
        }
      }
      return config
    },
  }
  