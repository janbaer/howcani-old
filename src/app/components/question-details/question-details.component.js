import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QuestionService } from './../../services/question.service';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { QuestionStateComponent } from './../question-state/question-state.component';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import { LabelsComponent } from './../labels/labels.component';
import { CommentComponent } from './../comment/comment.component';
import template from './question-details.tpl.html';

@Component({
  selector: 'question-details',
  template: template,
  directives: [CommentComponent, QuestionStateComponent, UserComponent, DateComponent, LabelsComponent],
  pipes: [MarkdownPipe]
})
export class QuestionDetailsComponent {
  @Output() onCloseDialog = new EventEmitter();
  @Input() question;

  constructor(questionService: QuestionService) {
    this.questionService = questionService;
    this.comments = [];
  }

  loadComments(question) {
    this.questionService.fetchComments(question.number)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  closeDialog() {
    this.onCloseDialog.emit();
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

