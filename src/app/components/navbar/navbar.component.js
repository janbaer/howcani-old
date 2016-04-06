import { Component } from 'angular2/core';
import { OAuth } from '../../services/oauth.service.js';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { Configuration } from '../../services/configuration.service.js';

@Component({
  selector: 'navbar',
  templateUrl: './app/components/navbar/navbar.tpl.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [OAuth]
})

export class NavbarComponent {
  constructor(router: Router, oauth: OAuth, configuration: Configuration) {
    this.router = router;
    this.oauth = oauth;
    this.configuration = configuration;
  }

  isLoggedIn() {
    return this.configuration.githubToken !== null;
  }

  logout() {
    this.oauth.logout();
  }

  loginUsingGithub() {
    this.oauth.loginUsingGithub();
  }
}
