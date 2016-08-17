import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { QuestionsComponent } from './app/components/questions/questions.component.js';
import { ConnectComponent } from './app/components/connect/connect.component.js';
import { LoginComponent } from './app/components/login/login.component.js';
import { routes } from './app/routes.js';

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

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent, QuestionsComponent, ConnectComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [
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
  ]
})
export class MainModule {}
