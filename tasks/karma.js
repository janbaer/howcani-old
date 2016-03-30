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
    }, function(result) {
      if (result > 0) {
        return done(new Error(`Karma exited with status code ${result}`));
      }
      done();
    });
    server.start();
  }
};
