'use strict';

import { Component } from 'angular2/core';
import { RouteConfig } from 'angular2/router';

import { Navbar } from './components/navbar/navbar.component.js';
import { Configuration } from './services/configuration.service.js';
import { router } from './router.js';

@Component({
  selector: 'howcani-app',
  templateUrl: 'app/app.tpl.html',
  directives: [Navbar]
})
@RouteConfig(router.config)
export class AppComponent {
  constructor(configuration: Configuration) {
    this.project = configuration.project;
  }

}

