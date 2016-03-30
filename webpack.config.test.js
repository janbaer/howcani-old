'use strict';

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

webpackConfig.plugins = [
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('test') })
];
webpackConfig.devtool = 'inline-cheap-source-map';

module.exports = webpackConfig;
