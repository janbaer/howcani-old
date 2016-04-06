import { Component } from 'angular2/core';
import { OAuth } from '../../services/oauth.service.js';
import { Configuration } from '../../services/configuration.service.js';
import { RouteParams, Router } from 'angular2/router';

@Component({
  selector: 'login',
  templateUrl: './app/components/login/login.tpl.html',
  providers: [OAuth]
})

export class LoginComponent {
  constructor(oauth: OAuth, configuration: Configuration, params: RouteParams, router: Router) {
    this.oauth = oauth;

    const urlSearchParams = window.location.search;
    const searchParamsArray = urlSearchParams.split('code=');
    if (searchParamsArray.length > 1) {
      const code = searchParamsArray[1];
      configuration.githubToken = code;
    }
    
    router.navigate(['Questions']);
  }
}
