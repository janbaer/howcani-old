import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
//import { Github } from 'github-api';
const Github = require('github-api');

import { ConfigurationService } from './configuration.service.js';

@Injectable()
export class QuestionService {
  constructor(configuration: ConfigurationService, http: Http) {
    this.configuration = configuration;
    this.http = http;
  }

  github() {
    const options = {};

    if (this.configuration.githubToken) {
      options.auth = 'oauth';
      options.token = this.configuration.githubToken;
    }

    return new Github(options);
  }

  fetchQuestions() {
    return new Promise((resolve, reject) => {
      const options = {};
      const searchString = `repo:${this.configuration.project.user}/${this.configuration.project.repository}`;
      const search = this.github().getSearch(searchString);

      search.issues(options, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  }

  buildUrl(path) {
    let url = `https://api.github.com/repos/${this.configuration.project.user}/${this.configuration.project.repository}/${path}`;
    if (this.configuration.oauthToken) {
      const separator = url.lastIndexOf('?') >= 0 ? '&' : '?';
      url += `${separator}access_token=${this.configuration.oauthToken}`;
    }
    return url;
  }

  buildRequestOptions(page) {
    const searchParams = new URLSearchParams();

    //searchParams.set('sort', 'ascending');
    if (this.configuration.oauthToken) {
      searchParams.set('access_token', this.configuration.oauthToken);
    }

    const requestOptions = new RequestOptions({ search: searchParams });
    return requestOptions;
  }

  handleError(error) {
    console.log('Error while featching data');
    return Observable.throw(error.json().error || 'Github error');
  }

  fetchComments(issueNumber) {
    return this.http.get(this.buildUrl(`issues/${issueNumber}/comments`), this.buildRequestOptions())
                    .map((response) => response.json())
                    .catch(this.handleError);
  }

  validate(username, repository) {
    return new Promise((resolve) => {
      if (repository) {
        const repo = this.github().getRepo(username, repository);
        repo.show((err) => {
          resolve(err === null);
        });
      } else {
        const user = this.github().getUser();
        user.show(username, (err) => {
          resolve(err === null );
        });
      }
    });
  }
}
