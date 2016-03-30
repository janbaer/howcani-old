import { Component } from 'angular2/core';
import { Configuration } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';
//import $ from 'jquery';

@Component({
  selector: 'questions',
  templateUrl: './app/components/questions/questions.tpl.html'
})
export class QuestionsComponent {
  constructor(configuration: Configuration, questionService: QuestionService) {
    this.project = configuration.project;
    this.questionService = questionService;

    this.questions = [];

  }

  getQuestions() {
    return this.questionService.getAllQuestions();
  }

  renderQuestions() {
    this.questionService.fetchQuestions()
      .then((questions) => {
        this.questions = questions;
        $('.collapsible').collapsible({ accordion: false });
      })
      .catch((err) => {
        console.log('Error while fetching issues', err);
      });
  }

  ngOnInit() {
    this.renderQuestions();
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
