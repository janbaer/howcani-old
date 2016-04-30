import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { ConfigurationService } from './../../services/configuration.service';
import { MaterializeService } from './../../services/materialize.service';
import template from './navbar.tpl.html';

@Component({
  selector: 'navbar',
  template: template,
  directives: [ROUTER_DIRECTIVES],
  providers: []
})

export class NavbarComponent {
  constructor(configuration: ConfigurationService,
              materializeService: MaterializeService) {
    this.configuration = configuration;
    this.materialize = materializeService;
  }

  ngOnInit() {
    this.materialize.updateTooltips();
  }

  isLoggedIn() {
    return this.configuration.oauthToken !== null;
  }

  getUser() {
    return this.configuration.user;
  }
}
