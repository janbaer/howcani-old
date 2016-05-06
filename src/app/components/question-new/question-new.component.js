import { Component, Output, EventEmitter } from 'angular2/core';
import { QuestionService } from './../../services/question.service';
import template from './question-new.tpl.html';

@Component({
  selector: 'question-new',
  template: template,
  directives: []
})
export class QuestionNewComponent {
  @Output() onCloseDialog = new EventEmitter();

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
    this.question = {};
  }

  closeDialog() {
    this.question.labels = this.question.labels ? this.question.labels.split(',') : [];

    this.questionService.postQuestion(this.question)
      .then(() => {
        this.question = {};
        this.onCloseDialog.emit();
      });
  }
}

