import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: Date): number {
    let now = moment(new Date());
    return now.diff(value, 'y');
  }
}
