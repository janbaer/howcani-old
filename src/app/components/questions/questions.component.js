import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterializeService } from './../../services/materialize.service';
import { QuestionService } from './../../services/question.service';
import { AuthService } from './../../services/auth.service';
import { GithubService } from './../../services/github.service';
import { ConfigurationService } from './../../services/configuration.service';
import { RecentProjectsService } from './../../services/recent-projects.service';
import { QuestionComponent } from './../question/question.component';
import { QuestionDetailsComponent } from './../question-details/question-details.component';
import { QuestionNewComponent } from './../question-new/question-new.component';

import template from './questions.tpl.html';

@Component({
  selector: 'questions',
  template: template,
  directives: [
    QuestionComponent,
    QuestionDetailsComponent,
    QuestionNewComponent
  ]
})
export class QuestionsComponent {
  newQuestion = {};

  constructor(router: Router,
              configurationService: ConfigurationService,
              recentProjectsService: RecentProjectsService,
              githubService: GithubService,
              questionService: QuestionService,
              materializeService: MaterializeService,
              authService: AuthService) {
    this.router = router;
    this.configuration = configurationService;
    this.recentProjects = recentProjectsService;
    this.github = githubService;
    this.questionService = questionService;
    this.materialize = materializeService;
    this.authService = authService;
  }

  get questions() {
    return this.questionService.questions;
  }

  get hasMoreQuestions() {
    return this.questionService.hasMoreQuestions();
  }

  fetchQuestions(query) {
    this.handleFetchResult(this.questionService.fetchQuestions(query || {}, 1));
  }

  fetchMoreQuestions() {
    this.handleFetchResult(this.questionService.fetchMoreQuestions());
  }

  handleFetchResult(observable) {
    if (observable) {
      this.isBusy = true;
      observable.subscribe(() => {
        this.materialize.updateTooltips();
        this.isBusy = false;
      });
    } else {
      this.busy = false;
    }
  }

  showQuestionDetails(question) {
    this.selectedQuestion = question;
    this.materialize.showDialog('questionDetailsDialog');
  }

  closeQuestionDetailsDialog() {
    this.selectedQuestion = undefined;
    this.materialize.closeDialog('questionDetailsDialog');
  }

  showNewQuestionDialog() {
    const dismissible = false;
    this.materialize.showDialog('newQuestionDialog', dismissible);
  }

  closeNewQuestionDialog() {
    this.materialize.closeDialog('newQuestionDialog');
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  connectToProject(username, repositoryname) {
    this.github.getRepo(username, repositoryname)
      .subscribe(() => {
        this.configuration.project = { user: username, repository: repositoryname };
        this.fetchQuestions(this.configuration.project.query);
      });
  }

  ngOnInit() {
    this.isBusy = true;

    const queryParams = this.router.routerState.snapshot.queryParams;
    const user = queryParams.user;
    const repository = queryParams.repository;

    if (user && repository) {
      this.connectToProject(user, repository);
    } else {
      this.fetchQuestions(this.configuration.project.query);
    }

  }

  ngOnDestroy() {
    this.recentProjects.save(this.configuration.project);
  }

}
