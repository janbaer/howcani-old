import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import { OAuthService } from '../../services/oauth.service';
import { ConfigurationService } from '../../services/configuration.service';
import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template,
  providers: [OAuthService]
})
export class LoginComponent {
  constructor(oauth: OAuthService,
              configuration: ConfigurationService,
              params: RouteParams,
              router: Router) {
    this.oauth = oauth;

    const urlSearchParams = window.location.search;
    const searchParamsArray = urlSearchParams.split('=');
    if (searchParamsArray.length > 1) {
      const code = searchParamsArray[2];
      configuration.githubToken = code;
    }

    router.navigate(['Questions']);
  }
}
