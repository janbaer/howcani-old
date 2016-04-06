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

  createProvider() {
    return new Provider({
      id: 'github',
      authorization_url: 'https://github.com/login/oauth/authorize'
    });
  }

  loginUsingGithub() {
    const github = this.createProvider();

    let clientid = '22b411052b6b16a65c8d';
    if (this.configuration.isProduction()) {
      clientid = 'a2e8b31d5208fcd22172';
    }

    /*eslint-disable camelcase*/
    const request = new Request({ client_id: clientid });
    /*eslint-enable camelcase*/

    const requestUri = github.requestToken(request);
    window.location.href = requestUri;
  }

  parse(uri) {
    const github = this.createProvider();
    return github.parse(uri);
  }
}
