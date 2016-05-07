import { Injectable } from 'angular2/core';

@Injectable()
export class MaterializeService {
  updateTooltips() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    }, 100);
  }

  showDialog(dialogId, dismissible = true) {
    $(`#${dialogId}`).openModal({ dismissible: dismissible });
    $(`#${dialogId}`).scrollTop(0);
  }

  closeDialog(dialogId) {
    $(`#${dialogId}`).closeModal();
  }

  showToastMessage(message, timeout = 4000) {
    Materialize.toast(message, timeout);
  }

}
