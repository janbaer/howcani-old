import { Component, Input } from 'angular2/core';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { TimeFromNowPipe } from './../../pipes/timefromnow.pipe';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import template from './question.tpl.html';

@Component({
  selector: 'question',
  template: template,
  directives: [QuestionDetailsComponent],
  pipes: [MarkdownPipe, TimeFromNowPipe]
})
export class QuestionComponent {
  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }

  showDetails(id) {
    $(`#modal${id}`).openModal();
  }
}
