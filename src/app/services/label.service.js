import { Injectable } from 'angular2/core';
import { Http, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from './configuration.service.js';

@Injectable()
export class LabelService {
  labels = [];

  constructor(configuration: ConfigurationService, http: Http) {
    this.configuration = configuration;
    this.http = http;
  }

  fetchLabels() {
    let url = `https://api.github.com/repos/${this.configuration.project.user}/${this.configuration.project.repository}/labels`;

    if (this.configuration.oauthToken) {
      url += `?access_token=${this.configuration.oauthToken}`;
    }

    this.labels = [];

    const searchParams = new URLSearchParams();
    const requestOptions = new RequestOptions({ search: searchParams });

    return this.http.get(url, requestOptions)
             .map((response) => response.json())
             .catch((error) => {
               console.log('Error while featching data');
               return Observable.throw(error.json().error || 'Github error');
             })
             .subscribe((labels) => {
               this.labels = labels.map((label) => label.name);
             });
  }
}
