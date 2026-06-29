import { Pipe, PipeTransform } from '@angular/core';
import { StatusMode } from '../model/statusMode';

@Pipe({  name: 'statusIcon'})
export class StatusIconPipe implements PipeTransform {

  transform(status: StatusMode): string {
    switch (status) {
      case StatusMode.pending:
        return 'hourglass_empty';
      case StatusMode.process:
        return 'hourglass_top';
      case StatusMode.completed:
        return 'check';
      case StatusMode.cancel:
        return 'cancel';
    }
    return '';
  }

}
