import { Injector, provide } from '@angular/core';
import { GithubService } from './github.service.js';
import { LabelService } from './label.service.js';

describe('LabelService spec', () => {
  let labelService;

  class GithubServiceMock {
  }

  beforeEachProviders(() => [
    LabelService,
    provide(GithubService, { useClass: GithubServiceMock })
  ]);

  beforeEach(inject([Injector], (injector) => {
    labelService = injector.get(LabelService);
  }));

  describe('When labels should be get from a list of names', () => {
    const expectedLabels = [
        { name: 'label2' }, { name: 'label3' }
    ];
    let selectedLabels;

    beforeEach(() => {
      labelService.labels = [
        { name: 'Label1' }, { name: 'label2' }, { name: 'label3' }
      ];

      selectedLabels = labelService.getLabelsFromLabelNames(['label2', 'label3']);
    });

    it('Should return the expected list of labels', () => {
      expect(selectedLabels).toEqual(expectedLabels);
    });
  });
});

