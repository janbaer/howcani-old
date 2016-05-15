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
        comment.isCorrectAnswer = comment.body.startsWith('#ANSWER');
        if (comment.isCorrectAnswer === true) {
          comment = this.removeAnswerTag(comment);
        }
        return comment;
      });
      return comments;
    });

    return newObservable; 
  }

  removeAnswerTag(comment) {
    comment.body = comment.body.replace(/^#ANSWER/, "");
    return comment;
  }


  postComment(questionNumber, commentText) {
    return this.github.postComment(questionNumber, { body: commentText });
  }

  updateComment(questionNumber, comment) {
    return this.github.patchComment(questionNumber, comment);
  }

  unMarkCorrectAnswer(comment) {
    const updatedComment = this.removeAnswerTag(comment);
    comment.isCorrectAnswer = false;
    return this.github.patchComment(comment);
  }

  markCommentAsCorrectAnswer(comment) {
    comment.body = '#ANSWER' + comment.body;
    comment.isCorrectAnswer = true;
    this.github.patchComment(comment);
    comment = this.removeAnswerTag(comment);
  }
}
