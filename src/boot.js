import './shim';
import 'rxjs/Rx';

import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode } from 'angular2/core';

import { AppComponent } from './app/app.component';
import { Configuration } from './app/services/configuration.service.js';
import { Storage } from './app/services/storage.service.js';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [Storage, Configuration]);

