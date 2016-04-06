import { Injectable } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';

@Injectable()
export class SearchQueryService {
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
  build({ q = '', repo = '', labels = [], sort = '', order = '' } = {}) {
    const query = [];

    if (q) {
      query.push(q.replace(/\s/g, '+'));
    }

    if (labels.length > 0) {
      query.push(labels.map((label) => `label:${label}`).join('+'));
    }

    if (sort) {
      query.push(`sort:${sort}`);
    }

    if (order) {
      query.push(`order:${order}`);
    }

    if (repo) {
      query.push(`repo:${repo}`);
    } else {
      query.push(`repo:${this.configuration.project.user}/${this.configuration.project.repository}`);
    }

    return query.join('+');
  }
}
