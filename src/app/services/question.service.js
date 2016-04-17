import { Injectable } from 'angular2/core';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { ConfigurationService } from './configuration.service';
import { GithubService } from './github.service';
import { SearchQueryBuilderService } from './searchquerybuilder.service';

@Injectable()
export class QuestionService {
  constructor(configuration: ConfigurationService, githubService: GithubService, searchQueryBuilderService: SearchQueryBuilderService) {
    this.configuration = configuration;
    this.githubService = githubService;
    this.searchQueryBuilder = searchQueryBuilderService;

    this.questions = new BehaviorSubject([]);
  }

  fetchQuestions(searchQuery) {
    if (searchQuery) {
      this.searchQueryBuilder.query = searchQuery.query;
      this.searchQueryBuilder.labels = searchQuery.labels;
      this.searchQueryBuilder.state = searchQuery.state;
      this.searchQueryBuilder.onlyMyQuestions = searchQuery.onlyMyQuestions;
    }

    const searchString = this.searchQueryBuilder.getSearchQuery();
    const questionsResponse = this.githubService.searchIssues(searchString);

    questionsResponse.subscribe((response) => {
      this.questions.next(response.items);
    });

    return questionsResponse;
  }

  fetchComments(issueNumber) {
    return this.githubService.getComments(issueNumber);
  }

}
