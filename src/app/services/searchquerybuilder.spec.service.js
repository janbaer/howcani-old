'use strict';

import { Injector, provide } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';
import { SearchQueryBuilderService } from './searchquerybuilder.service.js';

describe('Search Query service spec', () => {
  let searchQueryBuilder;

  class ConfigurationServiceMock {
    constructor() {
      this.project = {
        user: 'howcani-project',
        repository: 'howcani-data'
      };
    }
  }

  beforeEachProviders(() => [
    SearchQueryBuilderService,
    provide(ConfigurationService, { useClass: ConfigurationServiceMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    searchQueryBuilder = injector.get(SearchQueryBuilderService);
  }));

  describe('When service was created', () => {
    it('Should not be null', () => {
      expect(searchQueryBuilder).toBeDefined();
    });
  });

  describe('#getSearchQuery', () => {
    it('should return search query for user/repo issues', () => {
      expect(searchQueryBuilder.getSearchQuery()).toBe('repo:howcani-project/howcani-data');
    });

    describe('when query, labels and repo are set', () => {
      beforeEach(() => {
        searchQueryBuilder.query = 'angular2 user:janbaer';
        searchQueryBuilder.labels = ['important', 'critical'];
      });

      it('should return search query with specified repo, labels and custom query', () => {
        expect(searchQueryBuilder.getSearchQuery()).toBe('angular2+user:janbaer+label:important+label:critical+repo:howcani-project/howcani-data');
      });
    });

    describe('when sort and order are set', () => {
      beforeEach(() => {
        searchQueryBuilder.query = 'angular2 user:janbaer';
        searchQueryBuilder.labels = ['important', 'critical'];
        searchQueryBuilder.sort = 'comments';
        searchQueryBuilder.order = 'asc';
      });

      it('should contain sort and order query params', () => {
        expect(searchQueryBuilder.getSearchQuery()).toBe('angular2+user:janbaer+label:important+label:critical+sort:comments+order:asc+repo:howcani-project/howcani-data');
      });
    });
  });
});
