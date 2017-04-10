'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    path.join(process.cwd(), 'src')
  ),
  new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename:"vendor.js"}),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, comments: false }),
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('production') }),
  new CopyWebpackPlugin([
    { from: './src/service-worker.js', to: path.resolve(__dirname, './build') },
    { from: './node_modules/sw-toolbox/sw-toolbox.js', to: path.resolve(__dirname, './build/scripts/sw-toolbox.js') }
  ])
];

module.exports = webpackConfig;

