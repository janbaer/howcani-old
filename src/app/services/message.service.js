import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MessageService {
  constructor() {
    this.onNewMessage = new EventEmitter();
  }

  sendMessage(sender, name, value) {
    this.onNewMessage.emit({ sender, name, value });
  
  }
}
