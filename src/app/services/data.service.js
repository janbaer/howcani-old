import { Injectable } from 'angular2/core';

import { Configuration } from './configuration.service.js';

@Injectable()
export class DataService {
  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  validate(user, repository) {
    return new Promise((resolve) => {
      // TODO: Verify that the github user and repository exists
      setTimeout(() => {
        let isValid = user === 'howcani-project';
        if (repository) {
          isValid = isValid && repository === 'howcani-data';
        }
        resolve(isValid);
      }, 1000);
    });
  }
}
