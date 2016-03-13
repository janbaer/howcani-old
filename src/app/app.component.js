'use strict';

import { Component } from 'angular2/core';

@Component({
  selector: 'my-app',
  //template: '<h1>{{ title }}</h1>',
  templateUrl: 'app/app.tpl.html'
})
export class AppComponent {
  constructor() {
    this.title = 'How can I do this';
    //setTimeout(() => {
      //this.title = 'Updated title';
    //}, 250);
  }

}
