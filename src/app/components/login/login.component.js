import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConfigurationService } from './../../services/configuration.service.js';

import template from './login.tpl.html';

@Component({
  selector: 'login',
  template: template
})
export class LoginComponent {
  constructor(authService: AuthService,
              configurationService: ConfigurationService,
              activatedRoute: ActivatedRoute,
              router: Router) {
    this.authService = authService;
    this.configuration = configurationService;
    this.route = activatedRoute;
    this.router = router;
  }

  ngOnInit() {
    if (this.route.routeConfig.path === 'logout') {
      this.logout();
    } else {
      const queryParams = this.route.queryParams.getValue();
      if (queryParams.token) {
        this.verifyUserToken(queryParams.token);
      } else {
        this.login();
      }
    }

  }

  redirectToQuestions() {
    this.router.navigate(['questions', this.configuration.project.user, this.configuration.project.repository]);
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
