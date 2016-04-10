import { Component, Input } from 'angular2/core';
import template from './question-details.tpl.html';

import { QuestionService } from './../../services/question.service';
@Component({
  selector: 'question-details',
  template: template,
  directives: [],
  pipes: []
})
export class QuestionDetailsComponent {
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  loadComments(question) {
    this.comments = this.questionService.fetchComments(question.id);
  }

  @Input() question;

}

