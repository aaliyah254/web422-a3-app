/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/user/:path*',
        destination: 'https://web422-a3-user-api-nu.vercel.app/api/user/:path*',
      },
    ];
  },
};

module.exports = nextConfig;