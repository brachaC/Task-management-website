import { Component,Input,inject, OnInit } from '@angular/core';
import {  Itask } from '../model/task';
import { AppOverHilightDirective } from '../directives/app-over-hilight.directive';
import {MatTableModule} from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import {IconsPipe} from '../pipe/icons.pipe'
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { TaskFromComponent } from '../task-from/task-from.component';
@Component({
  selector: 'app-tasks-table',
  imports: [MatTableModule,
    MatIconModule,
    AppOverHilightDirective,
    CommonModule,
    IconsPipe,
    FormsModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit{
private dialog =inject(MatDialog);
private dialogRef:MatDialogRef<TaskFromComponent> | null=null; 
columns:string[]=[]; 
@Input()taskslist :Itask[]=[];
notDisplayColumns = ['id'];
   iconColumns = ['status','update','delete'];


ngOnInit():void{
  if(this.taskslist.length){
          this.columns =[... Object.keys(this.taskslist[0])
          .filter( key => !this.notDisplayColumns.includes(key) ), 
          'update', 'delete'];
        }
}
updateTask(task:Itask){
   
    this.dialogRef = this.dialog.open(TaskFromComponent, {
      width: '520px',
      disableClose: false,
        data: { task }
    });
this.dialogRef.afterClosed().subscribe(result=>{
  this.dialogRef=null;
})
}
}
