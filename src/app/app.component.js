'use strict';

import { Component } from '@angular/core';

import { QuestionService } from './services/question.service';
import { AuthService } from './services/auth.service';
import { ConfigurationService } from './services/configuration.service';

import template from './app.tpl.html';

@Component({
  selector: 'howcani-app',
  template: template
})
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
    window.scrollTo(0, 0);
    this.updateCurrentProjectWithQuery(searchQuery);
    this.questionService.fetchQuestions(searchQuery, 1);
  }

  updateCurrentProjectWithQuery(query) {
    const project = this.configuration.project;
    project.query = query;
    this.configuration.project = project;
  }
}

