import { Component } from 'angular2/core';
import { MaterializeService } from './../../services/materialize.service';
import { QuestionService } from './../../services/question.service';
import { QuestionComponent } from './../question/question.component';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [QuestionComponent, QuestionDetailsComponent]
})
export class QuestionsComponent {
  constructor(questionService: QuestionService, materializeService: MaterializeService) {
    this.questionService = questionService;
    this.materialize = materializeService;
  }

  getQuestions() {
    return this.questionService.questions;
  }

  renderQuestions() {
    this.questionService.fetchQuestions()
      .subscribe(() => {
        this.materialize.updateTooltips();
      });
  }

  showQuestionDetails(question) {
    this.selectedQuestion = question;
    this.materialize.showDialog('questionDetailsDialog');
  }

  closeQuestionDetailsDialog($event) {
    $event.preventDefault();
    this.selectedQuestion = undefined;
    this.materialize.closeDialog('questionDetailsDialog');
  }

  ngOnInit() {
    this.renderQuestions();
  }
}
