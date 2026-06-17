import { Pipe, PipeTransform } from '@angular/core';
import { RoleEnum } from '../model/role';

@Pipe({
  name: 'roleText'
})
export class RoleTextPipe implements PipeTransform {

  
    transform(status: RoleEnum): string {
       switch (status) {
         case RoleEnum.standard:
           return 'עובד סטנדרטי';
         case RoleEnum.manager:
           return 'מנהל'; 
       }
       return '';
     }

}
