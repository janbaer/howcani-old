import { Injectable } from '@angular/core';

@Injectable()
export class MaterializeService {
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

  closeDialog(dialogId) {
    $(`#${dialogId}`).closeModal();
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
