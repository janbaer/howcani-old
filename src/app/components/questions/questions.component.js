import { Component } from 'angular2/core';
import { MaterializeService } from './../../services/materialize.service';
import { QuestionService } from './../../services/question.service';
import { AuthService } from './../../services/auth.service';
import { QuestionComponent } from './../question/question.component';
import { QuestionDetailsComponent } from './../question-details/question-details.component';

import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [QuestionComponent, QuestionDetailsComponent]
})
export class QuestionsComponent {
  constructor(questionService: QuestionService, materializeService: MaterializeService, authService: AuthService) {
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

  fetchQuestions() {
    this.handleFetchResult(this.questionService.fetchQuestions({}, 1));
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

  closeQuestionDetailsDialog($event) {
    $event.preventDefault();
    this.selectedQuestion = undefined;
    this.materialize.closeDialog('questionDetailsDialog');
  }

  showNewQuestionDialog($event) {
    $event.preventDefault();
    this.materialize.showDialog('newQuestionDialog');
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
