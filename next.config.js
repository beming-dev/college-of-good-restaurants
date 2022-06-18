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
        ? "http://localhost:8080" // development api
        : "http://localhost:8080", // production api
  },
});
