import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'timeFromNow'
})
export class TimeFromNowPipe {
  transform(value) {
    return moment(value).fromNow();
  }
}
