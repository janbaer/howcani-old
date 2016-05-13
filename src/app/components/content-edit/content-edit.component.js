import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './content-edit.tpl.html';

@Component({
  selector: 'content-edit',
  template: template,
  directives: []
})
export class ContentEditComponent {
  @Input() content;
  @Output() onClose = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  constructor() {
  }

  closeEdit() {
    this.onClose.emit(this.content);
  }

  cancelEdit() {
    this.onCancel.emit();
  }

  canClose() {
    return this.content && this.content.length > 0;
  }
}
