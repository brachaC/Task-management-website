import { Component, EventEmitter, Input,inject, OnInit, OnChanges, Output, SimpleChanges } from '@angular/core';
import {  Itask } from '../model/task';
import { AppOverHilightDirective } from '../directives/app-over-hilight.directive';
import {MatTableModule} from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon'
import { StatusIconPipe } from '../pipe/status-icon.pipe';
import { StatusPipe} from '../pipe/status.pipe'
import {IconsPipe} from '../pipe/icons.pipe'
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../services/http/tasks.service.service' ;
import { TaskFromComponent } from '../task-from/task-from.component';
import { tap } from 'rxjs';
import { SnackService } from '../services/snack.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-tasks-table',
  imports: [
    MatTableModule,
    MatIconModule,
    AppOverHilightDirective,
    CommonModule,
    IconsPipe,
    StatusIconPipe,
    StatusPipe,
    FormsModule],
  templateUrl: './tasks-table.component.html',
  styleUrl: './tasks-table.component.scss'
})
export class TasksTableComponent implements OnInit, OnChanges{
private tasksService = inject(TasksService);   
private dialog =inject(MatDialog);
private dialogRef:MatDialogRef<TaskFromComponent> | null=null; 
private snack = inject(SnackService);
private confirmRef: MatDialogRef<ConfirmDialogComponent> | null = null;
columns:string[]=[]; 
@Input() tasksList: Itask[] | null= [];
@Output() afterUpdate: EventEmitter<any>  = new EventEmitter ();
notDisplayColumns = ['taskId'];
   iconColumns = ['status','update','delete'];


ngOnInit(): void {
   }

  ngOnChanges(changes: SimpleChanges): void {
     const { tasksList }= changes;
     if(tasksList){
      if(this.tasksList && this.tasksList.length){
              this.columns =[... Object.keys(this.tasksList[0])
              .filter( key => !this.notDisplayColumns.includes(key) ), 
              'update', 'delete'];
        }
     }
  }
updateTask(task:Itask){
   
    this.dialogRef = this.dialog.open(TaskFromComponent, {
      width: '520px',
      disableClose: false,
        data: { task }
    });
this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      this.afterUpdate.emit();
      this.dialogRef = null; // אחרי הסגירה מאפסים את ההפניה

    });
}
deleteTask({ taskId }: Itask){
    this.confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '220px',
      disableClose: false,
        data: { message: 'האם אתה בטוח שאתה רוצה למחוק את המשימה?'}
    });

    this.confirmRef.afterClosed().subscribe(result => {
      console.log('Dialog closed', result);
      if(result){
          this.deleteTaskFromList(taskId);
      } 
      
    });
  }
deleteTaskFromList(taskId: number){
      this.tasksService.deleteTask$(taskId).pipe(
            tap((result) => this.snack.openSnackBar('מחיקה הסתיימה בהצלחה','')),
            tap(_ => this.afterUpdate.emit()),
            tap(_ => this.confirmRef = null )// אחרי הסגירה מאפסים את ההפניה
          ).subscribe(
            (_=>{}),
            (err => this.snack.openSnackBar('שגיאה במחיקת משימה',err))
        );  
  }
}
