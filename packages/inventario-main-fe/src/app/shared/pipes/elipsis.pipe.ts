import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elipsis'
})
export class ElipsisPipe implements PipeTransform {

  transform(value: string, maxChars: number): string {
    if (value && value.length > maxChars) {
      return value.substr(0, maxChars) + '...';
    }
    return value;
  }

}
