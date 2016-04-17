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
   * @param String  sort    Enrich query string with sort option, by default results are sorted by best match
   *                        Additionally it could be: comments, created or updated
   * @param String  order   The sort order if sort parameter is provided. One of asc or desc. Default: desc
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

    if (this.sort) {
      query.push(`sort:${this.sort}`);
    }

    if (this.order) {
      query.push(`order:${this.order}`);
    }

    query.push(`repo:${this.configuration.project.user}/${this.configuration.project.repository}`);

    return query.join('+');
  }
}
