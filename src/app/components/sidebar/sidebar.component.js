import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LabelService } from './../../services/label.service';
import { ConfigurationService } from './../../services/configuration.service';
import { AuthService } from './../../services/auth.service';
import template from './sidebar.tpl.html';

@Component({
  selector: 'sidebar',
  template: template,
  directives: []
})
export class SidebarComponent {
  @Input() searchValue = '';
  @Input() onlyMyQuestions = false;
  @Output() onFilterChanged = new EventEmitter();

  selectedLabels = [];

  constructor(labelService: LabelService,
              configurationService: ConfigurationService,
              authService: AuthService) {
    this.labelService = labelService;
    this.configuration = configurationService;
    this.authService = authService;
    this.state = '';
  }

  onSubmitSearchValue(event, searchValue) {
    if (event) {
      event.preventDefault();
    }

    this.searchValue = searchValue;
    this.updateSearch();
  }

  toggleLabel(event, label) {
    label.isSelected = !label.isSelected;
    this.updateSearch();
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  showOnlyMyQuestions(onlyMyQuestions) {
    this.onlyMyQuestions = onlyMyQuestions;
    this.updateSearch();
  }

  filterByState(state) {
    this.state = state;
    this.updateSearch();
  }

  updateSearch() {
    const selectedLabels = this.labelService.labels.filter((label) => label.isSelected);

    const searchQuery = {
      query: this.searchValue,
      labels: selectedLabels.map((label) => label.name),
      state: this.state,
      onlyMyQuestions: this.onlyMyQuestions
    };

    this.onFilterChanged.emit(searchQuery);
  }

  restoreQuery(query) {
    this.searchValue = query.query;
    this.state = query.state;
    this.onlyMyQuestions = query.onlyMyQuestions;
  }

  ngOnInit() {
    this.labelService.fetchLabels();

    if (this.configuration.project.query) {
      this.restoreQuery(this.configuration.project.query);
    }
  }
}
