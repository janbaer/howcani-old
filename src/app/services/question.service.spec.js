'use strict';

import { Injector, provide } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';
import { QuestionService } from './question.service.js';

const Github = require('github-api');

describe('Question service spec', function() {
  let questionService;

  class ConfigurationServiceMock {
    constructor() {
      this.project = {
        user: 'howcani-project',
        repository: 'howcani-data'
      };
    }
  }

  beforeEachProviders(() => [
    QuestionService,
    provide(ConfigurationService, { useClass: ConfigurationServiceMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    questionService = injector.get(QuestionService);

    const issuesMock = {
      issues: (options, callback) => {
        callback(null, {items: [{ title: 'Issue1' }] });
      }
    };

    const github = new Github({});
    github.getSearch = () => issuesMock;
  }));

  describe('When service was created', function() {
    it('Should not be null', function() {
      expect(questionService).toBeDefined();
    });
  });

  describe('When Issues should be fetched', function() {
    let questions;

    beforeEach(function(done) {
      questionService.fetchQuestions()
        .then((result) => {
          questions = result;
          done();
        });
    });

    it('Should return the expected questions', function() {
      expect(questions.length).toEqual(1);
      expect(questions[0].title).toEqual('Issue1');
    });
  });
});

