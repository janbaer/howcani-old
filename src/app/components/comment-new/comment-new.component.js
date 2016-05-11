import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionService } from './../../services/question.service';

import template from './comment-new.tpl.html';

@Component({
  selector: 'comment-new',
  template: template,
  directives: []
})
export class CommentNewComponent {
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
    this.comment = '';
  }

  @Input() questionNumber;
  @Output() onNewCommentCreated = new EventEmitter();

  hasContent() {
    return this.comment && this.comment.length > 0;
  }

  createComment() {
    this.questionService.postComment(this.questionNumber, this.comment)
      .then((newComment) => {
        this.comment = '';
        this.onNewCommentCreated.emit(newComment);
      });
  }

  ngOnChanges(changes) {
    if (changes.questionNumber && changes.questionNumber.currentValue === null) {
      this.comment = '';
    }
  }
}
