import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { FORM_DIRECTIVES, FormBuilder, Validators } from 'angular2/common';
import { Configuration } from './../../services/configuration.service.js';
import { QuestionService } from './../../services/question.service.js';

@Component({
  selector: 'connect',
  templateUrl: './app/components/connect/connect.tpl.html',
  directives: [FORM_DIRECTIVES]
})
export class ConnectComponent {
  constructor(
              router: Router,
              formBuilder: FormBuilder,
              configuration: Configuration,
              questionService: QuestionService
             ) {
    this.router = router;
    this.questionService = questionService;
    this.configuration = configuration;

    this.connectForm = formBuilder.group({
      user: [this.configuration.project.user, Validators.required, this.validateUser.bind(this)],
      repository: [this.configuration.project.repository, Validators.required, this.validateRepository.bind(this)]
    });

    this.connectForm.controls['user'].valueChanges
      //.debounceTime(200) // It's now working in the current version, maybe some later
      .subscribe({
        next: () => {
          this.connectForm.controls['repository'].updateValueAndValidity();
        }
      });
  }

  validateUser(control) {
    return this.questionService.validate(control.value)
      .then((isValid) => {
        // The validation result have to be in a positive case null
        return isValid ? null : { isValid: false };
      });
  }

  validateRepository(control) {
    const user = this.connectForm ? this.connectForm.controls['user'].value :
                                    this.configuration.project.user;

    return this.questionService.validate(user, control.value)
      .then((isValid) => {
        return isValid ? null : { isValid: false };
      });
  }

  onSubmit() {
    this.configuration.project = {
      user: this.connectForm.controls['user'].value,
      repository: this.connectForm.controls['repository'].value
    };

    this.router.navigate(['Questions']);
  }
}
