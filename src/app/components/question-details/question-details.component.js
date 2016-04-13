import { Component, Input } from 'angular2/core';
import { QuestionService } from './../../services/question.service';
import { CommentComponent } from './../comment/comment.component';
import template from './question-details.tpl.html';

@Component({
  selector: 'question-details',
  template: template,
  directives: [CommentComponent],
  pipes: []
})
export class QuestionDetailsComponent {
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

  @Input() question;

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

