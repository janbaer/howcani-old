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
    this.updateSearch();
  }

  toggleLabel(event, label) {
    if (this.selectedLabels.indexOf(label) >= 0) {
      this.selectedLabels = this.selectedLabels.filter((selectedLabel) => selectedLabel !== label);
    } else {
      this.selectedLabels.push(label);
    }
    this.updateSearch();
  }

  updateSearch() {
    this.onFilterChanged.emit({ searchValue: this.searchValue, selectedLabels: this.selectedLabels.map((label) => label.name) });
  }

  ngOnInit() {
    this.labelService.fetchLabels();
  }
}
