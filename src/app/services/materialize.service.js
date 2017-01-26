import { Injectable } from '@angular/core';
import { MessageService } from './message.service.js';

@Injectable()
export class MaterializeService {
  constructor(messageService: MessageService) {
    this.messageService = messageService;
  }

  updateTooltips() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    }, 100);
  }

  showDialog(dialogId, dismissible = true) {
    const dialog = $(`#${dialogId}`);
    dialog.openModal({ dismissible: dismissible });
    dialog.scrollTop(0);
    dialog.find('input').first().focus();
  }

  closeDialog(dialogId, dialogResult) {
    $(`#${dialogId}`).closeModal();

    if (this.dialogResolve) {
      this.dialogResolve(dialogResult);
      this.dialogResolve = undefined;
    }
  }

  showYesNo(dialogId) {
    return new Promise(resolve => {
      this.dialogResolve = resolve;
      $(`#${dialogId}`).openModal();
    });
  }

  showToastMessage(message, timeout = 4000) {
    Materialize.toast(message, timeout);
  }

  showSidebar() {
    $('.AppContent-container').removeClass('is-fullview');
    $('.side-nav').removeClass('is-hidden');
  }

  hideSidebar() {
    $('.AppContent-container').addClass('is-fullview');
    $('.side-nav').addClass('is-hidden');
  }
}
