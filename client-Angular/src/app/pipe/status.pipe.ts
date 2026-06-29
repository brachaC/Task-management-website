import { Pipe, PipeTransform } from '@angular/core';
import { StatusMode } from '../model/statusMode';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  
 

transform(status: StatusMode):string  {
    switch (status){
      case StatusMode.all:
        return 'הכל'
      case StatusMode.pending:
        return 'ממתין'
      case StatusMode.process:
        return 'בתהליך'
      case StatusMode.cancel:
        return 'בוטל'
      case StatusMode.completed:
        return 'בוצע' 
      default:
        return 'ALL'    
    } 
  }
}
