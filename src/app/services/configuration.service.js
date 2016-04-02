import { Injectable } from 'angular2/core';
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
}
