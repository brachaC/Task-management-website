import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAppOverHilight]'
})
export class AppOverHilightDirective {

@Input('appOverHilight') highlightColor:string='';
private defaultColor: string=''
constructor(private el:ElementRef) { }
@HostListener('mouseEnter') onMouseEnter(){
  this.defaultColor=this.el.nativeElement.style.backgroundColor;
  this.el.nativeElement.style.backgroundColor = this.highlightColor;
  this.el.nativeElement.style.transition = 'background-color 0.3s ease';
}
@HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }
}

