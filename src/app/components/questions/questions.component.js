import { Component } from 'angular2/core';
import { QuestionService } from './../../services/question.service.js';
import { QuestionComponent } from './../question/question.component.js';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [QuestionComponent, QuestionDetailsComponent]
})
export class QuestionsComponent {
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  renderQuestions() {
    this.questionService.fetchQuestions()
      .then((response) => {
        this.questions = response.items;
        this.materializeNewElements();
      });
  }

  showQuestionDetails(question) {
    this.selectedQuestion = question;
    $('#questionDetailsDialog').openModal();
  }

  closeQuestionDetailsDialog() {
    this.selectedQuestion = undefined;
    $('#questionDetailsDialog').closeModal();
  }

  materializeNewElements() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    }, 100);
  }

  ngOnInit() {
    this.renderQuestions();
  }

  ngOnDestroy() {
  }
}
