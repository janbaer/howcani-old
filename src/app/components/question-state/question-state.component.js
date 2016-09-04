import { Component, Input } from '@angular/core';
import template from './question-state.tpl.html';

@Component({
  selector: 'question-state',
  template: template
})
export class QuestionStateComponent {
  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }
}

