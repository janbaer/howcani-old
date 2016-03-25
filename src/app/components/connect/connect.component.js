import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { Configuration } from './../../services/configuration.service.js';
import { DataService } from './../../services/data.service.js';
import { ToastService } from './../../services/toast.service.js';

@Component({
  selector: 'connect',
  templateUrl: './app/components/connect/connect.tpl.html'
})
export class ConnectComponent {
  constructor(
              router: Router,
              configuration: Configuration,
              dataService: DataService,
              toastService: ToastService
             ) {
    this.router = router;
    this.dataService = dataService;
    this.configuration = configuration;
    this.toastService = toastService;

    this.project = Object.assign({}, this.configuration.project);
  }

  onSubmit() {
    this.isBusy = true;
    this.dataService.verify(this.project)
      .then((isValid) => {
        if (isValid) {
          this.configuration.project = this.project;
          this.router.navigate(['Questions']);
        } else {
          this.isBusy = false;
          this.toastService.show('The given Github user or project does not exists! Please verify your input!');
        }
      });
  }
}
