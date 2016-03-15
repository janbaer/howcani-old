'use strict';

import { Component } from 'angular2/core';
import { Navbar } from './components/navbar/navbar.component.js';

@Component({
  selector: 'howcani-app',
  templateUrl: 'app/app.tpl.html',
  directives: [Navbar]
})
export class AppComponent {
  constructor() {
    this.title = 'How can I do this';
    //setTimeout(() => {
      //this.title = 'Updated title';
    //}, 250);
  }

}
