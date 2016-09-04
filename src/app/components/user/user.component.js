import { Component, Input } from '@angular/core';
import template from './user.tpl.html';

@Component({
  selector: 'user',
  template: template
})
export class UserComponent {
  @Input() user;
  @Input() tooltipText;
}
