import { Injector } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { RecentProjectsService } from './recent-projects.service';
import { StorageService } from './storage.service';

describe('Configuration service spec', function() {
  let configuration;
  let storage = {};

  beforeEach(() => {
    addProviders([
      ConfigurationService,
      StorageService,
      RecentProjectsService
    ]);
  });

  beforeEach(inject([Injector], (injector) => {
    configuration = injector.get(ConfigurationService);
    storage = injector.get(StorageService);
  }));

  describe('When no settings are saved in localstorage', function() {
    beforeEach(function() {
      storage.getProject = () => undefined;
    });

    it('Should return the defaultProject', function() {
      expect(configuration.project).toEqual(configuration.defaultProject);
    });
  });

  describe('When project settings are saved in localStorage', function() {
    const project = { user: 'max', repository: 'musterrepo' };

    beforeEach(function() {
      storage.getProject = () => project;
    });

    it('Should return these settings', function() {
      expect(configuration.project).toEqual(project);
    });
  });
});
