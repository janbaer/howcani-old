import { Component, Input } from '@angular/core';
import template from './date.tpl.html';

@Component({
  selector: 'date',
  template: template
})
export class DateComponent {
  @Input() date;
  @Input() tooltipText;
}
