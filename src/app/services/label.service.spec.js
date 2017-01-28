import { Injector } from '@angular/core';
import { TestBed, inject } from '@angular/core/testing';
import { GithubService } from './github.service.js';
import { ConfigurationService } from './configuration.service.js';
import { LabelService } from './label.service.js';

describe('LabelService spec', () => {
  const labels = [
    { name: 'Label1' }, { name: 'Label2' }, { name: 'Label3' }
  ];
  let labelService;
  let githubService;

  class GithubServiceMock {
    deleteLabel() {
      return Promise.resolve();
    }

    patchLabel(label) {
      return Promise.resolve(label);
    }
  }

  class ConfigurationServiceMock {
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LabelService,
        { provide: GithubService, useClass: GithubServiceMock },
        { provide: ConfigurationService, useClass: ConfigurationServiceMock }
      ]
    });
  });

  beforeEach(inject([Injector], (injector) => {
    githubService = injector.get(GithubService);
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

  describe('When Remove label', () => {
    const labelToDelete = { name: 'Label4' };
    labels.push(labelToDelete);

    beforeEach(() => {
      spyOn(githubService, 'deleteLabel').and.callThrough();
    });

    beforeEach((done) => {
      labelService.deleteLabel(labelToDelete).then(done);
    });

    it('Should call the githubService', () => {
      expect(githubService.deleteLabel).toHaveBeenCalled();
    });

    it('Should remove the label from the list of labels', () => {
      expect(labels.some(l => l.name === labelToDelete.name)).toEqual(false);
    });
  });

  describe('When changing a label', () => {
    const labelToChange = { name: 'Label4', color: '#1234' };
    const labelToSend = { name: 'Label4', color: '1234' };

    beforeEach(() => {
      spyOn(githubService, 'patchLabel').and.callThrough();
    });

    beforeEach((done) => {
      labelService.updateLabel(labelToChange).then(done);
    });

    it('Should remove the # from the color attribute before updating', () => {
      expect(githubService.patchLabel).toHaveBeenCalledWith(labelToSend);
    });
  });
});

