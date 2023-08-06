import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string): unknown {
    let date = new Date(value);
    let year =  date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();

    let hours = value.match(/\d\d:\d\d/);

    if (dt < 10) {
      dt = Number.parseInt('0' + dt);
    }
    if (month < 10) {
      month = Number.parseInt('0' + month);
    }

    return dt+'/'+month+'/'+year + '  ' + hours;
  }
}
