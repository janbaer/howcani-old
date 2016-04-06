'use strict';

import { Injector, provide } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';
import { SearchQueryService } from './search_query.service.js';

describe('Search Query service spec', () => {
  let searchQueryService;

  class ConfigurationServiceMock {
    constructor() {
      this.project = {
        user: 'howcani-project',
        repository: 'howcani-data'
      };
    }
  }

  beforeEachProviders(() => [
    SearchQueryService,
    provide(ConfigurationService, { useClass: ConfigurationServiceMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    searchQueryService = injector.get(SearchQueryService);
  }));

  describe('When service was created', () => {
    it('Should not be null', () => {
      expect(searchQueryService).toBeDefined();
    });
  });

  describe('#build', () => {
    describe('When called with defaults', () => {
      it('should return search query for user/repo issues', () => {
        expect(searchQueryService.build()).toBe('repo:howcani-project/howcani-data');
      });
    });

    describe('When called with custom query, labels and repo', () => {
      it('should return search query with specified repo, labels and custom query', () => {
        expect(searchQueryService.build({
          q: 'angular2 user:janbaer',
          labels: ['important', 'critical'],
          repo: 'janbaer/ask-me-anything'
        })).toBe('angular2+user:janbaer+label:important+label:critical+repo:janbaer/ask-me-anything');
      });
    });

    describe('When called with sort and order', () => {
      it('should contain sort and order query params', () => {
        expect(searchQueryService.build({
          sort: 'comments',
          order: 'asc'
        })).toBe('sort:comments+order:asc+repo:howcani-project/howcani-data');
      });
    });
  });
});
