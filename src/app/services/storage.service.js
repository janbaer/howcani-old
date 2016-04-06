import { Injectable } from 'angular2/core';

@Injectable()
export class Storage {
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

  removeGithubToken() {
    this.db.removeItem('githubToken');
  }

  getGithubToken() {
    return this.loadValue('githubToken');
  }

  setGithubToken(githubToken) {
    this.storeValue('githubToken', githubToken);
  }
}

