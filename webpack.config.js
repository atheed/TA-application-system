var path = require('path');
var combineLoaders = require('webpack-combine-loaders');

var config = {
    context: path.join(__dirname, 'app/public/src'),
    entry: [
        './index.js',
    ],
    output: {
        path: path.join(__dirname, 'app/public/client'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel'],
            },
            {
                test: /\.css$/,
                loader: combineLoaders([
                    {
                    loader: 'style-loader'
                    }, 
                    {
                        loader: 'css-loader',
                        query: {
                            modules: true,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    }
                ])
            }
        ],
    },
    resolveLoader: {
        root: [
            path.join(__dirname, 'node_modules'),
        ],
    },
    resolve: {
        root: [
            path.join(__dirname, 'node_modules'),
        ],
    }
};

module.exports = config;