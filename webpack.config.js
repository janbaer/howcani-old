'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(process.cwd(), 'src')
    ),
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename:"vendor.js"}),
    new webpack.DefinePlugin({ ENVIRONMENT: JSON.stringify('development') }),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin([
      { from: './src/service-worker.js', to: path.resolve(__dirname, './build') },
      { from: './node_modules/sw-toolbox/sw-toolbox.js', to: path.resolve(__dirname, './build/scripts/sw-toolbox.js') }
    ])
  ],

  context: process.cwd(),

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules'
    ],
    extensions: ['.js','.json']
  },

  module: {
    rules: [
     {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['es2015', 'angular2']
        }
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: [
          path.join(process.cwd(), 'node_modules/rxjs'),
          path.join(process.cwd(), 'node_modules/@angular')
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader?attrs=false&caseSensitive&removeAttributeQuotes=false'
      }
    ],

    noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
  },

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },

  stats: {
    errorDetails: true,
    colors: true,
    modules: true,
    reasons: true
  },

  devtool: 'source-map'
};
