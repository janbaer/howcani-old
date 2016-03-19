'use strict';

import './shim';
import 'rxjs/Rx';

import { bootstrap } from 'angular2/platform/browser';

import { AppComponent } from './app/app.component';
import { enableProdMode, provide } from 'angular2/core';

//if (ENVIRONMENT === 'production') {
  //enableProdMode();
//}

bootstrap(AppComponent, []);

