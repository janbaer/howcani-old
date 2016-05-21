import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service.js';

@Injectable()
export class ConfigurationService {

  constructor(storage: StorageService) {
    this.storage = storage;
    this.onProjectChanged = new EventEmitter();

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
    const isOtherProject = !this.isSameProject(this._project, project);

    if (this._project && isOtherProject) {
      this.saveToRecentProjects(this._project);
    }

    project.query = project.query || this.tryRestoreQueryFromRecentProjects(project);
    this._project = project;

    if (isOtherProject) {
      this.onProjectChanged.emit(this._project);
    }
  }

  saveProject(project) {
    this.project = project;
    this.storage.setProject(project);
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

  get recentProjects() {
    if (this._recentProjects === undefined) {
      this._recentProjects = this.storage.getRecentProjects() || [];
    }
    return this._recentProjects;
  }

  set recentProjects(recentProjects) {
    this.storage.setRecentProjects(recentProjects);
    this._recentProjects = recentProjects;
  }

  removeOauthToken() {
    this.storage.removeOauthToken();
    this._oauthToken = undefined;
  }

  tryRestoreQueryFromRecentProjects(project) {
    const recentProject = this.recentProjects.find((p) => this.isSameProject(p, project));
    return recentProject ? recentProject.query : undefined;
  }

  saveToRecentProjects(project) {
    const recentProjects = this.recentProjects;
    const index = recentProjects.findIndex((p) => this.isSameProject(p, project));
    if (index >= 0) {
      recentProjects[index] = project;
    } else {
      recentProjects.push(project);
    }
    this.recentProjects = recentProjects;
  }

  isSameProject(p1, p2) {
    if (p1 && p2) {
      return p1.user === p2.user && p1.repository === p2.repository;
    }
    return false;
  }
}
