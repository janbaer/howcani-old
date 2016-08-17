import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';

import { MainModule } from './main.module.js';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MainModule);

