import { Pipe, PipeTransform } from '@angular/core';
import { Itask } from '../model/task';
import { StatusMode } from '../model/statusMode';


@Pipe({
  name: 'filterStatus',
  pure: false
})
export class FilterStatusPipe implements PipeTransform {

  transform(tasks: Itask[] | null, statusMode:StatusMode):  Itask[] | null{
    if((!statusMode && statusMode != 0) || statusMode === StatusMode.all ){
      return tasks ? tasks : [];
    }
    return (tasks || []).filter(task => {
      const s = task.status as unknown as string | number;
      if (typeof s === 'string' && s.startsWith('StatusMode.')) {
        return StatusMode[s.split('.')[1] as keyof typeof StatusMode] === statusMode;
      }
      return Number(s) === Number(statusMode);
    });
  }


}
