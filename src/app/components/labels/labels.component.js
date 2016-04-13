import { Component, Input } from 'angular2/core';
import template from './labels.tpl.html';

@Component({
  selector: 'labels',
  template: template,
  directives: []
})
export class LabelsComponent {
  @Input() labels;
}
