import { Pipe } from 'angular2/core';
import moment from 'moment';

@Pipe({
  name: 'parsedate'
})
export class ParseDatePipe {
  transform(value) {
    return moment(value).fromNow();
  }
}
