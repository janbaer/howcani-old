'use strict';
let path = require('path');
let configPath = path.resolve(__dirname, './../karma.conf.js');

module.exports = function(singleRun) {
  return function(done) {
    const KarmaServer = require('karma').Server;

    const server = new KarmaServer({
      configFile: configPath,
      reporters: singleRun ? ['dots'] : ['spec', 'growl'],
      singleRun: singleRun,
      autoWatch: !singleRun
    }, done);
    server.start();
  }
};
