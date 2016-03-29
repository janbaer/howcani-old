import { Component } from 'angular2/core';
import { Configuration } from './../../services/configuration.service.js';

@Component({
  selector: 'questions',
  templateUrl: './app/components/questions/questions.tpl.html'
})
export class QuestionsComponent {
  constructor(configuration: Configuration) {
    this.project = configuration.project;
  }
}
