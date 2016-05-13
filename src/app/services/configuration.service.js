import { Injectable } from '@angular/core';
import { StorageService } from './storage.service.js';

@Injectable()
export class ConfigurationService {
  constructor(storage: StorageService) {
    this.storage = storage;

    this.defaultProject = {
      user: 'howcani-project',
      repository: 'howcani-data'
    };
  }

  isProduction = () => ENVIRONMENT === 'production';

  get webApiBaseUrl() {
    return this.isProduction() ? 'https://howcani-api.herokuapp.com' : 'http://localhost:8080';
  }

  get user() {
    return this._user;
  }

  set user(user) {
    this._user = user;
  }

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

  get oauthToken() {
    if (this._oauthToken === undefined) {
      this._oauthToken = this.storage.getOauthToken();
    }
    return this._oauthToken;
  }

  set oauthToken(oauthToken) {
    this.storage.setOauthToken(oauthToken);
    this._oauthToken = oauthToken;
  }

  removeOauthToken() {
    this.storage.removeOauthToken();
    this._oauthToken = undefined;
  }
}
