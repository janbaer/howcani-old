import './shim';
import 'rxjs/Rx';
import jquery from 'jquery';

window.$ = jquery;

import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode, provide } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './app/app.component';
import { ConfigurationService } from './app/services/configuration.service.js';
import { StorageService } from './app/services/storage.service.js';
import { QuestionService } from './app/services/question.service.js';
import { ToastService } from './app/services/toast.service.js';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  StorageService,
  ConfigurationService,
  QuestionService,
  ToastService
]);

