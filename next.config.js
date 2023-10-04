/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
    serverActions: true,
  },
  images: {
    domains: [
      "external-content.duckduckgo.com",
      "raw.githubusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = {
  ...nextConfig,
  // env:{
  //   GITHUB_ID: env.GITHUB_ID,
  //   GITHUB_SECRET: env.GITHUB_SECRET,
  // }
};
