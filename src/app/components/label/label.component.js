import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { LabelService } from './../../services/label.service.js';
import { MaterializeService } from './../../services/materialize.service';
import { MessageService } from './../../services/message.service.js';

import template from './label.tpl.html';

@Component({
  selector: 'hci-label',
  template: template,
  directives: []
})
export class LabelComponent {
  @Input() label;
  @Input() index;
  @Output() onSelectionChanged = new EventEmitter();

  constructor(authService: AuthService,
              materializeService: MaterializeService,
              messageService: MessageService,
              labelService: LabelService) {
    this.authService = authService;
    this.materialize = materializeService;
    this.messageService = messageService;
    this.labelService = labelService;

    this.isEditingColor = false;
    this.index = 0;
  }

  canEditLabel() {
    return this.authService.isUserAuthenticated();
  }

  toggleEditLabel() {
    this.isEditingColor = true;
  }

  colorChanged(event) {
    this.isEditingColor = false;
    this.saveChangedColor(event.srcElement.value);
    this.hideActions();
  }

  saveChangedColor(color) {
    this.label.color = color;
    this.labelService.updateLabel(this.label);
  }

  startEdit() {
    this.isEditingColor = true;
  }

  deleteLabel() {
    this.materialize.showYesNo('deleteLabelDialog')
      .then(dialogResult => {
        if (dialogResult) {
          this.labelService.deleteLabel(this.label);
        }
      });
  }

  toggleLabel() {
    this.label.isSelected = !this.label.isSelected;
    this.onSelectionChanged.emit();
  }

  showActions(index) {
    this.index = index;
    this.messageService.sendMessage(this, 'ShowActions');
    $('#labelActionsContainer' + this.index).addClass('hovered');
  }

  hideActions() {
    if (!this.isEditingColor) {
      $('#labelActionsContainer' + this.index).removeClass('hovered');
      $('#labelActionsContainer' + this.index).removeClass('hovered');
    }
  }

  ngOnInit() {
    this.messageService.onNewMessage
      .subscribe((message) => {
        if (message.name === 'ShowActions' && message.sender !== this && this.isEditingColor) {
          this.isEditingColor = false;
          this.hideActions();
        }
      });
  }
}
