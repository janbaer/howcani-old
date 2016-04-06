import { Injectable } from 'angular2/core';
import { Storage } from './storage.service.js';

@Injectable()
export class Configuration {
  constructor(storage: Storage) {
    this.storage = storage;

    this.defaultProject = {
      user: 'howcani-project',
      repository: 'howcani-data'
    };
  }

  isProduction = () => ENVIRONMENT === 'production';

  get project() {
    if (this._project === undefined) {
      this._project = this.storage.getProject();
    }
    if (this._project === undefined) {
      this._project = this.defaultProject;
    }
    return this._project;
  }

  set project(project) {
    this.storage.setProject(project);
    this._project = project;
  }

  get githubToken() {
    if (this._githubToken === undefined) {
      this._githubToken = this.storage.getGithubToken();
    }
    return this._githubToken;
  }

  set githubToken(githubToken) {
    this.storage.setGithubToken(githubToken);
    this._githubToken = githubToken;
  }

  removeGithubToken() {
    this.storage.removeGithubToken();
    this._githubToken = undefined;
  }
}
