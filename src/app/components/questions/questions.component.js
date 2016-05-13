import { Component } from '@angular/core';
import { MaterializeService } from './../../services/materialize.service';
import { QuestionService } from './../../services/question.service';
import { AuthService } from './../../services/auth.service';
import { ConfigurationService } from './../../services/configuration.service';
import { QuestionComponent } from './../question/question.component';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import { QuestionNewComponent } from './../question-new/question-new.component';

import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [
    QuestionComponent,
    QuestionDetailsComponent,
    QuestionNewComponent
  ]
})
export class QuestionsComponent {
  newQuestion = {};

  constructor(configurationService: ConfigurationService,
              questionService: QuestionService,
              materializeService: MaterializeService,
              authService: AuthService) {
    this.configuration = configurationService;
    this.questionService = questionService;
    this.materialize = materializeService;
    this.authService = authService;
  }

  get questions() {
    return this.questionService.questions;
  }

  get hasMoreQuestions() {
    return this.questionService.hasMoreQuestions();
  }

  fetchQuestions(query) {
    this.handleFetchResult(this.questionService.fetchQuestions(query || {}, 1));
  }

  fetchMoreQuestions() {
    this.handleFetchResult(this.questionService.fetchMoreQuestions());
  }

  handleFetchResult(observable) {
    if (observable) {
      this.isBusy = true;
      observable.subscribe(() => {
        this.materialize.updateTooltips();
        this.isBusy = false;
      });
    } else {
      this.busy = false;
    }
  }

  showQuestionDetails(question) {
    this.selectedQuestion = question;
    this.materialize.showDialog('questionDetailsDialog');
  }

  closeQuestionDetailsDialog() {
    this.selectedQuestion = undefined;
    this.materialize.closeDialog('questionDetailsDialog');
  }

  showNewQuestionDialog() {
    const dismissible = false;
    this.materialize.showDialog('newQuestionDialog', dismissible);
  }

  closeNewQuestionDialog() {
    this.materialize.closeDialog('newQuestionDialog');
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  ngOnInit() {
    this.isBusy = true;
    this.fetchQuestions(this.configuration.project.query);
  }
}
