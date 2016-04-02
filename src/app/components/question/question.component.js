import { Component, Input } from 'angular2/core';

@Component({
  selector: 'question',
  templateUrl: './app/components/question/question.tpl.html',
  directives: []
})
export class QuestionComponent {
  constructor() {
  }

  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }
}
