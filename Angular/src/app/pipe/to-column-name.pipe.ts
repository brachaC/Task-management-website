import { Pipe, PipeTransform } from '@angular/core';

@Pipe({  name: 'toColumnName'})
export class ToColumnNamePipe implements PipeTransform {

  transform(value: string): string {
    switch(value){
      case 'status': return 'סטטוס';
      case 'scheduling': return 'תזמון';
      case 'price': return 'מחיר';
      case 'name': return 'שם';
      case 'userName': return 'שם משתמש';
      case 'password': return 'סיסמא';
      case 'phone': return 'טלפון';
      case 'email': return 'מייל';
      case 'ruleId': return 'הרשאה';
      case 'userId': return 'מספר מזהה';
      default: return ''
    }
  }

}
