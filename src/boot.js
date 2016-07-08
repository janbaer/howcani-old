import './shim';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode, provide } from '@angular/core';
import { FORM_PROVIDERS, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

import { APP_ROUTER_PROVIDER } from './app/routes';
import { AppComponent } from './app/app.component';
import { StorageService } from './app/services/storage.service';
import { ConfigurationService } from './app/services/configuration.service';
import { RecentProjectsService } from './app/services/recent-projects.service';
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
  APP_ROUTER_PROVIDER,
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  StorageService,
  ConfigurationService,
  RecentProjectsService,
  GithubService,
  AuthService,
  QuestionService,
  CommentService,
  LabelService,
  MaterializeService,
  SearchQueryBuilderService
]);

