import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from './../../services/question.service';
import { ConfigurationService } from './../../services/configuration.service';
import { MaterializeService } from './../../services/materialize.service.js';

import template from './question-view.tpl.html';

@Component({
  selector: 'question-view',
  template: template
})
export class QuestionViewComponent {
  constructor(router: Router,
              activatedRoute: ActivatedRoute,
              configurationService: ConfigurationService,
              questionService: QuestionService,
              materializeService: MaterializeService) {
    this.router = router;
    this.route = activatedRoute;
    this.configuration = configurationService;
    this.questionService = questionService;
    this.materializeService = materializeService;
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

    this.materializeService.hideSidebar();
  }

}
