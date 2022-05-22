/** @type {import('next').NextConfig} */
const nextConfig = 

module.exports = {
    reactStrictMode: true,
    publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
            ? 'http://localhost:8080' // development api
            : 'http://localhost:8080' // production api
    }
}
