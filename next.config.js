/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    experimental: {
      serverComponents: true,
    }
  },
}


module.exports = {
  ...nextConfig,
  // env:{
  //   GITHUB_ID: env.GITHUB_ID,
  //   GITHUB_SECRET: env.GITHUB_SECRET,
  // }
}
