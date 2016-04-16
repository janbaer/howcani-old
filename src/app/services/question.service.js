import { Injectable } from 'angular2/core';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { ConfigurationService } from './configuration.service';
import { GithubService } from './github.service';
import { SearchQueryService } from './search_query.service';

@Injectable()
export class QuestionService {
  constructor(configuration: ConfigurationService, githubService: GithubService, searchQueryService: SearchQueryService) {
    this.configuration = configuration;
    this.githubService = githubService;
    this.searchQueryService = searchQueryService;

    this.questions = new BehaviorSubject([]);
  }

  fetchQuestions(searchQuery) {
    if (searchQuery) {
      this.searchQueryService.query = searchQuery.searchValue;
      this.searchQueryService.labels = searchQuery.selectedLabels;
    }

    const searchString = this.searchQueryService.getSearchQuery();
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
