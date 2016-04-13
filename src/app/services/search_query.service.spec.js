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

  describe('#getSearchQuery', () => {
    it('should return search query for user/repo issues', () => {
      expect(searchQueryService.getSearchQuery()).toBe('repo:howcani-project/howcani-data');
    });

    describe('when query, labels and repo are set', () => {
      beforeEach(() => {
        searchQueryService.query = 'angular2 user:janbaer';
        searchQueryService.labels = ['important', 'critical'];
      });

      it('should return search query with specified repo, labels and custom query', () => {
        expect(searchQueryService.getSearchQuery()).toBe('angular2+user:janbaer+label:important+label:critical+repo:howcani-project/howcani-data');
      });
    });

    describe('when sort and order are set', () => {
      beforeEach(() => {
        searchQueryService.query = 'angular2 user:janbaer';
        searchQueryService.labels = ['important', 'critical'];
        searchQueryService.sort = 'comments';
        searchQueryService.order = 'asc';
      });

      it('should contain sort and order query params', () => {
        expect(searchQueryService.getSearchQuery()).toBe('angular2+user:janbaer+label:important+label:critical+sort:comments+order:asc+repo:howcani-project/howcani-data');
      });
    });
  });
});
