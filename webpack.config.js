'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    boot: './src/boot.js',
    vendor: ['es6-promise', 'es6-shim', 'reflect-metadata', 'angular2/core', 'angular2/platform/browser']
  },
  output: {
    path: path.resolve(__dirname, './build/scripts'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js"),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: [
            'angular2-annotations',
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-flow-strip-types'
          ]
        }
      }
    ]
  },

  resolve: {
    root: __dirname,
    extensions: ['','.js','.json']
  },

  devtool: 'source-map'
};
