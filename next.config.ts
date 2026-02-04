/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "alifshop.uz",
            },
            {
                protocol: "https",
                hostname: "yandex.ru",
            },
        ],
    },
};

module.exports = nextConfig;
