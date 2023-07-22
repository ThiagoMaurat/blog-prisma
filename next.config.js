/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    serverActions: true
  },
  images: {
    domains: ['external-content.duckduckgo.com', 'avatars.githubusercontent.com'],
  },
}

module.exports = {
  ...nextConfig,
  // env:{
  //   GITHUB_ID: env.GITHUB_ID,
  //   GITHUB_SECRET: env.GITHUB_SECRET,
  // }
}
