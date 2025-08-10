/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'event-manager.syd1.digitaloceanspaces.com',
        port: '',
        pathname: '/eventhex/**',
      },
    ],
  },
};

export default nextConfig;
