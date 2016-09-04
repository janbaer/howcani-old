import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { MaterializeService } from './../../services/materialize.service.js';
import { QuestionService } from './../../services/question.service';
import { CommentService } from './../../services/comment.service';
import { LabelService } from './../../services/label.service';
import template from './question-details.tpl.html';

@Component({
  selector: 'question-details',
  template: template
})
export class QuestionDetailsComponent {
  @Output() onCloseDialog = new EventEmitter();
  @Input() question;
  @Input() isModal = false;

  constructor(
    questionService: QuestionService,
    commentService: CommentService,
    authService: AuthService,
    labelService: LabelService,
    materializeService: MaterializeService
  ) {
    this.questionService = questionService;
    this.commentService = commentService;
    this.authService = authService;
    this.labelService = labelService;
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

  toggleEditTitle() {
    this.isEditingTitle = !this.isEditingTitle;
  }

  changeTitle(title) {
    this.question.title = title;
    this.questionService.updateQuestion(this.question)
      .then(() => {
        this.toggleEditTitle();
      });
  }

  toggleEditBody() {
    this.isEditingBody = !this.isEditingBody;
  }

  changeBody(body) {
    this.question.body = body;
    this.questionService.updateQuestion(this.question)
      .then(() => {
        this.toggleEditBody();
      });
  }

  toggleEditLabels() {
    this.isEditingLabels = !this.isEditingLabels;
  }

  changeLabels(labelNames) {
    const names = labelNames.split(',').map((label) => label.trim());
    this.question.labels = this.labelService.getLabelsFromLabelNames(names);

    this.questionService.updateQuestion(this.question)
      .then(() => {
        this.toggleEditLabels();
      });
  }

  getLabelNames() {
    if (this.question) {
      return this.question.labels.map((label) => label.name).join(', ').trim();
    }
    return '';
  }

  canEditQuestion() {
    if (this.question) {
      return this.authService.isUserAuthenticated() &&
             this.authService.isSameAuthenticatedUser(this.question.user);
    }
    return false;
  }

  canChangeQuestionIsAnsweredState() {
    return this.question && this.canEditQuestion();
  }

  markQuestionAsAnswered() {
    return this.questionService.markQuestionAsAnswered(this.question);
  }

  changeQuestionIsAnsweredState() {
    let promise;

    if (this.isQuestionAnswered()) {
      promise = this.questionService.markQuestionAsUnanswered(this.question);
    } else {
      promise = this.questionService.markQuestionAsAnswered(this.question);
    }

    return promise;
  }

  isQuestionAnswered() {
    return this.question && this.question.state === 'closed';
  }

  canCreateNewComment() {
    return this.authService.isUserAuthenticated();
  }

  isModalShown() {
    return this.isModal;
  }

  newCommentCreated(comment) {
    this.question.comments = this.question.comments + 1;
    comment.canMarkQuestionAsAnswered = this.authService.isSameAuthenticatedUser(this.question.user);
    this.comments.push(comment);
  }

  ngOnChanges(changes) {
    if (changes.question && changes.question.currentValue) {
      this.isEditingBody = false;
      this.isEditingTitle = false;

      if (changes.question.currentValue) {
        this.loadComments(changes.question.currentValue);
      } else {
        this.comments = [];
      }
    }
  }
}

