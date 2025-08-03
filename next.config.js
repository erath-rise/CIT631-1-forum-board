/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用实验性功能
  experimental: {
    // App Router 在 Next.js 13+ 中默认启用
  },
  
  // 指定源码目录
  distDir: '.next',

  // 图片优化配置
  images: {
    domains: ["localhost", "vercel.app", "vercel.com"],
    formats: ["image/webp", "image/avif"],
    unoptimized: false,
  },

  // 环境变量配置
  env: {
    CUSTOM_KEY: "forum-board",
  },

  // 压缩配置
  compress: true,

  // 性能优化
  poweredByHeader: false,

  // ESLint 配置
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript 配置
  typescript: {
    ignoreBuildErrors: true,
  },

  // 输出配置 - 确保与Vercel兼容
  output: 'standalone',

  // 重定向配置
  async redirects() {
    return []
  },

  // 重写配置
  async rewrites() {
    return []
  },

  // 头部配置
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
