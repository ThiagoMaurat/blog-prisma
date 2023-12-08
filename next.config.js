/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  images: {
    domains: [
      "external-content.duckduckgo.com",
      "raw.githubusercontent.com",
      "avatars.githubusercontent.com",
      "www.freecodecamp.org",
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
