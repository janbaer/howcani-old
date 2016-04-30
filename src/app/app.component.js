'use strict';

import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { QuestionService } from './services/question.service';
import { AuthService } from './services/auth.service';
import { ConfigurationService } from './services/configuration.service';
import { router } from './router';

import template from './app.tpl.html';

@Component({
  selector: 'howcani-app',
  template: template,
  directives: [ROUTER_DIRECTIVES, NavbarComponent, SidebarComponent]
})
@RouteConfig(router.config)
export class AppComponent {
  constructor(configurationService: ConfigurationService,
              authService: AuthService,
              questionService: QuestionService) {
    this.configuration = configurationService;
    this.authService = authService;
    this.questionService = questionService;
  }

  ngOnInit() {
    if (this.configuration.oauthToken) {
      this.authService.verifyUserToken(this.configuration.oauthToken);
    }
  }
  onFilterChanged(searchQuery) {
    this.questionService.fetchQuestions(searchQuery);
  }
}

