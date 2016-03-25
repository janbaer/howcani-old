import { Injectable } from 'angular2/core';

import { Configuration } from './configuration.service.js';

@Injectable()
export class DataService {
  constructor(configuration: Configuration) {
    this.configuration = configuration;
  }

  verify(project) {
    return new Promise((resolve) => {
      // TODO: Verify that the github user and repository exists
      setTimeout(() => {
        const isValid = false;//project !== undefined;
        resolve(isValid);
      }, 1000);
    });
  }

  connect() {
    return new Promise((resolve) => {
      // TODO: here we could fetch the latest questions
      resolve();
    });
  }
}
