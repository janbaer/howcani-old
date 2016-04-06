import { Component, Input } from 'angular2/core';

@Component({
  selector: 'question-details',
  templateUrl: './app/components/question-details/question-details.tpl.html',
  directives: [],
  pipes: []
})
export class QuestionDetailsComponent {
  @Input() question;

}

