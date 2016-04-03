import { Component, Input } from 'angular2/core';

import { MarkdownPipe } from './../../pipes/markdown.pipe.js';
import { ParseDatePipe } from './../../pipes/parsedate.pipe.js';

@Component({
  selector: 'question',
  templateUrl: './app/components/question/question.tpl.html',
  directives: [],
  pipes: [MarkdownPipe, ParseDatePipe]
})
export class QuestionComponent {
  @Input() question;

  isClosed(question) {
    return question && question.state === 'closed';
  }
}
