import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
    this.db = window.localStorage;
  }

  storeValue(key, value) {
    if (this.db) {
      this.db.setItem(key, value);
    }
  }

  loadValue(key) {
    if (this.db) {
      return this.db.getItem(key);
    }
    return undefined;
  }

  storeObject(key, object) {
    this.storeValue(key, object ? JSON.stringify(object) : undefined);
  }

  loadObject(key) {
    const value = this.loadValue(key);
    return value ? JSON.parse(value) : undefined;
  }

  getProject() {
    return this.loadObject('project');
  }

  setProject(project) {
    this.storeObject('project', project);
  }

  getRecentProjects() {
    return this.loadObject('recentProjects');
  }

  setRecentProjects(projects) {
    this.storeObject('recentProject', projects);
  }

  getLabels() {
    return this.loadObject('labels');
  }

  setLabels(labels) {
    this.storeObject('labels', labels);
  }

  removeOauthToken() {
    this.db.removeItem('oauthToken');
  }

  getOauthToken() {
    return this.loadValue('oauthToken');
  }

  setOauthToken(oauthToken) {
    this.storeValue('oauthToken', oauthToken);
  }
}

