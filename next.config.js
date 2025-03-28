/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["*"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    const domain = "194.233.68.19:3002";
    return [
      {
        source: "/api/:path*",
        destination: `http://${domain}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
