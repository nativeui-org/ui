import { withContentlayer } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@nativeui/ui'],
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withContentlayer(nextConfig); 