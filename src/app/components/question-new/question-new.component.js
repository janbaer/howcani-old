import { Component, Output, EventEmitter } from '@angular/core';
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
    this.isCancelled = false;
  }

  onSubmit() {
    if (this.isCancelled) {
      this.isCancelled = false;
      this.onCloseDialog.emit();
      return;
    }

    if (this.question.labels) {
      this.question.labels = this.question.labels.split(',').map((label) => label.trim());
    }

    this.questionService.postQuestion(this.question)
      .then(() => {
        this.question = {};
        this.onCloseDialog.emit();
      });
  }

  cancelDialog() {
    this.question = {};
    this.isCancelled = true;
  }
}

