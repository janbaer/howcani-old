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
    this.totalCountOfQuestions = 0;
    this.page = 0;
    this.lastSearchQuery = undefined;
  }

  fetchQuestions(searchQuery, page) {
    this.lastSearchQuery = searchQuery;
    this.page = page || 1;

    const searchString = this.searchQueryBuilder.buildQueryString(searchQuery);
    const questionsResponse = this.githubService.searchIssues(searchString, this.page);

    questionsResponse.subscribe((response) => {
      this.totalCountOfQuestions = response.total_count;
      const items = this.page === 1 ? response.items : this.questions.value.concat(response.items);
      this.questions.next(items);
    });

    return questionsResponse;
  }

  fetchMoreQuestions() {
    if (this.totalCountOfQuestions > 0 && this.questions.value && this.questions.value.length < this.totalCountOfQuestions) {
      return this.fetchQuestions(this.lastSearchQuery, this.page + 1);
    }
    return undefined;
  }

  fetchComments(issueNumber) {
    return this.githubService.getComments(issueNumber);
  }

}
