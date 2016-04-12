import { Component } from 'angular2/core';
import { OAuth } from '../../services/oauth.service.js';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { ConfigurationService } from './../../services/configuration.service';
import { MaterializeService } from './../../services/materialize.service';
import template from './navbar.tpl.html';

@Component({
  selector: 'navbar',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  providers: [OAuth]
})

export class NavbarComponent {
  constructor(router: Router,
              oauth: OAuth,
              configuration: ConfigurationService,
              materializeService: MaterializeService) {
    this.router = router;
    this.oauth = oauth;
    this.configuration = configuration;
    this.materialize = materializeService;
  }

  ngOnInit() {
    this.materialize.updateTooltips();
    this.materialize.initSideNav();
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
