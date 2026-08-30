/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/manan.dev',
  assetPrefix: '/manan.dev/',
  images: {
    unoptimized: true, // Required for static export images to load correctly on GitHub Pages
  },
};

export default nextConfig;
