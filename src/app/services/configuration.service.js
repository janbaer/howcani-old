import { Injectable, EventEmitter } from '@angular/core';
import { StorageService } from './storage.service';
import { RecentProjectsService } from './recent-projects.service';

@Injectable()
export class ConfigurationService {
  constructor(storageService: StorageService, recentProjectsService: RecentProjectsService) {
    this.storage = storageService;
    this.recentProjects = recentProjectsService;

    this.onProjectChanged = new EventEmitter();

    this.defaultProject = {
      user: 'janbaer',
      repository: 'howcani-data'
    };
  }

  isProduction = () => ENVIRONMENT === 'production';

  get oauthLoginUrl() {
    const clientId = this.isProduction() ? '82a001ac3b1f5f2aa7ff' : 'c5571ab869190bdc5f33';
    return `https://github-oauth-bridge.jan-baer.vercel.app/login?clientId=${clientId}`;
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
      this.recentProjects.save(this._project);
    }

    if (project.query) {
      this.recentProjects.save(project);
    } else {
      project.query = this.recentProjects.tryRestoreQuery(project);
    }

    this._project = project;
    this.storage.setProject(project);

    if (isOtherProject) {
      this.onProjectChanged.emit(this._project);
    }
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

  isSameProject(p1, p2) {
    return this.recentProjects.isSameProject(p1, p2);
  }
}
