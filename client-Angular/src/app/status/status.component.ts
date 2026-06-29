import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { StatusMode } from '../model/statusMode';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-status',
  imports: [CommonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  theStatusEnum =StatusMode;
private _status = StatusMode.pending;
  @Input() canChangeStatus: boolean = false;
   get status() {
     return this._status;
   }
 
   @Input() set status(val) {
      this._status = val;
      this.propagateChange( this._status);
   }
   statusToString(status:StatusMode){
    switch(status){
        case StatusMode.pending:
          return 'ממתין';
          case StatusMode.process:
          return 'בתהליך';
          case StatusMode.completed:
          return 'בוצע';
          case StatusMode.cancel:
          return 'בוטל';
          default:return '';
      }
   }

   propagateChange = (_: any) => {};
   changeStatus(status: StatusMode) {
    if(this.canChangeStatus){
            this.status = status;
    }
    
   }
}
