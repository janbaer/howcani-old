import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES, FormBuilder } from 'angular2/common';
import { ConfigurationService } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';
import { ToastService } from './../../services/toast.service.js';

@Component({
  selector: 'connect',
  templateUrl: './app/components/connect/connect.tpl.html',
  directives: [FORM_DIRECTIVES]
})
export class ConnectComponent {
  constructor(
              router: Router,
              formBuilder: FormBuilder,
              configuration: ConfigurationService,
              questionService: QuestionService,
              toastService: ToastService
             ) {
    this.router = router;
    this.questionService = questionService;
    this.configuration = configuration;
    this.toastService = toastService;

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
          this.toastService.show('The given Github user or project does not exists! Please verify your input!');
        }
      });

  }
}
