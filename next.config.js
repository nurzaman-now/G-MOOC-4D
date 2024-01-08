/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com', 'placehold.jp', 'i.imgur.com', 'imgur.com', 'nurz.site'],
    },
    eslint: {
        dirs: ['app', 'utils', 'components', 'redux'], // Only run ESLint on the [...] directories during production builds (next build)
    },
    reactStrictMode: false,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Exclude fs from being bundled during the client-side build
            config.resolve.fallback = {
                fs: false,
                net: false,
                tls: false,
                child_process: false,
            };
        }

        return config;
    },
};

module.exports = nextConfig;
