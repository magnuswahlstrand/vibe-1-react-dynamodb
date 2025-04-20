/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: '.',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
