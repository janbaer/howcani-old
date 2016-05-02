import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ConfigurationService } from './../../services/configuration.service';
import { MaterializeService } from './../../services/materialize.service';
import { AuthService } from './../../services/auth.service';
import template from './navbar.tpl.html';

@Component({
  selector: 'navbar',
  template: template,
  directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent {
  constructor(configurationService: ConfigurationService,
              authService: AuthService,
              materializeService: MaterializeService) {
    this.configuration = configurationService;
    this.authService = authService;
    this.materialize = materializeService;
  }

  ngOnInit() {
    this.materialize.updateTooltips();
  }

  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  getUser() {
    return this.configuration.user;
  }
}
