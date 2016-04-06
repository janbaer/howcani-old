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
