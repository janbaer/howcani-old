import { Component, Input } from 'angular2/core';

import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { TimeFromNowPipe } from './../../pipes/timefromnow.pipe';

@Component({
  selector: 'question',
  templateUrl: './app/components/question/question.tpl.html',
  directives: [],
  pipes: [MarkdownPipe, TimeFromNowPipe]
})
export class QuestionComponent {
  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }
}
