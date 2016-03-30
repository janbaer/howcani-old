import { Component } from 'angular2/core';
import { Configuration } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';

@Component({
  selector: 'questions',
  templateUrl: './app/components/questions/questions.tpl.html'
})
export class QuestionsComponent {
  constructor(configuration: Configuration, questionService: QuestionService) {
    this.project = configuration.project;
    this.questionService = questionService;

    //this.questions = [];

  }

  getQuestions() {
    return this.questionService.getAllQuestions();
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.questions = this.questionService.fetchQuestions();
    //this.questionService.fetchQuestions()
      //.then((questions) => {
        //console.log('Questions', questions);
        //this.questions = questions;
      //})
      //.catch((err) => {
        //console.log('Error while fetching issues', err);
      //});
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }
}
