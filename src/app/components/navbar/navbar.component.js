import { Component } from 'angular2/core';
import { Provider, Request } from '@zalando/oauth2-client-js'
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
  selector: 'navbar',
  templateUrl: './app/components/navbar/navbar.tpl.html',
  directives: [ROUTER_DIRECTIVES]
})

export class NavbarComponent {
  constructor(router: Router) {
    this.router = router;
  }

  loginUsingGithub() {
    var github = new Provider({
      id: 'github',
      authorization_url: 'https://github.com/login/oauth/authorize'
    });

    var request = new Request({
      client_id: '22b411052b6b16a65c8d',
      redirect_uri: 'http://localhost:3000/'
    });

    var uri = github.requestToken(request);

    github.remember(request);

    window.location.href = uri;
  }
}
