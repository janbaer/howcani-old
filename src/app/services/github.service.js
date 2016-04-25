import { Injectable } from 'angular2/core';
import { Http, RequestOptions, URLSearchParams, Headers } from 'angular2/http';
//import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service.js';
import { MaterializeService } from './materialize.service.js';

@Injectable()
export class GithubService {
  constructor(http: Http, configuration: ConfigurationService, materializeService: MaterializeService) {
    this.http = http;
    this.configuration = configuration;
    this.materialize = materializeService;
    this.githubApiBaseUrl = 'https://howcani-api.herokuapp.com/api';
  }

  buildUrl(path) {
    let url = `${this.githubApiBaseUrl}/${path}`;
    if (this.configuration.oauthToken) {
      const separator = url.lastIndexOf('?') >= 0 ? '&' : '?';
      url += `${separator}access_token=${this.configuration.oauthToken}`;
    }
    return url;
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
      headers.append('Authorization', `${this.configuration.oauthToken} OAUTH-TOKEN`);
    }

    if (searchParams) {
      return new RequestOptions({ search: searchParams, headers: headers });
    }

    return new RequestOptions({ headers: headers });
  }

  handleError(error) {
    console.log('Error while fetching data', error);
    this.materialize.showToastMessage('There was an unexpected while sending a request to Github');
    //return Observable.throw(error.json().error || 'Github error');
  }

  get(path, searchParams) {
    const requestOptions = this.buildRequestOptions(searchParams);
    return this.http.get(this.buildUrl(path), requestOptions)
                    .map((response) => response.json())
                    .catch(this.handleError.bind(this));
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

  searchIssues(searchString) {
    const searchParams = this.buildSearchParams(searchString);

    return this.get('search/issues', searchParams);
  }

}

