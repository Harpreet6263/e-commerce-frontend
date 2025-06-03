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
              hostname: 'tv84.s3.ap-south-1.amazonaws.com',
              port: '',
              pathname: '**',
          },
          {
              protocol: 'https',
              hostname: 'media.istockphoto.com',  // Add this line
              port: '',
              pathname: '**',
          },
      ],
  },
};

export default nextConfig;
