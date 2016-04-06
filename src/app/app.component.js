'use strict';

import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';

import { NavbarComponent } from './components/navbar/navbar.component.js';
import { SidebarComponent } from './components/sidebar/sidebar.component.js';
import { router } from './router.js';

@Component({
  selector: 'howcani-app',
  templateUrl: './app/app.tpl.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent, SidebarComponent]
})
@RouteConfig(router.config)
export class AppComponent {
}

