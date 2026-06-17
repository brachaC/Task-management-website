import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomColor'
})
export class RandomColorPipe implements PipeTransform {

  transform(value:number, style: string,  width:number = 0): any {
    if(!value){
      return '';
    }
    const randomColor = this.getRandomColor((value * 1234).toString());
    const result:any = {};
    let styleStr = `${randomColor}`;
    if(width){
      styleStr =`${width}px solid ${randomColor} `; 
    }
    result[style] = styleStr
    return result;
  }


  getRandomColor(value:string): string {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const sub = (hash >> (i * 8)) & 0xFF;
      color += ('00' + sub.toString(16)).slice(-2);
    }
    return color;
  }
}
