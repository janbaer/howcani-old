import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from './../../services/comment.service';

import template from './comment-new.tpl.html';

@Component({
  selector: 'comment-new',
  template: template
})
export class CommentNewComponent {
  constructor(commentService: CommentService) {
    this.commentService = commentService;
    this.comment = '';
  }

  @Input() questionNumber;
  @Output() onNewCommentCreated = new EventEmitter();

  hasContent() {
    return this.comment && this.comment.length > 0;
  }

  createComment() {
    this.commentService.postComment(this.questionNumber, this.comment)
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
