import { Component, Input } from 'angular2/core';
import template from './question-details.tpl.html';

@Component({
  selector: 'question-details',
  template: template,
  directives: [],
  pipes: []
})
export class QuestionDetailsComponent {
  @Input() question;

}

