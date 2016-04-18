import { Injectable } from 'angular2/core';
import { GithubService } from './github.service';

@Injectable()
export class LabelService {
  labels = [];

  constructor(githubService: GithubService) {
    this.githubService = githubService;
  }

  fetchLabels() {
    this.labels = [];

    return this.githubService.getLabels()
             .subscribe((labels) => {
               this.labels = labels;
             });
  }
}
