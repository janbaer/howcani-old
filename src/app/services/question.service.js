import { Injectable } from 'angular2/core';
//import { Github } from 'github-api';
const Github = require('github-api');

import { Configuration } from './configuration.service.js';

@Injectable()
export class QuestionService {
  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  validate(username, repository) {
    return new Promise((resolve) => {
      const github = new Github({});

      if (repository) {
        const repo = github.getRepo(username, repository);
        repo.show((err) => {
          resolve(err === null);
        });
      } else {
        const user = github.getUser();
        user.show(username, (err) => {
          resolve(err === null );
        });
      }
    });
  }
}
