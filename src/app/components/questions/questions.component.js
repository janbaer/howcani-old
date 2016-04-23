import { Component } from 'angular2/core';
import { MaterializeService } from './../../services/materialize.service';
import { QuestionService } from './../../services/question.service';
import { QuestionComponent } from './../question/question.component';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import { ScrollDetectComponent } from './../scroll-detect/scroll-detect.component';

import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [QuestionComponent, QuestionDetailsComponent, ScrollDetectComponent]
})
export class QuestionsComponent {
  constructor(questionService: QuestionService, materializeService: MaterializeService) {
    this.questionService = questionService;
    this.materialize = materializeService;
  }

  get questions() {
    return this.questionService.questions;
  }

  fetchQuestions() {
    this.handleFetchResult(this.questionService.fetchQuestions({}, 1));
  }

  get hasMoreQuestions() {
    return this.questionService.hasMoreQuestions();
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

  ngOnInit() {
    this.isBusy = true;
    this.fetchQuestions();
  }
}
