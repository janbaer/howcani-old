import { Injectable } from 'angular2/core';
import { ConfigurationService } from './configuration.service';
import { GithubService } from './github.service';

@Injectable()
export class AuthService {
  constructor(configurationService: ConfigurationService, githubService: GithubService) {
    this.configuration = configurationService;
    this.github = githubService;
  }

  verifyUserToken(oauthToken) {
    this.configuration.oauthToken = oauthToken;

    const observable = this.github.getCurrentUser();

    observable.subscribe((user) => {
      this.configuration.user = user;
    }, () => {
      this.configuration.removeOauthToken();
    });

    return observable;
  }

  login() {
    const webApiLoginUrl = `${this.configuration.webApiBaseUrl}/login`;
    window.location.href = webApiLoginUrl;
  }

  logout() {
    this.configuration.user = undefined;
    this.configuration.removeOauthToken();
  }
}

