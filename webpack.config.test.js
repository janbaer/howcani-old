'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

webpackConfig.plugins = [
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    path.join(process.cwd(), 'src')
  ),
  new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('test') })
];
webpackConfig.devtool = 'inline-cheap-source-map';

module.exports = webpackConfig;
