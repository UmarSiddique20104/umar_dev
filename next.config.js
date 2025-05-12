/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['localhost', 'umarxdev.me', 'www.umarxdev.me'], // Added your domain
  },
  trailingSlash: true,
};

module.exports = nextConfig;
