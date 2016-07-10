import { Injector, provide } from '@angular/core';
import { GithubService } from './github.service.js';
import { ConfigurationService } from './configuration.service.js';
import { LabelService } from './label.service.js';

describe('LabelService spec', () => {
  const labels = [
    { name: 'Label1' }, { name: 'Label2' }, { name: 'Label3' }
  ];
  let labelService;

  class GithubServiceMock {
  }

  class ConfigurationServiceMock {
  }

  beforeEach(() => {
    addProviders([
      LabelService,
      provide(GithubService, { useClass: GithubServiceMock }),
      provide(ConfigurationService, { useClass: ConfigurationServiceMock })
    ]);
  });

  beforeEach(inject([Injector], (injector) => {
    labelService = injector.get(LabelService);
    labelService.labels = labels;
  }));

  describe('When labels should be get from a list of names', () => {
    const expectedLabels = [{ name: 'Label2' }, { name: 'Label3' }];
    let selectedLabels;

    beforeEach(() => {
      selectedLabels = labelService.getLabelsFromLabelNames(['Label2', 'Label3']);
    });

    it('Should return the expected list of labels', () => {
      expect(selectedLabels).toEqual(expectedLabels);
    });
  });

  describe('Labels whould ignore case sensitive compared', () => {
    const expectedLabels = [{ name: 'Label2' }, { name: 'Label3' }];
    let selectedLabels;

    beforeEach(() => {
      selectedLabels = labelService.getLabelsFromLabelNames(['label2', 'label3']);
    });

    it('Should return the expected list of labels', () => {
      expect(selectedLabels).toEqual(expectedLabels);
    });
  });
});

