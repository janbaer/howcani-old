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

    this.questions = [];

  }

  getQuestions() {
    return this.questionService.getAllQuestions();
  }

  isClosed(question) {
    return question && question.state === 'closed';
  }

  renderQuestions() {
    this.questionService.fetchQuestions()
      .then((response) => {
        this.questions = response.items;
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
  }
}
