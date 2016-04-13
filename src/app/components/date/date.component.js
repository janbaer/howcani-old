import { Component, Input } from 'angular2/core';
import { TimeFromNowPipe } from './../../pipes/timefromnow.pipe';
import template from './date.tpl.html';

@Component({
  selector: 'date',
  template: template,
  directives: [],
  pipes: [TimeFromNowPipe]
})
export class DateComponent {
  @Input() date;
  @Input() tooltipText;
}
