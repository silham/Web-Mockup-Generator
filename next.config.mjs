/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = {
            ...config.resolve.fallback,
            stream: require.resolve('stream-browserify'),
          };
        }
        return config;
      },
};

export default nextConfig;
