import { Component, Input } from '@angular/core';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import template from './comment.tpl.html';
import { CommentService } from './../../services/comment.service.js';

@Component({
  selector: 'comment',
  template: template,
  directives: [
    UserComponent,
    DateComponent
  ],
  pipes: [MarkdownPipe]
})
export class CommentComponent {
  @Input() comment;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  markCommentAsCorrectAnswer() {
    this.commentService.markCommentAsCorrectAnswer(this.comment);
  }

  unMarkCorrectAnswer() {
    this.commentService.unMarkCorrectAnswer(this.comment);
  }
}
