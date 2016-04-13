import { Injectable } from 'angular2/core';

@Injectable()
export class MaterializeService {
  updateTooltips() {
    setTimeout(() => {
      $('.tooltipped').tooltip({ delay: 50 });
    }, 100);
  }

  initSideNav() {
    setTimeout(() => {
      $('.button-collapse').sideNav();
    }, 100);
  }

  showDialog(dialogId) {
    $(`#${dialogId}`).openModal();
  }

  closeDialog(dialogId) {
    $(`#${dialogId}`).closeModal();
  }

  showToastMessage(message, timeout = 4000) {
    Materialize.toast(message, timeout);
  }

}
