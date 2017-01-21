import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class LabelService {
  constructor(githubService: GithubService, configurationService: ConfigurationService) {
    this.githubService = githubService;
    this.configuration = configurationService;
    this.labels = [];
  }

  fetchLabels() {
    this.labels = [];

    this.githubService.getLabels()
      .subscribe(labels => {
        labels = labels || [];
        labels = this.restoreSelectionState(labels);
        labels = this.changeColorToHex(labels);
        this.labels = labels.sort(this.compareLabelsByName);
      });
  }

  deleteLabel(label) {
    return this.githubService.deleteLabel(label)
      .then(() => {
        const index = this.labels.findIndex(l => l.name === label.name);
        if (index >= 0) {
          this.labels.splice(index, 1);
        }
      });
  }

  changeColorToHex(labels) {
    for (const label of labels) {
      label.color = `#${label.color}`;
    }
    return labels;
  }

  restoreSelectionState(labels) {
    const query = this.configuration.project.query;
    if (query && query.labels) {
      query.labels.forEach((labelName) => {
        const selectedLabel = labels.find((label) => label.name === labelName);
        if (selectedLabel) {
          selectedLabel.isSelected = true;
        }
      });
    }
    return labels;
  }

  compareLabelsByName(label1, label2) {
    return label1.name.localeCompare(label2.name);
  }

  updateLabel(label) {
    const labelToSend = Object.assign({}, label);
    labelToSend.color = label.color.substring(1);

    return this.githubService.patchLabel(labelToSend);
  }

  updateLabels(labels) {
    labels.forEach((label) => {
      if (!this.isLabelInList(this.labels, label)) {
        this.labels.push(label);
      }
    });
  }

  isLabelInList(labels, label) {
    return labels.find((l) => l.name === label.name) !== undefined;
  }

  getLabelsFromLabelNames(names) {
    const selectedLabels = [];

    names.forEach((name) => {
      const lowerName = name.toLowerCase();
      const label = this.labels.find((l) => l.name.toLowerCase() === lowerName);

      if (label) {
        selectedLabels.push(label);
      } else {
        selectedLabels.push({ name: name, color: 'black' });
      }
    });

    return selectedLabels.sort(this.compareLabelsByName);
  }
}
