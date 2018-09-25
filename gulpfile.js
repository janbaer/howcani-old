'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const watch = require('gulp-watch');
const util = require('gulp-util');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const webpack = require('webpack');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const size = require('gulp-size');
const miniLr = require('mini-lr');

const karma = require('./tasks/karma.js');

const sourceFolder = 'src';
const source = ['src/**/*.html', '!src/**/*.tpl.html'];
const buildFolderName = 'build';
let isProduction = false;

const port = 4000;
const liveReloadPort = 35729;
const liveReload = miniLr();

const exec = require('execa');

const packageFile = require('./package.json');

function notifyChanged(files) {
  liveReload.changed({
    body: {
      files: files
    }
  });
}

function buildWithWebPack(configFile, singleRun, callback) {
  const webpackBuild = webpack(configFile);
  let firstRun = true;

  const callbackOnBuild = function(err, stats) {
    if (err) {
      throw new util.PluginError('webpack:error', err);
    }

    const statistics = stats.toJson({
      children: false,
      source: false,
      modules: false,
      chunkModules: false
    });

    const elapsedTime = Math.round(statistics.time / 10) / 100;

    if (singleRun) {
      callback();
    } else if (firstRun) {
      callback();
      firstRun = false;
    } else {
      util.log(`webpack:build ${elapsedTime} s`);
      notifyChanged(
        statistics.assets.map((file) => file.name)
      );
    }
  };

  if (singleRun) {
    webpackBuild.run(callbackOnBuild);
  } else {
    webpackBuild.watch({ aggregateTimeout: 100 }, callbackOnBuild);
  }
}

gulp.task('serve', ['serve:dev']);

gulp.task('livereload', () => {
  liveReload.listen(liveReloadPort);
});

gulp.task('copyAndWatch', () => {
  const clientWatch = watch(source, { base: sourceFolder, verbose: true });
  clientWatch.on('change', (fileName) => {
    notifyChanged([fileName]);
  });

  gulp.src(source, { base: sourceFolder })
    .pipe(clientWatch)
    .pipe(gulp.dest(buildFolderName));
});

gulp.task('copy', () => {
  gulp.src(source, { base: sourceFolder })
    .pipe(gulp.dest(buildFolderName));
});

gulp.task('copy:assets', () => {
  gulp.src(['assets/CNAME'])
    .pipe(gulp.dest(buildFolderName));
  gulp.src(['assets/images/**/*.*'])
    .pipe(gulp.dest(buildFolderName + '/images'));
});

gulp.task('build:prod', (done) => {
  const webPackProdConfig = require('./webpack.config.prod.js');
  buildWithWebPack(webPackProdConfig, true, done);
});

gulp.task('build:dev', (done) => {
  const webPackConfig = require('./webpack.config.js');
  buildWithWebPack(webPackConfig, false, done);
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
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(less())
    .pipe(gulpif(isProduction, autoprefixer({ browsers: ['> 5%', 'last 2 versions'] })))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(buildFolderName + '/styles'))
    .pipe(size());
});

gulp.task('serve:dev', (done) => {
  isProduction = false;

  runSequence(
    ['build:dev', 'copyAndWatch', 'copy:assets', 'styles'],
    'live-server',
    'watch',
    done
  );
});

gulp.task('serve:prod', (done) => {
  isProduction = true;
  runSequence(
    ['build:prod', 'copy', 'copy:assets', 'styles'],
    'live-server',
    done
  );
});

gulp.task('live-server', () => {
  const gls = require('gulp-live-server');

  const server = gls([gls.script, buildFolderName, port], undefined, liveReloadPort);
  server.start();

  gulp.watch([buildFolderName + '/**/*.**'], function (file) {
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

gulp.task('test-once', karma(true));
gulp.task('test-watch', karma(false));

gulp.task('test-ci', function(done) {
  runSequence('lint', 'test-once', done);
});

gulp.task('publish', done => {
  console.log('Deploy version', packageFile.version);
  exec('./deploy.sh', [`${packageFile.version}`])
    .then(() => done());
});

gulp.task('deploy', done => {
  runSequence(
    'build:prod',
    'copy',
    'copy:assets',
    'styles',
    'publish',
    done
  );
});

gulp.task('test', (done) => {
  runSequence('lint', 'test-watch', done);
});

gulp.task('default', ['serve']);
