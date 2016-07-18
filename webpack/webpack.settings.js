'use strict';

/**
 * LoaderConfig
 * @param srcPath
 * @returns {*[]}
 */
module.exports = {
    getAppEntry: function (config) {
        return [
            //Polyfills
            'babel-polyfill',

            //App Entry
            // './_layouts/default.html'
        ];
    },
    getLoaders: function (config) {
        const babelLoaderPath = (config.testPath) ? config.testPath : config.srcPath;

        return [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: babelLoaderPath,
                exclude: /node_modules|bower_components/,
                query: {
                    presets: ['es2015'],
                    compact: config.compact
                }
            },
            // {
            //     test: /\.html$/,
            //     include: config.srcPath,
            //     exclude: config.srcPath + '/index.html',
            //     loader: `ngtemplate?relativeTo=${config.srcPath}/!html?attrs[]=img:src`
            // },
            {
                test: /\.(woff$|woff2)/,
                include: config.srcPath,
                loader: 'url-loader'
            },
            {
                test: /\.(ico)$/,
                loader: 'raw-loader'
            },
            {
                test: /\.(svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=10000' // inline base64 URLs for <=8k images, direct URLs for the rest
            }
        ];
    }
};