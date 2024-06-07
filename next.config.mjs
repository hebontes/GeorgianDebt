/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        taint: true,
        allowMiddlewareResponseBody: true,

    },
};

export default nextConfig;
