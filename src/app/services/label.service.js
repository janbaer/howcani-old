import { Injectable } from '@angular/core';
import { GithubService } from './github.service';

@Injectable()
export class LabelService {
  constructor(githubService: GithubService) {
    this.githubService = githubService;
    this.labels = [];
  }

  fetchLabels() {
    this.labels = [];

    this.githubService.getLabels()
      .subscribe((labels) => {
        this.labels = labels;
      });
  }
}
