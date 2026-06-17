import { Pipe, PipeTransform } from '@angular/core';
import { StatusMode } from '../model/statusMode';

@Pipe({
  name: 'icons'
})
export class IconsPipe implements PipeTransform {

 transform(value: StatusMode):string  {
    switch (value){
      case StatusMode.pending:
        return 'chair'
      case StatusMode.process:
        return 'computer'
      case StatusMode.cancel:
        return 'clear'
      case StatusMode.completed:
        return 'camera' 
      default:
        return 'camera'    
    } 
  }
}