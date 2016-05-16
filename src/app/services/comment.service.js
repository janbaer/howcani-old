import { Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { AuthService } from './auth.service.js';

@Injectable()
export class CommentService {
  constructor(githubService: GithubService, authService: AuthService) {
    this.github = githubService;
    this.authService = authService;
  }

  fetchComments(issueNumber, questionAuthor) {
    const commentsObservable = this.github.getComments(issueNumber);
    const newObservable = commentsObservable.map((comments) => {
      comments = comments.map((comment) => {
        comment.canMarkQuestionAsAnswered = this.authService.isSameAuthenticatedUser(questionAuthor);
        comment.isCorrectAnswer = this.hasIsCorrectAnswerTag(comment.body);
        if (comment.isCorrectAnswer === true) {
          comment.body = this.removeAnswerTag(comment.body);
        }
        return comment;
      });
      return comments;
    });

    return newObservable;
  }

  hasIsCorrectAnswerTag(commentText) {
    return commentText.startsWith('#ANSWER');
  }

  removeAnswerTag(commentText) {
    return commentText.replace(/^#ANSWER\n/, '');
  }

  addIsCorrectAnswerTag(commentText) {
    return '#ANSWER\n' + commentText;
  }

  postComment(questionNumber, commentText) {
    return this.github.postComment(questionNumber, { body: commentText });
  }

  updateComment(comment) {
    const canMarkQuestionAsAnswered = comment.canMarkQuestionAsAnswered;
    const isCorrectAnswer = comment.isCorrectAnswer;

    const commentForUpdate = { body: comment.body }; // Github needs only the body of a comment
    if (isCorrectAnswer) {
      commentForUpdate.body = this.addIsCorrectAnswerTag(commentForUpdate.body);
    }

    return this.github.patchComment(comment.id, commentForUpdate)
      .then((updatedComment) => {
        updatedComment.isCorrectAnswer = isCorrectAnswer;
        updatedComment.canMarkQuestionAsAnswered = canMarkQuestionAsAnswered;
        if (isCorrectAnswer) {
          updatedComment.body = this.removeAnswerTag(updatedComment.body);
        }
        return updatedComment;
      });
  }
}
