import { Component } from 'angular2/core';
import { Configuration } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';
import { QuestionComponent } from './../question/question.component.js';

@Component({
  selector: 'questions',
  templateUrl: './app/components/questions/questions.tpl.html',
  directives: [QuestionComponent]
})
export class QuestionsComponent {
  constructor(configuration: Configuration, questionService: QuestionService) {
    this.project = configuration.project;
    this.questionService = questionService;
  }

  renderQuestions(question) {
    this.questions = this.questionService.fetchQuestions();
  }

  ngOnInit() {
    this.renderQuestions();
  }

  ngOnDestroy() {
  }
}
