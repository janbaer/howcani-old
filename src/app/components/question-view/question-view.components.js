import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { ConfigurationService } from './../../services/configuration.service';
import { QuestionDetailsComponent } from './../question-details/question-details.component';

import template from './question-view.tpl.html';

@Component({
  selector: 'question-view',
  template: template,
  directives: [QuestionDetailsComponent]
})
export class QuestionViewComponent {
  constructor(router: Router,
              activatedRoute: ActivatedRoute,
              configurationService: ConfigurationService,
              questionService: QuestionService) {
    this.router = router;
    this.route = activatedRoute;
    this.configuration = configurationService;
    this.questionService = questionService;
  }

  ngOnInit() {
    this.isBusy = true;

    this.route.params
      .subscribe((params) => {
        const user = params.user;
        const repository = params.repository;
        const id = params.id;

        this.configuration.project = { user: user, repository: repository };

        this.questionService.fetchQuestion(id)
          .then((question) => {
            this.question = question;
          });
      });

  }

}
