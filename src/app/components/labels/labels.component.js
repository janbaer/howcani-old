import { Component, Input } from '@angular/core';
import template from './labels.tpl.html';

@Component({
  selector: 'labels',
  template: template
})
export class LabelsComponent {
  @Input() labels;
}
