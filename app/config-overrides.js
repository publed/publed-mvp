const { ProvidePlugin } = require('webpack');

module.exports = function (config, env) {
    return {
        ...config,
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.m?[jt]sx?$/,
                    enforce: 'pre',
                    use: ['source-map-loader'],
                },
                {
                    test: /\.m?[jt]sx?$/,
                    resolve: {
                        fullySpecified: false,
                    },
                },
            ],
        },
        plugins: [
            ...config.plugins,
            new ProvidePlugin({
                process: 'process/browser',
                Buffer: ['buffer', 'Buffer'],
            }),
        ],
        resolve: {
            ...config.resolve,
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
            fallback: {
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer'),
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                url: require.resolve('url/'),
                zlib: require.resolve('browserify-zlib'),
                https: require.resolve('https-browserify'),
                http: require.resolve('stream-http'),
                path: require.resolve('path-browserify'),
            },
        },
        ignoreWarnings: [/Failed to parse source map/],
    };
};
