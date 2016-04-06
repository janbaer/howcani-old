import { Component } from 'angular2/core';
import { OAuth } from '../../services/oauth.service.js';
import { ConfigurationService } from '../../services/configuration.service.js';
import { RouteParams, Router } from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: './app/components/login/login.tpl.html',
  providers: [OAuth]
})
export class LoginComponent {
  constructor(oauth: OAuth, configuration: ConfigurationService, params: RouteParams, router: Router) {
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
