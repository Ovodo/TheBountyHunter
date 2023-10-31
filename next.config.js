/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "magenta-quiet-pike-706.mypinata.cloud",
        port: "",
        pathname: "/ipfs/**",
      },
    ],
  },
};

module.exports = nextConfig;
