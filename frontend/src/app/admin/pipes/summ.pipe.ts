import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summ'
})
export class SummPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
