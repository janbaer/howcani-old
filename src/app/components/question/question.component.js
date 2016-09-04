import { Component, Input, Output, EventEmitter } from '@angular/core';
import template from './question.tpl.html';

@Component({
  selector: 'question',
  template: template
})
export class QuestionComponent {
  @Input() question;
  @Output() onSelectQuestion = new EventEmitter();

  isClosed(question) {
    return question && question.state === 'closed';
  }

  showDetails(question) {
    this.onSelectQuestion.emit(question);
  }

  copyLink() {
    this.copyToClipboard(window.document.location.href + '/' + this.question.number);
  }

  copyToClipboard(textToCopy) {
    $(`#question${this.question.number}`)
        .append($('<input type="text" name="fname" class="textToCopyInput"/>' )
        .val(textToCopy))
        .find('.textToCopyInput')
        .select();

    try {
      window.document.execCommand('copy');
    } catch (error) {
      console.log('Text could not copied to clipbboard', error);
    }
    $('.textToCopyInput').remove();
  }
}
