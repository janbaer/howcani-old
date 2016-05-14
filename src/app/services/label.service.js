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
        this.labels = labels ? labels.sort(this.compareLabelsByName) : [];
      });
  }

  compareLabelsByName(label1, label2) {
    return label1.name.localeCompare(label2.name);
  }

  getLabelsFromLabelNames(names) {
    const selectedLabels = [];

    names.forEach((name) => {
      const lowerName = name.toLowerCase();
      const label = this.labels.find((l) => l.name.toLowerCase() === lowerName);
      if (label) {
        selectedLabels.push(label);
      }
    });

    return selectedLabels.sort(this.compareLabelsByName);
  }
}
