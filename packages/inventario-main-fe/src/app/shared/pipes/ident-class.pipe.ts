import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'indentClass' })
export class IndentClassPipe implements PipeTransform {
  transform(level: number): string {
    return `indent-level-${level}`;
  }
}
