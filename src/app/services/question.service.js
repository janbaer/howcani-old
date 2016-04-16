import { Injectable } from 'angular2/core';
import { ConfigurationService } from './configuration.service.js';
import { GithubService } from './github.service';

@Injectable()
export class QuestionService {
  constructor(configuration: ConfigurationService, githubService: GithubService) {
    this.configuration = configuration;
    this.githubService = githubService;
  }

  fetchQuestions() {
    const searchString = `repo:${this.configuration.project.user}/${this.configuration.project.repository}`;
    return this.githubService.searchIssues(searchString);
  }

  fetchComments(issueNumber) {
    return this.githubService.getComments(issueNumber);
  }

}
