'use strict';

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }});
webpackConfig.plugins.push(uglifyPlugin);

module.exports = webpackConfig;

