import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { MaterializeService } from './../../services/materialize.service.js';
import { QuestionService } from './../../services/question.service';
import { CommentService } from './../../services/comment.service';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { QuestionStateComponent } from './../question-state/question-state.component';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import { LabelsComponent } from './../labels/labels.component';
import { CommentComponent } from './../comment/comment.component';
import { CommentNewComponent } from './../comment-new/comment-new.component';
import template from './question-details.tpl.html';

@Component({
  selector: 'question-details',
  template: template,
  directives: [
    NgClass,
    CommentComponent,
    CommentNewComponent,
    DateComponent,
    LabelsComponent,
    QuestionStateComponent,
    UserComponent
  ],
  pipes: [MarkdownPipe]
})
export class QuestionDetailsComponent {
  @Output() onCloseDialog = new EventEmitter();
  @Input() question;

  constructor(questionService: QuestionService,
      commentService: CommentService,
      authService: AuthService,
      materializeService: MaterializeService) {
    this.questionService = questionService;
    this.commentService = commentService;
    this.authService = authService;
    this.materializeService = materializeService;
    this.comments = [];
  }

  loadComments(question) {
    this.isBusy = true;
    this.questions = [];

    this.commentService.fetchComments(question.number, question.user)
      .subscribe((comments) => {
        this.comments = comments;
      }, undefined, () => {
        this.isBusy = false;
        this.materializeService.updateTooltips();
      });
  }

  closeDialog() {
    this.onCloseDialog.emit();
  }

  canCreateNewComment() {
    return this.authService.isUserAuthenticated();
  }

  newCommentCreated(comment) {
    this.comments.push(comment);
  }

  ngOnChanges(changes) {
    if (changes.question && changes.question.currentValue) {
      if (changes.question.currentValue) {
        this.loadComments(changes.question.currentValue);
      } else {
        this.comments = [];
      }
    }
  }
}

