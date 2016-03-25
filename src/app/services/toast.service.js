import { Injectable } from 'angular2/core';

@Injectable()
export class ToastService {
  show(message, timeout = 4000) {
    Materialize.toast(message, timeout);
  }
}
