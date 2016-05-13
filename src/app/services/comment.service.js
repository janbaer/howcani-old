import { Injectable } from '@angular/core';
import { GithubService } from './github.service';

@Injectable()
export class CommentService {
  constructor(githubService: GithubService) {
    this.github = githubService;
  }

  fetchComments(issueNumber) {
    return this.github.getComments(issueNumber);
  }

  postComment(questionNumber, commentText) {
    return this.github.postComment(questionNumber, { body: commentText });
  }

}

