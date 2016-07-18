'use strict';

/**
 * Webpack Development Environment
 * @type {webpack|exports|module.exports}
 */
const webpack = require('webpack'),
    pkg = require('../package.json'),
    webpackSettings = require('./webpack.settings.js'),
    execSync = require('child_process').execSync,
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    Clean = require('clean-webpack-plugin'),
    path = require('path'),
    rootPath = path.join(__dirname, '../'),
    buildPath = path.join(__dirname, '../public'),
    srcPath = path.join(__dirname, '../src'),
    webpackConfig = {
        srcPath: srcPath,
        compact: true
    };

module.exports = {
    entry: {
        app: webpackSettings.getAppEntry(webpackConfig)
    },
    output: {
        path: buildPath,
        filename: 'bundle-[hash:6].js',
        publicPath: ''
    },
    plugins: [
        new webpack.ProvidePlugin({
            '_': 'lodash'
        }),
        new HtmlWebpackPlugin({
            // favicon: `${srcPath}/assets/icons/`,
            template: './public/index.html',
            hash: true,
            inject: 'body'
        }),
        new Clean(['public'], {
            root: rootPath + '/**/*.js'
        }),
        new webpack.DefinePlugin({
            'jb_UI_VERSION': JSON.stringify(`${pkg.version}-${execSync('git rev-parse --short=8 HEAD')}`),
        })
    ],
    devtool: 'source-map',
    module: {
        loaders: webpackSettings.getLoaders(webpackConfig)
    },
    devServer: {
        port: 4000,
        historyApiFallback: true
    }
};