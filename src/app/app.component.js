'use strict';

import { Component } from 'angular2/core';
import { RouteConfig } from 'angular2/router';
import { Navbar } from './components/navbar/navbar.component.js';
import { router } from './router.component.js';

@Component({
  selector: 'howcani-app',
  templateUrl: 'app/app.tpl.html',
  directives: [Navbar]
})
@RouteConfig(router.config)
export class AppComponent {
  constructor() {
    this.title = 'How can I do this';
    //setTimeout(() => {
      //this.title = 'Updated title';
    //}, 250);
  }

}
