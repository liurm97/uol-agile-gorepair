/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    domains: [
      'images.unsplash.com',
      'i.ibb.co',
      'scontent.fotp8-1.fna.fbcdn.net',
    ],
    // Make ENV
    unoptimized: true,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = {
  async redirects() {
    return [
      {
        source: '/admin/default',
        destination: '/admin/orders',
        permanent: true,
      },
      {
        source: '/admin',
        destination: '/admin/orders',
        permanent: true,
      },
      { 
        source: '/contractor',
        destination: '/contractor/orders',
        permanent: true,
      } 
    ];
  }
}
