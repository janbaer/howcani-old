'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    boot: './src/boot.js',
    vendor: './src/vendor.js'
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
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
          ]
        }
      }
    ],
    noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
  },

  resolve: {
    root: __dirname,
    extensions: ['','.js','.json']
  },

  devtool: 'source-map'
};
