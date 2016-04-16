'use strict';

import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { NavbarComponent } from './components/navbar/navbar.component.js';
import { SidebarComponent } from './components/sidebar/sidebar.component.js';

import { QuestionService } from './services/question.service';
import { router } from './router.js';

import template from './app.tpl.html';

@Component({
  selector: 'howcani-app',
  template: template,
  directives: [ROUTER_DIRECTIVES, NavbarComponent, SidebarComponent]
})
@RouteConfig(router.config)
export class AppComponent {
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }
  onFilterChanged(searchQuery) {
    this.questionService.fetchQuestions(searchQuery);
  }
}

