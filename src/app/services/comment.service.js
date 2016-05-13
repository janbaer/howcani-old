import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { AuthService } from './auth.service.js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CommentService {
  constructor(githubService: GithubService, authService: AuthService) {
    this.github = githubService;
    this.authService = authService;
  }

  fetchComments(issueNumber, issueOwner) {
    const commentsObservable = this.github.getComments(issueNumber);
    const newObservable = commentsObservable.map((comments) => {
      comments = comments.map((comment) => {
        comment.isFromAuthenticatedUser = this.authService.isSameAuthenticatedUser(issueOwner);
        return comment;
      });
      return comments;
    });

    return newObservable; 
  }

  postComment(questionNumber, commentText) {
    return this.github.postComment(questionNumber, { body: commentText });
  }

}
