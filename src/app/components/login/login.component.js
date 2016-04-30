import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';
import { AuthService } from '../../services/auth.service.js';

import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template,
  providers: []
})
export class LoginComponent {
  constructor(authService: AuthService,
              routeParams: RouteParams,
              router: Router) {
    this.authService = authService;
    this.router = router;
    this.routeParams = routeParams;
  }

  ngOnInit() {
    if (this.routeParams.params.logout) {
      this.logout();
    } else if (this.routeParams.params.token) {
      this.verifyUserToken(this.routeParams.params.token);
    } else {
      this.login();
    }

  }

  redirectToQuestions() {
    this.router.navigate(['Questions']);
  }

  verifyUserToken(oauthToken) {
    this.authService.verifyUserToken(oauthToken)
      .subscribe(null, null, this.redirectToQuestions.bind(this));
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.redirectToQuestions();
  }
}
