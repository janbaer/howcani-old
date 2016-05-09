import { Component } from '@angular/core';
import { RouteParams, Router } from '@angular/router-deprecated';
import { AuthService } from '../../services/auth.service';

import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template
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
