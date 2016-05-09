import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service.js';
import { MaterializeService } from './materialize.service.js';

@Injectable()
export class GithubService {
  constructor(http: Http, configuration: ConfigurationService, materializeService: MaterializeService) {
    this.http = http;
    this.configuration = configuration;
    this.materialize = materializeService;
  }

  buildUrl(path) {
    return `${this.configuration.webApiBaseUrl}/api/${path}`;
  }

  buildSearchParams(searchTerm, page, sort = 'created', order = 'desc') {
    const searchParams = new URLSearchParams();

    searchParams.set('q', searchTerm);
    searchParams.set('sort', sort);
    searchParams.set('order', order);
    if (page) {
      searchParams.set('page', page);
    }

    return searchParams;
  }

  buildRequestOptions(searchParams) {
    const headers = new Headers();

    if (this.configuration.oauthToken) {
      headers.append('Authorization', `token ${this.configuration.oauthToken}`);
    }

    if (searchParams) {
      return new RequestOptions({ search: searchParams, headers: headers });
    }

    return new RequestOptions({ headers: headers });
  }

  handleError(error) {
    this.materialize.showToastMessage('There was an unexpected while sending a request to our WebApi');
    return Observable.throw(error.json().error || 'WebApi error');
  }

  get(path, searchParams) {
    const requestOptions = this.buildRequestOptions(searchParams);
    return this.http.get(this.buildUrl(path), requestOptions)
                    .map((response) => response.json())
                    .catch(this.handleError.bind(this));
  }

  post(path, bodyObject) {
    const requestOptions = this.buildRequestOptions();
    return this.http.post(this.buildUrl(path), JSON.stringify(bodyObject), requestOptions)
                    .map((response) => response.json())
                    .catch(this.handleError.bind(this));
  }

  getCurrentUser() {
    return this.get('user');
  }

  getComments(issueNumber) {
    return this.get(`repos/${this.configuration.project.user}/${this.configuration.project.repository}/issues/${issueNumber}/comments`);
  }

  getLabels() {
    return this.get(`repos/${this.configuration.project.user}/${this.configuration.project.repository}/labels`);
  }

  getUser(username) {
    return this.get(`users/${username}`);
  }

  getRepo(username, repo) {
    return this.get(`repos/${username}/${repo}`);
  }

  searchIssues(searchString, page) {
    const searchParams = this.buildSearchParams(searchString, page);

    return this.get('search/issues', searchParams);
  }

  postIssue(issue) {
    return this.post(`repos/${this.configuration.project.user}/${this.configuration.project.repository}/issues`, issue).toPromise();
  }

}

