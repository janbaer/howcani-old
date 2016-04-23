import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { bootstrap } from 'angular2/platform/browser';
import { enableProdMode, provide } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { AppComponent } from './app/app.component';
import { ConfigurationService } from './app/services/configuration.service';
import { StorageService } from './app/services/storage.service';
import { GithubService } from './app/services/github.service';
import { QuestionService } from './app/services/question.service';
import { LabelService } from './app/services/label.service';
import { MaterializeService } from './app/services/materialize.service';
import { SearchQueryBuilderService } from './app/services/searchquerybuilder.service';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  StorageService,
  ConfigurationService,
  GithubService,
  QuestionService,
  LabelService,
  MaterializeService,
  SearchQueryBuilderService
]);

