import { Component, Input, Output, EventEmitter } from 'angular2/core';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import { LabelsComponent } from './../labels/labels.component';
import template from './question.tpl.html';

@Component({
  selector: 'question',
  template: template,
  directives: [UserComponent, DateComponent, LabelsComponent],
  pipes: [MarkdownPipe]
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
