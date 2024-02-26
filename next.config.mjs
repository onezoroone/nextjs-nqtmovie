/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://nqtmovie.helioho.st/api/:path*',
          },
        ]
    },
};

export default nextConfig;
