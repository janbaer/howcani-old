import { Component } from 'angular2/core';
import { QuestionService } from './../../services/question.service.js';
import { QuestionComponent } from './../question/question.component.js';

@Component({
  selector: 'questions',
  templateUrl: './app/components/questions/questions.tpl.html',
  directives: [QuestionComponent]
})
export class QuestionsComponent {
  constructor(questionService: QuestionService) {
    this.questionService = questionService;
  }

  renderQuestions() {
    this.questions = this.questionService.fetchQuestions();
  }

  ngOnInit() {
    this.renderQuestions();
  }

  ngOnDestroy() {
  }
}
