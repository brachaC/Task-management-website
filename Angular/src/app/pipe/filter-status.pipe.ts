import { Pipe, PipeTransform } from '@angular/core';
import { Itask } from '../model/task';
import { StatusMode } from '../model/statusMode';


@Pipe({
  name: 'filterStatus'
})
export class FilterStatusPipe implements PipeTransform {

  transform(task: Itask[],status:StatusMode): Itask[]{
    if(!task.length||!task||status==StatusMode.all){
      return task
    }
    return task.filter(x=>x.status==status);
  }

}
