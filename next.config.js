/** @type {import('next/dist/next-server/server/config').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
  reactStrictMode: true,
  trailingSlash: false
};

module.exports = nextConfig;
