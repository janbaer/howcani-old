import { Injectable } from 'angular2/core';
//import { Github } from 'github-api';
const Github = require('github-api');

import { ConfigurationService } from './configuration.service.js';

@Injectable()
export class QuestionService {
  constructor(configuration: ConfigurationService) {
    this.configuration = configuration;
  }

  github() {
    return new Github({
    });
  }

  fetchQuestions() {
    return new Promise((resolve, reject) => {
      const options = {};
      const searchString = `repo:${this.configuration.project.user}/${this.configuration.project.repository}`;
      const search = this.github().getSearch(searchString);

      search.issues(options, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response.items);
        }
      });
    });
  }

  validate(username, repository) {
    return new Promise((resolve) => {
      if (repository) {
        const repo = this.github().getRepo(username, repository);
        repo.show((err) => {
          resolve(err === null);
        });
      } else {
        const user = this.github().getUser();
        user.show(username, (err) => {
          resolve(err === null );
        });
      }
    });
  }
}
