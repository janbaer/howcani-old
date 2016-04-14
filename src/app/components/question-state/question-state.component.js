import { Component, Input } from 'angular2/core';
import template from './question-state.tpl.html';

@Component({
  selector: 'question-state',
  template: template,
  directives: [],
  pipes: []
})
export class QuestionStateComponent {
  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }
}

