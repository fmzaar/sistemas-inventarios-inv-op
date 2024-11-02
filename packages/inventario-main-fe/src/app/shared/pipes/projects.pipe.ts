import {Pipe, PipeTransform} from "@angular/core";
import {CurrencyPipe, DatePipe} from "@angular/common";

@Pipe({
  name: 'project'
})
export class ProjectsPipe implements PipeTransform {

  constructor(private datePipe: DatePipe,
              private currencyPipe: CurrencyPipe) {}

  transform(value: string, pipe: string): string | null {
    if (pipe) {
      switch (pipe) {
        case 'date':
          return this.datePipe.transform(value, 'dd-MM-yyyy');
        case 'currency':
          return this.currencyPipe.transform(value);
        default:
          return value;
      }
    } else {
      return value;
    }
  }
}
