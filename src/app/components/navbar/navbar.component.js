import { Component } from 'angular2/core';
import { OAuth } from '../../services/oauth.service.js';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { ConfigurationService } from '../../services/configuration.service.js';
import template from './navbar.tpl.html';

@Component({
  selector: 'navbar',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  providers: [OAuth]
})

export class NavbarComponent {
  constructor(router: Router, oauth: OAuth, configuration: ConfigurationService) {
    this.router = router;
    this.oauth = oauth;
    this.configuration = configuration;
  }

  ngOnInit() {
    window.setTimeout(() => {
      $('.button-collapse').sideNav();
      $('.tooltipped').tooltip({ delay: 50 });
    }, 50);
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
