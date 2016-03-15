'use strict';

module.exports = function(config) {
  const webpackConfig = require('./webpack.config.test');

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      { pattern: 'src/setup.spec.js' }
    ],
    exclude: [
    ],
    preprocessors: {
      'src/setup.spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: { noInfo: true },
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    concurrency: Infinity,
    autoWatch: false,
    singleRun: true
  });
};