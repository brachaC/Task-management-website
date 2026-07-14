import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dateOnly' })
export class DateOnlyPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';
    const d = new Date(value);
    return d.toLocaleDateString('he-IL');
  }
}
