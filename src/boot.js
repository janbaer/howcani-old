import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent } from './app/app.component';
import { StorageService } from './app/services/storage.service';
import { ConfigurationService } from './app/services/configuration.service';
import { GithubService } from './app/services/github.service';
import { AuthService } from './app/services/auth.service';
import { QuestionService } from './app/services/question.service';
import { CommentService } from './app/services/comment.service';
import { LabelService } from './app/services/label.service';
import { MaterializeService } from './app/services/materialize.service';
import { SearchQueryBuilderService } from './app/services/searchquerybuilder.service';

if (ENVIRONMENT === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  FORM_PROVIDERS,
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  StorageService,
  ConfigurationService,
  GithubService,
  AuthService,
  QuestionService,
  CommentService,
  LabelService,
  MaterializeService,
  SearchQueryBuilderService
]);

