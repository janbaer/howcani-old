import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template
})
export class LoginComponent {
  constructor(authService: AuthService,
              route: ActivatedRoute,
              router: Router) {
    this.authService = authService;
    this.router = router;
    this.route = route;
  }

  ngOnInit() {
    if (this.route.url.value[0].path === 'logout') {
      this.logout();
    } else if (this.route.params.token) {
      this.verifyUserToken(this.routeParams.params.token);
    } else {
      this.login();
    }

  }

  redirectToQuestions() {
    this.router.navigate(['questions']);
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
