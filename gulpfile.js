'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const watch = require('gulp-watch');
const util = require('gulp-util');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const webpack = require('webpack');
const manifest = require('gulp-manifest');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const runSequence = require('run-sequence');
const size = require('gulp-size');
const del = require('del');
const miniLr = require('mini-lr');
const minimist = require('minimist');

const karma = require('./tasks/karma.js');
require('./tasks/deploy.js');

const sourceFolder = 'src';
const source = ['src/**/*.html', '!src/**/*.tpl.html'];
const destinationFolder = 'build';
let isProduction = false;

const args = minimist(process.argv.slice(2));
const port = args.port || 3000;
const liveReloadPort = args.lrport || 35729;
const liveReload = miniLr();

function notifyChanged(files) {
  liveReload.changed({
    body: {
      files: files
    }
  });
}

function buildWithWebPack(configFile, callback) {
  const webpackBuild = webpack(configFile);
  let firstRun = true;

  webpackBuild.watch({ aggregateTimeout: 100 }, function(err, stats) {
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

    if (firstRun) {
      callback();
      firstRun = false;
    } else {
      util.log(`webpack:build ${elapsedTime} s`);
      notifyChanged(
        statistics.assets.map((file) => file.name)
      );
    }
  });
}

gulp.task('serve', ['serve:dev']);

gulp.task('livereload', () => {
  liveReload.listen(liveReloadPort);
});

gulp.task('copy', () => {
  const clientWatch = watch(source, { base: sourceFolder, verbose: true });
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
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(less())
    .pipe(gulpif(isProduction, autoprefixer({ browsers: ['> 5%', 'last 2 versions'] })))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(destinationFolder + '/styles'))
    .pipe(size());
});

gulp.task('clean', () => {
  return del([destinationFolder]);
});

gulp.task('serve:dev', (done) => {
  isProduction = false;

  runSequence(
    ['build:dev', 'copy', 'copy:assets', 'styles'],
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

gulp.task('buildAndDeploy', (done) => {
  isProduction = true;
  runSequence(
    'clean',
    ['build:prod', 'copy', 'copy:assets', 'styles'],
    'manifest',
    'deploy',
    done
  );
});

gulp.task('live-server', () => {
  const gls = require('gulp-live-server');

  const server = gls([gls.script, destinationFolder, port], undefined, liveReloadPort);
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

gulp.task('manifest', () => {
  gulp.src(['build/**/*', '!build/**/*.*.map'], { base: './build/' })
    .pipe(manifest({
      hash: true,
      preferOnline: false,
      network: ['*'],
      cache: [
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/css/materialize.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.js',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js'
      ],
      filename: 'app-cache.manifest',
      exclude: 'app-cache.manifest'
     }))
    .pipe(gulp.dest('build'));
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

gulp.task('test', (done) => {
  runSequence('lint', 'test-watch', done);
});

gulp.task('default', ['serve']);
