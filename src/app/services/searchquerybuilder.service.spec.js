'use strict';

import { Injector, provide } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';
import { SearchQueryBuilderService } from './searchquerybuilder.service.js';

describe('Search Query service spec', () => {
  let searchQueryBuilder;
  let configuration;

  class ConfigurationServiceMock {
    constructor() {
      this.project = {
        user: 'howcani-project',
        repository: 'howcani-data'
      };
      this.user = {
        login: 'janbaer'
      };
    }
  }

  beforeEachProviders(() => [
    SearchQueryBuilderService,
    provide(ConfigurationService, { useClass: ConfigurationServiceMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    searchQueryBuilder = injector.get(SearchQueryBuilderService);
    configuration = injector.get(ConfigurationService);
  }));

  describe('When service was created', () => {
    it('Should not be null', () => {
      expect(searchQueryBuilder).toBeDefined();
    });
  });

  describe('#getSearchQuery', () => {
    const repoQueryString = 'repo:howcani-project/howcani-data+type:issue';

    it('should return search query for user/repo issues', () => {
      expect(searchQueryBuilder.getSearchQuery()).toBe(repoQueryString);
    });

    describe('when query, labels and repo are set', () => {
      beforeEach(() => {
        searchQueryBuilder.query = 'angular2 user:janbaer';
        searchQueryBuilder.labels = ['important', 'critical'];
      });

      it('should return search query with specified repo, labels and custom query', () => {
        expect(searchQueryBuilder.getSearchQuery()).toBe('angular2+user:janbaer+label:important+label:critical+' + repoQueryString);
      });
    });

    describe('State', () => {
      describe('When State is set', () => {
        beforeEach(() => {
          searchQueryBuilder.state = 'open';
        });

        it('Should contain the given state', () => {
          expect(searchQueryBuilder.getSearchQuery()).toBe('state:open+' + repoQueryString);
        });
      });

      describe('When state is empty', () => {
        beforeEach(() => {
          searchQueryBuilder.state = '';
        });

        it('Should not contain the state', () => {
          expect(searchQueryBuilder.getSearchQuery()).toBe(repoQueryString);
        });
      });
    });

    describe('Only my questions', () => {
      describe('When user wants to see only his questions', () => {
        beforeEach(() => {
          searchQueryBuilder.onlyMyQuestions = true;
        });

        it('Should contain the user filter', () => {
          expect(searchQueryBuilder.getSearchQuery()).toBe('user:janbaer+' + repoQueryString);
        });

        describe('When no user is logged in', () => {
          beforeEach(() => {
            configuration.user = undefined;
          });

          it('Should not contain the user filter', () => {
            expect(searchQueryBuilder.getSearchQuery()).toBe(repoQueryString);
          });
        });
      });
    });

  });
});
