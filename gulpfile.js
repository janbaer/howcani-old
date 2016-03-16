'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const watch = require('gulp-watch');
const util = require('gulp-util');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const changed = require('gulp-changed');
const inject = require('gulp-inject');
const webpack = require('webpack');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const runSequence = require('run-sequence');
const size = require('gulp-size');
const del = require('del');
const miniLr = require('mini-lr');
const path = require('path');

const sourceFolder = 'src';
const source = ['src/**/*.html', 'src/**/*.tpl.html'];
const destinationFolder = 'build';
const port = 3000;

const liveReload = miniLr();

function notifyChanged(files) {
  liveReload.changed({
    body: {
      files: files
    }
  });
}

function buildWithWebPack(configFile, callback) {
  let webpackBuild = webpack(configFile);
  let firstRun = true;

  webpackBuild.watch({ aggregateTimeout: 100 }, function(err, stats) {
    if (err) {
      throw new util.PluginError("webpack:error", err);
    }

    let statistics = stats.toJson({
      children: false,
      source: false,
      modules: false,
      chunkModules: false
    });

    let elapsedTime = Math.round(statistics.time / 10) / 100;

    if (firstRun) {
      callback();
      firstRun = false;
    }
    else {
      util.log(`webpack:build ${elapsedTime} s`);

      notifyChanged(
        statistics.assets.map((file) => file.name)
      );
    }
  });
}

gulp.task('serve', ['serve:dev']);

gulp.task('livereload', () => {
  liveReload.listen(35729);
});

gulp.task('copy', () => {
  let clientWatch = watch(source, { base: sourceFolder, verbose: true });
  clientWatch.on('change', (fileName) => {
    notifyChanged([fileName]);
  });

  gulp.src(source, { base: sourceFolder })
    .pipe(clientWatch)
    .pipe(gulp.dest(destinationFolder));
});

gulp.task('copy:assets', () => {
  gulp.src(['assets/CNAME'])
    .pipe(gulp.dest(destinationFolder));
  gulp.src(['assets/images/**/*.*'])
    .pipe(gulp.dest(destinationFolder + '/images'));
});

gulp.task('build:prod', (callback) => {
  const webPackProdConfig = require('./webpack.config.prod.js');
  buildWithWebPack(webPackProdConfig, callback);
});


gulp.task('build:dev', (callback) => {
  const webPackConfig = require('./webpack.config.js');
  buildWithWebPack(webPackConfig, callback);
});

gulp.task('styles', function () {
  const mainFile = sourceFolder + '/styles/styles.less';

  const injectFiles = gulp.src([
    sourceFolder + '/**/*.less',
    '!' + mainFile
  ], {
    read: false
  });

  const injectOptions = {
    transform: function (filePath) {
      return '@import \'' + filePath + '\';';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src(mainFile)
    .pipe(plumber())
    .pipe(inject(injectFiles, injectOptions))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(less())
    .pipe(autoprefixer({browsers: [ '> 5%', 'last 2 versions', 'ie 8', 'ie 9' ]}))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destinationFolder + '/styles'))
    .pipe(size());
});

gulp.task('clean', () => {
  return del([destinationFolder]);
});

gulp.task('serve:dev', (callback) => {
  runSequence(
    ['build:dev', 'copy', 'copy:assets', 'styles'],
    'live-server',
    'watch',
    callback
  );
});

gulp.task('serve:prod', (callback) => {
  runSequence(
    ['build:prod', 'copy', 'copy:assets', 'styles'],
    'live-server',
    callback
  );
});

gulp.task('live-server', () => {
  const gls = require('gulp-live-server');

  const server = gls.static(destinationFolder, port);
  server.start();

  gulp.watch([destinationFolder + '/**/*.**'], function (file) {
    server.notify.apply(server, [file]);
  });
});

gulp.task('lint', () => {
  return gulp
    .src([sourceFolder + '/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format());
});

gulp.task('watch', () => {
  gulp.watch([sourceFolder + '/**/*.js'], ['lint']);
  gulp.watch([sourceFolder + '/**/*.less'], ['styles']);
});

// Testing with Karma
function runTests(singleRun, done) {
  const configPath = path.resolve(__dirname, './karma.conf.js');
  const KarmaServer = require('karma').Server;
  const server = new KarmaServer({
    configFile: configPath,
    singleRun: singleRun,
    autoWatch: !singleRun
  }, done);

  server.start();
}

gulp.task('clientTest', (done) => {
 runTests(false, done);
});

gulp.task('test', (done) => {
  runSequence('clientTest', done);
});
