/** @type {import('next').NextConfig} */
const nextConfig = (module.exports = {
  async rewrites() {
    return [
      {
        source: "/example/:path*",
        destination: "http://place.map.kakao.com/:path*",
      },
    ];
  },
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://13.209.174.50:8080" // development api
        : "http://13.209.174.50:8080", // production api
  },
});
