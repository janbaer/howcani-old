'use strict';

import { Injector, provide } from 'angular2/core';
import { Configuration } from './configuration.service.js';
import { QuestionService } from './question.service.js';

const Github = require('github-api');

describe('Question service spec', function() {
  let questionService;

  class ConfigurationMock {
    constructor() {
      this.project = {};
    }
  }

  beforeEachProviders(() => [
    QuestionService,
    provide(Configuration, { useClass: ConfigurationMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    const configuration = injector.get(Configuration);
    questionService = injector.get(QuestionService);

    const issuesMock = {
      list: (options, callback) => {
        callback(null, [{ title: 'Issue1' }]);
      }
    };

    const github = new Github({});
    github.getIssues = () => issuesMock;
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

