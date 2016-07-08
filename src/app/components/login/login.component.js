import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template
})
export class LoginComponent {
  constructor(authService: AuthService,
              router: Router) {
    this.authService = authService;
    this.router = router;
  }

  ngOnInit() {
    const route = this.router.routerState.snapshot;
    if (route.url === '/logout') {
      this.logout();
    } else if (route.queryParams.token) {
      this.verifyUserToken(route.queryParams.token);
    } else {
      this.login();
    }

  }

  redirectToQuestions() {
    this.router.navigateByUrl('');
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
