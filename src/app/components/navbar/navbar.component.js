import { Component } from 'angular2/core';
import { Provider, Request } from '@zalando/oauth2-client-js'

@Component({
  selector: 'navbar',
  templateUrl: './app/components/navbar/navbar.tpl.html'
})
export class Navbar {

  constructor() {
  }

  loginUsingGithub() {
    console.log('Logging using github!!!');

    var github = new Provider({
      id: 'github',
      authorization_url: 'https://github.com/login/oauth/authorize'
    });

    console.log('Requesting the token');

    var request = new Request({
      client_id: '22b411052b6b16a65c8d',
      redirect_uri: 'http://localhost:3000/'
    });

    var uri = github.requestToken(request);

    github.remember(request);

    window.location.href = uri;
  }
}
