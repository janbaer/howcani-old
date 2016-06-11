import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from './../../services/comment.service.js';
import { AuthService } from './../../services/auth.service';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import { ContentEditComponent } from './../content-edit/content-edit.component';
import template from './comment.tpl.html';

@Component({
  selector: 'comment',
  template: template,
  directives: [
    ContentEditComponent,
    UserComponent,
    DateComponent
  ],
  pipes: [MarkdownPipe]
})
export class CommentComponent {
  @Input() comment;
  @Output() onMarkedAsAnswered = new EventEmitter();

  constructor(commentService: CommentService, authService: AuthService) {
    this.commentService = commentService;
    this.authService = authService;
  }

  toggleEditComment() {
    this.isEditingComment = !this.isEditingComment;
  }

  changeComment(newCommentText) {
    this.comment.body = newCommentText;
    this.commentService.updateComment(this.comment)
      .then((updatedComment) => {
        this.comment = updatedComment;
        this.toggleEditComment();
      });
  }

  canMarkQuestionAsAnswered() {
    return this.comment.canMarkQuestionAsAnswered;
  }

  canChangeComment() {
    return this.authService.isSameAuthenticatedUser(this.comment.user) &&
          !this.comment.isCorrectAnswer;
  }

  toggleMarkQuestionAsAnswered() {
    if (!this.canMarkQuestionAsAnswered()) {
      return;
    }

    this.comment.isCorrectAnswer = !this.comment.isCorrectAnswer;
    this.commentService.updateComment(this.comment)
      .then((updatedComment) => {
        this.comment = updatedComment;
        if (this.comment.isCorrectAnswer) {
          this.onMarkedAsAnswered.emit();
        }
      });
  }

}
