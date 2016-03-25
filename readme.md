# HowCanI

[![Dependency Status](https://david-dm.org/howcani-project/howcani.svg)](https://david-dm.org/howcani-project/howcani)
[![devDependency Status](https://david-dm.org/howcani-project/howcani/dev-status.svg)](https://david-dm.org/howcani-project/howcani#info=devDependencies)
[![Build Status](https://travis-ci.org/howcani-project/howcani.svg?branch=master)](https://travis-ci.org/howcani-project/howcani)

This repository contains the source code for our project **HowCanI**.
It's a simple Webapplication for frequently asqed questions.

For chatting about the project you can goto [howcani.slack.com](https://howcani.slack.com)

## Gulp tasks

- serve (default) - starts the local webserver on port 3000
- serve --port=3001 --lrport=123456 - starts the local webserver on the given port and listen on the give livereloadport
- test - starts the karma server and stays in a watch mode
- test-ci - starts the karma server, executes the tests and finish
- buildAndDeploy --tag=1.0 - builds the app with the production settings and
deploys the build to github with the given tag as version number in the commit
message.

## Links for developer infos

- [Angular.io](https://angular.io)
- [Angular 2 changelog](https://github.com/angular/angular/blob/master/CHANGELOG.md)
- [Google Material Icons](https://design.google.com/icons/)
- [Materialize.css](http://materializecss.com/)
- [Github API for issues](https://developer.github.com/v3/issues/)
