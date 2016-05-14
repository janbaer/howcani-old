import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './content-edit.tpl.html';

@Component({
  selector: 'content-edit',
  template: template,
  directives: []
})
export class ContentEditComponent {
  @Input() content;
  @Input() multiline;
  @Input() placeholder;
  @Output() onClose = new EventEmitter();
  @Output() onCancel = new EventEmitter();

  closeEdit() {
    if (this.canClose()) {
      this.onClose.emit(this.content);
    }
  }

  tryCloseEdit(event) {
    if (event.altKey && event.key === 'Enter') {
      this.closeEdit();
    }
  }

  cancelEdit() {
    this.onCancel.emit();
  }

  canClose() {
    return this.content && this.content.length > 0;
  }
}
