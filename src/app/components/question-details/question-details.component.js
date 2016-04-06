import { Component, Input } from 'angular2/core';

import { QuestionService } from './../../services/question.service';
@Component({
  selector: 'question-details',
  templateUrl: './app/components/question-details/question-details.tpl.html',
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

