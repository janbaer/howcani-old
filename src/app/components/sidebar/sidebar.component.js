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

  restoreQuery() {
    const query = this.configuration.project.query;
    if (query) {
      this.state = query.state;
      this.searchValue = query.query;
      this.onlyMyQuestions = query.onlyMyQuestions;
    }
  }

  isUserAuthenticated() {
    return this.authService.isUserAuthenticated();
  }

  ngOnInit() {
    this.labelService.fetchLabels();
    this.restoreQuery();
    this.configuration.onProjectChanged
      .subscribe(() => this.restoreQuery());
  }
}
