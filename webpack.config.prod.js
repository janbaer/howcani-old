'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    path.join(process.cwd(), 'src')
  ),
  new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename:"vendor.js"}),
  new webpack.optimize.UglifyJsPlugin({ minimize: true, mangle: false, comments: false }),
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('production') })
];

module.exports = webpackConfig;

