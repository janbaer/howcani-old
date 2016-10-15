# HowCanI

[![Dependency Status](https://david-dm.org/howcani-project/howcani.svg)](https://david-dm.org/howcani-project/howcani)
[![devDependency Status](https://david-dm.org/howcani-project/howcani/dev-status.svg)](https://david-dm.org/howcani-project/howcani#info=devDependencies)
[![Build Status](https://travis-ci.org/howcani-project/howcani.svg?branch=master)](https://travis-ci.org/howcani-project/howcani)

This repository contains the source code for our project **HowCanI**.
It's a simple Webapplication for frequently asked questions.

This project is based on the [angular-es6-starter](https://github.com/blacksonic/angular2-es6-starter) project from [@blacksonic](https://github.com/blacksonic).

## Gulp tasks

- serve (default) - starts the local webserver on port 3000
- serve --port=3001 --lrport=123456 - starts the local webserver on the given port and listen on the give livereloadport
- test - starts the karma server and stays in a watch mode
- test-ci - starts the karma server, executes the tests and finish

## Deployment

To deploy a new version of HowCanI you just have to push a new tag to Github.
The rest will be done by Travis. It's building a new release from the current
master branch with the given Tag as head and publish it automatically to the
github project page.

## Links for developer infos

- [Angular.io](https://angular.io)
- [Angular 2 changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md)
- [Angular 2 style guide](https://github.com/mgechev/angular2-style-guide)
- [RxJS 5.0 Beta](https://github.com/ReactiveX/rxjs)
- [rx-book](http://xgrommx.github.io/rx-book//index.html#)
- [Google Material Icons](https://design.google.com/icons/)
- [Materialize.css](http://materializecss.com/)
- [Github API for issues](https://developer.github.com/v3/issues/)
