import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { TimeFromNowPipe } from './../../pipes/timefromnow.pipe';
import template from './question.tpl.html';

@Component({
  selector: 'question',
  template: template,
  directives: [],
  pipes: [MarkdownPipe, TimeFromNowPipe]
})
export class QuestionComponent {
  @Input() question;
  @Output() onSelectQuestion = new EventEmitter();

  isClosed(question) {
    return question && question.state === 'closed';
  }

  showDetails(question) {
    this.onSelectQuestion.emit(question);
  }
}
