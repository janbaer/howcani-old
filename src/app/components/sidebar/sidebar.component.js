import { Component, EventEmitter, Input, Output } from 'angular2/core';
import { LabelService } from './../../services/label.service.js';
import template from './sidebar.tpl.html';

@Component({
  selector: 'sidebar',
  template: template,
  directives: []
})
export class SidebarComponent {
  @Input() searchValue = '';
  @Output() onFilterChanged = new EventEmitter();

  selectedLabels = [];

  constructor(labelService: LabelService) {
    this.labelService = labelService;
  }

  onSubmitSearchValue(event, searchValue) {
    if (event) {
      event.preventDefault();
    }

    this.searchValue = searchValue;
    this.onFilterChanged.emit({ searchValue: this.searchValue, selectedLabels: this.selectedLabels });
  }

  toggleLabel(event, label) {
    event.preventDefault();

    if (this.selectedLabels.indexOf(label) >= 0) {
      this.selectedLabels = this.selectedLabels.filter((selectedLabel) => selectedLabel !== label);
    } else {
      this.selectedLabels.push(label);
    }

    this.onFilterChanged.emit({ searchValue: this.searchValue, selectedLabels: this.selectedLabels });
  }

  isSelected(label) {
    return this.selectedLabels.indexOf(label) >= 0;
  }

  ngOnInit() {
    this.labelService.fetchLabels();
  }
}
