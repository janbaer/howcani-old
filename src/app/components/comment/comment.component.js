import { Component, Input } from '@angular/core';
import { MarkdownPipe } from './../../pipes/markdown.pipe';
import { UserComponent } from './../user/user.component';
import { DateComponent } from './../date/date.component';
import template from './comment.tpl.html';

@Component({
  selector: 'comment',
  template: template,
  directives: [UserComponent, DateComponent],
  pipes: [MarkdownPipe]
})
export class CommentComponent {
  @Input() comment;
}
