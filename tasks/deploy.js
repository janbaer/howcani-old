'use strict';

const gulp = require('gulp');
const git = require('gulp-git');
const util = require('gulp-util');
const runSequence = require('run-sequence');
const path = require('path');
const minimist = require('minimist');
const del = require('del');

const distFolder = './dist';
const gitOptions = { cwd: distFolder };

const args = minimist(process.argv.slice(2), { string: ['tag'] });
const tag =  args.tag ? args.tag.replace(/^v/, '') : undefined;

function handleError(message, err) {
  if (err) {
    util.log(message, err);
    throw err;
  }
}

gulp.task('deploy', (done) => {
  if (tag === undefined) {
    util.log(util.colors.magenta('No tag specified, call gulp deploy --tag=1.0'));
    util.beep();
    done();
    return;
  }

  runSequence(
    'deleteDistFolder',
    'clone',
    'removeAll',
    'copyBuild',
    'addAll',
    'commit',
    'push',
    done
  );
});

gulp.task('deleteDistFolder', () => {
  return del([distFolder]);
});

gulp.task('copyBuild', () => {
  return gulp.src(['./build/**/*', '!./build/**/*.*.map'])
    .pipe(gulp.dest(distFolder));
});

gulp.task('clone', (done) => {
  git.clone('https://github.com/howcani-project/howcani-project.github.io.git', { args: distFolder }, (err) => {
    handleError('Error while cloning howcani-project from github', err);
    done();
  })
});

gulp.task('removeAll', () => {
  return gulp.src(distFolder + '/**/*')
    .pipe(git.rm(Object.assign({ args: ' -r' }, gitOptions)));
});

gulp.task('addAll', (done) => {
  return gulp.src(distFolder + '/**/*')
    .pipe(git.add(gitOptions));
});

gulp.task('commit', (done) => {
  return gulp.src(distFolder + '/**/*')
    .pipe(git.commit(`New version ${tag}`, Object.assign({ disableAppendPaths: true }, gitOptions)));
});

gulp.task('tag', (done) => {
  git.tag(`${tag}`, `New version ${tag}`, gitOptions, (err) => {
    handleError('Error while tagging new version', err);
    done();
  });
});

gulp.task('push', (done) => {
  git.push('origin', 'master', gitOptions, (err) => {
    handleError('Error while push new version to github', err);
    done();
  });
});
