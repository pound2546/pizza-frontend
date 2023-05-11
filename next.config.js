/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    SERVER: process.env.SERVER
  }
}

module.exports = nextConfig
