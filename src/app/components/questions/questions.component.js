import { Component } from 'angular2/core';
import { QuestionService } from './../../services/question.service.js';
import { QuestionComponent } from './../question/question.component.js';
import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [QuestionComponent]
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

  materializeNewElements() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    }, 50);
  }

  ngOnInit() {
    this.renderQuestions();
  }

  ngOnDestroy() {
  }
}
