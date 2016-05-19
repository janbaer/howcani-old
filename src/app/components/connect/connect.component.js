import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { FORM_DIRECTIVES } from '@angular/common';
import { ConfigurationService } from './../../services/configuration.service';
import { GithubService } from './../../services/github.service';
import { LabelService } from './../../services/label.service';
import { MaterializeService } from './../../services/materialize.service';
import template from './connect.tpl.html';

@Component({
  selector: 'connect',
  template: template,
  directives: [FORM_DIRECTIVES]
})
export class ConnectComponent {
  constructor(router: Router,
              configuration: ConfigurationService,
              githubService: GithubService,
              labelService: LabelService,
              materializeService: MaterializeService) {
    this.router = router;
    this.configuration = configuration;
    this.githubService = githubService;
    this.labelService = labelService;
    this.materialize = materializeService;

    this.project = { user: this.configuration.project.user, repository: this.configuration.project.repository };
  }

  onSubmit() {
    this.isBusy = true;

    this.validate(this.project.user, this.project.repository)
      .then((isValid) => {
        this.isBusy = false;
        if (isValid) {
          this.configuration.project = this.project;
          this.labelService.fetchLabels();
          this.router.navigate(['Questions']);
        } else {
          this.materialize.showToastMessage('The given Github user or project does not exists! Please verify your input!');
        }
      });
  }

  validate(username, repository) {
    return new Promise((resolve) => {
      if (repository) {
        this.githubService.getRepo(username, repository)
          .subscribe(() => resolve(true), () => resolve(false));
      } else {
        this.githubService.getUser(username)
          .subscribe(() => resolve(true), () => resolve(false));
      }
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }
}
