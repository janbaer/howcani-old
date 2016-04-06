import { Injectable } from 'angular2/core';
import { Provider, Request } from '@zalando/oauth2-client-js';
import { ConfigurationService } from './configuration.service.js';
import { Router } from 'angular2/router';

@Injectable()
export class OAuth {
  constructor(configuration: ConfigurationService, router: Router) {
    this.configuration = configuration;
    this.router = router;
  }

  logout() {
    this.configuration.removeGithubToken();
    this.router.navigate(['Questions']);
  }

  loginUsingGithub() {
    /*eslint-disable camelcase*/
    const github = new Provider({
      id: 'github',
      authorization_url: 'https://github.com/login/oauth/authorize'
    });

    let client_id = '22b411052b6b16a65c8d';
    if (this.configuration.isProduction) {
      client_id = 'a2e8b31d5208fcd22172';
    }

    const request = new Request({
      client_id
    });

    /*eslint-enable camelcase*/

    github.requestToken(request);
  }
}
