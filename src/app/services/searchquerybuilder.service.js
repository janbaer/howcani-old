import { Injectable } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';

@Injectable()
export class SearchQueryBuilderService {
  query = '';
  labels = [];
  sort = '';
  order = '';

  constructor(configuration: ConfigurationService) {
    this.configuration = configuration;
  }

  /*
   * Generate search query for github api usage
   *
   * @param String  q       The search term https://help.github.com/articles/searching-issues/
   * @param Array   labels  Limits searches to a specific user or repository. Could be user/repository.
   * @param Array   labels  Enrich query string with labels when specified
   * @param String  state   The state of the issue (open or closed)
   * @param Boolean onlyMyQuestions - Filter the issues by the name of the
   * current logged in user
   * @return String
   */
  getSearchQuery() {
    const query = [];

    if (this.query) {
      query.push(this.query.replace(/\s/g, '+'));
    }

    if (this.labels.length > 0) {
      query.push(this.labels.map((label) => `label:${label}`).join('+'));
    }

    if (this.state) {
      query.push(`state:${this.state}`);
    }

    if (this.onlyMyQuestions && this.configuration.user) {
      query.push(`user:${this.configuration.user.login}`);
    }

    query.push(`repo:${this.configuration.project.user}/${this.configuration.project.repository}`);
    query.push('type:issue');

    return query.join('+');
  }
}
