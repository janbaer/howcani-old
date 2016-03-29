import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';

@Component({
  selector: 'navbar',
  templateUrl: './app/components/navbar/navbar.tpl.html',
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {
  constructor(router: Router) {
    this.router = router;
  }
}
