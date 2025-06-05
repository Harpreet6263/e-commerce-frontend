/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
      return [
          {
              source: '/podcast',
              destination: '/',
              permanent: true,
          },
      ]
  },
  reactStrictMode: false,
  images: {
      remotePatterns: [
          {
              protocol: 'http',
              hostname: 'localhost',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'ik.imagekit.io',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'lh3.googleusercontent.com',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'images.pexels.com',  // Add this line
              port: '',
              pathname: '**',
          },
      ],
  },
};

export default nextConfig;
