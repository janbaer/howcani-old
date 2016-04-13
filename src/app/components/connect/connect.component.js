import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES, FormBuilder } from 'angular2/common';
import { ConfigurationService } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';
import { MaterializeService } from './../../services/materialize.service';
import template from './connect.tpl.html';

@Component({
  selector: 'connect',
  template: template,
  directives: [FORM_DIRECTIVES]
})
export class ConnectComponent {
  constructor(router: Router,
              formBuilder: FormBuilder,
              configuration: ConfigurationService,
              questionService: QuestionService,
              materializeService: MaterializeService) {
    this.router = router;
    this.questionService = questionService;
    this.configuration = configuration;
    this.materialize = materializeService;

    this.project = Object.assign({}, this.configuration.project);
  }

  onSubmit() {
    this.isBusy = true;

    this.questionService.validate(this.project.user, this.project.repository)
      .then((isValid) => {
        this.isBusy = false;
        if (isValid) {
          this.configuration.project = this.project;
          this.router.navigate(['Questions']);
        } else {
          this.materialize.showToastMessage('The given Github user or project does not exists! Please verify your input!');
        }
      });

  }
}
